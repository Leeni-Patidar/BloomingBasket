"use client"

import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const Customize = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    occasion: "",
    colors: "",
    flowers: "",
    budget: "",
    message: "",
    deliveryDate: "",
  })
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const occasions = [
    "Birthday",
    "Anniversary",
    "Wedding",
    "Valentine's Day",
    "Mother's Day",
    "Sympathy",
    "Congratulations",
    "Just Because",
  ]

  const flowerTypes = ["Roses", "Tulips", "Lilies", "Orchids", "Sunflowers", "Carnations", "Daisies", "Mixed Flowers"]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const customizationData = new FormData()

      // Append form data
      Object.keys(formData).forEach((key) => {
        customizationData.append(key, formData[key])
      })

      // Append image if selected
      if (selectedImage) {
        customizationData.append("image", selectedImage)
      }

      const response = await axios.post("/api/customize", customizationData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      toast.success("Custom bouquet request submitted successfully!")

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        occasion: "",
        colors: "",
        flowers: "",
        budget: "",
        message: "",
        deliveryDate: "",
      })
      setSelectedImage(null)
      setImagePreview(null)
    } catch (error) {
      console.error("Customization error:", error)
      toast.error("Failed to submit request. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-success">Customize Your Bouquet</h2>
            <p className="lead text-muted">
              Create a personalized floral arrangement that perfectly matches your vision
            </p>
          </div>

          <div className="card shadow">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Personal Information */}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="deliveryDate" className="form-label">
                      Preferred Delivery Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="deliveryDate"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  {/* Customization Details */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="occasion" className="form-label">
                      Occasion *
                    </label>
                    <select
                      className="form-select"
                      id="occasion"
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Occasion</option>
                      {occasions.map((occasion) => (
                        <option key={occasion} value={occasion}>
                          {occasion}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="flowers" className="form-label">
                      Preferred Flowers
                    </label>
                    <select
                      className="form-select"
                      id="flowers"
                      name="flowers"
                      value={formData.flowers}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Flower Type</option>
                      {flowerTypes.map((flower) => (
                        <option key={flower} value={flower}>
                          {flower}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="colors" className="form-label">
                      Preferred Colors
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="colors"
                      name="colors"
                      value={formData.colors}
                      onChange={handleInputChange}
                      placeholder="e.g., Pink, White, Red"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="budget" className="form-label">
                      Budget Range
                    </label>
                    <select
                      className="form-select"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Budget</option>
                      <option value="25-50">$25 - $50</option>
                      <option value="50-100">$50 - $100</option>
                      <option value="100-200">$100 - $200</option>
                      <option value="200+">$200+</option>
                    </select>
                  </div>

                  {/* Image Upload */}
                  <div className="col-12 mb-3">
                    <label htmlFor="image" className="form-label">
                      Upload Inspiration Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <div className="form-text">Upload an image that inspires your custom bouquet design</div>
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="col-12 mb-3">
                      <div className="text-center">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="img-fluid rounded"
                          style={{ maxHeight: "200px" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Special Message */}
                  <div className="col-12 mb-3">
                    <label htmlFor="message" className="form-label">
                      Special Instructions or Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your vision, any specific requirements, or special message for the recipient..."
                    ></textarea>
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-success btn-lg px-5" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Submitting Request...
                      </>
                    ) : (
                      "Submit Custom Request"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Process Information */}
          <div className="row mt-5">
            <div className="col-md-4 text-center mb-4">
              <div
                className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: "60px", height: "60px" }}
              >
                <span className="fw-bold">1</span>
              </div>
              <h5>Submit Request</h5>
              <p className="text-muted">Fill out the form with your preferences and upload inspiration images</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div
                className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: "60px", height: "60px" }}
              >
                <span className="fw-bold">2</span>
              </div>
              <h5>Design Consultation</h5>
              <p className="text-muted">Our florists will contact you to discuss your custom design</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div
                className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: "60px", height: "60px" }}
              >
                <span className="fw-bold">3</span>
              </div>
              <h5>Create & Deliver</h5>
              <p className="text-muted">We'll create your custom bouquet and deliver it on your preferred date</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Customize
