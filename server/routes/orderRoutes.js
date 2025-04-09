const { createOrder } = require('../controllers/orderController')
const authUser = require('../middleware/authMiddleware')

const orderRouter = require('express').Router()

orderRouter.post("/create",authUser,createOrder)

module.exports = orderRouter