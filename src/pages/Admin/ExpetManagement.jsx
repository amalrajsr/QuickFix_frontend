import React, { useState } from "react";
import Table from "../../components/Admin/Expert/Table";
import AddExpert from "../../components/Admin/Expert/AddExpert";
function ExpetManagement() {
  const [fetchExperts,setfetchExperts]=useState(null)
  const [searchTerm, setSearchTerm] = useState("");
  function handleSearch(event) {
    const term = event.target.value;
    setSearchTerm(term);
  }
  return (
    <div className="w-full  ml-6">
      <div className="mx-10 mt-5">
        <span className="text-2xl">Expert Management</span>
      </div>
      <div className=" w-3/4 mt-12  overflow-x-auto">
        <div className="mx-1 flex  my-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e)=>handleSearch(e)}
            id="table-search"
            className="block  p-2 pl-4 outline-none focus:outline-gray-300 text-sm text-gray-900  border-gray-300 rounded-lg w-40 md:w-60 bg-gray-50 "
            placeholder="Search here"
          />
          <AddExpert fetchExperts={fetchExperts} setfetchExperts={setfetchExperts}/>
        </div>
        <Table searchTerm={searchTerm} fetchExperts={fetchExperts} setfetchExperts={setfetchExperts}/>
      </div>
    </div>
  );
}

export default ExpetManagement;
