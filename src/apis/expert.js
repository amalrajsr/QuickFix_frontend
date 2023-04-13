import axios from '../config/axios'

const getToken = () => {
      return {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("expert")}`,
        },
      };
  };


export const expertLoginApi=(data)=>axios.post('expert/login',data)
export const updateExpertProfileApi=(expertId,data)=>axios.patch(`expert/profile/${expertId}`,data,getToken())

//work section
export const viewWorksApi=(expertId)=>axios.get(`expert/works/${expertId}`)
export const updatePaymentApi=(bookingId,payment)=>axios.patch(`expert/works/${bookingId}`,payment)