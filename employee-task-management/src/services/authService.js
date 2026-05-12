import api from "./api";

// Login API
export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

// Register API
export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// Forgot Password — sends reset email
export const forgotPasswordApi = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

// Reset Password with token
export const resetPasswordApi = async (token, password) => {
  const response = await api.post(`/auth/reset-password/${token}`, {
    password,
  });
  return response.data;
};

// Google OAuth — redirect to backend
export const initiateGoogleLogin = () => {
  const baseUrl = (
    import.meta.env.VITE_API_URL ||
    "https://employee-task-management-x5fl.onrender.com/api"
  ).replace(/\/api$/, "");
  window.location.href = `${baseUrl}/api/auth/google`;
};