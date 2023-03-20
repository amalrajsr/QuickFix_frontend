import React, { useState } from 'react'
import Button from '../../components/UI/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userLoginSchema ,otpSchema} from '../../validations/UserValidation'
import { ToastContainer, toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css"
import axios from '../../config/axios.js'
import { useDispatch } from 'react-redux'
import { addUser } from '../../store/slices/userSlice'
import { useNavigate } from 'react-router-dom'
function Login() {



   const [otp,setOtp]=useState(false)
   const [loading,setLoading]=useState(false)
   const dispatch=useDispatch()
   const navigate=useNavigate()
   const schema= otp?otpSchema:userLoginSchema
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onHandleSubmit= async(userData)=>{
    setLoading(true)
    if(!userData.otp){
      try{
        const {data}= await axios.post('user/login',userData)
        setLoading(false)
        if(data.success){
          setOtp(true)
        }
      }catch(error){
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
  }else{

    try{
      const {data}=await axios.post('user/verify_login_otp',userData)
      setLoading(false)
      if(data.user && data.token){
        localStorage.setItem('userToken',data.token)
        dispatch(addUser(data.user))
        navigate('/')
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
   
  }
  }
  return (
    <>
    <div className=' mt-20 mb-5  flex items-center justify-center p-10'>
        <div className='bg-light h-full py-5 md:p-10 md:w-[375px] md:shadow-md  rounded-l-lg'>
          <h3 className='font-bold text-3xl text-center mt-5 my-2 '>Login here</h3>
          <form onSubmit={handleSubmit(onHandleSubmit)} className='my-auto mx-auto text-center '>
            <input type='number' name={'mobile'} placeholder={'mobile number'} className='py-2 mt-5 focus:outline-slate-300 rounded-md px-10 mx-3' {...register('mobile')} />
          { otp && <input type='number' name={'otp'} placeholder={'Enter your OTP'} className='py-2 mt-5 focus:outline-slate-300 rounded-md px-10 mx-3' {...register('otp')} />}
            <p className='text-slate-400'>{errors.mobile?.message}</p>
            <div className='mt-6'>{loading ?<button disabled className='bg-dark rounded-lg hover:bg-gray-800 text-white py-2  px-6'><ClipLoader color="#ffff"  size={20} /></button>: <Button>{otp ?'Verify OTP':'Send OTP'}</Button>} </div>
          </form>
        </div>
    </div>
    <ToastContainer/>
  </>
  )
}

export default Login