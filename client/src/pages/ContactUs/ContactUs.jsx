"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import styles from "./ContactUs.module.css"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

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
      toast.success("Message sent successfully! We'll get back to you soon.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      {/* Header */}
      <div className={styles.header}>
        <h1>We'd love to hear from you!</h1>
        <p>
          Whether you have a question, need assistance, or just want to say hello, we're here to help.
          Reach out to us anytime, and we'll respond as quickly as possible!
        </p>
      </div>

      <div className="row">
        <div className="col-lg-8 mb-5">
          <div className={styles.contactForm}>
            <h3>Send us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address *
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
                <div className="col-md-6 mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject *
                  </label>
                  <select
                    className="form-select"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="custom">Custom Arrangements</option>
                    <option value="wedding">Wedding Services</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-12 mb-3">
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>
                <div className="col-12">
                  <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="col-lg-4">
          <div className={styles.contactInfo}>
            <h3>Get in Touch</h3>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <h5>Address</h5>
                <p>
                  123 Flower Street,
                  <br />
                  Garden City, GC 12345, United States
                </p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <i className="fas fa-phone"></i>
              </div>
              <div>
                <h5>Phone</h5>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <h5>Email</h5>
                <p>info@bloomingbasket.com</p>
              </div>
            </div>

            <div className={styles.socialLinks}>
              <h5>Follow Us</h5>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialIcon}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className={styles.socialIcon}>
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className={styles.socialIcon}>
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className={styles.socialIcon}>
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
