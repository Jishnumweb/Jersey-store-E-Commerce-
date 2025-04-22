const { createOrder, getOrder, getAllOrders, createStripeOrder, adminOrderDetails, statusUpdate } = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')

const orderRouter = require('express').Router()

orderRouter.post("/create",authMiddleware,createOrder)
orderRouter.get("/get-order",authMiddleware,getOrder)
orderRouter.get("/get-allOrders",authMiddleware,getAllOrders)
orderRouter.post("/create-stripe-order/:session_id",authMiddleware,createStripeOrder)
orderRouter.post("/order-details/:orderId",authMiddleware,adminOrderDetails)
orderRouter.patch("/update-status/:orderId",authMiddleware,statusUpdate)

module.exports = orderRouter