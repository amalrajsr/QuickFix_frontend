import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import { getServicesApi,deleteServiceApi } from '../../../apis/admin';

import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
function Table() {
const token =localStorage.getItem('admin')
const [service,setServices]=useState({services:[],loading:false,error:false})
const [open, setOpen] = useState(false);
const onOpenModal = () => setOpen(true);
const onCloseModal = () => setOpen(false);
useEffect(()=>{
    fetchServices()
},[])
 const fetchServices=async()=>{
  setServices({...service,loading:true})
  const data= await getServicesApi(token)
  setServices({services:data.services,loading:false,error:false})
 }

 const blockService=async(id)=>{
  const {data}=await deleteServiceApi(id,token)

  console.log(data);
 }
    const columns = [
        {
           name: "Service",
           selector: (row) => row.service,
         },
         {
          name:'Image',
          cell: (row) => <img src={row.imageUrl} className='w-[50px]' alt={row.name} />
         }
        ,
         {
           name: "Charge",
           cell: (row) => <><Modal open={open} onClose={onCloseModal}><div >
           <h3 className="text-xl font-medium text-gray-600">Installation Charge</h3>
             <div className="flex gap-10 mt-4">
               <h3 className="text-lg font-medium"><span className='mx-2'>FirstHour:</span> {row.Charge.installationCharge1Hour}</h3>
               <h3 className="text-lg font-medium"><span className='mx-2'> LatelyHours:</span>{row.Charge.installationCharge1Hour}</h3>
             </div>
              <h3 className="text-xl font-medium mt-4 text-gray-600">Repair Charge</h3>
             <div className="flex gap-10 mt-4">
               <h3 className="text-lg font-medium"><span className='mx-2'>FirstHour:</span> {row.Charge.repairCharge1Hour}</h3>
               <h3 className="text-lg font-medium"><span className='mx-2'>LatelyHours:</span>{row.Charge.repairChargeLatelyHours}</h3>
             </div>
           </div></Modal><button onClick={onOpenModal} className='bg-blue-400 p-1 rounded-lg px-2'>View</button></>
         },
         {
          name:null,
          cell:(row)=> <button onClick={()=>blockService(row.id)}>block</button>
         }
       ]
    

       const data=service.services.map((data)=>{

        return{
          id:data._id,
          service:data.service,
          imageUrl:data.image,
          Charge:{
            installationCharge1Hour:data.installationCharge1Hour,
            installationChargeLatelyHours:data.installationChargeLatelyHours,
            repairCharge1Hour:data.repairCharge1Hour,
            repairChargeLatelyHours:data.repairChargeLatelyHours
          }
        }
       })

       
  return (
  
      <DataTable
            columns={columns}
            data={data}
            fixedHeader
            fixedHeaderScrollHeight="300px"
            style={{ title: { fontSize: "48px" } }}
          />
    
  )
}

export default Table
