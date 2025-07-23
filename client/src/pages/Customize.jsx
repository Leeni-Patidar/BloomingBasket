"use client"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { toast } from "react-toastify"
// import styles from "./Customize.module.css"

const Customize = () => {
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [customization, setCustomization] = useState({
    occasion: "",
    flowerTypes: [],
    colors: [],
    size: "",
    message: "",
    deliveryDate: "",
    specialInstructions: "",
    budget: "",
  })

  const occasions = [
    { id: "birthday", name: "Birthday", icon: "fas fa-birthday-cake" },
    { id: "wedding", name: "Wedding", icon: "fas fa-ring" },
    { id: "anniversary", name: "Anniversary", icon: "fas fa-heart" },
    { id: "sympathy", name: "Sympathy", icon: "fas fa-dove" },
    { id: "congratulations", name: "Congratulations", icon: "fas fa-trophy" },
    { id: "apology", name: "Apology", icon: "fas fa-hand-holding-heart" },
    { id: "just-because", name: "Just Because", icon: "fas fa-smile" },
    { id: "get-well", name: "Get Well Soon", icon: "fas fa-heart-pulse" },
  ]

  const flowerTypes = [
    { id: "roses", name: "Roses", price: 15 },
    { id: "tulips", name: "Tulips", price: 12 },
    { id: "lilies", name: "Lilies", price: 18 },
    { id: "sunflowers", name: "Sunflowers", price: 10 },
    { id: "orchids", name: "Orchids", price: 25 },
    { id: "carnations", name: "Carnations", price: 8 },
    { id: "peonies", name: "Peonies", price: 22 },
    { id: "hydrangeas", name: "Hydrangeas", price: 16 },
  ]

  const colors = [
    { id: "red", name: "Red", hex: "#dc3545" },
    { id: "pink", name: "Pink", hex: "#e83e8c" },
    { id: "white", name: "White", hex: "#ffffff" },
    { id: "yellow", name: "Yellow", hex: "#ffc107" },
    { id: "purple", name: "Purple", hex: "#6f42c1" },
    { id: "orange", name: "Orange", hex: "#fd7e14" },
    { id: "blue", name: "Blue", hex: "#0d6efd" },
    { id: "mixed", name: "Mixed Colors", hex: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24)" },
  ]

  const sizes = [
    { id: "small", name: "Small", description: "Perfect for a desk or bedside", price: 35 },
    { id: "medium", name: "Medium", description: "Great for dining tables", price: 55 },
    { id: "large", name: "Large", description: "Stunning centerpiece", price: 85 },
    { id: "extra-large", name: "Extra Large", description: "Grand statement piece", price: 120 },
  ]

  const handleInputChange = (field, value) => {
    setCustomization((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleArrayToggle = (field, value) => {
    setCustomization((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((item) => item !== value) : [...prev[field], value],
    }))
  }

  const calculatePrice = () => {
    let basePrice = 0
    const selectedSize = sizes.find((s) => s.id === customization.size)
    if (selectedSize) {
      basePrice = selectedSize.price
    }

    const flowerCost = customization.flowerTypes.reduce((total, flowerType) => {
      const flower = flowerTypes.find((f) => f.id === flowerType)
      return total + (flower ? flower.price : 0)
    }, 0)

    return basePrice + flowerCost
  }

  const handleAddToCart = () => {
    if (!customization.occasion || !customization.size || customization.flowerTypes.length === 0) {
      toast.error("Please complete all required fields")
      return
    }

    const customProduct = {
      _id: `custom-${Date.now()}`,
      name: `Custom ${customization.occasion} Arrangement`,
      price: calculatePrice(),
      images: ["/placeholder.svg?height=300&width=300"],
      customization,
    }

    addToCart(customProduct, 1, customization)
    toast.success("Custom arrangement added to cart!")
    navigate("/cart")
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className=" min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 py-12 bg-gradient-to-br from-[#ba54a9] to-[#fecfef] rounded-2xl text-white">
          <h1 className="text-3xl md:text-[2.5rem] font-bold mb-4 text-shadow">Customize Your Perfect Bouquet</h1>
          <p className="text-[1.1rem] text-shadow-sm">
            Create a unique floral arrangement tailored to your special occasion
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-12">
          <div className="flex justify-between relative z-10">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className={`flex flex-col items-center gap-2`}>
                <div
                  className={`w-12 h-12 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold transition-all duration-300 ${step >= stepNum ? "bg-gradient-to-br from-[#ba54a9] to-[#fecfef] text-white" : ""}`}
                >
                  {stepNum}
                </div>
                <div className={`text-sm text-gray-600 font-medium ${step >= stepNum ? "text-red-500" : ""}`}>
                  {stepNum === 1 && "Occasion"}
                  {stepNum === 2 && "Flowers"}
                  {stepNum === 3 && "Details"}
                  {stepNum === 4 && "Review"}
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-300 z-0">
            <div
              className="h-full bg-gradient-to-br from-[#ba54a9] to-[#fecfef] transition-all duration-300 ease-in-out"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          {/* Step 1: Occasion */}
          {step === 1 && (
            <div>
              <h3 className="text-gray-800 mb-8 font-semibold text-center">What's the occasion?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {occasions.map((occasion) => (
                  <div
                    key={occasion.id}
                    className={`bg-white border-2 border-gray-200 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ease-in-out flex flex-col items-center gap-4 hover:border-[#ba54a9] hover:-translate-y-0.5 ${
                      customization.occasion === occasion.id
                        ? "border-red-500 bg-gradient-to-br from-[#ba54a9] to-[#fecfef] text-white"
                        : ""
                    }`}
                    onClick={() => handleInputChange("occasion", occasion.id)}
                  >
                    <i
                      className={`text-3xl text-[#ba54a9] ${
                        customization.occasion === occasion.id ? "text-white" : ""
                      }`}
                    ></i>
                    <span>{occasion.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Flowers and Colors */}
          {step === 2 && (
            <div>
              <h3 className="text-gray-800 mb-8 font-semibold text-center">Choose your flowers and colors</h3>

              <div className="mb-12">
                <h4 className="text-gray-800 mb-6 font-semibold">Flower Types (Select multiple)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {flowerTypes.map((flower) => (
                    <div
                      key={flower.id}
                      className={`bg-white border-2 border-gray-200 rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ease-in-out hover:border-[#ba54a9] ${
                        customization.flowerTypes.includes(flower.id) ? "border-red-500 bg-red-50" : ""
                      }`}
                      onClick={() => handleArrayToggle("flowerTypes", flower.id)}
                    >
                      <span className="block font-semibold mb-2">{flower.name}</span>
                      <span className="text-red-500 font-medium">+${flower.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <h4 className="text-gray-800 mb-6 font-semibold">Color Scheme (Select multiple)</h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {colors.map((color) => (
                    <div
                      key={color.id}
                      className={`bg-white border-2 border-gray-200 rounded-lg p-4 text-center cursor-pointer transition-all duration-300 ease-in-out flex flex-col items-center gap-2 hover:border-[#ba54a9] ${
                        customization.colors.includes(color.id) ? "border-red-500 bg-red-50" : ""
                      }`}
                      onClick={() => handleArrayToggle("colors", color.id)}
                    >
                      <div
                        className="w-10 h-10 rounded-full border-2 border-gray-200"
                        style={{
                          background: color.hex.includes("gradient") ? color.hex : color.hex,
                          borderColor: color.id === "white" ? "#ddd" : "transparent",
                        }}
                      ></div>
                      <span>{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Size and Details */}
          {step === 3 && (
            <div>
              <h3 className="text-gray-800 mb-8 font-semibold text-center">Size and special details</h3>

              <div className="mb-12">
                <h4 className="text-gray-800 mb-6 font-semibold">Arrangement Size</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {sizes.map((size) => (
                    <div
                      key={size.id}
                      className={`bg-white border-2 border-gray-200 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ease-in-out hover:border-[#ba54a9] hover:-translate-y-0.5 ${
                        customization.size === size.id
                          ? "border-red-500 bg-gradient-to-br from-[#ba54a9] to-[#fecfef] text-white"
                          : ""
                      }`}
                      onClick={() => handleInputChange("size", size.id)}
                    >
                      <h5 className="mb-2 font-semibold">{size.name}</h5>
                      <p className="mb-4 text-sm">{size.description}</p>
                      <span
                        className={`text-xl font-bold text-red-500 ${
                          customization.size === size.id ? "text-white" : ""
                        }`}
                      >
                        ${size.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <h4 className="text-gray-800 mb-6 font-semibold">Personal Message (Optional)</h4>
                <textarea
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ba54a9] focus:ring-4 focus:ring-[#ff9a9e]/25"
                  rows="3"
                  placeholder="Add a personal message for the card..."
                  value={customization.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                ></textarea>
              </div>

              <div className="mb-12">
                <div className="flex flex-wrap -mx-2">
                  <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                    <h4 className="text-gray-800 mb-6 font-semibold">Preferred Delivery Date</h4>
                    <input
                      type="date"
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ba54a9] focus:ring-4 focus:ring-[#ff9a9e]/25"
                      value={customization.deliveryDate}
                      onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-2">
                    <h4 className="text-gray-800 mb-6 font-semibold">Budget Range (Optional)</h4>
                    <select
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ba54a9] focus:ring-4 focus:ring-[#ff9a9e]/25"
                      value={customization.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                    >
                      <option value="">No preference</option>
                      <option value="under-50">Under $50</option>
                      <option value="50-100">$50 - $100</option>
                      <option value="100-150">$100 - $150</option>
                      <option value="over-150">Over $150</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h4 className="text-gray-800 mb-6 font-semibold">Special Instructions (Optional)</h4>
                <textarea
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ba54a9] focus:ring-4 focus:ring-[#ff9a9e]/25"
                  rows="3"
                  placeholder="Any special requests or instructions for our florists..."
                  value={customization.specialInstructions}
                  onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                ></textarea>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div>
              <h3 className="text-gray-800 mb-8 font-semibold text-center">Review your custom arrangement</h3>

              <div className="bg-gray-50 rounded-xl p-8">
                <div className="mb-6 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0">
                  <h4 className="text-gray-800 text-base font-semibold mb-2">Occasion</h4>
                  <p className="text-gray-600 m-0">{occasions.find((o) => o.id === customization.occasion)?.name}</p>
                </div>

                <div className="mb-6 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0">
                  <h4 className="text-gray-800 text-base font-semibold mb-2">Flowers</h4>
                  <p className="text-gray-600 m-0">
                    {customization.flowerTypes.map((id) => flowerTypes.find((f) => f.id === id)?.name).join(", ")}
                  </p>
                </div>

                <div className="mb-6 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0">
                  <h4 className="text-gray-800 text-base font-semibold mb-2">Colors</h4>
                  <p className="text-gray-600 m-0">
                    {customization.colors.map((id) => colors.find((c) => c.id === id)?.name).join(", ")}
                  </p>
                </div>

                <div className="mb-6 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0">
                  <h4 className="text-gray-800 text-base font-semibold mb-2">Size</h4>
                  <p className="text-gray-600 m-0">{sizes.find((s) => s.id === customization.size)?.name}</p>
                </div>

                {customization.message && (
                  <div className="mb-6 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0">
                    <h4 className="text-gray-800 text-base font-semibold mb-2">Personal Message</h4>
                    <p className="text-gray-600 m-0">"{customization.message}"</p>
                  </div>
                )}

                {customization.deliveryDate && (
                  <div className="mb-6 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0">
                    <h4 className="text-gray-800 text-base font-semibold mb-2">Delivery Date</h4>
                    <p className="text-gray-600 m-0">{new Date(customization.deliveryDate).toLocaleDateString()}</p>
                  </div>
                )}

                <div className="bg-white rounded-lg p-6 mt-6">
                  <h4 className="text-gray-800 text-base font-semibold mb-2">Estimated Price</h4>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span>Base arrangement ({sizes.find((s) => s.id === customization.size)?.name})</span>
                      <span>${sizes.find((s) => s.id === customization.size)?.price}</span>
                    </div>
                    {customization.flowerTypes.map((flowerType) => {
                      const flower = flowerTypes.find((f) => f.id === flowerType)
                      return (
                        <div key={flowerType} className="flex justify-between items-center">
                          <span>{flower?.name}</span>
                          <span>+${flower?.price}</span>
                        </div>
                      )
                    })}
                    <div className="mt-4 pt-4 border-t-2 border-gray-200 text-xl text-red-500">
                      <strong>Total: ${calculatePrice()}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-12 pt-8 border-t border-gray-200 gap-4">
            {step > 1 && (
              <button
                className="px-8 py-4 border-none rounded-lg font-semibold transition-all duration-300 ease-in-out flex items-center gap-2 bg-gray-600 text-white hover:bg-gray-700 hover:-translate-y-0.5"
                onClick={prevStep}
              >
                <i className="fas fa-arrow-left mr-2"></i>Previous
              </button>
            )}
            {step < 4 ? (
              <button
                className="px-8 py-4 border-none rounded-lg font-semibold transition-all duration-300 ease-in-out flex items-center gap-2 bg-gradient-to-br from-[#ba54a9] to-[#fecfef] text-white hover:-translate-y-0.5 hover:shadow-lg w-full sm:w-auto sm:ml-auto"
                onClick={nextStep}
              >
                Next<i className="fas fa-arrow-right ml-2"></i>
              </button>
            ) : (
              <button
                className="px-8 py-4 border-none rounded-lg font-semibold transition-all duration-300 ease-in-out flex items-center gap-2 bg-gradient-to-br from-[#ba54a9] to-[#fecfef] text-white hover:-translate-y-0.5 hover:shadow-lg w-full sm:w-auto sm:ml-auto"
                onClick={handleAddToCart}
              >
                Add to Cart - ${calculatePrice()}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Customize
