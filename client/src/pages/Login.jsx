"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify"

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })
  const [loading, setLoading] = useState(false)

  const { login, register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || "/"

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        // Login
        const result = await login(formData.email, formData.password)
        if (result.success) {
          toast.success(result.message)
          navigate(from, { replace: true })
        } else {
          toast.error(result.message)
        }
      } else {
        // Register
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match")
          return
        }

        const result = await register(formData.name, formData.email, formData.password, formData.phone)
        if (result.success) {
          toast.success(result.message)
          navigate(from, { replace: true })
        } else {
          toast.error(result.message)
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    })
  }

  return (
    <div className="login-page min-vh-100 d-flex align-items-center py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="login-card card shadow-lg border-0">
              <div className="card-body p-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="login-icon mb-3">
                    <i className="fas fa-seedling text-primary" style={{ fontSize: "3rem" }}></i>
                  </div>
                  <h2 className="h3 fw-bold text-primary">{isLogin ? "Welcome Back!" : "Join Our Garden"}</h2>
                  <p className="text-muted">
                    {isLogin
                      ? "Sign in to your account to continue shopping"
                      : "Create an account to start your flower journey"}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label fw-medium">
                        Full Name
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-user"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-medium">
                      Email Address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label fw-medium">
                        Phone Number
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-phone"></i>
                        </span>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-medium">
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-lock"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        minLength="6"
                        required
                      />
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label fw-medium">
                        Confirm Password
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-lock"></i>
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm your password"
                          minLength="6"
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary w-100 py-2 mb-3" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        {isLogin ? "Signing In..." : "Creating Account..."}
                      </>
                    ) : (
                      <>
                        <i className={`fas ${isLogin ? "fa-sign-in-alt" : "fa-user-plus"} me-2`}></i>
                        {isLogin ? "Sign In" : "Create Account"}
                      </>
                    )}
                  </button>

                  {/* Toggle Mode */}
                  <div className="text-center">
                    <p className="text-muted mb-0">
                      {isLogin ? "Don't have an account?" : "Already have an account?"}
                      <button
                        type="button"
                        className="btn btn-link p-0 ms-1 text-primary fw-medium"
                        onClick={toggleMode}
                      >
                        {isLogin ? "Sign Up" : "Sign In"}
                      </button>
                    </p>
                  </div>
                </form>

                {/* Demo Credentials */}
                {isLogin && (
                  <div className="mt-4 p-3 bg-light rounded">
                    <small className="text-muted">
                      <strong>Demo Credentials:</strong>
                      <br />
                      Email: demo@bloomingbasket.com
                      <br />
                      Password: demo123
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
