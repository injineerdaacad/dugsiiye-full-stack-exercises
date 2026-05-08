import { apiClient } from "./apiClient.js";

export async function registerUser(payload) {
  const { data } = await apiClient.post("/auth/sign-up", payload);
  return data;
}

export async function loginUser(payload) {
  const { data } = await apiClient.post("/auth/login", payload);
  return data;
}

export async function getProfile() {
  const { data } = await apiClient.get("/auth/profile");
  return data.user;
}

export async function logoutUser() {
  const { data } = await apiClient.post("/auth/logout");
  return data;
}

