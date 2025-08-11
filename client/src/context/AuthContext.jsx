import { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);
  const hasFetchedUser = useRef(false);

  const API = "https://bloomingbasket-server.onrender.com";
  axios.defaults.baseURL = API;
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (token && !hasFetchedUser.current) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/auth/is-auth");
      if (res.data?.user) {
        setUser(res.data.user);
        hasFetchedUser.current = true;
      } else {
        logout();
      }
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { token: receivedToken, user, message } = res.data;
      localStorage.setItem("token", receivedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${receivedToken}`;
      setToken(receivedToken);
      setUser(user);
      hasFetchedUser.current = true;
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
      const res = await axios.post("/api/auth/register", { name, email, phone, password });
      const { token: receivedToken, user, message } = res.data;
      localStorage.setItem("token", receivedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${receivedToken}`;
      setToken(receivedToken);
      setUser(user);
      hasFetchedUser.current = true;
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
    setToken("");
    setUser(null);
    hasFetchedUser.current = false;
    delete axios.defaults.headers.common["Authorization"];
    toast.info("Logged out successfully.");
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
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
