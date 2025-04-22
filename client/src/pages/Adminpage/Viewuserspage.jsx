import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getAllUsers, deleteUser as deleteUserApi } from '../../services/userApi';
import Loader from '../../components/Loader';

function Viewuserspage() {
    const [user, setUser] = useState([]);
    const [load,setLoad] = useState(false)


    // Fetch all users data
    useEffect(() => {
        getAllUsers().then((res) => {
            const filterUsers = res.data.filter((users) => users.role === "user");
            setUser(filterUsers);
            setLoad(true)
        }).catch((error) => {
            console.error("Error fetching users:", error);
            toast.error('Error fetching users');
            setLoad(false)
        });
    }, []);

    // Delete user API
    const handleDeleteUser = async (id) => {
        try {
            await deleteUserApi(id).then((res) => {
                const update = user.filter((users) => users._id !== id);
                setUser(update);
                toast.success(res.data.message);
            }).catch((error) => {
                console.error("Error deleting user:", error);
                toast.error(error.response?.data || "Error deleting user");
            });
        } catch (error) {
            console.error("Unexpected error:", error);
            toast.error('Unexpected error occurred while deleting user');
        }
    };

    return (
        <div>
            {
                load ?         <div className='mt-[80px] container'>
                <div className='text-center'>
                    <h3 className='font-bold text-xl mb-6 text-gray-800'>ALL USERS</h3>
                </div>
                {user.length === 0 ? (
                    <p className='text-center text-gray-600'>No users found!</p>
                ) : (
                    user.map((users, index) => (
                        <div
                            key={index}
                            className='grid grid-cols-4 gap-4 border border-gray-300 rounded-lg p-4 bg-[#f9f9f9]'
                        >
                            <div>
                                <p className='font-semibold text-gray-800'>{users.name.toUpperCase()}</p>
                            </div>
                            <div>
                                <p className='text-gray-700'>{users.email}</p>
                            </div>
                            <div>
                                <p className='text-gray-600'>{new Date(users.updatedAt).toLocaleString()}</p>
                            </div>
                            <div>
                                <button
                                    className='bg-red-600 text-white py-2 px-3 rounded-md hover:bg-red-700 transition duration-200'
                                    onClick={() => handleDeleteUser(users._id)}
                                >
                                    DELETE USER
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div> : <Loader/>
            }
        </div>

    );
}

export default Viewuserspage;
