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
    <div className="py-8 min-h-screen bg-gradient-to-br from-[#FDF2F8] to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 py-12 bg-gradient-to-br from-[#da81a4] to-[#fecfef] rounded-2xl text-white">
          <h1 className="text-3xl md:text-[2.5rem] font-bold mb-4 text-shadow">My Profile</h1>
          <p className="text-[1.1rem] text-shadow-sm">Manage your account information and preferences</p>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/3 lg:w-1/4 px-4 mb-4">
            <div className="bg-white rounded-xl p-8 shadow-lg h-fit static md:sticky top-8">
              <div className="text-center mb-8 pb-8 border-b border-gray-200">
                <div className="w-20 h-20 bg-gradient-to-br from-[#da81a4] to-[#fecfef] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-white">
                  <i className="fas fa-user"></i>
                </div>
                <h5 className="text-gray-800 mb-2 font-semibold">{user?.name}</h5>
                <p className="text-gray-600 m-0 text-sm">{user?.email}</p>
              </div>

              <nav className="flex flex-col md:flex-row md:overflow-x-auto md:whitespace-nowrap md:min-w-0 gap-2">
                <button
                  className={`bg-transparent border-none p-4 text-left rounded-lg transition-all duration-300 ease-in-out text-gray-600 font-medium whitespace-nowrap min-w-[200px] md:min-w-0 ${activeTab === "profile" ? "bg-gradient-to-br from-[#da81a4] to-[#fecfef] text-white" : "hover:bg-gray-50 hover:text-gray-800"}`}
                  onClick={() => setActiveTab("profile")}
                >
                  <i className="fas fa-user mr-2"></i>Profile Information
                </button>
                <button
                  className={`bg-transparent border-none p-4 text-left rounded-lg transition-all duration-300 ease-in-out text-gray-600 font-medium whitespace-nowrap min-w-[200px] md:min-w-0 ${activeTab === "security" ? "bg-gradient-to-br from-[#da81a4] to-[#fecfef] text-white" : "hover:bg-gray-50 hover:text-gray-800"}`}
                  onClick={() => setActiveTab("security")}
                >
                  <i className="fas fa-lock mr-2"></i>Security
                </button>
                <button
                  className={`bg-transparent border-none p-4 text-left rounded-lg transition-all duration-300 ease-in-out text-gray-600 font-medium whitespace-nowrap min-w-[200px] md:min-w-0 ${activeTab === "preferences" ? "bg-gradient-to-br from-[#da81a4] to-[#fecfef] text-white" : "hover:bg-gray-50 hover:text-gray-800"}`}
                  onClick={() => setActiveTab("preferences")}
                >
                  <i className="fas fa-cog mr-2"></i>Preferences
                </button>
              </nav>
            </div>
          </div>

          <div className="w-full md:w-2/3 lg:w-3/4 px-4">
            <div className="bg-white rounded-xl p-6 md:p-10 shadow-lg">
              {activeTab === "profile" && (
                <div>
                  <h3 className="text-gray-800 mb-8 font-semibold">Profile Information</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-full md:w-1/2 px-2 mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
                        <input
                          type="text"
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out focus:border-[#ff9a9e] focus:ring-4 focus:ring-[#ff9a9e]/25"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-2 mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                        <input
                          type="email"
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out focus:border-[#ff9a9e] focus:ring-4 focus:ring-[#ff9a9e]/25 disabled:bg-gray-50 disabled:opacity-80"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled
                        />
                        <small className="text-gray-500">Email cannot be changed</small>
                      </div>
                      <div className="w-full md:w-1/2 px-2 mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out focus:border-[#ff9a9e] focus:ring-4 focus:ring-[#ff9a9e]/25"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="w-full px-2 mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Street Address</label>
                        <input
                          type="text"
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out focus:border-[#ff9a9e] focus:ring-4 focus:ring-[#ff9a9e]/25"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="w-full md:w-1/3 px-2 mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">City</label>
                        <input
                          type="text"
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out focus:border-[#ff9a9e] focus:ring-4 focus:ring-[#ff9a9e]/25"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="w-full md:w-1/3 px-2 mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">State</label>
                        <input
                          type="text"
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out focus:border-[#ff9a9e] focus:ring-4 focus:ring-[#ff9a9e]/25"
                          name="address.state"
                          value={formData.address.state}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="w-full md:w-1/3 px-2 mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Zip Code</label>
                        <input
                          type="text"
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out focus:border-[#ff9a9e] focus:ring-4 focus:ring-[#ff9a9e]/25"
                          name="address.zipCode"
                          value={formData.address.zipCode}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="w-full px-2">
                        <button
                          type="submit"
                          className="bg-gradient-to-br from-[#da81a4] to-[#fecfef] border-none text-white px-8 py-4 font-semibold rounded-lg transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg opacity-70 transform-none"
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "security" && (
                <div>
                  <h3 className="text-gray-800 mb-8 font-semibold">Security Settings</h3>
                  <div className="bg-gray-50 p-8 rounded-xl">
                    <h5 className="text-gray-800 mb-4 font-semibold">Change Password</h5>
                    <p className="text-gray-500">Update your password to keep your account secure.</p>
                    <form>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Current Password</label>
                        <input
                          type="password"
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out focus:border-[#ff9a9e] focus:ring-4 focus:ring-[#ff9a9e]/25"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">New Password</label>
                        <input
                          type="password"
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out focus:border-[#ff9a9e] focus:ring-4 focus:ring-[#ff9a9e]/25"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out focus:border-[#ff9a9e] focus:ring-4 focus:ring-[#ff9a9e]/25"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-gradient-to-br from-[#da81a4] to-[#fecfef] border-none text-white px-8 py-4 font-semibold rounded-lg transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {activeTab === "preferences" && (
                <div>
                  <h3 className="text-gray-800 mb-8 font-semibold">Preferences</h3>
                  <div className="bg-gray-50 p-8 rounded-xl">
                    <h5 className="text-gray-800 mb-4 font-semibold">Email Notifications</h5>
                    <div className="p-4 bg-white rounded-lg border border-gray-200 mb-4">
                      <input
                        className="form-check-input checked:bg-[#ff9a9e] checked:border-[#ff9a9e] mr-2"
                        type="checkbox"
                        id="orderUpdates"
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="orderUpdates">
                        Order updates and shipping notifications
                      </label>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-gray-200 mb-4">
                      <input
                        className="form-check-input checked:bg-[#ff9a9e] checked:border-[#ff9a9e] mr-2"
                        type="checkbox"
                        id="promotions"
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="promotions">
                        Promotional emails and special offers
                      </label>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-gray-200 mb-4">
                      <input
                        className="form-check-input checked:bg-[#ff9a9e] checked:border-[#ff9a9e] mr-2"
                        type="checkbox"
                        id="newsletter"
                      />
                      <label className="form-check-label" htmlFor="newsletter">
                        Weekly newsletter with flower care tips
                      </label>
                    </div>
                    <button className="bg-gradient-to-br from-[#da81a4] to-[#fecfef] border-none text-white px-8 py-4 font-semibold rounded-lg transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg">
                      Save Preferences
                    </button>
                  </div>
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
