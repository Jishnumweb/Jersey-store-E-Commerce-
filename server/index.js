const express = require('express');
const app = express()
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config()
const dbConnect = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');


// db connection
dbConnect()
app.use(cors({
    origin:"*"
}))

// Application middlewares
app.use(express.json())
app.use(cookieParser())

// Routes
// app.use("/",(req,res)=>{
//     res.status(200).json("Server hitted")
// })
app.use("/user",userRoutes)
app.use("/product",productRouter)
app.use("/cart",cartRouter)







// port setting
app.listen(process.env.PORT,()=>{
    console.log(`server starts on port ${process.env.PORT}`);
    
})