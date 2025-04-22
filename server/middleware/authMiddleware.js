const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        console.log(authHeader, "header");


        const authToken = authHeader && authHeader.split(" ")[1];
        // if there is no tocken
        if (!authToken) return res.status(400).json({ error: "no auth token" });

        //decording the token
        const decoded = jwt.verify(authToken, process.env.JWT_SECRETE_KEY)
        //checking whether the user is exist or not
        const user = await userModel.findOne({ _id: decoded.id })
        if (!user) return res.json({ error: "User not Found" })

        req.user = decoded.id

        next()
    } catch (error) {
        console.log(error, "error");

        return res.status(error.status || 500).json({ error: "Please Login" })
    }
}