import React from 'react'
import Table from '../../components/Admin/Booking/Table'
function BookingManagement() {
  return (
    <div className="w-full  mx-3">
        <div className="mx-10 mt-5">
          <span className="text-2xl">Booking Management</span>
        </div>
        <div className=" w-3/4 mt-12 mx-10 overflow-x-auto">
          <div className="mx-1 flex  justify-between my-4">
            <div className='flex gap-4  '>
             <button className='px-6  shadow-md focus:bg-slate-200 rounded-lg text-start'>pending</button>
             <button className='px-6  shadow-md focus:bg-slate-200 rounded-lg text-start'>active</button>
             <button className='px-6 shadow-md focus:bg-slate-200 rounded-lg text-start'>past</button>
            </div>
            <input
              
              type="text"
              id="table-search"
              className="md:block hidden  p-2 pl-4 outline-none focus:outline-gray-300 text-sm text-gray-900  border-gray-300 rounded-lg w-40 md:w-60 bg-gray-50 "
              placeholder="Search here"
            />
           {/* <Service/> */}
          </div>
          <Table/>
        </div>
      </div> 
  )
}

export default BookingManagement
