import React, { useEffect, useState } from "react";
import { getAllOrder } from "../../services/orderApi";
import { Navigate, useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch all orders (replace with your actual API call)
    getAllOrder().then((res)=>{
        setOrders(res.data)
        console.log(res.data);
        
        const totalRevenue = res.data.reduce((acc,items)=>acc+items.totalPrice,0)
        setRevenue(totalRevenue)
    }).catch((error)=>{
        console.log(error);
        
    })

  }, []);

  return(
      <div className="overflow-x-auto bg-white rounded-xl shadow mt-[100px] px-5">
        <div className="grid grid-cols-3 mb-[100px] justify-center items-center gap-4">
            <div className="bg-[#f5f6fa] flex flex-col justify-center item-center text-center py-3 border-3 rounded-md">
                <p className="mb-0">Total Orders</p>
                <p className="font-extrabold">{orders.length}</p>

            </div>
            <div className="bg-[#f5f6fa] flex flex-col justify-center item-center text-center py-3 border-3 rounded-md">
                <p className="mb-0">Total Revenue</p>
                <p className="font-extrabold">{revenue}/-</p>

            </div>

        </div>
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-3">{order._id.slice(-6)}</td>
                <td className="px-4 py-3">{order.userId?.name || "Unknown"}</td>
                <td className="px-4 py-3">₹{order.totalPrice}</td>
                <td className={`px-4 py-3 ${order.status === "delivered" ? "text-[#247e24]" : "text-[#c83c3c]"}`}>{order.status}</td>
                <td className="px-4 py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:underline" onClick={()=>navigate(`/admin/order-details/${order._id}`)}>View</button>
                </td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>
  );
};

export default AdminOrders;
