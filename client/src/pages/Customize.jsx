import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { toast } from "react-toastify"

const Customize = () => {
  const { addToCart } = useContext(CartContext)
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

  const handleAddToCart = () => {
    if (!customization.bouquetType || !customization.size) {
      toast.error("Please complete all required fields")
      return
    }

    const customProduct = {
      _id: `custom-${Date.now()}`,
      name: `Custom ${customization.bouquetType}`,
      price: calculatePrice(),
      images: ["/placeholder.svg?height=300&width=300"],
      customization,
    }

    addToCart(customProduct, 1, customization)
    toast.success("Custom bouquet added to cart!")
    navigate("/cart")
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => step > 1 && setStep(step - 1)

  const isNextDisabled =
    (step === 1 && !customization.bouquetType) ||
    (step === 2 && !customization.size)

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-[2rem] font-bold mb-4">Customize Your Perfect Bouquet</h1>
          <p className="text-[1rem]">Craft your own personalized bouquet for any occasion</p>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-12">
          <div className="flex justify-between relative z-10">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-bold transition-all duration-300 ${step >= stepNum ? "button-bg " : ""}`}>
                  {stepNum}
                </div>
                <div className={`text-sm font-bold ${step >= stepNum ? "text-[#ba54a9]" : ""}`}>
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
              className="h-full button-bg transition-all duration-300 ease-in-out"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 md:p-12 shadow-xl">
          {/* Step 1: Bouquet Type */}
          {step === 1 && (
            <div>
              <h3 className="mb-8 font-semibold text-center flex justify-between items-center text-[1.5rem]">
                Choose your bouquet type
                <button
                  onClick={() => setShowPriceChart(true)}
                  className="text-sm text-[#ba54a9] underline"
                >
                  View Price Chart
                </button>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {bouquetTypes.map((type) => (
                  <div
                    key={type}
                    className={`border-2 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ease-in-out hover:border-[#ba54a9] ${customization.bouquetType === type ? "border-pink-500 button-bg " : "border-gray-200"}`}
                    onClick={() => handleInputChange("bouquetType", type)}
                  >
                    <span className="font-semibold">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Size */}
          {step === 2 && (
            <div>
              <h3 className="mb-8 text-2xl font-semibold text-center flex justify-between items-center">
                Choose bouquet size
                <button
                  onClick={() => setShowSizeChart(true)}
                  className="text-sm text-[#ba54a9] underline"
                >
                  View Size Chart
                </button>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                {sizes.map((size) => (
                  <div
                    key={size}
                    className={`border-2 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 ease-in-out hover:border-[#ba54a9] ${customization.size === size ? "border-pink-500 button-bg " : "border-gray-200"}`}
                    onClick={() => handleInputChange("size", size)}
                  >
                    <h5 className="text-xl font-bold">{size}</h5>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <div>
              <h3 className="mb-8 text-2xl font-semibold text-center">Add your details</h3>
              <div className="mb-6">
                <label className="block font-medium mb-2">Personal Message (Optional)</label>
                <textarea
                  className="w-full border-2 rounded-lg px-4 py-3"
                  rows="3"
                  placeholder="Add a personal message..."
                  value={customization.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                ></textarea>
              </div>
              <div className="mb-6">
                <label className="block font-medium mb-2">Preferred Delivery Date</label>
                <input
                  type="date"
                  className="w-full border-2 rounded-lg px-4 py-3"
                  value={customization.deliveryDate}
                  onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="mb-6">
                <label className="block font-medium mb-2">Special Instructions (Optional)</label>
                <textarea
                  className="w-full border-2 rounded-lg px-4 py-3"
                  rows="3"
                  placeholder="Any special requests..."
                  value={customization.specialInstructions}
                  onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                ></textarea>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div>
              <h3 className="mb-8 font-semibold text-center">Review your bouquet</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p><strong>Type:</strong> {customization.bouquetType}</p>
                <p><strong>Size:</strong> {customization.size}</p>
                {customization.message && <p><strong>Message:</strong> {customization.message}</p>}
                {customization.deliveryDate && <p><strong>Delivery Date:</strong> {new Date(customization.deliveryDate).toLocaleDateString()}</p>}
                {customization.specialInstructions && <p><strong>Instructions:</strong> {customization.specialInstructions}</p>}
                <p className="mt-4 text-xl text-pink-500 font-bold">Estimated Price: ${calculatePrice()}</p>
              </div>
            </div>
          )}
        </div>

        {/* ✅ Navigation Buttons */}
        <div className="flex justify-end items-center pt-5 border-t border-gray-200 gap-4">
          {step > 1 && (
            <button
              className="px-8 py-4 bg-gray-600 rounded-lg hover:opacity-90"
              onClick={prevStep}
            >
              Previous
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={nextStep}
              disabled={isNextDisabled}
              className={`px-8 py-4 rounded-lg transition duration-200 ${
                isNextDisabled
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "button-bg  hover:opacity-90"
              }`}
            >
              Next
            </button>
          ) : (
            <button
              className="px-8 py-4 button-bg  rounded-lg hover:opacity-90"
              onClick={handleAddToCart}
            >
              Add to Cart - ${calculatePrice()}
            </button>
          )}
        </div>

        {/* Size Chart Modal */}
        {showSizeChart && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
              <h4 className="text-lg font-semibold mb-4 text-center">Bouquet Size Chart</h4>
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2 text-left">
                <li><strong>XS</strong>: 2 flowers</li>
                <li><strong>S</strong>: 3–5 flowers</li>
                <li><strong>M</strong>: 6–8 flowers</li>
                <li><strong>L</strong>: 8–10 flowers</li>
                <li><strong>XL</strong>: 11–15 flowers</li>
                <li><strong>XXL</strong>: 16–20 flowers</li>
                <li><strong>XXXL</strong>: 20+ flowers</li>
              </ul>
              <button
                className="mt-6 px-4 py-2 w-full button-bg rounded-lg"
                onClick={() => setShowSizeChart(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Price Chart Modal */}
        {showPriceChart && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50" style={{ backdropFilter: "blur(4px)" }}>
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
              <h4 className="text-lg font-semibold mb-4 text-center">Bouquet Price Chart</h4>
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2 text-left">
                <li><strong>Flower Bouquet</strong>: $25+</li>
                <li><strong>Chocolate Bouquet</strong>: $20+</li>
                <li><strong>Soft Toy Bouquet</strong>: $30+</li>
                <li><strong>Pipecleaner Bouquet</strong>: $15+</li>
                <li><strong>Butterfly Bouquet</strong>: $22+</li>
                <li><strong>Fairy Light Bouquet</strong>: $28+</li>
                <li><strong>Crochet Bouquet</strong>: $35+</li>
                <li><strong>Origami Bouquet</strong>: $18+</li>
                <li><strong>Fruit Bouquet</strong>: $25+</li>
                <li><strong>Skincare Bouquet</strong>: $40+</li>
              </ul>
              <button
                className="mt-6 px-4 py-2 w-full button-bg rounded-lg"
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
