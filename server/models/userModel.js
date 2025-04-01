const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        min:3,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        min:4,
        required:true
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }


},{timestamps:true})

const userModel = new mongoose.model("users",userSchema)
module.exports = userModel