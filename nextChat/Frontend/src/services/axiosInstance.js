import axios from "axios";
const API = axios.create({
  baseURL:import.meta.env.VITE_API_URL1,
  //import.meta.env.VITE_API_URL2,
  withCredentials: true
});
 

export default API;
