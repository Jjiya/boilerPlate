const express = require('express')
const app = express()
const port = 5000

// mongoDB의 User Model 가져온다. 경로는 model폴더의 User.js
const { User } = require("./models/User");
// 다운받은 body-parser를 가져온다.
const bodyParser = require('body-parser');
// cookie에 정보를 저장할 수 있게 해주는 cookieParser를 가져온다. (다운 받은 것)
const cookieParser = require('cookie-parser');

// mongoDB의 연결 URI를 key.js에서 가져옴
const config = require("./config/key");

//auth기능 구현을 위해 만든 auth.js파일 내 기능을 가져옴
const { auth } = require('./config/middleware/auth');

// 사용자가 입력한 정보를 서버에서 가져올 때 분석해서 가지고 올 수 있게 해줌
app.use(bodyParser.urlencoded({
  extended: true
}));
// json타입으로 된 정보를 분석해서 가져오기 위함
app.use(bodyParser.json());
// cookie-parser를 사용하기 위함
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//mongoDB와 연결하기 위함
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(() => console.log('mongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! Hello Node.js (●ˇ∀ˇ●)')
})

// react서버와 처음 연동하는 부분
app.get('/api/hello', (req,res) => {
  res.send("안녕하세요");
})

app.post('/api/users/register', (req, res) => {
  //회원 가입 시 필요한 정보를 client에서 가져오면 db에 넣어준다.
  /*
   {
      id: "hello",
      pwd: "123"
   }
   request의 body에 json 형식으로 된 정보가 들어있음
   (= body-parser의 역할 → req.body에 client가 입력한 정보가 들어있게 해줌)

   그 것을 user Model에 저장하는 것이 아래 코드
  */
  const user = new User(req.body)

  //mongoDB에 저장할 수 있게 해주는 save()함수
  user.save((err, userInfo) => {
    if (err) return res.json({
      success: false,
      err
    })
    return res.status(200).json({
      success: true
    })
  })
}) //end of app.post('/register')

app.post('/api/users/login', (req, res) => {
  //요청된 email이 DB에 있는지 찾는다.
  User.findOne({
    email: req.body.email
  }, (err, userInfo) => {
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        msg: "가입하지 않은 이메일이거나, 잘못된 이메일 주소입니다."
      })
    } //end if

    //요청된 email이 DB에 있다면 password가 맞는지 확인
    userInfo.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({
        loginSuccess: false,
        msg: "비밀번호가 틀렸습니다."
      }) //end of if

      //password까지 맞다면 token생성하기.
      userInfo.generateToken((err, userInfo) => {

        if (err) return res.status(400).send(err);
        //token을 저장한다. -> 저장위치 : cookie, localStorage, session 등 가능
        //해당 강의는 cookie-parser를 이용해 cookie에 token을 저장함.
        res.cookie("x_auth", userInfo.token)
          .status(200)
          .json({
            loginSuccess: true,
            userId: userInfo._id
          }) // end of res.cookie()
      }) //end of generateToken()
    }) //end of comparePassword()
  }) // end of findOne()
}) // end of app.post('/login')


app.get('/api/users/auth', auth, (req, res) => {
  //여기까지 미들웨어(get 매개변수 중간의 auth)를 통과해 왔다는 얘기는 Authentication가 true라는 말
  console.log('Authentication == true');

  req.status(200).json({
    _id: req.user._id,
    //request에 담겨있는 user의 role 값이 0이면 false(일반 유저), 0이 아니면 관리자
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id }, { token: "" },
    (err, userInfo) => {
      if(err) return res.json({
        success: false,
        err
      }); //end of if(err)
      return res.status(200).send({
        success: true
      })
    })//end of User.findOneAndUpdate()
})