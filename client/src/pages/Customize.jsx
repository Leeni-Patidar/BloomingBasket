"use client"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"

const Customize = () => {
  const { addToCart } = useContext(CartContext) // Use regular addToCart instead
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
    "Flower Bouquet",
    "Chocolate Bouquet",
    "Soft Toy Bouquet",
    "Pipecleaner Bouquet",
    "Butterfly Bouquet",
    "Fairy Light Bouquet",
    "Crochet Bouquet",
    "Origami Bouquet",
    "Fruit Bouquet",
    "Skincare Bouquet",
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
      XS: 20,
      S: 30,
      M: 45,
      L: 60,
      XL: 80,
      XXL: 100,
      XXXL: 120,
    }
    return basePrices[customization.size] || 0
  }

  const handleAddToCart = async () => {
    if (!customization.bouquetType || !customization.size) {
      toast.error("Please complete all required fields")
      return
    }

    if (!user) {
      toast.error("Please login to add items to cart")
      navigate("/login")
      return
    }

    try {
      // Create custom product payload
      const customProductData = {
        name: `Customize ${customization.bouquetType}`, // Updated format
        description: `Custom ${customization.bouquetType} - Size: ${customization.size}${
          customization.message ? ` | Message: ${customization.message}` : ""
        }${customization.specialInstructions ? ` | Instructions: ${customization.specialInstructions}` : ""}`,
        price: calculatePrice(),
        category: "custom",
        images: [customization.referenceImage || "/placeholder.svg?height=300&width=300"],
        stock: 1,
        isCustom: true,
        customization: {
          bouquetType: customization.bouquetType,
          size: customization.size,
          message: customization.message,
          deliveryDate: customization.deliveryDate,
          specialInstructions: customization.specialInstructions,
          referenceImage: customization.referenceImage,
        },
      }

      // Create custom product in database first
      const response = await fetch("/api/products/custom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(customProductData),
      })

      if (!response.ok) {
        throw new Error("Failed to create custom product")
      }

      const { product } = await response.json()

      // Add the created product to cart
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

  const isNextDisabled = (step === 1 && (!customization.bouquetType || !user)) || (step === 2 && !customization.size)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 ">Customize Your Perfect Bouquet</h1>
          <p className="text-lg ">Craft your own personalized bouquet for any occasion</p>
          {!user && step === 1 && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
              <p className="text-yellow-800">
                Please <span className="font-semibold">login</span> to continue with your customization
              </p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="relative mb-12">
          <div className="flex justify-between relative z-10">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={`step-${stepNum}`} className="flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    step >= stepNum ? "bg-pink-500 text-white" : "bg-gray-300 "
                  }`}
                >
                  {stepNum}
                </div>
                <div className={`text-sm font-bold ${step >= stepNum ? "text-pink-500" : ""}`}>
                  {stepNum === 1 && "Type"}
                  {stepNum === 2 && "Size"}
                  {stepNum === 3 && "Details"}
                  {stepNum === 4 && "Review"}
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-300 z-0">
            <div
              className="h-full bg-pink-500 transition-all duration-300 ease-in-out"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-12 shadow-xl">
          {/* Step 1: Bouquet Type */}
          {step === 1 && (
            <div>
              <div className="mb-8 flex justify-between items-center">
                <h3 className="text-2xl font-semibold ">Choose your bouquet type</h3>
                <button
                  onClick={() => setShowPriceChart(true)}
                  className="text-sm text-pink-500 underline hover:text-pink-600"
                >
                  View Price Chart
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {bouquetTypes.map((type) => (
                  <div
                    key={`bouquet-${type.replace(/\s+/g, "-").toLowerCase()}`}
                    className={`border-2 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ease-in-out hover:border-pink-400 ${
                      customization.bouquetType === type
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => handleInputChange("bouquetType", type)}
                  >
                    <span className="font-semibold ">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Size */}
          {step === 2 && (
            <div>
              <div className="mb-8 flex justify-between items-center">
                <h3 className="text-2xl font-semibold ">Choose bouquet size</h3>
                <button
                  onClick={() => setShowSizeChart(true)}
                  className="text-sm text-pink-500 underline hover:text-pink-600"
                >
                  View Size Chart
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                {sizes.map((size) => (
                  <div
                    key={`size-${size}`}
                    className={`border-2 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 ease-in-out hover:border-pink-400 ${
                      customization.size === size ? "border-pink-500 bg-pink-50" : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => handleInputChange("size", size)}
                  >
                    <h5 className="text-xl font-bold ">{size}</h5>
                    <p className="text-sm ">₹{customization.size === size ? calculatePrice() : ""}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <div>
              <h3 className="mb-8 text-2xl font-semibold text-center ">Add your details</h3>
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-2 ">Personal Message (Optional)</label>
                  <textarea
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-pink-500 focus:outline-none"
                    rows="3"
                    placeholder="Add a personal message..."
                    value={customization.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2 ">Preferred Delivery Date</label>
                  <input
                    type="date"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-pink-500 focus:outline-none"
                    value={customization.deliveryDate}
                    onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2 ">Special Instructions (Optional)</label>
                  <textarea
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-pink-500 focus:outline-none"
                    rows="3"
                    placeholder="Any special requests..."
                    value={customization.specialInstructions}
                    onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2 ">Upload Reference Image (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-pink-500 focus:outline-none"
                  />
                  {customization.referenceImage && (
                    <div className="mt-4">
                      <p className="text-sm font-semibold mb-2 ">Preview:</p>
                      <img
                        src={customization.referenceImage || "/placeholder.svg"}
                        alt="Reference preview"
                        className="w-full max-w-xs rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div>
              <h3 className="mb-8 text-2xl font-semibold text-center ">Review your bouquet</h3>
              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="font-semibold ">Product Name:</span>
                  <span className="">Customize {customization.bouquetType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold ">Type:</span>
                  <span className="">{customization.bouquetType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold ">Size:</span>
                  <span className="">{customization.size}</span>
                </div>
                {customization.message && (
                  <div className="flex justify-between">
                    <span className="font-semibold ">Message:</span>
                    <span className=" text-right max-w-xs">{customization.message}</span>
                  </div>
                )}
                {customization.deliveryDate && (
                  <div className="flex justify-between">
                    <span className="font-semibold ">Delivery Date:</span>
                    <span className="">{new Date(customization.deliveryDate).toLocaleDateString()}</span>
                  </div>
                )}
                {customization.specialInstructions && (
                  <div className="flex justify-between">
                    <span className="font-semibold ">Instructions:</span>
                    <span className=" text-right max-w-xs">{customization.specialInstructions}</span>
                  </div>
                )}
                {customization.referenceImage && (
                  <div className="mt-4">
                    <span className="font-semibold ">Reference Image:</span>
                    <img
                      src={customization.referenceImage || "/placeholder.svg"}
                      alt="Reference"
                      className="mt-2 w-full max-w-xs rounded-lg shadow-md"
                    />
                  </div>
                )}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold ">Total Price:</span>
                    <span className="text-2xl font-bold text-pink-500">₹{calculatePrice()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-200">
          <div>
            {step > 1 && (
              <button
                className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
                onClick={prevStep}
              >
                Previous
              </button>
            )}
          </div>
          <div>
            {step < 4 ? (
  <button
    onClick={() => {
      if (step === 1 && !user) {
        navigate("/login")
      } else {
        nextStep()
      }
    }}
    disabled={step !== 1 && isNextDisabled}
    className={`px-8 py-3 rounded-lg transition duration-200 font-semibold ${
      step !== 1 && isNextDisabled
        ? "bg-gray-300 cursor-not-allowed text-gray-500"
        : "bg-pink-500 text-white hover:bg-pink-600"
    }`}
  >
    {step === 1 && !user ? "Login to Continue" : "Next"}
  </button>
) : (
  <button
    className="px-8 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-200 font-semibold"
    onClick={handleAddToCart}
  >
    Add to Cart - ₹{calculatePrice()}
  </button>
)}

          </div>
        </div>

        {/* Size Chart Modal */}
        {showSizeChart && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
              <h4 className="text-lg font-semibold mb-4 text-center ">Bouquet Size Chart</h4>
              <ul className="text-sm  space-y-2">
                {[
                  { size: "XS", description: "2 flowers", price: "₹20" },
                  { size: "S", description: "3–5 flowers", price: "₹30" },
                  { size: "M", description: "6–8 flowers", price: "₹45" },
                  { size: "L", description: "8–10 flowers", price: "₹60" },
                  { size: "XL", description: "11–15 flowers", price: "₹80" },
                  { size: "XXL", description: "16–20 flowers", price: "₹100" },
                  { size: "XXXL", description: "20+ flowers", price: "₹120" },
                ].map((item) => (
                  <li key={`size-chart-${item.size}`} className="flex justify-between">
                    <span>
                      <strong>{item.size}</strong>: {item.description}
                    </span>
                    <span className="font-semibold text-pink-500">{item.price}</span>
                  </li>
                ))}
              </ul>
              <button
                className="mt-6 px-4 py-2 w-full bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-200"
                onClick={() => setShowSizeChart(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Price Chart Modal */}
        {showPriceChart && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
              <h4 className="text-lg font-semibold mb-4 text-center ">Bouquet Price Chart</h4>
              <ul className="text-sm  space-y-2">
                {[
                  { type: "Flower Bouquet", price: "₹25+" },
                  { type: "Chocolate Bouquet", price: "₹20+" },
                  { type: "Soft Toy Bouquet", price: "₹30+" },
                  { type: "Pipecleaner Bouquet", price: "₹15+" },
                  { type: "Butterfly Bouquet", price: "₹22+" },
                  { type: "Fairy Light Bouquet", price: "₹28+" },
                  { type: "Crochet Bouquet", price: "₹35+" },
                  { type: "Origami Bouquet", price: "₹18+" },
                  { type: "Fruit Bouquet", price: "₹25+" },
                  { type: "Skincare Bouquet", price: "₹40+" },
                ].map((item) => (
                  <li
                    key={`price-chart-${item.type.replace(/\s+/g, "-").toLowerCase()}`}
                    className="flex justify-between"
                  >
                    <span>
                      <strong>{item.type}</strong>
                    </span>
                    <span className="font-semibold text-pink-500">{item.price}</span>
                  </li>
                ))}
              </ul>
              <button
                className="mt-6 px-4 py-2 w-full bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-200"
                onClick={() => setShowPriceChart(false)}
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
