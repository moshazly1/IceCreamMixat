import axios from "axios";
import { baseURL, REFRESH_TOKEN } from "./API";
import { getAccessToken, setAccessToken } from "../Auth/tokenStore";

const dashboardAxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

const refreshInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

/* =========================
   REFRESH ACCESS TOKEN
========================= */

export const refreshAccessToken = async () => {
  const response = await refreshInstance.post(REFRESH_TOKEN);

  const newAccessToken =
    response.data?.accessToken || response.data?.access || response.data?.token;

  if (!newAccessToken) {
    throw new Error("Refresh succeeded but no access token was returned.");
  }

  setAccessToken(newAccessToken);

  return newAccessToken;
};

/* =========================
   REFRESH QUEUE
========================= */

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  failedQueue = [];
};

/* =========================
   REQUEST INTERCEPTOR
========================= */

dashboardAxiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Accept-Language"] =
      localStorage.getItem("selected_language") || "en";

    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/* =========================
   RESPONSE INTERCEPTOR
========================= */

dashboardAxiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      originalRequest?.url?.includes(REFRESH_TOKEN)
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => {
            resolve(dashboardAxiosInstance(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await refreshAccessToken();

      processQueue(null);

      return dashboardAxiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default dashboardAxiosInstance;
