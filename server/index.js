const express = require('express');
const app = express()
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config()
const dbConnect = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');
const paymentRouter = require('./routes/paymentRoute');


// db connection
dbConnect()

app.get("/",(req,res)=>{
    res.json("server hitted")
})
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
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
app.use("/review",reviewRouter)
app.use("/order",orderRouter)
app.use("/payment",paymentRouter)








// port setting
app.listen(process.env.PORT,()=>{
    console.log(`server starts on port ${process.env.PORT}`);
    
})