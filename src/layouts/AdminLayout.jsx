import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Admin/Sidebar'
function AdminLayout() {
  return (
    <div className='flex'>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default AdminLayout
