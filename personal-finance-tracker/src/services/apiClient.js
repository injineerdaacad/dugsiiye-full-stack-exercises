import axios from "axios";

import { useAuthStore } from "../store/authStore.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || "Request failed";
    const status = error.response?.status;
    const authErrorMessages = ["jwt expired", "invalid signature", "invalid token", "jwt malformed", "invalid or expired token"];
    const isAuthError = status === 401 || authErrorMessages.some((text) => message.toLowerCase().includes(text));

    if (isAuthError && window.location.pathname !== "/login") {
      useAuthStore.getState().clearAuth();
      window.location.replace("/login");
    }

    return Promise.reject(new Error(message));
  }
);
