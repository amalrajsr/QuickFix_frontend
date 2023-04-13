import React, { useEffect, useState } from "react";
import {
  cancelBooking,
  paymentApi,
  paymentSuccessApi,
} from "../../../apis/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";

function SingleBooking({ booking, fetchBooking, setFetchBooking }) {
  const user = useSelector((state) => state.user.value);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleCancel = (id) => {
    setLoading(true);
    cancelBooking(id)
      .then(({ data }) => {
        setLoading(false);
        if (data.success) {
          toast.success("booking cancelled", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setFetchBooking(!fetchBooking);
        }
      })
      .catch((error) => {
        if (error.response?.data?.error?.tokenExpired) {
          localStorage.removeItem("user");
          navigate("/");
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
      });
  };

  // razorpay payment
 async function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const handlePayment = async () => {
    try {
      await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      try {
        const { data } = await paymentApi(booking?._id);

        const options = {
          key: process.env.REACT_APP_RAZOR_API_KEY,
          currency: data.order.currency,
          amount: data.order.amount.toString(),
          order_id: data.order.id,
          name: "QuickFix",

          handler: async function (response) {
            const paymentData = {
              orderCreationId: data.order.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              bookingId: booking?._id,
            };

            try{
            const result = await paymentSuccessApi(paymentData);
            if (result.data.success) {
              setFetchBooking(!fetchBooking);
            }
          }catch(error){
          }

          },
          prefill: {
            name: user?.name,
            email: user?.email,
            phone_number: user?.mobile,
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {

      }
    } catch (error) {
     console.log(error)
    }
  };
  

  return booking.status === "completed" ? (
    <div key={booking?._id} className="w-full  mt-4 ">
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
      key={booking?._id}
      className=" bg-white border-[1px] border-slate-300 shadow-lg  rounded-lg mt-2 mx-6"
    >
      <div className=" flex  justify-between  flex-shrink rounded-lg my-4 mx-3">
        <span className="text-lightgray break-normal">ID: {booking?._id}</span>
        {booking?.status !== "cancelled" && (
          <button
            onClick={() =>
              !loading && booking.totalCharge
                 ? handlePayment()
                : handleCancel(booking?._id)
            }
            className="text-white h-[30px] px-2 font-medium bg-dark rounded-lg border-[2px] border-light"
          >
            {loading ? (
              <ClipLoader color="#ffff" size={20} />
            ) : booking.totalCharge ? (
              "pay now"
            ) : (
              "cancel"
            )}
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
          {booking?.totalCharge
            ? `Total : ₹${booking?.totalCharge}`
            : `Estimated Total : ₹${booking?.estimatedCharge}`}
        </span>
      </div>
    </div>
  );
}

export default SingleBooking;
