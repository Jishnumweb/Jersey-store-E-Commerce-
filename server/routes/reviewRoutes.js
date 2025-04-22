const { addReview, getReviews } = require('../controllers/reviewController')
const authMiddleware = require('../middleware/authMiddleware')

const reviewRouter = require('express').Router()

reviewRouter.post("/add-review/:productId",authMiddleware,addReview)
reviewRouter.post("/getreview/:productId",authMiddleware,getReviews)


module.exports = reviewRouter