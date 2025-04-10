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
    branch:{
        type:String,
        enum:["kochi","tvm","alp","ptm"]
    },
    role:{
        type:String,
        enum:["admin","user","seller"],
        default:"user"
    }


},{timestamps:true})

const userModel = new mongoose.model("User",userSchema)
module.exports = userModel