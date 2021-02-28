const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jsonwebtoken = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlenght: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlenght: 5
    },
    lastname: {
        type: String,
        maxlenght: 50
    },
    role: {
        type: Number,
        defualt: 0
    },
    image: String,
    token: String,
    tokenExp: Number
})



userSchema.pre('save', function(next){
    let user = this;

    //비밀번호 암호화 시킴
    if(user.isModified('password')){
    
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })// end of bcrypt.hash()
        })// end of bcrypt.genSalt()
    }else{
        next()
    }
})// end of userSchema.pre()

//로그인 시 비밀번호 체크
userSchema.methods.comparePassword = function(plainPassword, callback){
    //사용자가 입력한 암호와, DB에 저장된 암호가 맞는지 compare하고, 맞는지 검사
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        //만약 error가 발생한다면 callback에 error를 보내주고
        if(err) return callback(err);
        //비밀번호가 맞다면 error는 null이고, isMatch는 true일 것이다.
        callback(null,isMatch);
    })
}//end of comparePassword

//로그인 성공 시 token생성
userSchema.methods.generateToken = function(callback){
    let user = this;
    //jsonwebtoken을 이용해 token생성
    let genToken = jsonwebtoken.sign(user._id.toHexString(), "userToken")
    //console.log("user.id (hexString안한 것) : " + user.id);
    console.log("userToken 생성 : " + genToken);
    user.token = genToken;

    user.save((err, user) => {
        if(err) return callback(err);
        callback(null, user);
    })
}


const User = mongoose.model('User', userSchema)

module.exports = {User}