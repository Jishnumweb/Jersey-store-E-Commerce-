const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authUser = async(req,res,next)=>{
    try {
        const authHeader = req.headers.authorization

        console.log(authHeader, "header");


        const authToken = authHeader && authHeader.split(" ")[1];
        // if there is no tocken
        if (!authToken) return res.json({ status: false, message: "no auth token" });

        //decording the token
        const decoded = jwt.verify(authToken, process.env.SECRETE_KEY)
        //checking whether the user is exist or not
        const user = await userModel.findOne({ _id: decoded.id })
        if (!user) return res.json({ status: false, message: "User not Found" })

        req.user = decoded.id

        next()
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message || "jwt not found"})
    }
}

module.exports = authUser