const { createOrder, getOrder, getAllOrders, createStripeOrder, adminOrderDetails, statusUpdate } = require('../controllers/orderController')
const authUser = require('../middleware/authMiddleware')

const orderRouter = require('express').Router()

orderRouter.post("/create",authUser,createOrder)
orderRouter.get("/get-order",authUser,getOrder)
orderRouter.get("/get-allOrders",authUser,getAllOrders)
orderRouter.post("/create-stripe-order/:session_id",authUser,createStripeOrder)
orderRouter.post("/order-details/:orderId",authUser,adminOrderDetails)
orderRouter.patch("/update-status/:orderId",authUser,statusUpdate)

module.exports = orderRouter