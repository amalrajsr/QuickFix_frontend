import axios from "../config/axios"

// user
export const registerApi= (user)=>
axios.post('user/register',user)

export const registerOtpApi= (otp)=>
axios.post('user/verify-otp',otp)

export const loginApi= (user)=>
axios.post('user/login',user)

export const loginOtpApi=(user)=>
axios.post('user/verify-login-otp',user,{withCredentials:true})

export const fetchServiceApi= ()=>
axios.get('user/services')


