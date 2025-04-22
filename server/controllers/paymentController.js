const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_KEY)


const paymentFunction = async (req, res) => {
    try {
        const userId = req.user
        const { products,shippingAddress } = req.body
        console.log(products,"cart items from checkout page");
        

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
        }))
        

        // const session = await stripe.checkout.sessions.create({
        //     payment_method_types: ['card'],
        //     line_items: lineItems,
        //     mode: 'payment',
        //     success_url: `${process.env.FRONTEND_URL}/payment/success`,
        //     cancel_url: `${process.env.FRONTEND_URL}/payment/failed`
        // })
        // console.log(session.id);
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/payment/success`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/success`,
            metadata: {
                userId: userId,  // Include user ID in metadata
                shippingAddress: JSON.stringify(shippingAddress),  // Include shipping address in metadata
            }
        });

        res.status(200).json({
            success: true, sessionId: session.id
        })
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })

    }
}

module.exports = {
    paymentFunction
}