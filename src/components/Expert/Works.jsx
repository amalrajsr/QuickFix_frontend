import React, { useRef, useState } from "react";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { updatePaymentApi, updatePaymentStatusApi } from "../../apis/expert";
import confirmToast from "../../utils/confirmToast";
import fireToast from "../../utils/fireToast";
function Works({ booking, fetchBooking, setFetchBooking }) {

  const totalRef=useRef()
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState();
  const [totalChargeError, setTotalChargeError] = useState(false);
  const updatePayment = async (bookinId) => {
    try {
      const { data } = await updatePaymentApi(bookinId, {
        totalCharge: +payment,
      });
      if (data.success) {
        fireToast("success", "updated successfully");
        setFetchBooking(!fetchBooking);
      }
    } catch (error) {
      fireToast("error", error.response?.data?.error.message);
    }
  };

  // function to update payment status if user choose cod option
  const updatePaymentStatus = async () => {
    if (!booking.totalCharge) {
      totalRef.current?.focus()
      setTotalChargeError(true);
    } else {
      try {
        setLoading(true);
        const { data } = await updatePaymentStatusApi(booking?._id);
        setLoading(false);

        if (data.success) {
          fireToast("success", "updated successfully");
          setFetchBooking(!fetchBooking);
        }
      } catch (error) {
        setLoading(false);
        fireToast("error", error.response?.data?.error.message);
      }
    }
  };

  const handleTotalCharge=(e)=>{
    setPayment(e.target.value)
    setTotalChargeError(false)
  }
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
              ref={totalRef}
                value={payment}
                onChange={(e) => handleTotalCharge(e)}
                className={`bg-white border-[1px] ${
                  totalChargeError ? "border-red-600" : "border-slate-300"
                } rounded-sm oultine outline-0 shadow-sm max-w-[80px]`}
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
      <div className="mx-3 my-2 flex justify-end">
        {booking.status !== "completed" && (
          <button
            onClick={() => confirmToast(() => updatePaymentStatus())}
            className="break-normal text-white bg-dark rounded-md px-2 inline-flex gap-2  text-right"
          >
            Cash in hand
          </button>
        )}
      </div>
    </div>
  );
}

export default Works;
