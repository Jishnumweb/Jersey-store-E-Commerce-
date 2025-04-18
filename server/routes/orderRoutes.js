const { createOrder, getOrder, getAllOrders, createStripeOrder } = require('../controllers/orderController')
const authUser = require('../middleware/authMiddleware')

const orderRouter = require('express').Router()

orderRouter.post("/create",authUser,createOrder)
orderRouter.get("/get-order",authUser,getOrder)
orderRouter.get("/get-allOrders",authUser,getAllOrders)
orderRouter.post("/create-stripe-order/:session_id",authUser,createStripeOrder)

module.exports = orderRouter