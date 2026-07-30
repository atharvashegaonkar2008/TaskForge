import api from "./api";

// Register User
export const signupUser = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};