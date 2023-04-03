import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { addLocationApi } from '../../../apis/admin';

function AddLocation({fetchlocation, setFetchlocation}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); ;
  const [open, setOpen] = useState(false);
  const [editLocation,setEditLocation]=useState({place:null,pincode:null})
  const [error,setError]=useState({placeError:false,pincodeError:false})
  


  const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoading(true);
    // const palceValidation=/^[a-zA-Z\s]+$/
    // if(!palceValidation.exec(editLocation.place)){
    //     setError({...error,placeError:true})
    // }
    // // if((value) => value.trim().length > 0){

    // // }

    // const pincodeValidation=/^\d{6}$/
    // if(!pincodeValidation.exec(editLocation.place)){
    //     setError({...error,pincodeError:true})
    // }
    try{
  
        const {data}=await addLocationApi(editLocation)
          console.log(data)
         if(data.success){
          setLoading(false);
         
          toast.success("updated successfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setFetchlocation(!fetchlocation)
          console.log(fetchlocation)
          setOpen(false)
         }

       
    }catch(error){
      setLoading(false);
      if(error.response?.data?.error?.tokenExpired){
        localStorage.removeItem('admin')
        navigate('/admin/login')
      }
      toast.error(error.response?.data?.error.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }


  }
  return (
    <>
      
      <button
          onClick={()=>setOpen(true)}
          className="bg-slate-100 mx-auto px-2 rounded-lg"
          data-modal-target="authentication-modal"
          data-modal-toggle="authentication-modal"
        >
          add location
        </button>
        <Modal open={open} onClose={() => setOpen(false)}>
      <h3 className="text-center text-2xl my-3">add location</h3>
      <form onSubmit={handleSubmit}>
      <div>
            <label className="mx-3 block">Place</label>
            <input
      
              type="text"
              name="place"
              className="p-2  focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
          
              onChange={(e)=>setEditLocation({...editLocation,place:e.target.value})}
            />
          {error.placeError &&  <p className="mx-3 text-slate-400">only alphabets are allowed</p>}
          </div>
          <div>
            <label className="mx-3 block">pincode</label>
            <input
           
              type="number"
              name="pincode"
              className="p-2  focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
              onChange={(e)=>setEditLocation({...editLocation,pincode:e.target.value})}
            />
          {error.pincodeError &&  <p className="mx-3 text-slate-400">should contain 6 digits</p>}
          </div>
          <div className="flex justify-center mt-5">
          <button className="bg-black text-white px-5 py-1 rounded-md ">
            {loading ? <ClipLoader color="#ffff" size={20} /> : "edit"}
          </button>
        </div>
      </form>
      </Modal>
    </>
  )
}

export default AddLocation
