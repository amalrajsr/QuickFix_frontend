import React, { useEffect, useState } from 'react'
import { fetchBookingApi } from '../../../apis/admin'
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'

function Table() {
    const [bookings,setBookings]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{

     fetchBookingApi().then(({data})=>{
     
        if(data.bookings){
            setBookings(data.bookings)
        }
     }).catch((error)=>{
        if(error.response?.data?.error?.tokenExpired){
            localStorage.removeItem('admin')
            navigate('/admin/login')
          }
     })
    },[])


    const columns=[    {
        name: "Id",
        selector: (row) => row.id,
      },
      {
        name: "User",
        selector: (row) => row.userName,
        
      },  {
        name: "Service",
        selector: (row) => row.service,
        
      }, {
        name: "Slot",
        selector: (row) => row.slot,
        
      } ,{
        name: "Type",
        selector: (row) => row.type,
        
      },  {
        name: 'Expert',
        cell: (row) => (
            <select className='border-[1px]  border-slate-300 focus:outline-slate-400 w-[200px]' name="cars" id="cars">
            <option  id='volvo' value="volvo"><span >Volvo</span></option>
            <option id='saab' value="saab">Saab</option>
            <option id='' value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        ),
      },
      {
        name: null,
        cell: (row) => (
          <button
            className={`bg-dark hover:bg-gray-700 rounded-lg text-white px-3 py-1`} >
            Approve
          </button>
        ),
      },
    ]

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
                fontSize:'15px',   
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                         
            },
        },
        headCells: {
            style: {
                fontWeight:'bold',
                fontSize:'18px',
                textColor:'gray',
                backgroundColor:'#F9FAFB'
            },
        },
        cells: {
            style: {
               
            },
        }, headRow: {
            style: {
            },      
        }
}
    const data=bookings.map((booking)=>{
        return{
           id:booking._id,
           service:booking.service,
           date:booking.date.split('T')[0],
           slot:booking.slot,
           type:booking.type,
           userName:booking.user[0].name,
        }
    })
  return (
    <DataTable
      
    columns={columns}
    data={data}
    fixedHeader
    fixedHeaderScrollHeight="450px"
    customStyles={customStyles}
    
  />
  )
}

export default Table
