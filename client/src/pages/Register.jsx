"use client"

import { useState, useContext } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
// import styles from "../Login/Login.module.css" // Assuming Login.module.css is similar or shared

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
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
        id: 2,
        name: formData.name,
        email: formData.email,
        role: "user",
      }

      // ✅ Save registration flag
      localStorage.setItem("isRegistered", "true")

      // ✅ Log user in
      login(userData)

      // ✅ Navigate to original route or home
      navigate(from, { replace: true })
    } catch (error) {
      console.error("Register error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF2F8] to-white flex items-center py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full md:w-1/2 lg:w-2/5">
            <div className="mt-16 bg-white rounded-2xl p-12 shadow-2xl backdrop-blur-md">
              <div className="text-center mb-8">
                <h2 className="text-gray-800 font-bold mb-2">Create Account</h2>
                <p className="text-gray-600 m-0">Join Blooming Basket today</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ff9a9e] focus:ring-4 focus:ring-[#ff9a9e]/25"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ff9a9e] focus:ring-4 focus:ring-[#ff9a9e]/25"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ff9a9e] focus:ring-4 focus:ring-[#ff9a9e]/25"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-br from-[#da81a4] to-[#fecfef] border-none text-white px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:text-white opacity-70 transform-none"
                  disabled={loading}
                >
                  {loading ? "Please wait..." : "Create Account"}
                </button>
              </form>

              <div className="text-center mt-8 pt-8 border-t border-gray-200">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="bg-transparent border-none text-[#ba54a9] font-semibold ml-2 cursor-pointer underline hover:text-[#da81a4]"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
