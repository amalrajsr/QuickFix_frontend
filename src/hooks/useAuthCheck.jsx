import {useEffect, useState} from 'react'

function useAtuhCheck(role) {
  
  const[auth,setAuth]=useState(false)
   let userType 
   role==='user'? userType='user':userType='admin'


  const token= localStorage.getItem(userType) 
  
// useEffect(()=>{
//   isToken()
// },[])

    // async function isToken(){
    //   
    //   // console.log(user);
    //     try {
    //       const { data } = await axios.get(`/${userType}/jwt`, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });
    //       if (data.success) {
    //         setAuth(true)
    //         console.log(auth);
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
 
    
  return {role,token}
}

export default useAtuhCheck
