import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

const Contact = () => {
  const { user } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }))
    }
  }, [user])

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
      const { data } = await axios.post("/api/contact", formData)
      toast.success(data.message || "Message sent successfully!")
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 rounded-2xl">
          <h1 className="text-3xl md:text-[2rem] font-bold mb-4">
            We'd love to hear from you!
          </h1>
          <p className="text-[1rem] mb-4">
            Whether you have a question, we're here to help. Reach out to us
            anytime, and we'll respond as quickly as possible!
          </p>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 px-4 mb-8 lg:mb-0">
            <div className="bg-white p-6 md:p-10 rounded-xl shadow-xl">
              {/* <h3 className="mb-8 font-semibold">Send us a Message</h3> */}
              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-2">
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject *
                    </label>
                    <select
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
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
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message *
                    </label>
                    <textarea
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
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
                      className="w-full button-bg button-bg:hover  border-none text-black px-8 py-4 text-lg font-semibold rounded-2xl hover:shadow-lg disabled:opacity-70"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="w-full lg:w-1/3 px-4">
            <div className="bg-white p-6 md:p-10 rounded-xl shadow-xl">
              <h3 className="mb-8 font-semibold">Get in Touch</h3>

              <div className="mb-8">
                <h5 className="mb-2 font-semibold">Address</h5>
                <p>123 xxxx , xxxxx , xxxxx</p>
              </div>

              <div className="mb-8">
                <h5 className="mb-2 font-semibold">Phone</h5>
                <p>+1 (555) 123-4567</p>
              </div>

              <div className="mb-8">
                <h5 className="mb-2 font-semibold">Email</h5>
                <p>info@bloomingbasket.com</p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h5 className="mb-4 font-semibold">Follow Us</h5>
                <div className="flex gap-4">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-pinterest"></i></a>
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
