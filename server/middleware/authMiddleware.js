const jwt = require("jsonwebtoken")

const authUser = (req, res, next) => {
    try {

        const { token } = req.cookies;
        // console.log(token, "token");


        if (!token) {
            return res.status(401).json({ error: 'jwt not found' })
        }

        const verifiedToken = jwt.verify(token, process.env.SECRETE_KEY)
        if (!verifiedToken) {
            return res.status(401).json({ error: "User not authorized" })
        }
 

        req.user = verifiedToken.id

        next()
    } catch (error) {

        res.status(error.status || 401).json({ error: error.message || "user authorization failed" })
    }
}

module.exports = authUser