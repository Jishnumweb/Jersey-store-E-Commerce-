const { addTocart, getCart, removeFromCart, clearCart, cartUpdateQuantity } = require('../controllers/cartController')
const authMiddleware = require('../middleware/authMiddleware')


const cartRouter = require('express').Router()


cartRouter.post("/addtocart/:productId", authMiddleware, addTocart)
cartRouter.get("/getcart", authMiddleware, getCart)
cartRouter.delete("/removefromcart/:productId", authMiddleware, removeFromCart)
cartRouter.patch("/updateQuantity/:productId", authMiddleware, cartUpdateQuantity)
cartRouter.post("/clearcart", authMiddleware, clearCart)

module.exports = cartRouter