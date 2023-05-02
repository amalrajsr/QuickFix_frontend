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
  const [addLocation,setAddLocation]=useState({place:null,pincode:null})
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoading(true);
 
    try{
  
        const {data}=await addLocationApi(addLocation)
  
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
          
              onChange={(e)=>setAddLocation({...addLocation,place:e.target.value})}
            />
          </div>
          <div>
            <label className="mx-3 block">pincode</label>
            <input
           
              type="number"
              name="pincode"
              className="p-2  focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
              onChange={(e)=>setAddLocation({...addLocation,pincode:e.target.value})}
            />
          </div>
          <div className="flex justify-center mt-5">
          <button className="bg-black text-white px-5 py-1 rounded-md ">
            {loading ? <ClipLoader color="#ffff" size={20} /> : "add"}
          </button>
        </div>
      </form>
      </Modal>
    </>
  )
}

export default AddLocation
