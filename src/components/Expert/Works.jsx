import React, { useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { updatePaymentApi } from "../../apis/expert";
function Works({ booking,fetchBooking,setFetchBooking }) {
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState();
  const updatePayment = async(bookinId) => {
    try{

      const {data}=await  updatePaymentApi(bookinId,{totalCharge:+payment})
      if(data.success){
        toast.success("updated successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setFetchBooking(!fetchBooking)

      }

    }catch(error){
      console.log(error)
    }
  };

  return (
    <div
      key={booking?._id}
      className=" bg-white border-[1px] border-slate-300 shadow-lg rounded-lg mt-2 mx-6"
    >
      <div className=" flex  justify-between  flex-shrink rounded-lg my-4 mx-3">
        <span className="text-lightgray break-normal">
          User: {booking?.userDetails[0].name}
        </span>
        {!booking?.status.includes[("cancelled", "completed")] && (
          <span className="text-lightgray inline-flex gap-3">
            <span className="mt-1">
              <BsFillTelephoneForwardFill />
            </span>
            {booking?.userDetails[0].mobile}
          </span>
        )}
      </div>
      <div className="flex justify-between   flex-shrink rounded-lg my-4  mx-3">
        <span className="break-normal text-lightgray ">
          Date: {booking?.date.split("T")[0]} {booking?.slot}
        </span>
        <span className="break-normal text-lightgray text-right">
          Type: {booking?.type}
        </span>
      </div>
      <div className="flex justify-between  flex-shrink rounded-lg my-4  mx-3">
        <span className="break-normal text-lightgray">
          Estimated Total:₹{booking?.estimatedCharge}
        </span>

        <span className="break-normal inline-flex gap-2 text-lightgray text-right">
          Total:
          {booking?.totalCharge ? (
            booking.totalCharge
          ) : (
            <>
              <input
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                className="bg-white border-[1px] border-slate-300 rounded-sm oultine outline-0 shadow-sm max-w-[80px]"
                type="number"
              />
              <button
                onClick={() => !loading && updatePayment(booking._id)}
                className="bg-light text-dark rounded-md hover:bg-[#cae6f7] px-1"
              >
                update
              </button>
            </>
          )}
        </span>
      </div>
    </div>
  );
}

export default Works;
