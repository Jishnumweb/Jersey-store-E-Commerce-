import React, { useEffect, useState } from 'react';
import { deleteUser, getAllUsers } from '../../services/userApi';
import { toast } from 'sonner';

function AllSellers() {
    const [data, setData] = useState([]);

    // Fetch all sellers
    useEffect(() => {
        getAllUsers().then((res) => {
            const filterData = res.data.filter((datas) => datas.role === "seller");
            setData(filterData);
        }).catch((error) => {
            console.log(error);
            toast.error('Error fetching sellers');
        });
    }, []);

    // Delete seller
    const deleteProduct = async (id) => {
        try {
            await deleteUser(id).then((res) => {
                console.log(res);
                const filter = data.filter(item => item._id !== id);
                setData(filter);
                toast.success(res.data.message);
            }).catch((error) => {
                toast.error(error.response.data);
            });
        } catch (error) {
            console.log(error);
            toast.error('Error deleting seller');
        }
    };

    return (
        <div className='mt-[80px] container'>
            <div className='text-center'>
                <h3 className='font-bold text-xl mb-6 text-gray-800'>ALL SELLERS</h3>
            </div>

            <div>
                <div className='flex flex-col gap-4'>
                    {
                        data.length ? data.map((items, index) => (
                            <div className='grid grid-cols-4 gap-4 border border-gray-300 rounded-lg p-4 bg-[#f9f9f9]' key={index}>
                                <div>
                                    <p className='text-gray-800'>{items.name}</p>
                                </div>
                                <div>
                                    <p className='text-gray-600'>{items.email}</p>
                                </div>
                                <div>
                                    <p className='text-gray-600'>{items.branch}</p>
                                </div>
                                <div>
                                    <button 
                                        className='bg-red-600 text-white py-1 px-3 text-[13px] rounded-md hover:bg-red-700 transition duration-200' 
                                        onClick={() => deleteProduct(items._id)}
                                    >
                                        DELETE SELLER
                                    </button>
                                </div>
                            </div>
                        ))
                        : <p className='text-center text-gray-600'>NO USERS FOUND</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default AllSellers;
