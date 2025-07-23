"use client"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
// import { AuthContext } from "../../../context/AuthContext"
import { toast } from "react-toastify"
// import styles from "./AdminLogin.module.css"

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const { login, user } = useContext(AuthContext)
  const navigate = useNavigate()

  // Redirect if already logged in as admin
  if (user && user.role === "admin") {
    navigate("/admin/products")
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await login(formData.email, formData.password)
      if (result.success) {
        // Check if user is admin after login
        if (user && user.role === "admin") {
          navigate("/admin/products")
        } else {
          toast.error("Access denied. Admin privileges required.")
        }
      } else {
        toast.error(result.message || "Login failed. Please try again.")
      }
    } catch (error) {
      toast.error("Admin login error: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full md:w-1/2 lg:w-2/5">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-md">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-white">
                  <i className="fas fa-user-shield"></i>
                </div>
                <h2 className="text-gray-800 font-bold mb-2">Admin Login</h2>
                <p className="text-gray-600 m-0">Access the administrative dashboard</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#667eea] focus:ring-4 focus:ring-[#667eea]/25"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="admin@bloomingbasket.com"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#667eea] focus:ring-4 focus:ring-[#667eea]/25"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-br from-[#667eea] to-[#764ba2] border-none text-white px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:transform-none"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="animate-spin h-5 w-5 mr-2 border-b-2 border-white rounded-full"
                        role="status"
                      ></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt mr-2"></i>
                      Sign In
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-8 pt-8 border-t border-gray-200">
                <p className="text-gray-600 text-sm m-0">
                  <i className="fas fa-info-circle mr-2"></i>
                  For demo purposes, use any email with password "admin123"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
