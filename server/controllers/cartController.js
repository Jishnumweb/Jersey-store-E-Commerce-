const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");



const getCart = async (req, res) => {
    try {
        const userId = req.user
        const cart = await cartModel.findOne({ userId }).populate("products.productId")
        console.log(cart);

        if (!cart) {
            return res.status(400).json({ error: 'cart is empty' })
        }

        res.status(200).json(cart)
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

const addTocart = async (req, res) => {
    try {
        const userId = req.user
        const { productId } = req.params

        const product = await productModel.findById(productId)

        if (!product) {
            return res.status(404).json({ error: "Course not found" })
        }

        let cart = await cartModel.findOne({ userId })

        if (!cart) {
            cart = new cartModel({ userId, products: [] })
        }

        const courseAlreadyExist = cart.products.some((item) => item.productId.equals(productId))

        if (courseAlreadyExist) {
            return res.status(400).json({ error: "Course already in cart" })

        }

        cart.products.push({
            productId,
            price: product.price
        })

        cart.calculateTotalPrice()

        await cart.save()

        res.status(200).json({ message: "added to cart", cart })
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })

    }
}


const removeFromCart = async (req, res) => {
    try {

        const userId = req.user;
        const { productId } = req.params

        let cart = await cartModel.findOne({ userId })
        if (!cart) {
            return res.status(404).json({ error: "cart not found" })
        }

        cart.products = cart.products.filter((item) => !item.productId.equals(productId))

        cart.calculateTotalPrice();

        await cart.save()

        res.status(200).json({ message: 'course removed from cart', cart })


    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

const clearCart = async (req, res) => {
    try {
        const userId = req.user;

        const cart = await cartModel.findOne({ userId })

        if (!cart) {
            return res.status(404).json({ error: "cart not found" })
        }

        cart.products = []

        await cart.save()
        return res.status(200).json({ message: 'cart cleared' })
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }

}

module.exports = {
    addTocart,
    getCart,
    removeFromCart,
    clearCart
}