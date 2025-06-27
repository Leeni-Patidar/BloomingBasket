"use client"

import { useState } from "react"
import { toast } from "react-toastify"

const ContactUs = () => {
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
      toast.success("Thank you for contacting us! We'll get back to you within 24 hours.")
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
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-success">Contact Us</h1>
        <p className="lead text-muted">We're here to help with all your floral needs</p>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="row">
            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="card shadow">
                <div className="card-body p-4">
                  <h4 className="mb-4">Send us a Message</h4>
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
                          <option value="order">Order Support</option>
                          <option value="custom">Custom Arrangements</option>
                          <option value="delivery">Delivery Questions</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
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
                        placeholder="How can we help you today?"
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-success btn-lg w-100" disabled={loading}>
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Sending Message...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-lg-4">
              <div className="card bg-success text-white h-100">
                <div className="card-body p-4">
                  <h5 className="mb-4">Get in Touch</h5>

                  <div className="mb-4">
                    <div className="d-flex align-items-start mb-3">
                      <i className="fas fa-map-marker-alt fa-lg me-3 mt-1"></i>
                      <div>
                        <h6 className="mb-1">Visit Our Store</h6>
                        <p className="mb-0">
                          123 Flower Street
                          <br />
                          Garden City, GC 12345
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start mb-3">
                      <i className="fas fa-phone fa-lg me-3 mt-1"></i>
                      <div>
                        <h6 className="mb-1">Call Us</h6>
                        <p className="mb-0">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start mb-3">
                      <i className="fas fa-envelope fa-lg me-3 mt-1"></i>
                      <div>
                        <h6 className="mb-1">Email Us</h6>
                        <p className="mb-0">info@bloomingbasket.com</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start">
                      <i className="fas fa-clock fa-lg me-3 mt-1"></i>
                      <div>
                        <h6 className="mb-1">Business Hours</h6>
                        <p className="mb-0">
                          Mon-Fri: 8:00 AM - 8:00 PM
                          <br />
                          Saturday: 9:00 AM - 6:00 PM
                          <br />
                          Sunday: 10:00 AM - 4:00 PM
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h6 className="mb-3">Follow Us</h6>
                    <div className="d-flex gap-3">
                      <a href="#" className="text-white">
                        <i className="fab fa-facebook-f fa-lg"></i>
                      </a>
                      <a href="#" className="text-white">
                        <i className="fab fa-instagram fa-lg"></i>
                      </a>
                      <a href="#" className="text-white">
                        <i className="fab fa-twitter fa-lg"></i>
                      </a>
                      <a href="#" className="text-white">
                        <i className="fab fa-pinterest fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="row mt-5">
        <div className="col-12">
          <h3 className="text-center mb-4">Frequently Asked Questions</h3>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">What are your delivery hours?</h6>
                  <p className="card-text text-muted">
                    We deliver Monday through Saturday from 9 AM to 6 PM. Sunday deliveries are available for special
                    occasions with advance notice.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">Do you offer same-day delivery?</h6>
                  <p className="card-text text-muted">
                    Yes! Orders placed before 2 PM can be delivered the same day within our delivery area for an
                    additional fee.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">Can I customize my bouquet?</h6>
                  <p className="card-text text-muted">
                    Visit our customize page to create a personalized arrangement, or call us to discuss your specific
                    needs.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">What if I'm not satisfied?</h6>
                  <p className="card-text text-muted">
                    We offer a 7-day freshness guarantee. If you're not completely satisfied, contact us within 24 hours
                    of delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
