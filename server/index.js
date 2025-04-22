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
const allowedOrigins = [
    "https://jersey-store-e-commerce-fi7d.vercel.app", // old frontend
    "https://jersey-store-e-commerce-yyfh.vercel.app", // new frontend
    "http://localhost:3000" // for local dev 
  ];
  
  app.use(cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true
  }));
  

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