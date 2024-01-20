import axios from "axios";

axios.defaults.baseURL = "https://hannas-pp5-44ecef85e05c.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();