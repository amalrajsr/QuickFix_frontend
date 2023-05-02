import React, { useState } from "react";
import Table from "../../components/Admin/Booking/Table";
function BookingManagement() {
  const [bookingStatus, setbookingStatus] = useState("active");
 
  return (
    <div className="w-full  mx-3">
      <div className="mx-10 mt-5">
        <span className="text-2xl">Booking Management</span>
      </div>
      <div className=" w-11/12 mt-12 mx-10 overflow-x-auto">
        <div className="mx-1 flex  justify-between my-4">
          <div className="flex gap-4  ">
            <button
              onClick={() => setbookingStatus("pending")}
              className={`px-6  shadow-md ${
                bookingStatus === "pending" && "bg-slate-200"
              } rounded-lg text-start`}
            >
              pending
            </button>
            <button
              onClick={() => setbookingStatus("active")}
              className={`px-6  shadow-md ${
                bookingStatus === "active" && "bg-slate-200"
              } rounded-lg text-start`}
            >
              active
            </button>
            <button
              onClick={() => setbookingStatus("completed")}
              className={`px-6  shadow-md ${
                bookingStatus === "completed" && "bg-slate-200"
              } rounded-lg text-start`}
            >
              past
            </button>
            <button
              onClick={() => setbookingStatus("cancelled")}
              className={`px-6  shadow-md ${
                bookingStatus === "cancelled" && "bg-slate-200"
              } rounded-lg text-start`}
            >
              cancelled
            </button>
          </div>
       
        </div>
        <Table  bookingStatus={bookingStatus} />
      </div>
    </div>
  );
}

export default BookingManagement;
