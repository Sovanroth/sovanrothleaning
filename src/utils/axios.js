import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:3000" });
// const axiosInstance = axios.create({ baseURL: "http://54.179.248.23:8000" });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject("Something went wrong");
  }
);

export default axiosInstance;
