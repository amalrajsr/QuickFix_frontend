import React, { useState } from "react";
import Button from "../../components/UI/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {  useNavigate } from "react-router-dom";
import { otpSchema } from "../../validations/UserValidation";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slices/userSlice";
import axios from "../../config/axios";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { registerOtpApi } from "../../apis/auth";
function Otp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  const onHandleSubmit = async (otp) => {
    setLoading(true);
    try {
      const { data } = await registerOtpApi(otp)
      setLoading(false);
      if (data.token && data.user) {
        dispatch(addUser(data.user));
        localStorage.setItem("user", data.token);
        navigate("/");
      }
    } catch (error) {
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
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    console.log("resend");
    try {
      const { data } = await axios.get("/user/resend-otp");
      setLoading(false);
    } catch (error) {
      console.log(error);
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
    }
  };
  return(
    <>
      <div className="my-10  flex items-center justify-center p-20">
        <div className="bg-light flex flex-col item-center mx-10 p-14 ">
          <span className="text-dark hidden  text-center sm:block">
            Enter the Otp recieved on your mobile
          </span>
          <span className="text-dark  text-center sm:hidden ">
            Enter the Otp
          </span>
          <form onSubmit={handleSubmit(onHandleSubmit)} className="text-center">
            <input
              type="number"
              name={"otp"}
              required
              className="py-3 mt-5 focus:outline-slate-300 text-center rounded-md text-2xl mx-auto"
              {...register("otp")}
            />
            <p className="text-slate-400 mt-2">{errors.mobile?.message}</p>
            <div className="mt-6 p-2 text-center ">
              {loading ? (
                <button
                  disabled
                  className="bg-dark rounded-lg hover:bg-gray-800 text-white py-2  px-6"
                >
                  <ClipLoader color="#ffff" size={20} />
                </button>
              ) : (
                <Button>Verify OTP</Button>
              )}
            </div>
          </form>
          <button
            className=" font-bold text-center mt-3 text-bold"
            onClick={resendOtp}
          >
            Resend OTP
          </button>
        </div>
      </div>
  
    </>
  );
}

export default Otp;
