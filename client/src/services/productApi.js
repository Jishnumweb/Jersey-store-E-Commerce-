import axiosInstance from "../axios/axiosInstance"

// get all products
export const getProducts = ()=>{
    return axiosInstance.get("/product/list-products")
}
// get all seller products
export const sellerProducts = ()=>{
    return axiosInstance.get("/product/seller-products")
}

// fetch one product details
export const fetchDetails = (data)=>{
    return axiosInstance.get(`/product/product-details/${data}`)
}

// delete product for admin
export const deleteProductApi = (data)=>{
    return axiosInstance.delete(`/product/delete-product/${data}`)
}

// update product for sellers
export const updateProduct = (data,id)=>{
    return axiosInstance.put(`/product/update-product/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
}

// create new product for sellers
export const createProduct = (data)=>{
    return axiosInstance.post("/product/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
}