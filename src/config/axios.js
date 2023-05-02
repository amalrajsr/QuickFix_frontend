import axios from "axios";

const BASEURL = process.env.REACT_APP_ORIGIN_URL;

const instance = axios.create({
  baseURL: BASEURL,
});

export default instance;
