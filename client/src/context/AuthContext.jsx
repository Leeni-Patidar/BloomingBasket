"use client"

import { createContext, useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem("token"))

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      getCurrentUser()
    } else {
      setLoading(false)
    }
  }, [token])

  const getCurrentUser = async () => {
    try {
      const response = await axios.get("/api/auth/me")
      setUser(response.data)
    } catch (error) {
      console.error("Get current user error:", error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password })
      const { token, user } = response.data

      localStorage.setItem("token", token)
      setToken(token)
      setUser(user)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      alert("Login successful!")
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || "Login failed"
      alert(message)
      return { success: false, message }
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await axios.post("/api/auth/register", { name, email, password })
      const { token, user } = response.data

      localStorage.setItem("token", token)
      setToken(token)
      setUser(user)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      alert("Registration successful!")
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed"
      alert(message)
      return { success: false, message }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common["Authorization"]
    alert("Logged out successfully")
  }

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put("/api/auth/profile", profileData)
      setUser(response.data.user)
      alert("Profile updated successfully!")
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || "Profile update failed"
      alert(message)
      return { success: false, message }
    }
  }

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
