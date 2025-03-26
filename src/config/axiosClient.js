import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://67da45f535c87309f52bbd21.mockapi.io/api/hello", 
});

export default axiosClient;