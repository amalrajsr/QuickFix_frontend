import axios from "../config/axios"

// user
export const registerApi= (user)=>
axios.post('user/register',user)

export const registerOtpApi= (otp)=>
axios.post('user/login',otp)

export const loginApi= (user)=>
axios.post('user/login',user)

export const loginOtpApi=(user)=>
axios.post('user/login',user)

//admin
export const adminLoginApi=(adminData)=>
axios.post('admin/login',adminData)
