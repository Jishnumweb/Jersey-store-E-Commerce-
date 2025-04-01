const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    category:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["trending","feautured"],
        default:"feautured"
    },
    image:[{
        type:String,
    }],
    price:{
        type:Number,
        required:true
    }
},{timestamps:true})

const productModel = new mongoose.model("product",productSchema)
module.exports = productModel