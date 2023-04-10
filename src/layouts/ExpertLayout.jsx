import React from 'react'
import Footer from '../components/User/Footer'
import Navbar from '../components/Expert/NavBar'
import { Outlet } from 'react-router-dom'
function ExpertLayout() {
  return (
    <>
    <Navbar/>
     <Outlet/>
    <Footer background={'bg-[#1A2036]'}/>
    </>
  )
}

export default ExpertLayout
