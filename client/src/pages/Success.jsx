import React, { useEffect } from 'react'
import { stripeOrder } from '../services/orderApi';

function Success() {
    useEffect(() => {
        const confirmOrder = async () => {
          const sessionId = new URLSearchParams(window.location.search).get('session_id');
          console.log(sessionId,"session id");
          
          if (sessionId) {
            try {
              const res = await stripeOrder(sessionId);
              console.log('Order placed:', res.data);
              // You can display the order confirmation or redirect the user as needed
            } catch (error) {
              console.error('Error placing order:', error);
            }
          }
        };
    
        confirmOrder();
      }, []);
  return (
    <div>
        <div className='flex flex-col justify-center items-center min-h-screen bg-[#60bd60]'>
            <div>
                <h1 className='text-white'>SUCCESFULLY COMPLETED</h1>
            </div>
            <div>
                <button className='bg-black text-white p-2'>Go to order page</button>
            </div>

        </div>
      
    </div>
  )
}

export default Success
