import axiosInstance from "../axios/axiosInstance"

// get all reviews for a specific product
export const getReviews = (data)=>{
    return axiosInstance.post(`/review/getreview/${data}`)
}

// add new review
export const addReview = (id,data)=>{
    return axiosInstance.post(`/review/add-review/${id}`,data)
}