import React from 'react'

function PastBooking({booking}) {
  return (
    <div
    key={booking?._id}
    className=" bg-white border-[1px] border-slate-300 shadow-lg  rounded-lg mt-2 "
  >
    <div className=" flex  justify-between  flex-shrink rounded-lg my-4 mx-3">
      <span className="text-lightgray break-normal">ID: {booking?._id}</span>
      <span className="text-lightgray break-normal">Expert: {booking?.expert[0]?.name}</span>

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
        {booking?.totalCharge
          ? `Total : ₹${booking?.totalCharge}`
          : `Estimated Total : ₹${booking?.estimatedCharge}`}
      </span>
    </div>
  </div>
  )
}

export default PastBooking
