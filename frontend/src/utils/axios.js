import axios from "axios";
const apiInstance = axios.create({
  baseURL: "http://127.0.0.1:3000/cmms/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export default apiInstance;
