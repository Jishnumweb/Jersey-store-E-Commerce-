const reviewModel = require("../models/reviewModel")

const addReview = async (req,res)=>{
    try {
        const userId = req.user
        // console.log(userid,"user id fetched");
        
        const {productId} = req.params
        console.log(productId,"product id fetched");
        

        const {rating,comment} = req.body
        if(!rating || !comment){
            return res.status(400).json("Some fields are missing")
        }
        const newReview = new reviewModel({
            customer:userId,product:productId,rating,comment
        })

        const saved = await newReview.save()

        res.status(200).json({message:"Review submitted successfully",saved})
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error:error.message || "internal server error"})

    }
}

const getReviews = async (req,res)=>{
    try {
        const {productId} = req.params
        const reviews = await reviewModel.find().populate("customer")
        console.log(reviews);
        

        const filteredReviews = reviews.filter((item) => item.product.equals(productId))
       
        res.status(200).json({message:"reviews listed",filteredReviews})
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error:error.message || "internal server error"})  
    }
}


module.exports = {
    addReview,
    getReviews
}