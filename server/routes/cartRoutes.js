const { addTocart, getCart, removeFromCart, clearCart, cartUpdateQuantity } = require('../controllers/cartController')
const authUser = require('../middleware/authMiddleware')


const cartRouter = require('express').Router()


cartRouter.post("/addtocart/:productId", authUser, addTocart)
cartRouter.get("/getcart", authUser, getCart)
cartRouter.delete("/removefromcart/:productId", authUser, removeFromCart)
cartRouter.patch("/updateQuantity/:productId", authUser, cartUpdateQuantity)
cartRouter.post("/clearcart", authUser, clearCart)

module.exports = cartRouter