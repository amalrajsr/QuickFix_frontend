import React from 'react'
import Home from '../pages/User/Home/Home'
import Login from '../pages/User/Login/Login'
import Register from '../pages/User/Register/Register'
import Otp from '../pages/User/Otp/Otp'
import {Navigate,BrowserRouter,Route,Routes} from 'react-router-dom'

function UserRoute() {
  return (
    <>
     
  <Routes>
    <Route path={'/'} element={<Home/>} />
    <Route path={'/login'} element={<Login/>} />
    <Route path={"/otp"} element={<Otp/>}/>
    <Route path={'/register'} element={<Register/>} />
    <Route path={'*'} element={<h1>not found</h1>} />

  </Routes>
    </>
  )
}

export default UserRoute