import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Auth API
export const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  signup: (name, email, password, address) =>
    api.post("/auth/signup", { name, email, password, address }),
  updatePassword: (currentPassword, newPassword, token) =>
    api.patch(
      "/auth/password",
      { currentPassword, newPassword },
      { headers: { Authorization: `Bearer ${token}` } }
    ),
  getMe: (token) =>
    api.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } }),
};

// Admin API
export const adminAPI = {
  getDashboardStats: (token) =>
    api.get("/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getUsers: (token, filters) =>
    api.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
      params: filters,
    }),
  getStores: (token, filters) =>
    api.get("/admin/stores", {
      headers: { Authorization: `Bearer ${token}` },
      params: filters,
    }),
  createUser: (token, userData) =>
    api.post("/admin/users", userData, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  createStore: (token, storeData) =>
    api.post("/admin/stores", storeData, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// Store API for normal users and store owners
export const storeAPI = {
  getStores: (token, filters) =>
    api.get("/stores", {
      headers: { Authorization: `Bearer ${token}` },
      params: filters,
    }),
  rateStore: (token, storeId, rating) =>
    api.post(
      `/stores/${storeId}/rate`,
      { rating },
      { headers: { Authorization: `Bearer ${token}` } }
    ),
  getOwnerDashboard: (token) =>
    api.get("/stores/owner/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// Interceptors to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptors to handle resposnes and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
