import React from "react";
import Dashboard from "../../components/Admin/Dashboard/Dashboard";
import PIeChart from "../../components/Admin/Dashboard/PIeChart";

function DashboardPage() {
  return (
    <div className="w-full  mx-3">
      <div className="mx-10 mt-5">
        <span className="text-2xl">Dashboard</span>
      </div>
      <Dashboard />
      <div className=" w-11/12 mt-12 mx-5">
        <div className="mx-1 flex  my-4">
          {/* <AddExpert fetchExperts={fetchExperts} setfetchExperts={setfetchExperts}/> */}
        </div>
        <div className="flex  gap-4 flex-col md:flex-row justify-between">
         <div className="w-full">
          <h1 className=" mx-2 text-xl my-1">Service Details</h1>
        <div className=" py-2 h-[400px] md:w-3/4 w-full border-[1px] flex flex-col  gap-2 items-center border-slate-300">
          <PIeChart type='service'/>
        </div>
        </div>
        <div className="w-full">
          <h1 className=" mx-2 text-xl my-1">Booking Details</h1>
        <div className=" py-2 h-[400px] md:w-3/4 w-full border-[1px] flex flex-col  gap-2 items-center border-slate-300">
          <PIeChart type='booking' />
        </div>
        </div>
        </div>
     
      </div>
    </div>
  );
}

export default DashboardPage;
