import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function UserLayout() {
  return (
    <div className='flex flex-col h-screen'>
        <div className="headerLayout">
            <Header/>
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

export default UserLayout
