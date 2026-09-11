import axios from "axios";
import { baseURL } from "./API";

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Accept-Language"] =
      localStorage.getItem("selected_language") || "en";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
