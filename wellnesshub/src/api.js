import axios from "axios";

const API = axios.create({
  baseURL: "https://9758a6d1-dff4-44c2-b23c-70f10191aa98-00-klyha8bajapv.pike.replit.dev/api",
});

// Attach token to protected routes
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
