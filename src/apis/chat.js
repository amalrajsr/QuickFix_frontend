import axios from "../config/axios";

const getToken = (role) => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(role)}`,
    },
    params: { role: role },
  };
};

export const sendConverstaionsApi = (role, id, data) =>
  axios.post(`chat/conversations/${id}`, data, getToken(role));

// user
export const fetchConversationsApi = (id) =>
  axios.get(`chat/conversations/${id}`, getToken("user"));
//admin
export const fetchAllConversationsApi = () =>
  axios.get(`chat/conversations`, getToken("admin"));
