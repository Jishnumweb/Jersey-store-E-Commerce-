import React from 'react'
import { useNavigate } from 'react-router-dom'

function Admindashboard() {
  const navigate = useNavigate()

  return (
    <div className='lg:mt-[100px] container'>
      <div className='text-center'>
        <h2 className='font-bold mb-0'>WELCOME BACK ! </h2>
        <h2 className='text-[17px]'>ADMIN DASHBOARD </h2>
      </div>

      {/* admin features */}
      <div className='flex flex-col gap-3 justify-center items-center mt-[100px]'>
        <div >
          <button className='bg-black text-white w-[300px] p-2' onClick={() => navigate("view-all-products")}>VIEW ALL PRODUCTS</button>
        </div>
        <div >
          <button className='bg-black text-white w-[300px] p-2' onClick={() => navigate("view-all-users")}>VIEW ALL USERS</button>
        </div>
        <div >
          <button className='bg-black text-white w-[300px] p-2' onClick={() => navigate("view-product")}>VIEW ALL ORDERS</button>
        </div>
      </div>
    </div>
  )
}

export default Admindashboard
