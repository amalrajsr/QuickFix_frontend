import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { expertForgotPasschema, otpSchema } from "../../validations/Validation";

import Button from "../UI/Button";
import { expertResendOtpApi, forgotPasswordApi, forgotPasswordVerifyOtpApi } from "../../apis/expert";
import fireToast from "../../utils/fireToast";
import { Navigate, useNavigate } from "react-router-dom";
function ForgotPasswordOtp() {
  const token=localStorage.getItem('expert')
    const navigate=useNavigate()
    const[otp,setOtp]=useState({send:false,resend:false})
    const [loading,setLoading]=useState(false)
    const [expertId,setExpertId]=useState(false)
    const [expert,setExpert]=useState(null)
  // changing schema based on condition
  const schema = otp.send ? otpSchema : expertForgotPasschema;
  // from validation using useFrom and yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onHandleSubmit =async (expertData) => {
     setExpert(expertData)
    if(!expertData.otp){
      setLoading(true)
      forgotPasswordApi(expertData).then(({data})=>{
        setLoading(false)
        if(data.success && data.expertID){
          setOtp({...otp,send:true})
          setExpertId(data.expertID)
        }
      }).catch((error)=>{
        setLoading(false)

      })
    }else{
      setLoading(true)
      forgotPasswordVerifyOtpApi(expertData).then(({data})=>{
        setLoading(false)
        if(data.success){
          navigate('/expert/reset-password',{state:{expertId:expertId}})
        }
      }).catch((error)=>{
        setLoading(false)
        fireToast('error',error.response?.data?.error.message)
      })
    }
  };

  const resendOtp= async()=>{
    try {
      setOtp({...otp,resend:true});
      const { data } = await expertResendOtpApi(expert);
      if (data.success) {
        fireToast("success", `new otp has send to ${expert.mobile}`);
      }
      setTimeout(() => {
        setOtp({...otp,resend:false});

      }, 15000);
    } catch (error) {
      fireToast("error", error.response?.data?.error.message);
    }
  }
  return token ? (
    <Navigate to={"/expert/profile"} />
  ) : (
    <div className=" mt-32  mb-10  flex items-center justify-center ">
      <div className="bg-white border-[1px] border-slate-300 h-full py-5 md:p-10 md:w-[375px] md:shadow-lg  rounded-l-lg">
        <h3 className="font-medium text-lg text-center mt-5 my-2 ">
         Enter your  mobile number
        </h3>
        <form
          onSubmit={handleSubmit(onHandleSubmit)}
          className="my-auto mx-auto text-center "
        >
          <input
            type="number"
            name={"mobile"}
            placeholder={"mobile"}
            className="py-2 mt-5  border-[1px] border-slate-300 focus:outline-slate-300  rounded-md px-10 mx-3"
            {...register("mobile")}
          />
          {otp.send && (
            <input
              type="number"
              name={"otp"}
              placeholder={"Enter your OTP"}
              className="py-2 mt-5 border-[1px] border-slate-300 focus:outline-slate-300  rounded-md px-10 mx-3"
              {...register("otp")}
            />
          )}
          <p className="text-slate-400">{errors.mobile?.message}</p>
          <div className="mt-6">
            {loading ? (
              <button
                disabled
                className="bg-dark rounded-lg hover:bg-gray-800 text-white py-2  px-6"
              >
                <ClipLoader color="#ffff" size={20} />
              </button>
            ) : (
              <Button loading={loading}>{otp.send ? "Verify OTP" : "Send OTP"}</Button>
            )}
          </div>
        </form>
        {otp.send && (
          <div className="mt-6">
            <button
              disabled={otp.resend}
              onClick={resendOtp}
              className={`${
                otp.resend ? "text-gray-400" : "text-dark"
              } font-bold text-center block mx-auto `}
            >
              resend OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordOtp;
