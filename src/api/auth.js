import { data } from "react-router-dom";
import API, { authHeader } from "./axios";



export const signupUser = (data) => API.post("/api/auth/signup", data);
export const loginUser = (data) => API.post("/api/auth/login", data);
export const getProfile = (config) => API.get("/api/auth/profile", config);
export const getAdmin = (config) => API.get("/api/auth/admin", config);
export const changePassword = (data) =>
  API.put("/change-password", data, authHeader());
export const forgotPassword = (email) => {
  return API.post("/api/auth/forgot-password", {
    email,
  });
};

export const resetPassword = (token, password) => {
  return API.post(`/api/auth/reset-password/${token}`, {
    password,
  });
};


export const refreshAccessToken = (tokenData) => API.post("/api/auth/refresh", tokenData);
