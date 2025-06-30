"use client"

import { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import styles from "./Profile.module.css"

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
    <div className={styles.profile}>
      <div className="container">
        <div className={styles.header}>
          <h1>My Profile</h1>
          <p>Manage your account information and preferences</p>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 mb-4">
            <div className={styles.sidebar}>
              <div className={styles.userInfo}>
                <div className={styles.avatar}>
                  <i className="fas fa-user"></i>
                </div>
                <h5>{user?.name}</h5>
                <p>{user?.email}</p>
              </div>

              <nav className={styles.nav}>
                <button
                  className={`${styles.navItem} ${activeTab === "profile" ? styles.active : ""}`}
                  onClick={() => setActiveTab("profile")}
                >
                  <i className="fas fa-user me-2"></i>Profile Information
                </button>
                <button
                  className={`${styles.navItem} ${activeTab === "security" ? styles.active : ""}`}
                  onClick={() => setActiveTab("security")}
                >
                  <i className="fas fa-lock me-2"></i>Security
                </button>
                <button
                  className={`${styles.navItem} ${activeTab === "preferences" ? styles.active : ""}`}
                  onClick={() => setActiveTab("preferences")}
                >
                  <i className="fas fa-cog me-2"></i>Preferences
                </button>
              </nav>
            </div>
          </div>

          <div className="col-lg-9 col-md-8">
            <div className={styles.content}>
              {activeTab === "profile" && (
                <div className={styles.tabContent}>
                  <h3>Profile Information</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled
                        />
                        <small className="text-muted">Email cannot be changed</small>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <label className="form-label">Street Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">State</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address.state"
                          value={formData.address.state}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Zip Code</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address.zipCode"
                          value={formData.address.zipCode}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-12">
                        <button type="submit" className={styles.saveBtn} disabled={loading}>
                          {loading ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "security" && (
                <div className={styles.tabContent}>
                  <h3>Security Settings</h3>
                  <div className={styles.securitySection}>
                    <h5>Change Password</h5>
                    <p className="text-muted">Update your password to keep your account secure.</p>
                    <form>
                      <div className="mb-3">
                        <label className="form-label">Current Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Confirm New Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <button type="submit" className={styles.saveBtn}>
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {activeTab === "preferences" && (
                <div className={styles.tabContent}>
                  <h3>Preferences</h3>
                  <div className={styles.preferencesSection}>
                    <h5>Email Notifications</h5>
                    <div className="form-check mb-3">
                      <input className="form-check-input" type="checkbox" id="orderUpdates" defaultChecked />
                      <label className="form-check-label" htmlFor="orderUpdates">
                        Order updates and shipping notifications
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input className="form-check-input" type="checkbox" id="promotions" defaultChecked />
                      <label className="form-check-label" htmlFor="promotions">
                        Promotional emails and special offers
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input className="form-check-input" type="checkbox" id="newsletter" />
                      <label className="form-check-label" htmlFor="newsletter">
                        Weekly newsletter with flower care tips
                      </label>
                    </div>
                    <button className={styles.saveBtn}>Save Preferences</button>
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
