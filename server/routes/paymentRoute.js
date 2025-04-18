const { paymentFunction } = require('../controllers/paymentController')

const paymentRouter = require('express').Router()

paymentRouter.post("/stripe-payment",paymentFunction)

module.exports = paymentRouter