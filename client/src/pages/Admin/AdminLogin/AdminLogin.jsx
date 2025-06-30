"use client"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../context/AuthContext"
import { toast } from "react-toastify"
import styles from "./AdminLogin.module.css"

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
      }
    } catch (error) {
      console.error("Admin login error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.adminLogin}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className={styles.loginCard}>
              <div className={styles.loginHeader}>
                <div className={styles.adminIcon}>
                  <i className="fas fa-user-shield"></i>
                </div>
                <h2>Admin Login</h2>
                <p>Access the administrative dashboard</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="admin@bloomingbasket.com"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                  />
                </div>

                <button type="submit" className={styles.loginBtn} disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Sign In
                    </>
                  )}
                </button>
              </form>

              <div className={styles.loginFooter}>
                <p>
                  <i className="fas fa-info-circle me-2"></i>
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
