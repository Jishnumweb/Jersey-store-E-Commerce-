import axiosInstance from "../axios/axiosInstance"

//Create order
export const createOrder = (data)=>{
    return axiosInstance.post("/order/create",data)
}
//Create stripe order
export const stripeOrder = (data)=>{
    return axiosInstance.post("/order/create-stripe-order",data)
}
// get my  Orders
export const getOrder = ()=>{
    return axiosInstance.get("/order/get-order")
}
// get   Orders
export const getAllOrder = ()=>{
    return axiosInstance.get("/order/get-allOrders")
}
// get admin Orders details
export const orderDetails = (data)=>{
    return axiosInstance.post(`/order/order-details/${data}`)
}
// get admin Orders details
export const statusUpdate = (id,data)=>{
    return axiosInstance.patch(`/order/update-status/${id}`,data)
}