
import { toast } from "react-toastify";

 function fireToast(type,msg) {
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;

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
                toastId:randomNumber
                
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
                toastId:randomNumber

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
                toastId:randomNumber

              })
          )
    }
    
    default: return null
 }
 
}
export default fireToast


