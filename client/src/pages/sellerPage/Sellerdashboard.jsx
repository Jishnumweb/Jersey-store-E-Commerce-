import React from 'react'
import { useNavigate } from 'react-router-dom'

function Sellerdashboard() {

  const navigate = useNavigate()

  return (
    <div className='lg:mt-[100px] container'>
      <div className='text-center'>
        <h2 className='font-bold mb-0'>WELCOME BACK ! </h2>
        <h2 className='text-[17px]'>SELLER DASHBOARD </h2>
      </div>

    {/* update product */}
      <div className='flex flex-col gap-3 justify-center items-center mt-[100px]'>
          <div >
            <button className='border border-black text-black w-[400px]  py-2' onClick={()=>navigate("add-product")}>ADD PRODUCT</button>
          </div>
          <div >
            <button className='border border-black text-black w-[400px]  py-2 ' onClick={()=>navigate("view-product")}>VIEW PRODUCTS</button>
          </div>

      </div>
    </div>
  )
}

export default Sellerdashboard
