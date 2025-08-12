import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { email, password } = formData;
    const result = await login(email, password);
    setLoading(false);

    if (result?.success) {
      navigate(from, { replace: true });
    } else {
      setError(result?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/login1.jpg')" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="mt-30 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl">
              <div className="text-center mb-2">
                <h1 className="text-3xl md:text-[2rem] font-bold mb-2">
                  Welcome Back
                </h1>
                <p>Sign in to your account</p>
              </div>

              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border-2 border-black rounded-lg px-4 py-3 bg-transparent focus:bg-transparent focus:shadow-[0_0_0_4px_rgba(186,84,169,0.25)] transition-shadow duration-200"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4 relative">
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full border-2 border-black rounded-lg px-4 py-3 pr-10 text-base"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center top-5"
                    tabIndex={-1}
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
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
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full button-bg px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 button-bg:hover disabled:opacity-70"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Sign In"}
                </button>
              </form>

              <div className="text-center mt-2 border-0 border-gray-200">
                <p>
                  Don't have an account?
                  <Link
                    to="/register"
                    className="text-[#ba54a9] font-semibold ml-2 underline hover:text-[#da81a4]"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
