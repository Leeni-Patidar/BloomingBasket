"use client"

import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: {
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      zipCode: user?.address?.zipCode || "",
      country: user?.address?.country || "USA",
    },
  })

  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateProfile(formData)
    } catch (error) {
      console.error("Profile update error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12  button-bg rounded-2xl ">
          <h1 className="text-3xl md:text-[2rem] font-bold mb-4 ">My Profile</h1>
          <p className="text-[1.1rem] ">Manage your account information and preferences</p>
        </div>

        {/* Layout */}
        <div className="flex flex-wrap -mx-4">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4 px-4 mb-4">
            <div className="bg-white rounded-xl p-8 shadow-lg h-fit static md:sticky top-8">
              <div className="text-center mb-8 pb-8 border-b border-gray-200">
                <div className="w-20 h-20 button-bg rounded-full flex items-center justify-center mx-auto mb-4 text-3xl ">
                  <i className="fas fa-user" />
                </div>
                <h5 className="text-gray-800 mb-2 font-semibold">{user?.name}</h5>
                <p className="text-gray-600 m-0 text-sm">{user?.email}</p>
              </div>

              <nav className="flex flex-col gap-2">
                <button
                  className={`p-4 rounded-lg transition-all text-left font-medium ${
                    activeTab === "profile"
                      ? "button-bg "
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  <i className="fas fa-user mr-2"></i> Profile Information
                </button>

                <button
                  className={`p-4 rounded-lg transition-all text-left font-medium ${
                    activeTab === "security"
                      ? "button-bg "
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("security")}
                >
                  <i className="fas fa-lock mr-2"></i> Security
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-2/3 lg:w-3/4 px-4">
            <div className="bg-white rounded-xl p-6 md:p-10 shadow-lg">
              {activeTab === "profile" && (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-gray-800 mb-8 font-semibold">Profile Information</h3>
                  <div className="flex flex-wrap -mx-2">
                    {/* Name */}
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <input
                        name="name"
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-pink-400 focus:ring-pink-200 focus:ring-4"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Email (readonly) */}
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <label className="block text-sm font-medium mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 bg-gray-50 opacity-80 cursor-not-allowed"
                        value={formData.email}
                        disabled
                      />
                      <small className="text-gray-500">Email cannot be changed</small>
                    </div>

                    {/* Phone */}
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <label className="block text-sm font-medium mb-1">Phone Number</label>
                      <input
                        name="phone"
                        type="tel"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-pink-400 focus:ring-pink-200 focus:ring-4"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Address */}
                    <div className="w-full px-2 mb-4">
                      <label className="block text-sm font-medium mb-1">Street Address</label>
                      <input
                        name="address.street"
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-pink-400 focus:ring-pink-200 focus:ring-4"
                        value={formData.address.street}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="w-full md:w-1/3 px-2 mb-4">
                      <label className="block text-sm font-medium mb-1">City</label>
                      <input
                        name="address.city"
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
                        value={formData.address.city}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="w-full md:w-1/3 px-2 mb-4">
                      <label className="block text-sm font-medium mb-1">State</label>
                      <input
                        name="address.state"
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
                        value={formData.address.state}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="w-full md:w-1/3 px-2 mb-4">
                      <label className="block text-sm font-medium mb-1">Zip Code</label>
                      <input
                        name="address.zipCode"
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
                        value={formData.address.zipCode}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Submit */}
                    <div className="w-full px-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="button-bg  px-6 py-3 rounded-lg font-semibold shadow-md button-bg:hover transition"
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {activeTab === "security" && (
                <div>
                  <h3 className="text-gray-800 mb-8 font-semibold">Security Settings</h3>
                  <p className="text-gray-500">Password change functionality coming soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
