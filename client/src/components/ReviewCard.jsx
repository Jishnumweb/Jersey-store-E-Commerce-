import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";

function ReviewCard({ item }) {
    const [icon, setIcon] = useState(<FaStar />)

    // rating star icon
    useEffect(() => {
        if (item.rating === 2) {
            setIcon([<FaStar />, <FaStar />])
        } else if (item.rating == 4) {
            setIcon([<FaStar />, <FaStar />, <FaStar />, <FaStar />])

        } else if (item.rating == 5) {
            setIcon([<FaStar />, <FaStar />, <FaStar />, <FaStar />, <FaStar />])
        } else if (item.rating == 3) {
            setIcon([<FaStar />, <FaStar />, <FaStar />])
        } else {
            setIcon(<FaStar />)
        }
    }, [])

    return (
        <div>
            <div className='bg-[#d0caca] text-[#131313] p-3 rounded-[5px]'>
                <div className='flex gap-2'>
                    <img src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Free-Download.png" alt="" className='h-[20px] object-contain' />
                    <h4 className='font-bold text-[17px]'>{item.customer.name}</h4>
                </div>
                <div className=''>
                    <p className='mb-0'>Rating:{item.rating} </p>
                    <p className='text-yellow-600 flex  mb-0 text-[13px]'>{icon}</p>
                </div>
                <p className='mb-0'>"{item.comment}"</p>
            </div>

        </div>
    )
}

export default ReviewCard
