import React, { useEffect, useState } from 'react';
import { createOrder } from '../services/orderApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { getCarts, makePayment } from '../services/cartApi';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHED_KEY_STRIPE);

function Checkout() {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    Name: '',
    place: '',
    address: '',
    postcode: ''
  });
  const [method, setMethod] = useState('');
  const [product, setProducts] = useState([]);
  const [payment, setPayment] = useState(true);

  const handleChange = (e) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    getCarts()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleMethod = (e) => {
    setMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = Object.values(address).some((val) => val.trim() === '');
    if (isEmpty) return toast.error('Please fill all address fields');

    try {
      if (method === 'cod') {
        await createOrder({ shippingAddress: address, paymentMethod: method })
          .then((res) => {
            toast.success(res.data.message);
            navigate('/success');
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      } else {
        const response = await makePayment({ products: product ,shippingAddress:address });
        const session = response.data.sessionId;
        const stripe = await stripePromise;

        if (stripe) {
          const result = await stripe.redirectToCheckout({ sessionId: session });
          if (result.error) console.log(result.error.message);
        } else {
          console.log('Stripe failed to load');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-[100px] px-6 py-10 max-w-7xl mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">Shipping Address</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {['Name', 'place', 'address', 'postcode'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-600 capitalize mb-1">{field}</label>
                <input
                  type="text"
                  name={field}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Payment Method</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    onChange={handleMethod}
                    onClick={() => setPayment(true)}
                    required
                  />
                  <span className="text-green-600 font-semibold">Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    onChange={handleMethod}
                    onClick={() => setPayment(false)}
                    required
                  />
                  <span className="text-blue-600 font-semibold">Stripe</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full mt-4 py-2 text-white font-semibold rounded-md shadow-md transition-all duration-300 ${
                payment ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {payment ? 'Order Confirm' : 'Proceed to Stripe Payment'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">Order Summary</h2>
            <div className="text-gray-700 space-y-2">
              <p>Total Quantity: {product.reduce((acc, item) => acc + item.quantity, 0)}</p>
              <p>Shipping Cost: ₹50</p>
              <p className="font-semibold border-t pt-2">Total: ₹{product.reduce((acc, item) => acc + item.quantity * item.price, 0) + 50}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;