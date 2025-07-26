

import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setError("")

    try {
      const res = await axios.post("/api/auth/forgot-password", { email })
      setMessage(res.data.message || "Reset link sent to your email")
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-y-auto py-10"
      style={{ backgroundImage: "url('/login1.jpg')" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl">
              <div className="text-center mb-6">
                <h1 className="text-3xl md:text-[2rem] font-bold mb-2">Forgot Password</h1>
                <p>Enter your email to receive a reset link</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full border-2 border-black rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ff9a9e] focus:ring-4 focus:ring-[#ff9a9e]/25"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4 flex justify-between items-center text-sm">
  <Link
    to="/"
    className="text-[#ba54a9] no-underline hover:text-[#da81a4] hover:underline"
  >
    Back to Home
  </Link>

  <Link
    to="/forgot-password"
    className="text-[#ba54a9] no-underline hover:text-[#da81a4] hover:underline"
  >
    Back To Login
  </Link>
</div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full button-bg px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 button-bg:hover disabled:opacity-70"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              {message && (
                <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
              )}
              {error && (
                <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
