
import { toast } from "react-toastify";

 function fireToast(type,msg) {
  
 switch(type){
    case('error'):{
        return (
            toast.error(msg, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                
              })
          )
          
    }
    case('success'):{
        return (
            toast.success(msg, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              })
          )
    }
    case('warn'):{
        return (
            toast.warn(msg, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              })
          )
    }
    
    default: return null
 }
 
}
export default fireToast


