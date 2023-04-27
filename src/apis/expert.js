import axios from '../config/axios'

const getToken = () => {
      return {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("expert")}`,
        },
        params:{role:'expert'}
      };
  };


export const expertLoginApi=(data)=>axios.post('expert/login',data)
export const updateExpertProfileApi=(expertId,data)=>axios.patch(`expert/profile/${expertId}`,data,getToken())

//work section
export const viewWorksApi=(expertId)=>axios.get(`expert/works/${expertId}`,getToken())
export const updatePaymentApi=(bookingId,payment)=>axios.patch(`expert/works/${bookingId}`,payment,getToken())
export const updatePaymentStatusApi=(bookingId)=>axios.put(`expert/works/${bookingId}`,{},getToken())
//password reset
export const resetPasswordApi=(expertId,password)=>axios.patch(`expert/reset-password/${expertId}`,password,getToken())

//forgot password
export const forgotPasswordApi=(data)=>axios.post('expert/forgot-password',data)
export const forgotPasswordVerifyOtpApi=(data)=>axios.post('expert/forgot-password-verify-otp',data)
export const expertResendOtpApi=(data)=>axios.post('expert/resend-otp',data)
export const forgotPasswordResetApi=(expertId,password)=>axios.put(`expert/reset-password/${expertId}`,password)
