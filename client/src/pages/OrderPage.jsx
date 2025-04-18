import React from 'react'
import { useNavigate } from 'react-router-dom'

function OrderPage() {
  
    const navigate = useNavigate()
  return (
    <div className='mt-[100px] '>
        <div className='flex flex-col justify-center items-center bg-[#1d901d] h-screen text-white'>
            <h1 className='font-bold'>ORDER SUCCESS</h1>
            <button className='bg-black text-white p-2' onClick={()=>navigate("/")}>Back to shop</button>

        </div>
      
    </div>
  )
}

export default OrderPage
