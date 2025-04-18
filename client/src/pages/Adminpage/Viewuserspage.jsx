import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getAllUsers, deleteUser as deleteUserApi } from '../../services/userApi'

function Viewuserspage() {
    const [user, setUser] = useState([])

    // fetch all users data
    useEffect(() => {
        getAllUsers().then((res) => {
            console.log(res.data)
            const filterUsers = res.data.filter((users) => users.role === "user")
            setUser(filterUsers)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    // deleter user Api
    const handleDeleteUser = async (id) => {
        try {
            await deleteUserApi(id).then((res) => {
                const update = user.filter((users) => users._id !== id)
                setUser(update)
                toast.success(res.data.message)
            }).catch((error) => {
                console.log(error)
                toast.error(error.response?.data || "Error deleting user")
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='mt-[100px] container'>
            <div>
                <h3 className='font-bold text-center'>ALL USERS</h3>
            </div>
            {
                user.map((users, index) => (
                    <div className='grid grid-cols-4 gap-3 justify-center items-center mt-5  border border-black bg-[#f1f0f0]  p-3' key={index}>
                        <div>
                            <p className='font-bold'>{users.name.toUpperCase()}</p>
                        </div>
                        <div>
                            <p className='font-bold'>{users.email}</p>
                        </div>
                        <div>
                            <p>{new Date(users.updatedAt).toLocaleString()}</p>
                        </div>
                        <div>
                            <button className='bg-red-600 p-2 text-white' onClick={() => handleDeleteUser(users._id)}>DELETE USER</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Viewuserspage
