import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useNavigate } from "react-router-dom";
import { blockLocationApi, editLocationApi, fetchLocationApi } from "../../../apis/admin";
import { addlocations } from "../../../store/slices/locationSlice";
import { useDispatch } from "react-redux";
import confirmToast from "../../../utils/confirmToast";
import BeatLoader from "react-spinners/BeatLoader";

function Table({fetchlocation, setFetchlocation,searchTerm}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  const [pending, setPending] = useState(true);
  const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(false);
  const [editLocation,setEditLocation]=useState({id:null,place:null,pincode:null})
  const dispatch=useDispatch()
  useEffect(() => {
    getLocations();
  }, [fetchlocation]);
  const getLocations = async () => {
    try {
      const { data } = await fetchLocationApi();

      if (data.locations) {
        setLocations(data.locations);
        dispatch(addlocations(data.locations))
        setPending(false)
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
      await blockLocationApi(id);
      setFetchlocation(!fetchlocation)
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
          onClick={() =>confirmToast(()=>blockLocation(row.id)) }
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
      <h3 className="text-center text-2xl my-3">Edit Location</h3>
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
        data={data.filter((row) =>
          row.place.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        fixedHeader
        fixedHeaderScrollHeight="450px"
        customStyles={customStyles}
        progressPending={pending}
        progressComponent={<BeatLoader/>}
        pagination
      />
    </>
  );
}

export default Table;
