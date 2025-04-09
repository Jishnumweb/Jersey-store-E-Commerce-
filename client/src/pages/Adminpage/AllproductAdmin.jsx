import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getProducts } from '../../services/productApi'

function AllproductAdmin() {

    const [item, setItem] = useState([])

    // fetch all products
    useEffect(() => {
        getProducts().then((res) => {
            setItem(res.data)
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    // delete product Api
    const deleteProduct = async (id)=>{
        try {
            await deleteProduct(id).then((res)=>{
                console.log(res);
                const filtered = item.filter((items)=>items._id !== id)
                setItem(filtered)
                toast.success(res.data)
            }).catch((error)=>{
                toast.error(error.response.data)
            })
        } catch (error) {
            console.log(error);
            
            
        }
    }

    return (
        <div className='mt-[100px] container mb-5'>
            <div className=' text-center'>
                <h2 className='font-bold mb-5'>ALL PRODUCTS</h2>

                {/* product listing */}
                <div className='flex flex-col gap-2'>
                    {
                        item.map((items,index) => (
                            <div className='grid grid-cols-4 gap-2 bg-[#c7c7c7] justify-center items-center' key={index}>
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
                                <button className='bg-red-700 text-white py-1 px-2 text-[13px]' onClick={()=>deleteProduct(items._id)}>DELETE ITEM</button>
                            </div>
                        </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AllproductAdmin
