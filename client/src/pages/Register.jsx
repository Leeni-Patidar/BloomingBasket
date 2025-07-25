"use client"

import { useState, useContext } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || "/"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await register(formData.name, formData.email, formData.password)

      if (result.success) {
        navigate(from, { replace: true })
      }
    } catch (error) {
      console.error("Register error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/login1.jpg')" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className=" mt-10 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl">
              <div className="text-center mb-2">
                <h1 className="text-3xl md:text-[2rem] font-bold mb-2 ">Create Account</h1>
                <p className="">Join Blooming Basket today</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block  text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full border-2 border-black rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ff9a9e] focus:ring-4 focus:ring-[#ff9a9e]/25"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block  text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full border-2 border-black rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ff9a9e] focus:ring-4 focus:ring-[#ff9a9e]/25"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full border-2 border-black rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ff9a9e] focus:ring-4 focus:ring-[#ff9a9e]/25"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full button-bg px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 button-bg:hover disabled:opacity-70"
                >
                  {loading ? "Please wait..." : "Create Account"}
                </button>
              </form>

              <div className="text-center mt-2  border-0 border-gray-200">
                <span className="">
                  Already have an account?{" "}
                  <Link to="/login" className="text-[#ba54a9] font-semibold underline hover:text-[#da81a4]">
                    Sign In
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
