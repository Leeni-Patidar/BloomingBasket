import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // ✅ Configure Axios globally
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

  // ✅ Fetch authenticated user
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/auth/is-auth");
      if (data?.user) {
        setUser(data.user);
      } else {
        logout(); // token invalid
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

  // ✅ Register
  const register = async (name, email, password) => {
    try {
      const res = await axios.post("/api/auth/register", { name, email, password });
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

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    toast.info("Logged out successfully.");
  };

  // ✅ Update profile (if needed)
  const updateProfile = async (profileData) => {
    try {
      const { data } = await axios.put("/api/users/profile", profileData);
      setUser(data.user);
      toast.success("Profile updated.");
      return { success: true };
    } catch (error) {
      toast.error("Failed to update profile.");
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
