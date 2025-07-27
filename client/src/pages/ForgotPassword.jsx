import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; // optional icons

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/send-otp", { email });
      toast.success(res.data.message || "OTP sent to your email.");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/verify-otp", { email, otp });
      toast.success(res.data.message || "OTP verified.");
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/reset-password", {
        email,
        password: newPassword,
      });
      toast.success(res.data.message || "Password updated.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

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
                <h1 className="text-3xl font-bold">
                  {step === 1 && "Forgot Password"}
                  {step === 2 && "Verify OTP"}
                  {step === 3 && "Reset Password"}
                </h1>
              </div>

              {step === 1 && (
                <form onSubmit={handleSendOTP}>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border-2 border-black rounded-lg px-4 py-3 mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full button-bg px-6 py-3 text-lg font-semibold rounded-lg"
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleVerifyOTP}>
                  <label htmlFor="otp" className="block text-sm font-medium mb-1">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    className="w-full border-2 border-black rounded-lg px-4 py-3 mb-4"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full button-bg px-6 py-3 text-lg font-semibold rounded-lg"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </form>
              )}

              {step === 3 && (
                <form onSubmit={handleResetPassword}>
                  <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                    New Password
                  </label>
                  <div className="relative mb-4">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="newPassword"
                      className="w-full border-2 border-black rounded-lg px-4 py-3 pr-12"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full button-bg px-6 py-3 text-lg font-semibold rounded-lg"
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </form>
              )}

              <div className="text-center mt-6 text-sm">
                <Link to="/" className="text-[#ba54a9] hover:underline mr-4">
                  Back to Home
                </Link>
                <Link to="/login" className="text-[#ba54a9] hover:underline">
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
