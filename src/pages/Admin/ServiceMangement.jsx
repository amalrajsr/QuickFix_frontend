import Table from "../../components/Admin/Service/Table";
import AddService from "../../components/Admin/Service/AddService";
import { ServiceContext } from "../../context/serviceContext";
import { useState } from "react";
function ServiceMangement() {
  const [updateTable,setUpdateTable]=useState(false)
  return (    
    <ServiceContext.Provider value={{updateTable,setUpdateTable}}>
      <div className="w-full  mx-3">
        <div className="mx-10 mt-5">
          <span className="text-2xl">Service Management</span>
        </div>
        <div className=" w-3/4 mt-12 mx-10 overflow-x-auto">
          <div className="mx-1 flex  my-4">
            <input
              type="text"
              id="table-search"
              className="block  p-2 pl-4 outline-none focus:outline-gray-300 text-sm text-gray-900  border-gray-300 rounded-lg w-40 md:w-60 bg-gray-50 "
              placeholder="Search here"
            />
           <AddService/>
          </div>
          <Table/>
        </div>
      </div> 
      </ServiceContext.Provider>  
  );
}

export default ServiceMangement;
