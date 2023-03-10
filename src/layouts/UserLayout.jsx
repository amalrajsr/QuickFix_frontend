import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/User/Footer/Footer'
import Navbar from '../components/User/Navbar/Navbar'
function UserLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
    
  )
}

export default UserLayout