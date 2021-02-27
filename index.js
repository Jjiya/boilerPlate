const express = require('express')
const app = express()
const port = 5000

// mongoDB의 User Model 가져온다. 경로는 model폴더의 User.js
const {User} = require("./models/User");
// 다운받은 body-parser를 가져온다.
const bodyParser = require('body-parser');

// mongoDB의 연결 URI를 key.js에서 가져옴
const config = require("./config/key");

// 사용자가 입력한 정보를 서버에서 가져올 때 분석해서 가지고 올 수 있게 해줌
app.use(bodyParser.urlencoded({extended: true}));
// json타입으로 된 정보를 분석해서 가져오기 위함
app.use(bodyParser.json());

//mongoDB와 연결하기 위함
const mongoose = require('mongoose')
mongoose.connect( config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(() => console.log('mongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! Hello Node.js (●ˇ∀ˇ●)')
})

app.post('/register', (req,res) => {
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
    if(err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})