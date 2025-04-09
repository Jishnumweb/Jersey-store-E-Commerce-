import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Sellernavbar from '../components/seller/Sellernavbar'

function Sellerlayout() {
  return (
    <div className='flex flex-col h-screen'>
        <div className="headerLayout">
            <Sellernavbar/>
        </div>
        <div className="flex-1">
            <Outlet/>
        </div>
        <div className="headerLayout">
            <Footer/>
        </div>
    </div>
  )
}

export default Sellerlayout
