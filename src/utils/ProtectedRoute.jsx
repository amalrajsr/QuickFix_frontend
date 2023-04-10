
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from  '../config/axios'
import { useDispatch } from "react-redux";
import { removeUser } from "../store/slices/userSlice";
import { removeExpert } from "../store/slices/expertSlice";
function ProtectedRoute({type}) {
  const[auth,setAuth]=useState(null)
  const location=useLocation()
  const token= localStorage.getItem(type) 
  const navigate=useNavigate()
  const dispatch=useDispatch()
  useEffect(()=>{
  
     axios.get(`/${type}/jwt`,{
     
        headers: {
          Authorization: `Bearer ${token}`,
        }, 
        params: { role: type } 
       
      }).then((res)=>{
         
        setAuth(true)
      }).catch((error)=>{
         
        if(error.response?.data?.error?.tokenExpired){
          localStorage.removeItem(type)
          type ==='user' ? dispatch(removeUser()): type==='expert' ? dispatch(removeExpert()) : 
          type==='admin' ? navigate(`/admin/login`,{state: { tokenExpired:true}}) : navigate("/login",{state: { tokenExpired:true}})
        }
       
        setAuth(false)
      })
  },[])

if (auth===null) return

      return type==='user'?(auth ? <Outlet /> : <Navigate state={{ from: location.pathname }} to={"/login"} /> ):
             (auth ? <Outlet /> : <Navigate  to={"/admin/login"} />)


 
  
 
}

export default ProtectedRoute;
