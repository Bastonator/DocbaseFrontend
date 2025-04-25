import axios from "axios";
import { getAccessToken } from "@/app/lib/actions";

const baseURL = "http://127.0.0.1:8000/api/patients/";

const fromlocal = localStorage.getItem("token");
console.log(fromlocal);

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${fromlocal}`,
  },
});

export default axiosInstance;
