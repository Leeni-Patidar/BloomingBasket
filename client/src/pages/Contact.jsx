"use client"

import { useState } from "react"
import { toast } from "react-toastify"

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
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-success">Contact Us</h2>
            <p className="lead text-muted">We'd love to hear from you. Send us a message!</p>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div className="card shadow">
                <div className="card-body p-4">
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
                    </div>

                    <div className="row">
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
                          <option value="">Select Subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="order">Order Question</option>
                          <option value="custom">Custom Arrangement</option>
                          <option value="complaint">Complaint</option>
                          <option value="compliment">Compliment</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
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
                        required
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn btn-success btn-lg px-5" disabled={loading}>
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card bg-success text-white">
                <div className="card-body p-4">
                  <h5 className="card-title mb-4">Get in Touch</h5>

                  <div className="mb-3">
                    <i className="fas fa-map-marker-alt me-3"></i>
                    <div className="d-inline-block">
                      <strong>Address</strong>
                      <br />
                      123 Flower Street
                      <br />
                      Garden City, GC 12345
                    </div>
                  </div>

                  <div className="mb-3">
                    <i className="fas fa-phone me-3"></i>
                    <div className="d-inline-block">
                      <strong>Phone</strong>
                      <br />
                      +1 (555) 123-4567
                    </div>
                  </div>

                  <div className="mb-3">
                    <i className="fas fa-envelope me-3"></i>
                    <div className="d-inline-block">
                      <strong>Email</strong>
                      <br />
                      info@bloomingbasket.com
                    </div>
                  </div>

                  <div className="mb-3">
                    <i className="fas fa-clock me-3"></i>
                    <div className="d-inline-block">
                      <strong>Business Hours</strong>
                      <br />
                      Mon-Fri: 8AM-8PM
                      <br />
                      Sat: 9AM-6PM
                      <br />
                      Sun: 10AM-4PM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
