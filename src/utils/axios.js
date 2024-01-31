import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:8000" });
// const axiosInstance = axios.create({ baseURL: "http://54.179.248.23:8000" });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
