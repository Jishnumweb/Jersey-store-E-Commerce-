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

module.exports = {
  createOrder
};
