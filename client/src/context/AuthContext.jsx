import { createContext, useState, useEffect } from "react"
import axios from "axios"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem("token"))

  const API = "http://localhost:5000"

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
      const res = await axios.get(`${API}/api/auth/me`)
      setUser(res.data)
    } catch (err) {
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, { email, password })
      const { token, user } = res.data
      localStorage.setItem("token", token)
      setToken(token)
      setUser(user)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed"
      return { success: false, message: msg }
    }
  }

  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${API}/api/auth/register`, { name, email, password })
      const { token, user } = res.data
      localStorage.setItem("token", token)
      setToken(token)
      setUser(user)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed"
      return { success: false, message: msg }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common["Authorization"]
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
