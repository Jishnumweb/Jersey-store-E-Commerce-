import React, { useEffect, useState } from 'react';
import { getOrder } from '../services/orderApi';
import Loader from '../components/Loader';

const MyOrders = () => {
    const [orders, setOrder] = useState([]);
    const [load,setLoad] = useState(false)


    useEffect(() => {
        getOrder()
            .then((res) => {
                console.log(res);
                setOrder(res.data.order);
                setLoad(true)
            })
            .catch((error) => {
                console.log(error);
                setLoad(true)
            });
    }, []);

    return (
        <div>
            {
                load ?         <div className="max-w-4xl mx-auto p-6 mt-[100px]">
                <h1 className="text-3xl font-bold mb-6 text-center text-[#FF0000]">My Orders</h1>
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white shadow-lg rounded-xl p-6 border border-gray-300 hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="flex justify-between mb-4">
                                <div className="text-right">
                                    <p className="font-medium text-gray-700">{order.createdAt.slice(0, 10)}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-semibold text-gray-600">Order ID:</span>
                                    <span className="text-sm text-gray-500">{order.id}</span>
                                </div>
                            </div>
    
                            <div className="border-t pt-4 space-y-4">
                                {order.products.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-200">
                                        <img
                                            src={item.productId.image}
                                            alt={item.productId.title}
                                            className="h-[80px] w-[80px] object-contain rounded-md"
                                        />
                                        <div className="flex-grow ml-4">
                                            <p className="text-lg font-semibold text-gray-800">{item.productId.title}</p>
                                            <p className="text-sm text-gray-600">x{item.quantity}</p>
                                        </div>
                                        <p className="text-lg font-medium text-gray-800">{item.productId.price}/-</p>
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
                                    <p className="text-lg font-bold text-gray-800">Total price - {order.totalPrice}/-</p>
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-green-500">{order.paymentMethod}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> : <Loader/>
            }
        </div>

    );
};

export default MyOrders;
