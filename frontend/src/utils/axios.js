import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("jwt");

const apiInstance = axios.create({
  baseURL: "http://127.0.0.1:3000/cmms/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  credentials: "include",
});
export default apiInstance;
