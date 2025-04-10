import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {  sellerProducts } from '../../services/productApi'

function ViewProductPage() {

    const [item, setItem] = useState([])
    const navigate = useNavigate()


    // fetch all products
    useEffect(() => {
        sellerProducts().then((res) => {
            setItem(res.data)
            // const filter = 
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <div className='mt-[100px] container mb-5'>
            <div className=' text-center'>
                <h2 className='font-bold mb-5'>ALL PRODUCTS</h2>
                <div className='flex flex-col gap-2'>

                    {/* product listing */}
                    {
                        item.map((items) => (
                            <div className='grid grid-cols-5 gap-2 bg-[#c7c7c7] justify-center items-center'>
                                <div>
                                    <img src={items.image} alt="" className='h-[100px] object-contain' />
                                </div>
                                <div>
                                    <p>{items.title} </p>
                                </div>
                                <div>
                                    <p>{items.description} </p>
                                </div>
                                <div>
                                    <button className='bg-black text-white py-1 px-2 text-[13px]' onClick={() => navigate(`/seller/edit-product/${items._id}`)}>EDIT ITEM</button>
                                </div>
                                <div>
                                    <button className='bg-red-700 text-white py-1 px-2 text-[13px]'>DELETE ITEM</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewProductPage
