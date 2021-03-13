const {User} = require('../../models/User');

//인증을 처리하는 구간
let auth = function(req, res, next){
    // 1. client cookie에서 token을 가져옴
    // userInfo.generateToken() 함수 내의 res.cookie("x_auth",userInfo.token) 부분에서
    // cookie에 토큰을 저장할 때 "x_auth"라는 이름으로 저장했으므로(map에서 key같은 느낌인가?)
    // token을 가져올 때도 x_auth로 가져옴. 만약 다른이름으로 저장했다면 그 이름을 써야함.
    let token = req.cookies.x_auth;

    // 2. 가져온 token을 복호화한 후 해당 유저를 DB에서 찾는다. → cookie-parser이용
    User.findByToken(token, function(err,user){
        if(err) throw err;
        if(!user) return res.json({
            isAuth: false,
            error: true
        })

        req.token = token;
        req.user = user;
        next();
    })
    // 3. 유저가 있으면 인증 O
    // 4. 유저가 없으면 인증 X
}

module.exports = {auth};