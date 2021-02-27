const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

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
    }
})// end of userSchema.pre()

const User = mongoose.model('User', userSchema)

module.exports = {User}