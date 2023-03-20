import React from "react";
import Button from "../../components/UI/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { otpSchema } from "../../validations/UserValidation";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slices/userSlice";
import axios from "../../config/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Otp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  const onHandleSubmit = async (otp) => {
    try {
      const { data } = await axios.post("/user/verify_otp", otp, {
        withCredentials: true,
      });
      if (data.token && data.user) {
        dispatch(addUser(data.user));
        localStorage.setItem("userToken", data.token);
        navigate("/", { state: { message: "successfully registered" } });
      }
    } catch (error) {
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
  return (
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
              <Button>Verify Otp</Button>{" "}
            </div>
            <button className="font-bold text-center mt-3 text-bold">
              Resend OTP
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Otp;
