const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'product',
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
})

cartSchema.methods.calculateTotalPrice = function () {
    this.totalPrice = this.products.reduce((total, course) => total + course.price, 0)
}

module.exports = new mongoose.model('carts', cartSchema)