// axiosConfig.js
import axios from "axios"
import { toast } from "sonner";
import useAuthStore from "@/store/useAuthStore";

// Add a default config if needed
axios.defaults.withCredentials = true;

// Response Interceptor
axios.interceptors.response.use(
  (response) => response, // pass successful responses
  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
      alert("Session expired. Please login again.");
      toast.error("Session expired. Please login again.");
      window.location.href = "/login"; // redirect to login
    }
    return Promise.reject(error); // keep rejecting so your catch still works
  }
);

export default axios;
