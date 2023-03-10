import React from 'react'
import Navbar from '../../../components/User/Navbar/Navbar'
import Footer from '../../../components/User/Footer/Footer'
import Banner from '../../../components/User/Banner/Banner'
import TrendingServices from '../../../components/User/Services/TrendingServices'
import Services from '../../../components/User/Services/Services'
function Home() {
  return (
    <>
    <Navbar/>
    <Banner/>
    <TrendingServices/>
    <Services/>
   <Footer/>
    </>
  )
}

export default Home