import { apiClient } from "./apiClient.js";

export async function getTransactions() {
  const { data } = await apiClient.get("/transactions");
  return data.transactions;
}

export async function createTransaction(payload) {
  const { data } = await apiClient.post("/transactions", payload);
  return data.transaction;
}

export async function updateTransaction({ id, payload }) {
  const { data } = await apiClient.put(`/transactions/${id}`, payload);
  return data.transaction;
}

export async function deleteTransaction(id) {
  const { data } = await apiClient.delete(`/transactions/${id}`);
  return data;
}

export async function getMonthlySummary(params) {
  const { data } = await apiClient.get("/transactions/monthly-summary", { params });
  return data;
}

export async function getCategories() {
  const { data } = await apiClient.get("/categories");
  return data.categories;
}

export async function uploadProfilePicture(file) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post("/upload/profile-picture", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}

export async function getAdminOverview() {
  const { data } = await apiClient.get("/admin/overview");
  return data.overview;
}

export async function getUsers() {
  const { data } = await apiClient.get("/users");
  return data.users;
}

export async function createUser(payload) {
  const { data } = await apiClient.post("/users", payload);
  return data.user;
}

export async function updateUser({ id, payload }) {
  const { data } = await apiClient.put(`/users/${id}`, payload);
  return data.user;
}

export async function deleteUser(id) {
  const { data } = await apiClient.delete(`/users/${id}`);
  return data;
}
