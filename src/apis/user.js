import axios from "../config/axios"

 const getToken = (type,queryData) => {
    if (type === "form") {
      return {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
          "Content-Type": "multipart/form-data",
        },
        params:{role:'user'}

      };
    } else if(type==='raw') {
      return {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
        params:{role:'user'}
      };
    }else{
      return {

        params:queryData
      };
    }
  };
  
// user
export const registerApi= (user)=>axios.post('user/register',user)

export const registerOtpApi= (user,otp)=>axios.post('user/verify-otp',{...user,otp:otp.otp})

export const loginApi= (user)=>axios.post('user/login',user)

export const loginOtpApi=(user)=>axios.post('user/verify-login-otp',user)

export const resendOtpApi=(user)=>axios.post('user/resend-otp',user)

export const fetchServiceApi= ()=>axios.get('user/services')

export const trendingServicesApi=()=>axios.get('user/trending-services')

// booking
export const addBookingApi=(booking)=> axios.post('user/bookings',booking,getToken('raw'))
export const bookingLocationApi=()=>axios.get('user/booking/locations',getToken('raw'))
export const viewBookings=(id)=>axios.get(`user/bookings/${id}`,getToken('raw'))
export const cancelBooking=(id)=>axios.patch(`user/bookings/${id}`,{},getToken('raw'))

//profile
export const updateProfileImage=(file,id)=>axios.put(`user/profile/${id}`,file,getToken('form'))

export const updateProfile=(data,id)=>axios.patch(`user/profile/${id}`,data,getToken('raw'))

//payment
export const paymentApi=(bookingID)=>axios.post('user/payment',{id: bookingID},getToken('raw'))
export const paymentSuccessApi=(data)=>axios.post('user/payment/success',data,getToken('raw'))


//fetch no.of expert per service
export const fetchExpertsByService=(serviceId,name)=>axios.get(`user/services/${serviceId}&${name}`,getToken('raw'))

//review
export const addReviewApi=(review)=>axios.post('user/reviews',review,getToken('raw'))
export const fetchReviewApi=(bookingID)=>axios.get(`user/reviews/${bookingID}`,getToken('raw'))
export const updateReviewApi=(reviewID,data)=>axios.patch(`user/reviews/${reviewID}`,data,getToken('raw'))
export const deleteReviewApi=(reviewID)=>axios.delete(`user/reviews/${reviewID}`,getToken('raw'))
export const fetchReviewsByServiceApi=(serviceId)=>axios.get(`user/reviews`,getToken('query',{serviceId}))



