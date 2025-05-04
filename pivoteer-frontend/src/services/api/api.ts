// api.ts
import axios from "axios";

// const apiUrl = import.meta.env.VITE_BASE_API_URL;
const apiUrl = "http://localhost:8080/api";

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;