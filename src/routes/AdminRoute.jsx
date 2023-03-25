import React from 'react'
import AdminLayout from '../layouts/AdminLayout'
import Login from '../pages/Admin/Login'
import UserManagement from '../pages/Admin/UserManagement'
import ServiceMangement from '../pages/Admin/ServiceMangement'
import { Route,Routes } from 'react-router-dom'
import ProtectedRoute from '../components/UI/ProtectedRoute'
import Unprotected from '../components/UI/Unprotected'
function adminRoute() {
  return (
    <>
      <Routes>
        <Route element={<Unprotected type={'admin'}/>}>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route element={<ProtectedRoute/>} type={'admin'}>
      <Route path='/' element={<AdminLayout/>}>
      <Route path='/users' element={<UserManagement/>}/>
      <Route path='/services' element={<ServiceMangement/>}/>
      <Route path={'*'} element={<h1>not found</h1>} />
      </Route>
      </Route>
      </Routes>
    </>
  )
}

export default adminRoute
