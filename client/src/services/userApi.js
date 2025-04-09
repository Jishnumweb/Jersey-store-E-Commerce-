import axiosInstance from "../axios/axiosInstance"

// login
export const loginUser = (data)=>{
    return axiosInstance.post("/user/login", data)
}

// signup
export const registerApi = (data)=>{
    return axiosInstance.post("/user/register", data)
}

// logout
export const userLogout = ()=>{
    return axiosInstance.post("/user/logout")
}

// fetch all users data for admin
export const getAllUsers = ()=>{
    return axiosInstance.get("/user/getUsers")
}

// delete user for admin
export const deleteUser = (data)=>{
    return axiosInstance.delete(`/user/delete/${data}`)
}