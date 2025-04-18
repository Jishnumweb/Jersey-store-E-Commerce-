import axiosInstance from "../axios/axiosInstance"

//Create order
export const createOrder = (data)=>{
    return axiosInstance.post("/order/create",data)
}
//Create stripe order
export const stripeOrder = (data)=>{
    return axiosInstance.post(`/order/create-stripe-order/${data}`)
}
// get my  Orders
export const getOrder = ()=>{
    return axiosInstance.get("/order/get-order")
}
// get   Orders
export const getAllOrder = ()=>{
    return axiosInstance.get("/order/get-allOrders")
}