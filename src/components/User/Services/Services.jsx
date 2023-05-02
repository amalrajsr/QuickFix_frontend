import React, { useEffect, useState } from 'react'
import SingleService from './SingleService'
import { fetchServiceApi } from '../../../apis/user'
import { addSerivces } from '../../../store/slices/serviceSlice'
import { useDispatch } from 'react-redux'
function Services() {

   const dispatch=useDispatch()
  const [services,setServices]= useState([])  
  useEffect(()=>{
    fetchServices()
  },[])

  const fetchServices=async()=>{
   const {data}=await fetchServiceApi()
   setServices(data.services)
   dispatch(addSerivces(data.services))
  }
  return (
    <div className='bg-light p-8 my-12'>
      <div className='p-5 px-10'>
        <h3 className='text-3xl font-extrabold text-center md:text-justify text-dark'>Services</h3>
        <h5 className='text-dark  text-xl text-center md:text-justify my-2'>With all of our expert services and closings,we blend aesthetics and originality into our construction</h5>
      </div>
        <div className='grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 '>
          {
            services?.map((service)=>{
               if(!service.isDeleted){
                return  <SingleService data={service} key={service._id} image={service.image} title={service.service} />
               }
               return []

            })
     
          }
        </div>

    </div>
  )
}

export default Services