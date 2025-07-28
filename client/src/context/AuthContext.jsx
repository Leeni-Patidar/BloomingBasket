import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:5001";
  axios.defaults.baseURL = API;
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/auth/is-auth");
      if (data?.user) {
        setUser(data.user);
      } else {
        logout();
      }
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { token, user, message } = res.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setToken(token);
      setUser(user);
      toast.success(message || "Login successful!");
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed.";
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const register = async (name, email, phone, password) => {
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        phone,
        password,
      });
      const { token, user, message } = res.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setToken(token);
      setUser(user);
      toast.success(message || "Registration successful!");
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed.";
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    toast.info("Logged out successfully.");
  };

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
