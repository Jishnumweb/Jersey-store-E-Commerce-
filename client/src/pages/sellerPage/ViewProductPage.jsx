import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {  deleteProductApi, sellerProducts } from '../../services/productApi'
import { toast } from 'sonner'
import Loader from '../../components/Loader'

function ViewProductPage() {

    const [item, setItem] = useState([])
    const navigate = useNavigate()
    const [load,setLoad] = useState(false)



    // fetch all products
    useEffect(() => {
        sellerProducts().then((res) => {
            setItem(res.data)
            setLoad(true)
        }).catch((error) => {
            console.log(error);
            setLoad(false)
        })
    }, [])

    // delete product
    const handleRemove = async (id)=>{
        try {
            await deleteProductApi(id).then((res)=>{
                toast.success(res.data)
                const filterItems = item.filter((items)=>items._id !== id)
                setItem(filterItems)
                
            }).catch((error)=>{
                console.log(error);
                
            })
            
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div>
            {
                load ?         <div className='mt-[100px] container mb-5'>
                <div className=' text-center'>
                    <h2 className='font-bold mb-5'>ALL PRODUCTS</h2>
                    <div className='flex flex-col gap-2'>
    
                        {/* product listing */}
                        {
                            item.map((items,index) => (
                                <div className='grid grid-cols-5 gap-2 border border-black bg-[#f1f0f0] justify-center items-center' key={index}>
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
                                        <button className='bg-red-700 text-white py-1 px-2 text-[13px]' onClick={()=>handleRemove(items._id)}>DELETE ITEM</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div> : <Loader/>
            }
        </div>

    )
}

export default ViewProductPage
