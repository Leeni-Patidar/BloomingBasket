"use client"

import { useState } from "react"
import { toast } from "react-toastify"
// import styles from "./ContactUs.module.css"

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
    <div className=" ">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8  rounded-2xl">
          <h1 className="text-3xl md:text-[2rem] font-bold mb-4 ">We'd love to hear from you!</h1>
          <p className="text-[1rem] mb-4 ">
            Whether you have a question, we're here to help. Reach out to us
            anytime, and we'll respond as quickly as possible!
          </p>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 px-4 mb-8 lg:mb-0">
            <div className="bg-white p-6 md:p-10 rounded-xl shadow-xl">
              <h3 className="text-gray-800 mb-8 font-semibold">Send us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-2">
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ba54a9] focus:ring-4 focus:ring-[#ff9a9e]/25"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ba54a9] focus:ring-4 focus:ring-[#ff9a9e]/25"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ba54a9] focus:ring-4 focus:ring-[#ff9a9e]/25"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="subject" className="block text-gray-700 text-sm font-medium mb-1">
                      Subject *
                    </label>
                    <select
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ba54a9] focus:ring-4 focus:ring-[#ff9a9e]/25"
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
                  <div className="w-full px-2 mb-4">
                    <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-1">
                      Message *
                    </label>
                    <textarea
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ba54a9] focus:ring-4 focus:ring-[#ff9a9e]/25"
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                  </div>
                  <div className="w-full px-2">
                    <button
                      type="submit"
                      className="w-full button-bg border-none text-black px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 ease-in-out button-bg:hover hover:shadow-lg disabled:opacity-70 disabled:transform-none"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full lg:w-1/3 px-4">
           <div className="bg-white p-6 md:p-10 rounded-xl shadow-xl">
              <h3 className="text-gray-800 mb-8 font-semibold">Get in Touch</h3>

              <div className="flex items-start mb-8 gap-4">
                <div className="w-12 h-12 button-bg rounded-full flex items-center justify-center text-xl flex-shrink-0">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h5 className="text-gray-800 mb-2 font-semibold text-left">Address</h5>
                  <p className="text-gray-600 m-0 leading-relaxed text-left">
                    123 Flower Street,
                    <br />
                    Garden City, GC 12345, United States
                  </p>
                </div>
              </div>

              <div className="flex items-start mb-8 gap-4">
                <div className="w-12 h-12 button-bg rounded-full flex items-center justify-center text-xl flex-shrink-0 button-bg:hover">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <h5 className="text-gray-800 mb-2 font-semibold text-left">Phone</h5>
                  <p className="text-gray-600 m-0 leading-relaxed text-left">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start mb-8 gap-4">
                <div className="w-12 h-12 button-bg rounded-full flex items-center justify-center text-xlflex-shrink-0">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h5 className="text-gray-800 mb-2 font-semibold text-left">Email</h5>
                  <p className="text-gray-600 m-0 leading-relaxed text-left">info@bloomingbasket.com</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h5 className="text-gray-800 mb-4 font-semibold">Follow Us</h5>
                <div className="flex gap-4 justify-center md:justify-start">
                  <a
                    href="#"
                    className="w-11 h-11 button-bg rounded-full flex items-center justify-center text-gray-800 no-underline transition-all duration-300 ease-in-out  button-bg:hover"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="#"
                    className="w-11 h-11 button-bg rounded-full flex items-center justify-center text-gray-800 no-underline transition-all duration-300 ease-in-out  button-bg:hover"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="#"
                    className="w-11 h-11 button-bg rounded-full flex items-center justify-center text-gray-800 no-underline transition-all duration-300 ease-in-out   button-bg:hover"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="#"
                    className="w-11 h-11 button-bg rounded-full flex items-center justify-center text-gray-800 no-underline transition-all duration-300 ease-in-out  button-bg:hover "
                  >
                    <i className="fab fa-pinterest"></i>
                  </a>
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
