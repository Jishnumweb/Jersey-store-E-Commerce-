// MyOrders.jsx
import React, { useEffect, useState } from 'react';
import { getOrder } from '../services/orderApi';





const MyOrders = () => {
    const [orders,setOrder] = useState([])
    useEffect(()=>{
        getOrder().then((res)=>{
            console.log(res);
            setOrder(res.data.order)
            
        }).catch((error)=>{
            console.log(error);
            
        })

    },[])
  return (
    <div className="max-w-4xl mx-auto p-6 mt-[100px]">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between mb-4">

              <div className="text-right">
                <p className="font-medium">{order.createdAt.slice(0, 10)}</p>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              {order.products.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                    <img src={item.productId.image} alt="" className='h-[100px] object-contain'/>
                  <p>{item.productId.title}</p>
                  <p>x{item.quantity}</p>
                  <p>{item.productId.price}/-</p>

                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6 items-center">
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'Order placed'
                    ? 'bg-[#e7e7e7] text-[#43370c]'
                    : 'bg-yellow-100 text-green-700'
                }`}
              >
                {order.status}
              </div>
              <div>
                <p className="text-lg font-bold">Total price - {order.totalPrice}/-</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-500">{order.paymentMethod}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
