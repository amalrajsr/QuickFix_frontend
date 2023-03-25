
import {  useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import useAtuhCheck from "../../hooks/useAuthCheck";
function Unprotected({type}) {
    const {role,token}= useAtuhCheck(type)
  
    const location=useLocation()
  
        return role==='user'?( token ? <Navigate to={'/'}/> : <Navigate state={{ from: location.pathname }} to={"/login"} /> ):
               (token ? <Navigate to={'/admin/dashboard'} /> : <Navigate  to={"/admin/login"} />)
   
    
   
  }


export default Unprotected
