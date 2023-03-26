import React, { useState } from 'react'
import { adminSchema } from '../../validations/Validation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer, toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import Button from '../../components/UI/Button';
import { adminLoginApi } from '../../apis/admin';
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {
  const admin=localStorage.getItem('admin')
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(adminSchema)
      });

      const onHandleSubmit=async(adminData)=>{
         try{
          
            setLoading(true)
            const {data}=await adminLoginApi(adminData)
            console.log(data);
            setLoading(false)
            if(data.admin && data.token){
                localStorage.setItem('admin',data.token)
                navigate('/admin/dashboard')
                
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
    
  return admin?(<Navigate to={'/admin/dashboard'}/>): (
    <>
      <div className=' mt-20 mb-5  flex items-center justify-center p-10'>
        <div className='bg-light h-full py-5 md:p-10 md:w-[430px] md:shadow-md  rounded-l-lg'>
          <h3 className='font-bold text-3xl text-center mt-5 my-2 '>Admin panel</h3>
          <form onSubmit={handleSubmit(onHandleSubmit)} className='my-auto mx-auto text-center '>
            <input type='text' name={'name'}  className='py-2 mt-5 focus:outline-slate-300 rounded-md px-10 mx-3' {...register('name')} />
            <p className='text-slate-400'>{errors.name?.message}</p>
            <input type='password' name={'password'}  className='py-2 mt-5 focus:outline-slate-300 rounded-md px-10 mx-3' {...register('password')} />
            <p className='text-slate-400'>{errors.password?.message}</p>
            <div className='mt-6'>{loading ?<button disabled className='bg-dark rounded-lg hover:bg-gray-800 text-white py-2  px-6'><ClipLoader color="#ffff"  size={20} /></button>: <Button>Login</Button>} </div>

          </form>
        </div>
    </div>
    <ToastContainer/>
    </>
  )
}

export default Login
