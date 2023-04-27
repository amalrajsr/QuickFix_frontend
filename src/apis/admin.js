import axios from "../config/axios";

 const getToken = (type) => {
  if (type === "form") {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin")}`,
        "Content-Type": "multipart/form-data",
      },
      params:{role:'admin'}

    };
  } else {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin")}`,
      },
      params:{role:'admin'}

    };
  }
};

//admin
export const adminLoginApi = (adminData) =>axios.post("admin/login", adminData);

// user management
export const getusersApi = () => axios.get("/admin/users", getToken("raw"));

export const blockUserApi = (id) =>axios.patch(`/admin/users`, { id: id }, getToken("raw"));

// service management
export const addServiceApi = (service) => axios.post("/admin/services", service, getToken("form"));

export const getServicesApi = async () => {
  const { data } = await axios.get("/admin/services", getToken("raw"));

  return data;
};

export const editServiceApi = (id, serviceData) => axios.put(`/admin/services/${id}`, serviceData, getToken("form"));
export const getSingleServiceApi = (id) => axios.get(`/admin/services/${id}`, getToken("raw"));
export const deleteServiceApi = (id) => axios.delete(`/admin/services/${id}`, getToken("raw"));


// location management
export const fetchLocationApi = () => axios.get("/admin/locations", getToken("raw"));
export const blockLocationApi=(id)=>axios.patch(`/admin/locations/${id}`,{},getToken("raw"))
export const editLocationApi=(id,location)=>axios.put(`/admin/locations/${id}`,location,getToken("raw"));
export const addLocationApi = (location) => axios.post("/admin/locations", location, getToken("raw"));

// booking management
export const fetchBookingApi=()=>axios.get('/admin/bookings',getToken('raw'))
export const assignExpertApi=(bookingId,expertId)=>axios.patch(`/admin/bookings/${bookingId}`,{expert:expertId},getToken('raw'))
export const changeExpertApi=(bookingId,data)=>axios.put(`/admin/bookings/${bookingId}`,data,getToken('raw'))

//expert management
export const fetchExpertApi=()=>axios.get('/admin/experts',getToken('raw'))
export const blockUnblockExpertApi=(id)=>axios.patch(`/admin/experts/${id}`,{},getToken("raw"))
export const addExpert=(expert)=>axios.post('/admin/experts',expert,getToken('raw'))

//review
export const fetchReviewsApi=()=>axios.get('/admin/reviews',getToken('raw'))
export const deleteReviewApi = (id) => axios.delete(`/admin/reviews/${id}`, getToken("raw"));

//dashboard
export const fetchDashboardDetails=()=>axios.get('/admin/dashboardDetails',getToken("raw"))
export const fetchCount=()=>axios.get('/admin/getCount',getToken("raw"))