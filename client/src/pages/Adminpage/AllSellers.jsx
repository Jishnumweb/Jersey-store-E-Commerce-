import React, { useEffect, useState } from 'react'
import { deleteUser, getAllUsers } from '../../services/userApi'
import { toast } from 'sonner'

function AllSellers() {
    const [data, setData] = useState([])

    // fetch all seller Api
    useEffect(() => {
        getAllUsers().then((res) => {
            const filterData = res.data.filter((datas) => datas.role === "seller")
            setData(filterData)
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    // Delete seller
    const deleteProduct = async (id)=>{
        try {
            await deleteUser(id).then((res)=>{
                console.log(res);
                const filter = data.filter(item=>item._id !== id)
                setData(filter)
                toast.success(res.data.message)
            }).catch((error)=>{
                toast.error(error.response.data)
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='mt-[100px] container'>
            <div>
                <h3 className='font-bold text-center'>ALL SELLERS</h3>
            </div>
            <div>
                <div className='flex flex-col gap-2'>
                    {
                        data.length ?  data.map((items, index) => (
                            <div className='grid grid-cols-4 gap-2  border border-black bg-[#f1f0f0] justify-center items-center p-3' key={index}>
                                <div>
                                    <p>{items.name} </p>
                                </div>
                                <div>
                                    <p>{items.email} </p>
                                </div>
                                <div>
                                    <p>{items.branch} </p>
                                </div>
                                <div>
                                    <button className='bg-red-700 text-white py-1 px-2 text-[13px]' onClick={() => deleteProduct(items._id)}>DELETE SELLER</button>
                                </div>
                            </div>
                        ))
                        : <p className='text-center'>NO USERS !</p>
                    }
                </div>

            </div>
        </div>
    )
}

export default AllSellers
