const jwt = require('jsonwebtoken')

const generateToken = (id)=>{
    const token = jwt.sign({ id: id, role: id.role },process.env.SECRETE_KEY)
    return token
}

module.exports = generateToken
