import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useNavigate } from "react-router-dom";
import { blockLocationApi, editLocationApi, fetchLocationApi } from "../../../apis/admin";

function Table({fetchlocation, setfetchlocation}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(false);
  const [editLocation,setEditLocation]=useState({id:null,place:null,pincode:null})
  const [error,setError]=useState({placeError:false,pincodeError:false})
  useEffect(() => {
    getLocations();
  }, [fetchlocation]);
  const getLocations = async () => {
    try {
      const { data } = await fetchLocationApi();

      if (data.locations) {
        setLocations(data.locations);
      }
    } catch (error) {
      if (error.response?.data?.error?.tokenExpired) {
        localStorage.removeItem("admin");
        navigate("/admin/login");
      }
    }
  };

  const blockLocation = async (id) => {
    try {
      const { data } = await blockLocationApi(id);
      getLocations();
    } catch (error) {
      if (error.response?.data?.error?.tokenExpired) {
        localStorage.removeItem("admin");
        navigate("/admin/login");
      }
    }
  };
  const handleEdit = (location) => {
    setEditLocation({id:location._id,place:location.place,pincode:location.pincode})
    setOpen(true)

  };

  const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoading(false);
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
  
        const {data}=await editLocationApi(editLocation.id,editLocation)
       
         if(data.updated){
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
          setOpen(false)
          getLocations();

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

  // data table cloumns
  const columns = [
    {
      name: "Location",
      selector: (row) => row.place,
    },
    {
      name: "Pincode",
      selector: (row) => row.pincode,
    },
    {
      name: null,
      cell: (row) => (
        <button
          className={`${
            row.isBlocked ? "bg-green-400" : "bg-red-500"
          } rounded-lg text-white px-3 py-1`}
          onClick={() => blockLocation(row.id)}
        >
          {row.isBlocked ? "unlist" : "list"}
        </button>
      ),
    },
    {
      name: null,
      cell: (row) => (
        <span className="p-1" onClick={() => handleEdit(row.singleLocation)}>
          <i className="fa-regular fa-pen-to-square fa-md"></i>
        </span>
      ),
    },
  ];
  // data table data
  const data = locations.map((data) => {
    return {
      singleLocation: data,
      id: data._id,
      place: data.place,
      pincode: data.pincode,
      isBlocked: data.isBlocked,
    };
  });
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
        fontSize: "15px",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "18px",
        textColor: "gray",
        backgroundColor: "#F9FAFB",
      },
    },
    cells: {
      style: {},
    },
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
      <h3 className="text-center text-2xl my-3">Edit Service</h3>
      <form onSubmit={handleSubmit}>
      <div>
            <label className="mx-3 block">Place</label>
            <input
      
              type="text"
              name="place"
              className="p-2  focus:outline-slate-300 bg-slate-100 rounded-md w-auto  mx-3"
              value={editLocation?.place}
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
              value={editLocation?.pincode}
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
      <DataTable
        columns={columns}
        data={data}
        fixedHeader
        fixedHeaderScrollHeight="450px"
        customStyles={customStyles}
      />
    </>
  );
}

export default Table;
