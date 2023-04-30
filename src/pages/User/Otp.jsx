import React, { useState } from "react";
import Button from "../../components/UI/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {  Navigate, useLocation, useNavigate } from "react-router-dom";
import { otpSchema } from "../../validations/Validation";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slices/userSlice";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { registerOtpApi, resendOtpApi } from "../../apis/user";
import fireToast from "../../utils/fireToast";
function Otp() {
  const location=useLocation()
  const user=location.state
  const token=localStorage.getItem('user')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resend,setResend]=useState(false)
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
     
      const { data } = await registerOtpApi(user,otp)
      setLoading(false);
      if (data.token && data.user) {
        dispatch(addUser(data.user));
        localStorage.setItem("user", data.token);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      fireToast('error',error.response?.data?.error.message)
    }
  };

  const resendOtp=async()=>{

    try{
      setResend(true)
      const {data}= await resendOtpApi(user)
       if(data.success){
        fireToast('success',`new otp has send to ${user.mobile}`)
       }
       setTimeout(()=>{
        setResend(false)
       },15000)
    }catch(error){
      console.log(error)
    }
   
      }
  return  token? (<Navigate to={'/'}/>):(
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
          disabled={resend}
            className={`${resend?'text-gray-400':'text-dark'} font-bold text-center mt-3 text-bold`}
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
