const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_KEY);
const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel"); 

const createOrder = async (req, res) => {
  try {
    const userId = req.user; 
    const { shippingAddress, paymentMethod, isPaid, status } = req.body;

    const cart = await cartModel.findOne({ userId });
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const cartItems = cart.products;

    // Calculate total price dynamically
    const itemsPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity, 0
    );

    // Dynamically add shipping price
    let shippingPrice = 0;
    if (itemsPrice < 500) shippingPrice = 50;
    else if (itemsPrice < 1000) shippingPrice = 30;

    const totalPrice = itemsPrice + shippingPrice;

    const newOrder = new orderModel({
      userId,
      products: cartItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      isPaid,
      status
    });

    const saved = await newOrder.save();

    // Clear cart after order placed (optional)
    await cartModel.findOneAndDelete({ userId });

    res.status(200).json({
      message: "Order placed successfully",
      order: saved
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message || "Internal server error"
    });
  }
};

const getOrder = async (req,res)=>{
  try {
    const userId = req.user

    const order = await orderModel.find({userId : userId}).populate("products.productId")
    // console.log(cart);
    if(!order){
      return res.status(400).json("No Orders")
    }
    res.status(200).json({message:"Order listed",order})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message || "Internal server error"

    
  })

}
}

const getAllOrders = async (req,res)=>{
  try {
    const orders = await orderModel.find().populate("products.productId") // get full product details
    .populate("userId");

    res.status(200).json(orders)
    
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message || "Internal server error"
    });
  }
}

const createStripeOrder = async (req, res) => {
  try {
    const userId = req.user
    const { session_id } = req.body;
    console.log(session_id, "session id");

    // 1. Fetch session from Stripe using session_id
    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log(session, "retrieved session from Stripe");

    // 2. Extract metadata
    console.log(userId,"checking user exist");
    
    const shippingAddress = JSON.parse(session.metadata.shippingAddress);

    // 3. Fetch cart from DB
    const cart = await cartModel.findOne({ userId });
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const cartItems = cart.products;
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // 4. Calculate shipping
    let shippingPrice = 0;
    if (itemsPrice < 500) shippingPrice = 50;
    else if (itemsPrice < 1000) shippingPrice = 30;

    const totalPrice = itemsPrice + shippingPrice;

    // 5. Save order
    const newOrder = new orderModel({
      userId,
      products: cartItems,
      shippingAddress,
      paymentMethod: 'stripe',
      totalPrice,
      isPaid: true,
      status: 'Order placed',
    });

    const savedOrder = await newOrder.save();

    // 6. Optionally clear cart
    await cartModel.findOneAndDelete({ userId });

    res.status(200).json({ message: "Stripe order placed", order: savedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const adminOrderDetails = async(req,res)=>{
  try {
    const {orderId} = req.params
    
    const order = await orderModel.findById(orderId).populate("products.productId")
    if(!order){
      return res.status(400).json("No order found")
    }
    res.status(200).json({message:"Order listed",order})
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });

  }
}

const statusUpdate = async(req,res)=>{
  try {
    const {orderId} = req.params
    const {status} = req.body

    console.log(status,"jhwdjgwdghwcghu");
    console.log(orderId,"orderrrrrr");
    

    const order = await orderModel.findByIdAndUpdate(orderId,{ $set: { status: status } }, // partial update
      { new: true })
    if(!order){
      return res.status(400).json("no order found")
    }
    res.status(200).json({message:"status updated",order})
    
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });

  }
}


module.exports = {
  createOrder,
  getOrder,
  getAllOrders,
  createStripeOrder,
  adminOrderDetails,
  statusUpdate
}
