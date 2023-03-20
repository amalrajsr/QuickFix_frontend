import React from 'react'
import Home from '../pages/User/Home'
import Login from '../pages/User/Login'
import Register from '../pages/User/Register'
import Otp from '../pages/User/Otp'
import {Navigate,BrowserRouter,Route,Routes} from 'react-router-dom'
import UserLayout from '../layouts/UserLayout'
function UserRoute() {
  return (
    <>
     
  <Routes>
    <Route path='/' element={<UserLayout/>}>
    <Route path={'/'} element={<Home/>} />
    <Route path={'/login'} element={<Login/>} />
    <Route path={"/otp"} element={<Otp/>}/>
    <Route path={'/register'} element={<Register/>} />
    <Route path={'*'} element={<h1>not found</h1>} />
    </Route>
  </Routes>
    </>
  )
}

export default UserRoute