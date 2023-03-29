import React, { useState } from 'react'
import {useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from '../../validations/Validation'
import {  Navigate, useNavigate } from 'react-router-dom'
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import ClipLoader from "react-spinners/ClipLoader";
import Button from '../../components/UI/Button';
import { registerApi } from '../../apis/user'
function Register() {
  const token=localStorage.getItem('user')
  const navigate=useNavigate()
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema)
  });
  const onHandleSubmit =async (userData) => {
     setLoading(true)
    userData.mobile= +userData.mobile
    try {
      
      const { data } = await registerApi(userData)
      setLoading(false)
      
       if(data.success){
        navigate('/otp')
       }
       if(data.error){
        setError(data.error.message)
       }
      
    } catch (error) {

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
  return token? (<Navigate to={'/'}/>): (
    <>
      <div className=' mt-20 mb-5  flex items-center justify-center p-10'>
        <div className="signup-container shadow-md md:shadow-none bg-light flex md:w-[750px]  w-[375px]">
                   <div className='bg-light h-full p-10 w-full md:shadow-md md:w-2/4 rounded-l-lg'>
            { error && <h3 className='font-bold text-xl text-center mt-5 my-2 '>{error}</h3> }
            <h3 className='font-bold text-3xl text-center mt-10 my-2 '>Get Started</h3>
            <form onSubmit={handleSubmit(onHandleSubmit)} className='my-auto mx-auto text-center '>
              <input type={'text'} name={'name'} placeholder={'Full Name'} className={' py-2 mt-5 focus:outline-slate-300 rounded-md px-10 '} {...register('fullname')} />
              <p className='text-slate-400'>{errors.fullname?.message}</p>
    
              <input type='number' name={'mobile'} placeholder={'Mobile'} className='py-2 mt-5 focus:outline-slate-300 rounded-md px-10 mx-3' {...register('mobile')} />
              <p className='text-slate-400'>{errors.mobile?.message}</p>
              <div className='mt-6'>{loading ?<button disabled className='bg-dark rounded-lg hover:bg-gray-800 text-white py-2  px-6'><ClipLoader color="#ffff"  size={20} /></button>: <Button>Register</Button>} </div>
            </form>
            <div className='md:hidden'>
              <h3 className='text-lg text-dark text-center'>Want to become our Expert ?</h3>
              <h5 className='text-md text-center mt-1 font-bold'>Register here</h5>
            </div>
          </div>
          <div className='bg-[#fdfcfc] hidden md:flex md:justify-center items-center	 shadow-lg 	  w-2/4 rounded-r-lg  '>
            <div>
              <h3 className='text-2xl mt-2 text-dark'>Want to become our Expert ?</h3>
              <h5 className='text-md text-center mt-1 font-bold'>Register here</h5>
            </div>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default Register