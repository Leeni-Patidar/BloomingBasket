import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API =
  window.location.hostname === "localhost"
    ? "http://localhost:5001"
    : "https://bloomingbasket-server.onrender.com";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================
  // ✅ Check Authentication
  // ==========================
  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${API}/api/auth/is-auth`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error("Auth fetch error:", err);
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // ==========================
  // ✅ Login
  // ==========================
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, { email, password });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        return { success: true, message: res.data.message, user: res.data.user };
      } else {
        return { success: false, message: "Invalid server response" };
      }
    } catch (err) {
      console.error("Login error:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // ==========================
  // ✅ Logout
  // ==========================
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // ==========================
  // ✅ Register
  // ==========================
  const register = async (formData) => {
    try {
      const res = await axios.post(`${API}/api/auth/register`, formData);
      return { success: true, message: res.data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
