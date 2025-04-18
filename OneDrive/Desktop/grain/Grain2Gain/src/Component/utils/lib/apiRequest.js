import axios from "axios";

const apirequest = axios.create({
//   baseURL: "https://eduved-backend-tpos.onrender.com/api",
  baseURL:"http://localhost:8000/",
  
  withCredentials: true,
});
console.log("API Request Initialized with base URL:", apirequest.defaults.baseURL);
export default apirequest;