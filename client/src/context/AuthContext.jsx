import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create Context
export const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  // ✅ Server API Base

  const API =
    window.location.hostname === "localhost"
      ? "http://localhost:5001"
      : "https://bloomingbasket-server.onrender.com";
  // const API = "https://bloomingbasket-server.onrender.com";
  axios.defaults.baseURL = API;
  axios.defaults.withCredentials = true; // 🔑 Allow credentials (cookies)

  // ✅ Set token in headers if available
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // ✅ Fetch Authenticated User
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/auth/is-auth");
      if (res.data?.user) {
        setUser(res.data.user);
      } else {
        logout();
      }
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login
  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { token: receivedToken, user, message } = res.data;
      localStorage.setItem("token", receivedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${receivedToken}`;
      setToken(receivedToken);
      setUser(user);
      toast.success(message || "Login successful!");
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed.";
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  // ✅ Register
  const register = async (name, email, phone, password) => {
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        phone,
        password,
      });
      const { token: receivedToken, user, message } = res.data;
      localStorage.setItem("token", receivedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${receivedToken}`;
      setToken(receivedToken);
      setUser(user);
      toast.success(message || "Registration successful!");
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed.";
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    toast.info("Logged out successfully.");
  };

  // ✅ Update Profile
  const updateProfile = async (profileData) => {
    try {
      const { data } = await axios.put("/api/user/profile", profileData);
      setUser(data.user);
      toast.success("Profile updated.");
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
      return { success: false };
    }
  };

  // ✅ Change Password
  const changePassword = async (oldPassword, newPassword) => {
    try {
      await axios.put("/api/user/change-password", {
        currentPassword: oldPassword,
        newPassword,
      });
      toast.success("Password changed successfully.");
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || "Password change failed.");
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
