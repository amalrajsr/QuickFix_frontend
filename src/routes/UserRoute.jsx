import React from 'react'
import Home from '../pages/User/Home'
import Login from '../pages/User/Login'
import Register from '../pages/User/Register'
import Otp from '../pages/User/Otp'
import Profile from '../components/User/Profile'
import {Route,Routes} from 'react-router-dom'
import UserLayout from '../layouts/UserLayout'
import ProtectedRoute from '../components/UI/ProtectedRoute'
function UserRoute() {
  return (
    <>
     
  <Routes>
    <Route path='/' element={<UserLayout/>}>
    <Route index element={<Home/>} />
  
    <Route path={'/register'} element={<Register/>} />
    <Route path={'/login'} element={<Login/>} />
    <Route path={"/otp"} element={<Otp/>}/>
    </Route>
    
    <Route path={'*'} element={<h1>not found</h1>} />
    <Route  element={<ProtectedRoute  type={'user'}/>}>
      <Route path='/profile' element={<Profile/>}/>
    </Route>
  </Routes>
    </>
  )
}

export default UserRoute