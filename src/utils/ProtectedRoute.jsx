
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from  '../config/axios'
function ProtectedRoute({type}) {
  const[auth,setAuth]=useState(null)
  const location=useLocation()
  const token= localStorage.getItem(type) 

  useEffect(()=>{
  
     axios.get(`/${type}/jwt`,{
     
        headers: {
          Authorization: `Bearer ${token}`,
        }, 
        params: { role: type } 
       
      }).then((res)=>{
     
        setAuth(true)
      }).catch((error)=>{
        console.log(error);
        setAuth(false)
      })
  },[])

if (auth===null) return

      return type==='user'?(auth ? <Outlet /> : <Navigate state={{ from: location.pathname }} to={"/login"} /> ):
             (auth ? <Outlet /> : <Navigate  to={"/admin/login"} />)


 
  
 
}

export default ProtectedRoute;
