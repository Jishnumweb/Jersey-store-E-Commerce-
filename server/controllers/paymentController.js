const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_KEY)

const paymentFunction = async (req, res) => {
    try {
        const userId = req.user
        const { products, shippingAddress } = req.body
        console.log(products, "cart items from checkout page");

        const lineItems = products.map((product) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: product.productId.title,
                    images: [product.productId.image]
                },
                unit_amount: Math.round(product.productId.price * 100),
            },
            quantity: 1
        }));

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,  // Add session_id to the URL
            cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
            metadata: {
                userId: userId,  // Include user ID in metadata
                shippingAddress: JSON.stringify(shippingAddress),  // Include shipping address in metadata
            }
        });

        // Return session ID in response
        res.status(200).json({
            success: true,
            sessionId: session.id
        });

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

module.exports = {
    paymentFunction
}
