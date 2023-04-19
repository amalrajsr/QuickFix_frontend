import React, { useEffect, useRef, useState } from 'react'
import Button from '../../components/UI/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userLoginSchema ,otpSchema} from '../../validations/Validation'
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css"
import { useDispatch } from 'react-redux'
import { addUser } from '../../store/slices/userSlice'
import {  Navigate, useLocation, useNavigate } from 'react-router-dom'
import { loginApi,loginOtpApi, resendOtpApi } from '../../apis/user'
function Login() {
  const token=localStorage.getItem('user')
   const [otp,setOtp]=useState(false)
   const [resend,setResend]=useState(false)
   const [loading,setLoading]=useState(false)
   const dispatch=useDispatch()
   const navigate=useNavigate()
   const location=useLocation()
   const [user,setUser]=useState({})
   // cheking if any token expired message is passed thorugh useNavigate
   useEffect(()=>{
    if(location.state?.tokenExpired){
      toast.warn("Token expired Please login to continue", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: '007'
      });
     }
   },[])
   
  
   // changing schema based on condition
   const schema= otp?otpSchema:userLoginSchema

   // from validation using useFrom and yup
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });


  const onHandleSubmit= async(userData)=>{
    setUser(userData)
    setLoading(true)
    if(!userData.otp){
      try{
        const {data}= await loginApi(userData)
        setLoading(false)
        if(data.success){
          setOtp(true)
        
        }
      }catch(error){
        setLoading(false)
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
  }else{

    try{
      const {data}=await loginOtpApi(userData)
      setLoading(false)
      if(data.user && data.token){
        localStorage.setItem('user',data.token)
        dispatch(addUser(data.user))
        navigate(location.state?.from ||'/')
      }
    }catch(error){
      
      setLoading(false)
      console.log(error);
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
   
  }
  }

  const resendOtp=async()=>{

    try{
      setResend(true)
      const {data}= await resendOtpApi(user)
       if(data.success){
        toast.success(`new otp has send to ${user.mobile}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
       }
       setTimeout(()=>{
        setResend(false)
       },15000)
    }catch(error){
      console.log(error)
    }
   
      }
  return token? (<Navigate to={'/'}/>): (
    
    <>
    <div className=' mt-32  mb-10  flex items-center justify-center '>
        <div className='bg-light h-full py-5 md:p-10 md:w-[375px] md:shadow-md  rounded-l-lg'>
          <h3 className='font-bold text-3xl text-center mt-5 my-2 '>Login here</h3>
          <form onSubmit={handleSubmit(onHandleSubmit)} className='my-auto mx-auto text-center '>
            <input type='number' name={'mobile'} placeholder={'mobile number'} className='py-2 mt-5 focus:outline-slate-300 rounded-md px-10 mx-3' {...register('mobile')} />
          { otp && <input type='number'  name={'otp'} placeholder={'Enter your OTP'} className='py-2 mt-5 focus:outline-slate-300 rounded-md px-10 mx-3' {...register('otp')} />}
            <p className='text-slate-400'>{errors.mobile?.message}</p>
            <div className='mt-6'>{loading ?<button disabled className='bg-dark rounded-lg hover:bg-gray-800 text-white py-2  px-6'><ClipLoader color="#ffff"  size={20} /></button>: <Button>{otp ?'Verify OTP':'Send OTP'}</Button>} </div>
          </form>
        {otp && <div className='mt-6'><button disabled={resend} onClick={resendOtp} className={`${resend ?'text-gray-400':'text-dark' } font-bold text-center block mx-auto `}>resend OTP</button></div> }
        </div>
    </div>
  
  </>
  )
}

export default Login