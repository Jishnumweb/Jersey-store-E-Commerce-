import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Adminnavbar from '../components/Admin/Adminnavbar'

function Adminlayout() {
  return (
    <div className='flex flex-col h-screen'>
        <div className="headerLayout">
            <Adminnavbar/>
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

export default Adminlayout
