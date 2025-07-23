"use client"

import { createContext, useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const API = "http://localhost:5001"

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      // getCurrentUser() // 🔴 DISABLED - This causes logout due to missing route
      setLoading(false) // ✅ Manually mark loading complete
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, { email, password })
      const { token, user, message } = res.data
      localStorage.setItem("token", token)
      setToken(token)
      setUser(user)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      toast.success(message || "Login successful!")
      return { success: true, message }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Please check your credentials."
      toast.error(msg)
      return { success: false, message: msg }
    }
  }

  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${API}/api/auth/register`, { name, email, password })
      const { token, user, message } = res.data
      localStorage.setItem("token", token)
      setToken(token)
      setUser(user)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      toast.success(message || "Registration successful!")
      return { success: true, message }
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed. Please try again."
      toast.error(msg)
      return { success: false, message: msg }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common["Authorization"]
    toast.info("Logged out successfully.")
  }

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put(`${API}/api/users/profile`, profileData)
      setUser(response.data.user)
      toast.success("Profile updated successfully!")
      return { success: true }
    } catch (error) {
      console.error("Profile update error:", error.response?.data?.message || error.message)
      toast.error(error.response?.data?.message || "Failed to update profile.")
      return { success: false }
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}
