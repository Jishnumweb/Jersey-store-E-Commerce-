import axiosInstance from "../axios/axiosInstance"

// add to cart
export const addToCart = (data)=>{
    return axiosInstance.post(`/cart/addtocart/${data}`)
}

// remove from cart
export const removeFromCart = (data)=>{
    return axiosInstance.delete(`/cart/removefromcart/${data}`)
}

// update quantity
export const updateQuantity = (data,quantity)=>{
    return axiosInstance.patch(`/cart/updateQuantity/${data}`, { quantity })
}

// get all products from cart
export const getCarts = ()=>{
    return axiosInstance.get("/cart/getcart")
}
