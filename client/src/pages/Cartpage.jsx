import React, { useState } from 'react'
import CartCard from '../components/CartCard'
import EmptyCard from '../components/EmptyCard'
import { getCarts } from '../services/cartApi'

function Cartpage() {
    // states
    const [product, setProduct] = useState([])
    const [total, setTotal] = useState(0)

    // fetch all products
    useState(() => {
        getCarts().then((res) => {
            // console.log(res.data.products);
            // setData(res.data)
            setProduct(res.data.products)
            setTotal(res.data.totalPrice)
        })
    }, [])

    // update remove cart in state  
    const updateRemoveCart = (id, totalPrice) => {
        const updateCart = product.filter((items) => items.productId._id !== id)
        setProduct(updateCart)
        setTotal(totalPrice)
    }
    // update total price in state
    const updateTotalprice = (totalPrice) => {
        setTotal(totalPrice)
    }




    return (
        <div className='mt-[100px] container mb-[70px]'>

            {/* product section */}
            {
                product.map((products, index) => (
                    <div className='mb-2' key={index}>
                        <div className='flex flex-col gap-2'>
                            <CartCard item={products} onRemove={updateRemoveCart} onTotal={updateTotalprice} />
                        </div>
                    </div>
                ))
            }

            {/* total price section */}
            {
                product.length ?
                    <div className='flex justify-end flex-col items-end'>
                        <h4 className='text-[black] font-bold text-[19px]'>TOTAL PRICE : {total}</h4>
                        <div>
                            <button className='bg-black text-white px-2 p-1 font-bold text-[15px] '>CHECKOUT</button>
                        </div>
                    </div> :
                    <EmptyCard />
            }
        </div>
    )
}

export default Cartpage
