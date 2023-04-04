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

export const registerOtpApi= (user,otp)=>axios.post('user/verify-otp',{...user,otp:otp.otp})

export const loginApi= (user)=>axios.post('user/login',user)

export const loginOtpApi=(user)=>axios.post('user/verify-login-otp',user)

export const fetchServiceApi= ()=>axios.get('user/services')

// booking
export const addBookingApi=(booking)=> axios.post('user/bookings',booking,getToken('raw'))
export const viewBookings=(id)=>axios.get(`user/bookings/${id}`,getToken('raw'))
export const cancelBooking=(id)=>axios.patch(`user/bookings/${id}`,{},getToken('raw'))

//profile
export const updateProfileImage=(file,id)=>axios.put(`user/profile/${id}`,file,getToken('form'))

export const updateProfile=(data,id)=>axios.patch(`user/profile/${id}`,data,getToken('raw'))




