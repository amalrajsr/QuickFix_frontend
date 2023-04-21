import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {getServicesApi, deleteServiceApi,} from "../../../apis/admin";
import { ServiceContext } from "../../../context/serviceContext";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import EditService from "./EditService";
import { useDispatch } from "react-redux";
import { addSerivces } from "../../../store/slices/serviceSlice";
import { useNavigate } from "react-router-dom";
import ServiceCharge from "./ServiceCharge";
import confirmToast from "../../../utils/confirmToast";
function Table() {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {updateTable}=  useContext(ServiceContext)
  const [services, setServices] = useState([]); // state to hold services 
  const [charge,setCharge]=useState(null) // for displaying service rate on modal
  const [edit,setEdit]=useState(null) // hold service to be edited
  const [toggle,setToggle]=useState(false)


  // modal handler
  const [open, setOpen] = useState(false);
  const onOpenModal = (service) =>{ 
    setCharge(service)
    setOpen(true)
  }
  ;
  const onCloseModal = () => setOpen(false);
  useEffect(() => {
    fetchServices();
  }, [updateTable]);

  // api calls
  const fetchServices = async () => {
   
    try{
      const data = await getServicesApi();
      if(data.services){
      setServices(data.services);
      dispatch(addSerivces(data.services)) // adding services to redux
      }
    }catch(error){
      if(error.response.data.error.tokenExpired){
        localStorage.removeItem('admin')
        navigate('/admin/login')
      }
    }

  };

  async function blockService(id) {
    try{

      await deleteServiceApi(id);
      fetchServices();
    }catch(error){
      if(error.response?.data?.error?.tokenExpired){
        localStorage.removeItem('admin')
        navigate('/admin/login')
      }
    }
   
  }

const handleEdit=(singleService)=>{
  setToggle(!toggle)
  setEdit(singleService)
}
// data table cloumns
  const columns = [
    {
      name: "Service",
      selector: (row) => row.service,
    },
    {
      name: "Image",
      cell: (row) => (
        <img src={row.imageUrl} className="w-[50px]" alt={row.name} />
      ),
    },  {
      name: "largeImage",
      cell: (row) => (
        <img src={row.largeImage} className="w-[100px] mx-0" alt={row.name} />
      ),
    },
    {
      name: "Charge",
      cell: (row) => (
        <>
          <button
            onClick={()=>onOpenModal(row.singleService)}
            className="bg-blue-400 p-1 text-white rounded-lg px-2"
          >
            View
          </button>
        </>
      ),
    },
    {
      name: null,
      cell: (row) => (
        <button
          className={`${
            row.isDeleted ? "bg-green-400" : "bg-red-500"
          } rounded-lg text-white px-3 py-1`}
          onClick={() =>confirmToast(()=>blockService(row.id)) }
        >
          {row.isDeleted ? "unlist" : "list"}
        </button>
      ),
    },
    {
      name: null,
      cell: (row) => (
        <span className="p-1" onClick={()=>{handleEdit(row.singleService) }}>
        <i className="fa-regular fa-pen-to-square fa-md"></i>
        </span>
      ),
    },
  ];

  // data table data
  const data = services.map((data) => {
    return {
      singleService:data,
      id: data._id,
      service: data.service,
      imageUrl: data.image,
      largeImage:data.largeImage,
      Charge: {
        installationCharge1Hour: data.installationCharge1Hour,
        installationChargeLatelyHours: data.installationChargeLatelyHours,
        repairCharge1Hour: data.repairCharge1Hour,
        repairChargeLatelyHours: data.repairChargeLatelyHours,
      },
      isDeleted: data.isDeleted,
    };
  });

  const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
            fontSize:'15px',            
        },
    },
    headCells: {
        style: {
            fontWeight:'bold',
            fontSize:'18px',
            textColor:'gray',
            backgroundColor:'#F9FAFB'
        },
    },
    cells: {
        style: {
           
        },
    },
};

  return (
    <>
        <Modal open={open} onClose={onCloseModal}>
          <ServiceCharge charge={charge}/>
          </Modal>
   {toggle && <EditService toggle={toggle} data={edit}/>}
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
