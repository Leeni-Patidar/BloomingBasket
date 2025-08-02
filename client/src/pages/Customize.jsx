"use client"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"

const Customize = () => {
  const { addToCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [showSizeChart, setShowSizeChart] = useState(false)
  const [showPriceChart, setShowPriceChart] = useState(false)
  const [customization, setCustomization] = useState({
    bouquetType: "",
    size: "",
    message: "",
    deliveryDate: "",
    specialInstructions: "",
    referenceImage: "",
  })

  const bouquetTypes = [
    "Flower Bouquet", "Chocolate Bouquet", "Soft Toy Bouquet",
    "Pipecleaner Bouquet", "Butterfly Bouquet", "Hair Clip Bouquet",
    "Crochet Bouquet", "Origami Bouquet", "Fruit Bouquet", "Skincare Bouquet"
  ]

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]

  const handleInputChange = (field, value) => {
    setCustomization((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setCustomization((prev) => ({
        ...prev,
        referenceImage: reader.result,
      }))
    }
    reader.readAsDataURL(file)
  }

  const calculatePrice = () => {
    const basePrices = {
      XS: 20, S: 30, M: 45, L: 60, XL: 80, XXL: 100, XXXL: 120
    }
    return basePrices[customization.size] || 0
  }

  const handleAddToCart = async () => {
    if (!customization.bouquetType || !customization.size || !customization.referenceImage) {
      toast.error("Please complete all required fields")
      return
    }

    if (!user) {
      toast.error("Please login to add items to cart")
      navigate("/login")
      return
    }

    try {
      const customProductData = {
        name: `Customize ${customization.bouquetType}`,
        description: `Custom ${customization.bouquetType} - Size: ${customization.size}${
          customization.message ? ` | Message: ${customization.message}` : ""
        }${customization.specialInstructions ? ` | Instructions: ${customization.specialInstructions}` : ""}`,
        price: calculatePrice(),
        category: "custom",
        images: [customization.referenceImage || "/placeholder.svg?height=300&width=300"],
        stock: 1,
        isCustom: true,
        customization: { ...customization },
      }

      const response = await fetch("/api/products/custom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(customProductData),
      })

      if (!response.ok) throw new Error("Failed to create custom product")
      const { product } = await response.json()

      await addToCart(product._id, 1)

      toast.success("Custom bouquet added to cart!")
      navigate("/cart")
    } catch (error) {
      console.error("Add to cart error:", error)
      toast.error("Failed to add custom bouquet to cart")
    }
  }

  const nextStep = () => {
    if (step === 1 && !user) {
      toast.error("Please login to continue")
      navigate("/login")
      return
    }
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => step > 1 && setStep(step - 1)

  const isNextDisabled =
    (step === 1 && (!customization.bouquetType || !user)) ||
    (step === 2 && !customization.size) ||
    (step === 3 && !customization.referenceImage)

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Customize Your Perfect Bouquet</h1>
          <p className="text-lg">Craft your own personalized bouquet for any occasion</p>
          {!user && step === 1 && (
            <div className="mt-4 p-3 button-bg rounded-lg">
              <p className="text-black">
                Please <span className="font-semibold">login</span> to continue with your customization
              </p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="relative mb-12">
          <div className="flex justify-between relative z-10">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  step >= stepNum ? "button-bg" : "bg-gray-300"
                }`}>{stepNum}</div>
                <div className={`text-sm font-bold ${step >= stepNum ? "text-pink-700" : ""}`}>
                  {["Type", "Size", "Details", "Review"][stepNum - 1]}
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-300 z-0">
            <div className="h-full button-bg transition-all duration-300 ease-in-out"
              style={{ width: `${((step - 1) / 3) * 100}%` }} />
          </div>
        </div>

        {/* Step 1 - Type */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-6 md:p-12 shadow-xl">
            <div className="mb-8 flex justify-between items-center">
              <h3 className="text-2xl font-semibold">Choose your bouquet type</h3>
              <button onClick={() => setShowPriceChart(true)} className="text-sm underline">View Price Chart</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {bouquetTypes.map((type) => (
                <div key={type}
                  className={`border-2 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ease-in-out hover:border-pink-400 ${
                    customization.bouquetType === type ? "border-pink-500 bg-pink-50" : "border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => handleInputChange("bouquetType", type)}>
                  <span className="font-semibold">{type}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 - Size */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-6 md:p-12 shadow-xl">
            <div className="mb-8 flex justify-between items-center">
              <h3 className="text-2xl font-semibold">Choose bouquet size</h3>
              <button onClick={() => setShowSizeChart(true)} className="text-sm underline">View Size Chart</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
              {sizes.map((size) => (
                <div key={size}
                  className={`border-2 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 ease-in-out hover:border-pink-400 ${
                    customization.size === size ? "border-pink-500 bg-pink-50" : "border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => handleInputChange("size", size)}>
                  <h5 className="text-xl font-bold">{size}</h5>
                  <p className="text-sm">{customization.size === size ? `₹${calculatePrice()}` : ""}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 - Details */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-6 md:p-12 shadow-xl space-y-6">
            <h3 className="text-2xl font-semibold text-center mb-8">Add your details</h3>
            <div>
              <label className="block font-medium mb-2">Personal Message (Optional)</label>
              <textarea
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3"
                rows="3"
                value={customization.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Preferred Delivery Date</label>
              <input
                type="date"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3"
                value={customization.deliveryDate}
                onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Special Instructions (Optional)</label>
              <textarea
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3"
                rows="3"
                value={customization.specialInstructions}
                onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Upload Reference Image <span className="text-red-500">*</span></label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3"
              />
              {!customization.referenceImage && (
                <p className="text-red-500 text-sm mt-1">* Reference image is required</p>
              )}
              {customization.referenceImage && (
                <div className="mt-4">
                  <img src={customization.referenceImage} alt="Preview" className="w-full max-w-xs rounded-lg shadow-md" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4 - Review */}
        {step === 4 && (
          <div className="bg-white rounded-2xl p-6 md:p-12 shadow-xl">
            <h3 className="mb-8 text-2xl font-semibold text-center">Review your bouquet</h3>
            <div className="bg-gray-50 p-6 rounded-lg space-y-3">
              <div className="flex justify-between"><span className="font-semibold">Product Name:</span><span>Customize {customization.bouquetType}</span></div>
              <div className="flex justify-between"><span className="font-semibold">Type:</span><span>{customization.bouquetType}</span></div>
              <div className="flex justify-between"><span className="font-semibold">Size:</span><span>{customization.size}</span></div>
              {customization.message && <div className="flex justify-between"><span className="font-semibold">Message:</span><span>{customization.message}</span></div>}
              {customization.deliveryDate && <div className="flex justify-between"><span className="font-semibold">Delivery Date:</span><span>{new Date(customization.deliveryDate).toLocaleDateString()}</span></div>}
              {customization.specialInstructions && <div className="flex justify-between"><span className="font-semibold">Instructions:</span><span>{customization.specialInstructions}</span></div>}
              {customization.referenceImage && (
                <div>
                  <span className="font-semibold">Reference Image:</span>
                  <img src={customization.referenceImage} alt="Reference" className="mt-2 w-full max-w-xs rounded-lg shadow-md" />
                </div>
              )}
              <div className="border-t pt-4 mt-4 flex justify-between items-center">
                <span className="text-xl font-bold">Total Price:</span>
                <span className="text-2xl font-bold">₹{calculatePrice()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-200">
          {step > 1 ? (
            <button className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700" onClick={prevStep}>Previous</button>
          ) : <div />}
          {step < 4 ? (
            <button
              onClick={() => (step === 1 && !user ? navigate("/login") : nextStep())}
              disabled={isNextDisabled}
              className={`px-8 py-3 rounded-lg font-semibold ${
                isNextDisabled ? "bg-gray-300 cursor-not-allowed text-gray-500" : "button-bg button-bg:hover"
              }`}
            >
              {step === 1 && !user ? "Login to Continue" : "Next"}
            </button>
          ) : (
            <button className="px-8 py-3 button-bg button-bg:hover rounded-lg" onClick={handleAddToCart}>
              Add to Cart – ₹{calculatePrice()}
            </button>
          )}
        </div>

       {showSizeChart && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50" style={{ backdropFilter: "blur(4px)" }}>
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Size Chart</h3>
            <ul className="text-sm space-y-2">
              <li><strong>Small:</strong> 5-7 stems</li>
              <li><strong>Medium:</strong> 8-12 stems</li>
              <li><strong>Large:</strong> 13-20 stems</li>
              <li><strong>Deluxe:</strong> 20+ stems</li>
            </ul>
            <button
              onClick={() => setShowSizeChart(false)}
              className="mt-4 button-bg button-bg:hover  px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showPriceChart && (
        <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50 " style={{ backdropFilter: "blur(4px)" }}>
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Price Chart</h3>
            <ul className="text-sm space-y-2">
              <li><strong>Small:</strong> ₹299</li>
              <li><strong>Medium:</strong> ₹499</li>
              <li><strong>Large:</strong> ₹699</li>
              <li><strong>Deluxe:</strong> ₹999</li>
            </ul>
            <button
              onClick={() => setShowPriceChart(false)}
              className="mt-4 button-bg button-bg:hover px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
          </div>
      )}
      </div>
    </div>
  )
}

export default Customize
