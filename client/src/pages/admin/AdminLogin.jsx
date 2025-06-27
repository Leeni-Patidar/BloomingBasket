"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { toast } from "react-toastify"

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

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
        // Check if user is admin (this would be returned from the login API)
        toast.success("Admin login successful!")
        navigate("/admin/products")
      } else {
        toast.error(result.message || "Invalid admin credentials")
      }
    } catch (error) {
      toast.error("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <i className="fas fa-shield-alt fa-3x text-success"></i>
                  </div>
                  <h2 className="text-success">Admin Login</h2>
                  <p className="text-muted">Access the admin dashboard</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Admin Email
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

                  <div className="mb-4">
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
                      placeholder="Enter admin password"
                    />
                  </div>

                  <button type="submit" className="btn btn-success w-100 mb-3" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Signing In...
                      </>
                    ) : (
                      "Sign In to Admin Panel"
                    )}
                  </button>
                </form>

                <div className="text-center">
                  <small className="text-muted">Authorized personnel only. All access is logged and monitored.</small>
                </div>

                <hr className="my-4" />

                <div className="text-center">
                  <a href="/" className="text-success text-decoration-none">
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to Main Site
                  </a>
                </div>
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="card mt-3 border-warning">
              <div className="card-body">
                <h6 className="card-title text-warning">
                  <i className="fas fa-info-circle me-2"></i>
                  Demo Credentials
                </h6>
                <p className="card-text small mb-2">
                  <strong>Email:</strong> admin@bloomingbasket.com
                </p>
                <p className="card-text small mb-0">
                  <strong>Password:</strong> admin123
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
