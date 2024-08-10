import Axios from "axios";

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axios.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const alldata = localStorage.getItem("token");
      console.log(alldata, "JSON.parse(alldata) JSON.parse(alldata)");

      const token = alldata ? alldata : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
