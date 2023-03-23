import React, { useEffect, useState } from "react";
import axios from "../../config/axios";
import { Outlet, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import useAtuhCheck from "../../hooks/useAuthCheck";
function ProtectedRoute({type}) {

  const {role,token}= useAtuhCheck(type)
  const location=useLocation()

      return role==='user'?( token ? <Outlet /> : <Navigate state={{ from: location.pathname }} to={"/login"} /> ):
             (token ? <Outlet /> : <Navigate  to={"/admin/login"} />)
 
  
 
}

export default ProtectedRoute;
