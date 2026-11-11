// model / schema = structure of data / nature of data

const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken: String,
    resetTokenExpire : Date,
    role:{
        type:String,
        enum: ["user", "admin"],
        default: "user"
    },
    refreshToken: {
        type:String,
    }
}, {timestamps:true})
module.exports = mongoose.model('users', userSchema); 



