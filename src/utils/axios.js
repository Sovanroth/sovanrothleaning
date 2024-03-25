import axios from "axios";

// const axiosInstance = axios.create({ baseURL: "http://localhost:3000" });
const axiosInstance = axios.create({ baseURL: "http://18.143.169.45:3000" });

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
