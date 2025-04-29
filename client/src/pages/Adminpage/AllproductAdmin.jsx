import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { deleteProductApi, getProducts } from '../../services/productApi';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';

function AllproductAdmin() {

    const [item, setItem] = useState([]);
    const [load,setLoad] = useState(false)
    const navigate = useNavigate()


    // Fetch all products
    useEffect(() => {
        getProducts().then((res) => {
            setItem(res.data);
            setLoad(true)
        }).catch((error) => {
            console.log(error);
            setItem(false)
        });
    }, []);

    // Delete product API
    const deleteProduct = async (id) => {
        try {
            await deleteProductApi(id).then((res) => {
                console.log(res);
                const filtered = item.filter((items) => items._id !== id);
                setItem(filtered);
                toast.success(res.data);
            }).catch((error) => {
                toast.error(error.response.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {
                load ?         <div className='mt-[80px] container mb-5'>
                <div className='text-center'>
                    <h2 className='font-bold text-xl mb-5 text-gray-800'>ALL PRODUCTS</h2>
    
                    {/* Product Listing */}
                    <div className='flex flex-col gap-3'>
                        {
                            item.map((items, index) => (
                                <div className='grid grid-cols-4 gap-4 border border-gray-300 rounded-lg p-4 bg-[#f9f9f9]' key={index}>
                                    <div>
                                        <img src={items.image} alt={items.title} className='h-[100px] object-contain' />
                                    </div>
                                    <div>
                                        <p className='font-medium text-gray-700'>{items.title}</p>
                                    </div>
                                    <div>
                                        <p className='text-gray-600'>{items.description}</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <button
                                            className='bg-green-600 text-white py-1 px-3 text-[13px] rounded-md hover:bg-red-700 transition duration-200'
                                            onClick={() => navigate(`/admin/edit-product/${items._id}`)}
                                        >
                                            Edit item
                                        </button>
                                        <button
                                            className='bg-red-600 text-white py-1 px-3 text-[13px] rounded-md hover:bg-red-700 transition duration-200'
                                            onClick={() => deleteProduct(items._id)}
                                        >
                                            DELETE ITEM
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div> : <Loader/>
            }
        </div>

    );
}

export default AllproductAdmin;
