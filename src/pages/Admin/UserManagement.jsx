import React, { useEffect, useState } from 'react'
import axios from '../../config/axios'

function UserManagement() {

  const [users,setUsers]=useState([])
  const[blockStatus,setBlockStatus]=useState(false)
  useEffect(()=>{

  fetchUsers()
  },[blockStatus])

  const fetchUsers=async()=>{

    const {data}=await axios.get('/admin/users')
    setUsers(data.users)
    
  }

  const blockUblockUser=async(id)=>{

    const {data}= await axios.patch('/admin/users',{id:id})
     data?.updated && setBlockStatus(!blockStatus)

  }


  return (
   <div className='w-full'>
    <div className='mx-10 mt-5'>
   <span className='text-2xl'>User Management</span>
    </div>
<div className=" w-3/4 mt-32 mx-10 overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
                <th scope="col" className="text-lg px-4 py-3">
                    USER
                </th>
                <th scope="col" className="text-lg px-4 py-3">
                    CONTACT
                </th>
                <th scope="col" className="text-lg px-4 py-3">
                   BOOKINGS
                </th>
                <th scope="col" className="text-lg px-4 py-3">    
                </th>
            </tr>
        </thead>
        <tbody>
          { users.map((user)=>{
            return(
            <tr className="bg-white border-b  hover:bg-gray-100" key={user._id}>
                <th scope="row" className="px-4 py-4 text-md font-medium text-gray-900 whitespace-nowrap">
                   {user.name}
                </th>
                <td className="px-4 py-4">
                   {user.mobile}
                </td>
                <td className="px-4 py-4">
                    {user.booking.length}
                </td>
                <td className="px-4 py-4">
                <button className={`${user.isBlocked?'bg-green-400':'bg-red-500'} rounded-lg text-white px-3 py-1`} onClick={()=>blockUblockUser(user._id)}>{user.isBlocked?'unblock':'block'}</button>
                </td>
            </tr>
            )
            })
          }
        </tbody>
    </table>
</div>
</div>
  )
}

export default UserManagement
