import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { orderDetails, statusUpdate } from '../../services/orderApi';
import { toast } from 'sonner'


function OrderDetails() {
    const { id } = useParams()
    const [order, setOrder] = useState([])
    const [status, setStatus] = useState("")
    const [products, setProducts] = useState([])

    useEffect(() => {
        orderDetails(id).then((res) => {
            setOrder(res.data.order)
            console.log(res.data.order);

            setProducts(res.data.order.products)
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    const handleSubmit = async () => {
        try {
            console.log(status);

            await statusUpdate(id, { status: status }).then((res) => {
                console.log(res);
                toast.success(res.data.message)
                

            }).catch((error) => {
                console.log(error);

            })

        } catch (error) {
            console.log(error);


        }
    }



    return (
        <div className="container mx-auto mt-28 px-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Order Details</h1>

            {/* Order Info */}
            <div className="bg-white shadow-md rounded-xl p-6 mb-10">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Order Summary</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm text-gray-600">

                    <div>
                        <p className="font-medium">Customer Name</p>
                        <p>{order.shippingAddress?.Name || "Unknown"}</p>
                    </div>
                    <div>
                        <p className="font-medium">Address</p>
                        <p>{order.shippingAddress?.address || "Unknown"}</p>
                    </div>
                    <div>
                        <p className="font-medium">Place</p>
                        <p>{order.shippingAddress?.place || "Unknown"}</p>
                    </div>
                    <div>
                        <p className="font-medium">Postcode</p>
                        <p>{order.shippingAddress?.postcode || "Unknown"}</p>
                    </div>
                    <div>
                        <p className="font-medium">Postcode</p>
                        <p className={` ${order.paymentMethod == "cod" ? "text-red-600" : "text-green-600"}`}>{order.paymentMethod || "Unknown"}</p>
                    </div>
                    <div className='flex flex-col'>
                        <p className="font-medium">Status</p>
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option disabled value="">Select status</option>
                            <option value="Order placed">Order Placed</option>
                            <option value="delivered">Delivered</option>
                        </select>
                        <div>
                            <button className='bg-[#f0f0f0] shadow-lg p-2 mt-3' onClick={handleSubmit}>
                                update
                            </button>
                        </div>


                    </div>
                </div>
            </div>

            {/* Products List */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Ordered Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((item) => (
                        <div key={item._id} className="shadow-lg border rounded-lg p-4 flex flex-col items-center text-center">
                            <img
                                src={item.productId.image}
                                alt={item.productId.title}
                                className="h-32 w-full object-contain mb-2"
                            />
                            <h3 className="font-semibold text-gray-800 text-[13px]">{item.productId.title}</h3>
                            <p className=" text-gray-600 text-[13px]">{item.productId.description}</p>
                            <p className="mt-1 font-bold text-gray-900 text-[13px]">₹{item.productId.price}/-</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OrderDetails
