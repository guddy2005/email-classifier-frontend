import axios from "axios";

// Prefer env var for Vercel/Render; fallback to same-origin /api in browsers
export const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (typeof window !== "undefined" ? `${window.location.origin}/api` : "/api");

// Socket URL env or derive from API_BASE_URL by stripping trailing /api
export const SOCKET_URL =
  process.env.REACT_APP_SOCKET_URL ||
  (API_BASE_URL.startsWith("http")
    ? API_BASE_URL.replace(/\/?api\/?$/, "")
    : "");

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add the auth token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
