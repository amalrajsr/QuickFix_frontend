import axios from "axios";
const BASEURL= 'http://localhost:7889/api/v1/'

const instance=axios.create({
    baseURL:BASEURL
})

export default instance