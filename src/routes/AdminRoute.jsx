import React from 'react'
import AdminLayout from '../layouts/AdminLayout'
import Login from '../pages/Admin/Login'
import UserManagement from '../pages/Admin/UserManagement'
import ServiceMangement from '../pages/Admin/ServiceMangement'
import { Route,Routes } from 'react-router-dom'
function adminRoute() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<AdminLayout/>}>
      <Route path='/users' element={<UserManagement/>}/>
      <Route path='/services' element={<ServiceMangement/>}/>
      <Route path={'*'} element={<h1>not found</h1>} />
      </Route>
      </Routes>
    </>
  )
}

export default adminRoute
