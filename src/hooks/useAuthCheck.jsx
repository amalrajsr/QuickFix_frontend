import {useEffect, useState} from 'react'
import axios from '../config/axios'
function useAtuhCheck(role) {
  
  const[auth,setAuth]=useState(null)
   let userType 
   role==='user'? userType='user':userType='admin'


  const token= localStorage.getItem(userType) 
  
useEffect(()=>{
  isToken()
},[])

    async function isToken(){
      
      // console.log(user);
        try {
          const { data } = await axios.get(`/${userType}/jwt`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (data.success) {
            setAuth(true)
          }else{
            setAuth(false)
          }
        } catch (error) {
          setAuth(false)
          console.log(error);
        }
      };
 
    if(auth==='null') return
  return {role,token}
}

export default useAtuhCheck
