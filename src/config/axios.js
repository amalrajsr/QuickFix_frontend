import axios from "axios";

//const BASEURL ='https://quickfix-api.amalraj.tech/api/v1'
 const BASEURL ='http://localhost:7889/api/v1'

const instance = axios.create({
  baseURL: BASEURL,
});

export default instance;
