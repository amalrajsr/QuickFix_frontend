import axios from "../config/axios"



// user management
export const getusersApi=(adminToken)=>
    axios.get("/admin/users", {
    headers: {
      'Authorization': `Bearer ${adminToken}`,
    },
  })

  export const blockUserApi=(id,adminToken)=>
axios.patch(`/admin/users`,{id:id} ,{
    headers: {
      'Authorization': `Bearer ${adminToken}`,
    },
  })


// service management
export const addServiceApi=(service,adminToken)=>
 axios.post("/admin/services", service, {
    headers: {
      'Authorization': `Bearer ${adminToken}`,
      "Content-Type": "multipart/form-data"
    },
  })

  export const getServicesApi=async(adminToken)=>{
     const {data}=await axios.get('/admin/services',{
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
    })
  
    return data
  }

  export const deleteServiceApi=(adminToken,id)=>
  axios.delete(`/admin/services/${id}`,{
    headers: {
      'Authorization': `Bearer ${adminToken}`
    },
  })
