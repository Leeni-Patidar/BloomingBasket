import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const API = "http://localhost:5001/api/auth";

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    if (step === 2 && resendDisabled && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }

    if (timer === 0) {
      setResendDisabled(false);
    }
  }, [step, timer, resendDisabled]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOTP = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/send-otp`, {
        name: formData.name,
        email: formData.email,
      });
      alert(res.data.message);
      setStep(2);
      setTimer(30);
      setResendDisabled(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API}/forgot-password`, {
        email: formData.email,
        otp: formData.otp,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      alert(response.data.message || "OTP verified!");
      setStep(3);
    } catch (error) {
      console.error("OTP verification failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
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
            <div className="mt-10 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-8 md:p-10 lg:p-12 shadow-xl">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                <p>Join Blooming Basket today</p>
              </div>

              {/* STEP 1: Name & Email */}
              {step === 1 && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-black rounded-lg px-4 py-3 focus:border-pink-400 focus:ring-4 focus:ring-pink-200"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-black rounded-lg px-4 py-3 focus:border-pink-400 focus:ring-4 focus:ring-pink-200"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={sendOTP}
                    disabled={loading}
                    className="w-full button-bg px-6 py-3 text-lg font-semibold rounded-lg button-bg:hover disabled:opacity-60"
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </button>
                </>
              )}

              {/* STEP 2: OTP */}
              {step === 2 && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">OTP</label>
                    <input
                      type="text"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      className="w-full border-2 border-black rounded-lg px-4 py-3 focus:border-pink-400 focus:ring-4 focus:ring-pink-200"
                    />
                  </div>

                  <p className="text-sm mb-2">
                    {resendDisabled
                      ? `Resend OTP in ${timer}s`
                      : "Didn't receive OTP?"}
                  </p>

                  <button
                    type="button"
                    onClick={sendOTP}
                    disabled={resendDisabled || loading}
                    className={`text-sm font-medium text-[#ba54a9] mb-4 ${
                      resendDisabled ? "opacity-50 cursor-not-allowed" : "hover:underline"
                    }`}
                  >
                    Resend OTP
                  </button>

                  <button
                    type="button"
                    onClick={verifyOTP}
                    disabled={loading}
                    className="w-full button-bg px-6 py-3 text-lg font-semibold rounded-lg button-bg:hover disabled:opacity-60"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </>
              )}

              {/* STEP 3: Password */}
              {step === 3 && (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full border-2 border-black rounded-lg px-4 py-3 focus:border-pink-400 focus:ring-4 focus:ring-pink-200"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={registerUser}
                    disabled={loading}
                    className="w-full button-bg px-6 py-3 text-lg font-semibold rounded-lg button-bg:hover disabled:opacity-60"
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                </>
              )}

              {/* Navigation Links */}
              <div className="text-center mt-6">
                <div className="flex justify-between text-sm">
                  <a href="/" className="text-[#ba54a9] hover:text-[#da81a4] hover:underline">
                    Back to Home
                  </a>
                  <a href="/login" className="text-[#ba54a9] hover:text-[#da81a4] hover:underline">
                    Already have an account? Sign In
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
