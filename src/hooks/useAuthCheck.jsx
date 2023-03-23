import {useEffect} from 'react'

function useAtuhCheck(role) {

   let userType 
   role==='user'? userType='user':userType='admin'

   console.log(userType);
  const token= localStorage.getItem(userType) 

  useEffect(()=>{

    // async function isToken(){
    //   const user = localStorage.getItem("userToken");
    //   // console.log(user);
    //     try {
    //       const { data } = await axios.get(`/${role}/jwt`, {
    //         headers: {
    //           Authorization: `Bearer ${user}`,
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
 
    // isToken()
  
  })
  return {role,token}
}

export default useAtuhCheck
