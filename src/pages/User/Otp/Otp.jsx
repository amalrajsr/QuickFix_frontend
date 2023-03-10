import React from 'react'
import Footer from '../../../components/User/Footer/Footer'
import Navbar from '../../../components/User/Navbar/Navbar'
import Button from '../../../components/UI/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { otpSchema } from '../../../validations/UserValidation'
import axios from '../../../config/axios'
function Otp() {
const navigate=useNavigate()
const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(otpSchema)
  })

  const onHandleSubmit= async(otp)=>{
    console.log(otp);
      const {data}=axios.post('/user/verify_otp',otp,{withCredentials:true})
      
  }
    return (
        <>
            <Navbar />
            <div className='my-10  flex items-center justify-center p-20'>
                <div className='bg-light flex flex-col item-center mx-10 p-14 '>
                    <span className='text-dark hidden  text-center sm:block'>Enter the Otp recieved on your mobile</span>
                    <span className='text-dark  text-center sm:hidden '>Enter the Otp
                    </span>
                    <form onSubmit={handleSubmit(onHandleSubmit)} className='text-center'>
                <input type='number'  name={'mobile'}  className='py-3 mt-5 focus:outline-slate-300 text-center rounded-md text-2xl mx-auto' {...register('otp')}/>
                <p className='text-slate-400 mt-2'>{errors.mobile?.message}</p>
             <div className='mt-6 p-2 text-center '><Button>Verify Otp</Button> </div> 
                    </form>
             <span className='font-bold text-center mt-3 text-bold'>Resend OTP</span>
                </div>
            </div>
            <Footer />
        </>
    )
    
}

export default Otp