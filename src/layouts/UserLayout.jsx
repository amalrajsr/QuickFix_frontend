import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/User/Footer'
import Navbar from '../components/User/Navbar'
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