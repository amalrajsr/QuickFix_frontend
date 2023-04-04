import React, { useState } from "react";
import { cancelBooking } from "../../../apis/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function SingleBooking({ booking,fetchBooking ,setFetchBooking }) {


  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const handleCancel = (id) => {
    setLoading(true);
    cancelBooking(id).then(({data})=>{
      setLoading(false);
      if(data.success){
        toast.success("booking cancelled", {
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
    }).catch((error)=>{
      if(error.response?.data?.error?.tokenExpired){
        localStorage.removeItem('user')
        navigate('/')
      }
      setLoading(false);
      toast.error(error.response?.data?.error.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
  };

  return booking.status === "completed" ? (
    <div className="w-full  mt-4 ">
      <div className="  bg-white border-[1px]  border-slate-300 shadow-lg rounded-lg mt-2 mx-6">
        <div className="flex justify-between my-3 mx-4">
          <span className="text-lightgray ">service: {booking?.service}</span>
          <button className="text-white h-[30px] px-2 font-medium bg-dark rounded-lg border-[2px] border-light">
            Add review
          </button>
          <button className="text-white h-[30px] px-2 font-medium bg-dark rounded-lg border-[2px] border-light">
            View Detail
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div
      id={booking?._id}
      className=" bg-white border-[1px] border-slate-300 shadow-lg  rounded-lg mt-2 mx-6"
    >
      <div className=" flex  justify-between  flex-shrink rounded-lg my-4 mx-3">
        <span className="text-lightgray break-normal">ID: {booking?._id}</span>
        {booking?.status !== "cancelled" && (
          <button
            onClick={() => !loading && handleCancel(booking?._id)}
            className="text-white h-[30px] px-2 font-medium bg-dark rounded-lg border-[2px] border-light"
          >
           {loading? <ClipLoader color="#ffff" size={20}/>: "cancel"} 
          </button>
        )}
      </div>
      <div className="flex justify-between   flex-shrink rounded-lg my-4  mx-3">
        <span className="break-normal text-lightgray ">
          Service: {booking?.service}
        </span>
        <span className="break-normal text-lightgray text-right">
          Type: {booking?.type}
        </span>
      </div>
      <div className="flex justify-between  flex-shrink rounded-lg my-4  mx-3">
        <span className="break-normal text-lightgray">
          Date: {booking?.date.split("T")[0]} {booking?.slot}
        </span>
        <span className="break-normal text-lightgray text-right">
          Estimated Total:{booking?.estimatedCharge}
        </span>
      </div>
    </div>
  );
}

export default SingleBooking;
