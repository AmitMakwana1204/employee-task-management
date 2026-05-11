import axios from "axios";

const BASE_URL = (
  import.meta.env.VITE_API_URL ||
  "https://employee-task-management-x5fl.onrender.com/api"
).replace(/\/api$/, "") + "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {

    config.headers.Authorization =
      `Bearer ${token}`;

  }

  return config;

});

export default api;
