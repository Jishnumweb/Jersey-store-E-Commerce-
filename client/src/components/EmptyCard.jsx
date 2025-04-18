import React from 'react'
import { useNavigate } from 'react-router-dom'

function EmptyCard() {

    const navigate = useNavigate()
    
  return (
    <div>
        <div className=' flex flex-col justify-center items-center'>
            <h4>CART IS EMPTY !</h4>
            <button className='bg-black text-white text-[12px] p-1' onClick={()=>navigate("/shop")}>SHOP NOW</button>
        </div>
      
    </div>
  )
}

export default EmptyCard
