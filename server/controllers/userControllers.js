const userModel = require("../models/userModel")
const generateToken = require("../utilities/generateToken")
const bcrypt = require('bcrypt')

// Register
const register = async (req,res)=>{
    try {
        const {name,email,password,confirmPassword} = req.body
        
        // Checking all fields are provide
        if(!name || !email || !password || !confirmPassword){
            return res.status(400).json({error:"All fields required"})
        }

        // Password matching
        if(password !== confirmPassword){
            return res.status(400).json({error:"Password does not match"})
        }

        // Password hash
        const salt =await bcrypt.genSalt(10)
        const hashedPassword =await bcrypt.hash(password,salt)

        const newUser =new userModel({name,email,password:hashedPassword})
        const saved = await newUser.save()

        // Token generation
        const token = generateToken(newUser._id)
        res.cookie("token",token)

        res.status(201).json({ message: "User successfully resgistered", saved ,token})

        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
        
    }
}

// Login
const login = async (req,res)=>{
    try {
        const {email,password} = req.body

        // Checking all fields are provided
        if(!email || !password){
            return res.status(400).json("All fields are required")
        }

        // User exist
        const userExist = await userModel.findOne({email})
        if(!userExist){
            return res.status(400).json("User does not exist")
        }

        // Password compare
        const comparePassword = await bcrypt.compare(password,userExist.password)
        if(!comparePassword){
            return res.status(400).json("Wrong password")
        }

        // Deleting password before storing database
        const userObject = userExist.toObject()
        delete userObject.password

        // Token generation
        const token = generateToken(userExist._id)
        res.cookie("token", token)


        res.status(200).json({message:  "Login succesfull", userExist,token})
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }
}

// get all users

const getAllUsers = async (req,res)=>{
    try {

        const users = await userModel.find()
        res.status(200).json(users)
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
        
    }
}

// User Logout
const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({message:"logout succesfully"})

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }
}

// Update User
const update = async (req, res) => {
    try {
        const id = req.user
        const updateUser = await userModel.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({message:"User updated succesfully",updateUser})

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }
}

// Get user
const profile = async(req,res)=>{
    try {
        const id = req.user
        console.log(id,"user id");
        
        const userData = await userModel.findById(id)
        res.status(200).json(userData)
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
        
    }
}

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params
        console.log(userId,"deleted id");
        
       const deleteUsers =  await userModel.findByIdAndDelete(userId)

       if(!deleteUsers){
        return res.status(400).json("user not found")
       }

         res.status(200).json({message:"user deleted",deleteUsers})
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

module.exports = {
    register,
    login,
    logout,
    update,
    profile,
    deleteUser,
    getAllUsers


}