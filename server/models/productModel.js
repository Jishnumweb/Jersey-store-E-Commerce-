const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        enum : ["club","nation"],
        required: true
    },
    type: {
        type: String,
        enum: ["trending", "highlight"],
        required:true

    },
    team: {
        type: String,

    },
    image: 
        {
            type: String,
        }
    ,
    price: {
        type: Number,
        required: true
    },
    branch: {
        type: String
    }

}, { timestamps: true })

const productModel = new mongoose.model("product", productSchema)
module.exports = productModel