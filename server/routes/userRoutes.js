const { register, login, logout, profile, update, deleteUser } = require('../controllers/userControllers')
const authUser = require('../middleware/authMiddleware')
const userRoutes = require('express').Router()



userRoutes.post("/register",register)
userRoutes.post("/login",login)
userRoutes.post("/logout",logout)
userRoutes.get("/profile",authUser,profile)
userRoutes.patch("/update",authUser,update)
userRoutes.delete("/delete/:id",deleteUser)


module.exports = userRoutes