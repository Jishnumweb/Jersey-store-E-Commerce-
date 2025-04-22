const { register, login, logout, profile, update, deleteUser, getAllUsers } = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')
const userRoutes = require('express').Router()



userRoutes.post("/register",register)
userRoutes.post("/login",login)
userRoutes.post("/logout",logout)
userRoutes.get("/profile",authMiddleware,profile)
userRoutes.get("/getUsers",authMiddleware,getAllUsers)
userRoutes.patch("/update",authMiddleware,update)
userRoutes.delete("/delete/:userId",deleteUser)


module.exports = userRoutes