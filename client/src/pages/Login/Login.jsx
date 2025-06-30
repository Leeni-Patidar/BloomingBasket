"use client"

import { useState, useContext } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import styles from "./Login.module.css"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || "/"

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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const userData = {
        id: 1,
        name: "John Doe",
        email: formData.email,
        role: "user",
      }

      login(userData)
      navigate(from, { replace: true })
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className={styles.loginCard}>
              <div className={styles.loginHeader}>
                <h2>{isSignUp ? "Create Account" : "Welcome Back"}</h2>
                <p>{isSignUp ? "Join Blooming Basket today" : "Sign in to your account"}</p>
              </div>

              <form onSubmit={handleSubmit}>
                {isSignUp && (
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input type="text" className="form-control" id="name" name="name" required />
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
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
                  />
                </div>

                {!isSignUp && (
                  <div className="mb-3 text-end">
                    <Link to="/forgot-password" className={styles.forgotLink}>
                      Forgot Password?
                    </Link>
                  </div>
                )}

                <button type="submit" className={`btn ${styles.loginBtn} w-100`} disabled={loading}>
                  {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
                </button>
              </form>

              <div className={styles.loginFooter}>
                <p>
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}
                  <button type="button" className={styles.toggleBtn} onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
