import React, { useEffect, useState } from 'react'
import CartCard from '../components/CartCard'
import EmptyCard from '../components/EmptyCard'
import { getCarts } from '../services/cartApi'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

function Cartpage() {
    const [product, setProduct] = useState([])
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()
    const [load,setLoad] = useState(false)


    useEffect(() => {
        getCarts()
            .then((res) => {
                setProduct(res.data.products)
                setTotal(res.data.totalPrice)
                setLoad(true)
            })
            .catch((err) => {
                console.log(err)
                setLoad(false)
            })
    }, [])

    const updateRemoveCart = (id, totalPrice) => {
        const updateCart = product.filter((item) => item.productId._id !== id)
        setProduct(updateCart)
        setTotal(totalPrice)
    }

    const updateTotalprice = (totalPrice) => {
        setTotal(totalPrice)
    }

    return (
        <div>
            {
                load ?         <div className='mt-[100px] px-4 md:px-10 lg:px-[100px] mb-[70px] '>

                {product.length > 0 ? (
                    <>
                        <div className='space-y-4'>
                            {product.map((item, index) => (
                                <CartCard
                                    key={index}
                                    item={item}
                                    onRemove={updateRemoveCart}
                                    onTotal={updateTotalprice}
                                />
                            ))}
                        </div>
    
                        <div className='mt-10 flex justify-end'>
                            <div className='bg-gray-100 p-6 rounded-xl shadow-md w-full max-w-sm'>
                                <h3 className='text-lg font-semibold mb-4 text-gray-700'>Order Summary</h3>
                                <div className='flex justify-between text-gray-600 mb-2'>
                                    <span>Subtotal:</span>
                                    <span>₹{total}</span>
                                </div>
                                <div className='flex justify-between text-gray-600 mb-4'>
                                    <span>Shipping:</span>
                                    <span>Free</span>
                                </div>
                                <div className='flex justify-between font-bold text-lg border-t pt-4 text-gray-800'>
                                    <span>Total:</span>
                                    <span>₹{total}</span>
                                </div>
                                <button
                                    onClick={() => navigate("/checkout")}
                                    className='mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300 font-medium'
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <EmptyCard />
                )}
            </div> : <Loader/>
            }
        </div>

    )
}

export default Cartpage
