import React, { useEffect } from 'react';
import { stripeOrder } from '../services/orderApi';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const confirmOrder = async () => {
      // Get session_id from the URL
      const sessionId = new URLSearchParams(window.location.search).get('session_id');
      console.log(sessionId, "session id");

      if (sessionId) {
        try {
          // Pass session_id to the backend in the request body
          const res = await stripeOrder({ session_id: sessionId });
          console.log('Order placed:', res.data);
          // Redirect or show success message as needed
        } catch (error) {
          console.error('Error placing order:', error);
        }
      } else {
        console.error('Session ID is missing');
      }
    };

    confirmOrder();
  }, []);

  return (
    <div className='flex flex-col justify-center items-center min-h-screen text-white px-4'>
      <div className='bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center text-black'>
        <CheckCircle size={64} className='text-green-600 mx-auto mb-4' />
        <h1 className='text-2xl font-bold mb-2'>Order Successfully Completed!</h1>
        <p className='mb-6 text-sm text-gray-700'>
          Thank you for your purchase. Your order has been confirmed and is being processed.
        </p>
        <a >
          <button className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition duration-300' onClick={() => navigate("/my-orders")}>
            View My Orders
          </button>
        </a>
      </div>
    </div>
  );
}

export default Success;
