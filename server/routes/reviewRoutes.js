const { addReview, getReviews } = require('../controllers/reviewController')
const authUser = require('../middleware/authMiddleware')

const reviewRouter = require('express').Router()

reviewRouter.post("/add-review/:productId",authUser,addReview)
reviewRouter.post("/getreview/:productId",authUser,getReviews)


module.exports = reviewRouter