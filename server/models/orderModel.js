const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
    },
    products:[{
        productId:{
            type:mongoose.Types.ObjectId,
            ref:"product",
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        }
    }],
    shippingAddress:{
        Name:{type:String,required:true},
        place:{type:String,required:true},
        address:{type:String,required:true},
        postcode:{type:Number,required:true}
    },
    paymentMethod:{
        type:String,
        default:"cod"
    },
    totalPrice:{
        type:Number,
        required:true
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        enum:["Order placed","packed","shipped","delivered"],
        default:"Order placed"
    }
},{timestamps:true})

const oderModel = new mongoose.model("order",orderSchema)
module.exports = oderModel