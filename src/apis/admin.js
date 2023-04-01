import axios from "../config/axios";

export const getToken = (type) => {
  if (type === "form") {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin")}`,
        "Content-Type": "multipart/form-data",
      },
    };
  } else {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin")}`,
      },
    };
  }
};

//admin
export const adminLoginApi = (adminData) =>
  axios.post("admin/login", adminData);

// user management
export const getusersApi = () => axios.get("/admin/users", getToken("raw"));

export const blockUserApi = (id) =>
  axios.patch(`/admin/users`, { id: id }, getToken("raw"));

// service management
export const addServiceApi = (service) => axios.post("/admin/services", service, getToken("form"));

export const getServicesApi = async () => {
  const { data } = await axios.get("/admin/services", getToken("raw"));

  return data;
};

export const editServiceApi = (id, serviceData) => {
  return axios.put(`/admin/services/${id}`, serviceData, getToken("form"));
};

export const getSingleServiceApi = (id) => axios.get(`/admin/services/${id}`, getToken("raw"));

export const deleteServiceApi = (id) => axios.delete(`/admin/services/${id}`, getToken("raw"));


// location management

export const fetchLocationApi = () => axios.get("/admin/locations", getToken("raw"));
export const blockLocationApi=(id)=>axios.patch(`/admin/locations/${id}`,{},getToken("raw"))
export const editLocationApi=(id,location)=>axios.put(`/admin/locations/${id}`,location,getToken("raw"));
export const addLocationApi = (location) => axios.post("/admin/locations", location, getToken("raw"));
