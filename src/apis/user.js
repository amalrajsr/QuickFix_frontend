import axios from "../config/axios"

export const getToken = (type) => {
    if (type === "form") {
      return {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
          "Content-Type": "multipart/form-data",
        },
      };
    } else {
      return {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      };
    }
  };
  
// user
export const registerApi= (user)=>axios.post('user/register',user)

export const registerOtpApi= (otp)=>axios.post('user/verify-otp',otp)

export const loginApi= (user)=>axios.post('user/login',user)

export const loginOtpApi=(user)=>axios.post('user/verify-login-otp',user)

export const fetchServiceApi= ()=>axios.get('user/services')

// booking
export const addBookingApi=(booking)=> axios.post('user/bookings',booking,getToken('raw'))
