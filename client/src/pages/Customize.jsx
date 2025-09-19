"use client"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"
import axios from "axios"

const Customize = () => {
  const { addToCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [showSizeChart, setShowSizeChart] = useState(false)
  const [showPriceChart, setShowPriceChart] = useState(false)
  const [loading, setLoading] = useState(false)

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
    setCustomization(prev => ({ ...prev, [field]: value }))
  }

const handleUrlChange = (e) => {
  const url = e.target.value
  if (!url) return

  setCustomization((prev) => ({
    ...prev,
    referenceImage: url,
  }))
}


  const calculatePrices = () => {
    const sizePrices = { XS: 120, S: 150, M: 275, L: 300, XL: 350, XXL: 400, XXXL: 500 }
    const typePrices = {
      "Flower Bouquet": 250,
      "Chocolate Bouquet": 550,
      "Soft Toy Bouquet": 550,
      "Pipecleaner Bouquet": 450,
      "Butterfly Bouquet": 450,
      "Hair Clip Bouquet": 350,
      "Crochet Bouquet": 650,
      "Origami Bouquet": 650,
      "Fruit Bouquet": 650,
      "Skincare Bouquet": 650,
    }

    const typePrice = typePrices[customization.bouquetType] || 0
    const sizePrice = sizePrices[customization.size] || 0
    const finalPrice = typePrice + sizePrice

    return { typePrice, sizePrice, finalPrice }
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
      setLoading(true)
      const { finalPrice } = calculatePrices()
      const customProductData = {
        name: `Customize ${customization.bouquetType}`,
        description: `Custom ${customization.bouquetType} - Size: ${customization.size}${customization.message ? ` | Message: ${customization.message}` : ""}${customization.specialInstructions ? ` | Instructions: ${customization.specialInstructions}` : ""}`,
        price: finalPrice,
        category: "custom",
        images: [customization.referenceImage],
        stock: 1,
        isCustom: true,
        customization,
      }

      // ✅ Create custom product
      
      const token = localStorage.getItem("token")
      const res = await axios.post("/api/products/custom", customProductData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const productId = res.data.product._id
      if (!productId) throw new Error("Custom product creation failed")

     // ✅ Add to cart
      await addToCart(productId, 1)
      toast.success("Custom bouquet added to cart!")
      navigate("/cart")
    } catch (err) {
      console.error("Add to cart error:", err)
      toast.error(err.response?.data?.message || err.message || "Failed to add custom bouquet to cart")
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => step < 4 && setStep(step + 1)
  const prevStep = () => step > 1 && setStep(step - 1)

  const isNextDisabled =
    (step === 1 && !customization.bouquetType) ||
    (step === 2 && !customization.size) ||
    (step === 3 && !customization.referenceImage)

  const { typePrice, sizePrice, finalPrice } = calculatePrices()

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Customize Your Perfect Bouquet</h1>
          <p className="text-lg">Craft your own personalized bouquet for any occasion</p>
          {!user && step === 1 && (
            <div className="mt-4 p-3 button-bg rounded-lg cursor-pointer" onClick={() => navigate("/login")}>
              <p className="text-black">Please <span className="font-semibold">login</span> to continue with your customization</p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="relative mb-12">
          <div className="flex justify-between relative z-10">
            {[1,2,3,4].map(n => (
              <div key={n} className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step >= n ? "button-bg" : "bg-gray-300"}`}>{n}</div>
                <div className={`text-sm font-bold ${step >= n ? "text-pink-700" : ""}`}>
                  {["Type","Size","Details","Review"][n-1]}
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-300 z-0">
            <div className="h-full button-bg transition-all duration-300 ease-in-out" style={{ width: `${((step-1)/3)*100}%` }} />
          </div>
        </div>

        {/* Steps */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-6 md:p-12 shadow-xl">
            <div className="mb-8 flex justify-between items-center">
              <h3 className="text-2xl font-semibold">Choose your bouquet type</h3>
              <button onClick={()=>setShowPriceChart(true)} className="text-sm underline">View Price Chart</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {bouquetTypes.map(type => (
                <div key={type}
                  className={`border-2 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ease-in-out hover:border-pink-400 ${customization.bouquetType===type ? "border-pink-500 bg-pink-50":"border-gray-200 hover:bg-gray-50"}`}
                  onClick={()=>handleInputChange("bouquetType", type)}
                >
                  <span className="font-semibold">{type}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-2xl p-6 md:p-12 shadow-xl">
            <div className="mb-8 flex justify-between items-center">
              <h3 className="text-2xl font-semibold">Choose bouquet size</h3>
              <button onClick={()=>setShowSizeChart(true)} className="text-sm underline">View Size Chart</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
              {sizes.map(size => (
                <div key={size}
                  className={`border-2 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 ease-in-out hover:border-pink-400 ${customization.size===size ? "border-pink-500 bg-pink-50":"border-gray-200 hover:bg-gray-50"}`}
                  onClick={()=>handleInputChange("size", size)}
                >
                  <h5 className="text-xl font-bold">{size}</h5>
                  <p className="text-sm">{customization.size===size ? `₹${finalPrice}`:""}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-2xl p-6 md:p-12 shadow-xl space-y-6">
            <h3 className="text-2xl font-semibold text-center mb-8">Add your details</h3>
            <div>
              <label className="block font-medium mb-2">Personal Message (Optional)</label>
              <textarea className="w-full border-2 border-gray-300 rounded-lg px-4 py-3" rows="3"
                value={customization.message} onChange={e=>handleInputChange("message", e.target.value)} />
            </div>
            <div>
              <label className="block font-medium mb-2">Preferred Delivery Date</label>
              <input type="date" className="w-full border-2 border-gray-300 rounded-lg px-4 py-3"
                value={customization.deliveryDate} onChange={e=>handleInputChange("deliveryDate", e.target.value)}
                min={new Date().toISOString().split("T")[0]} />
            </div>
            <div>
              <label className="block font-medium mb-2">Special Instructions (Optional)</label>
              <textarea className="w-full border-2 border-gray-300 rounded-lg px-4 py-3" rows="3"
                value={customization.specialInstructions} onChange={e=>handleInputChange("specialInstructions", e.target.value)} />
            </div>
            <div>
              <label className="block font-medium mb-2">Upload Reference Image URL <span className="text-red-500">*</span></label>
              <input type="url" accept="image/*" onChange={handleUrlChange}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3" />
            </div>
          </div>
        )}

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
              <div className="border-t pt-4 mt-4 flex justify-between items-center font-bold"><span>Total Price:</span><span>₹{finalPrice}</span></div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-200">
  {/* Previous Button */}
  {step > 1 ? (
    <button
      onClick={prevStep}
      className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
    >
      Previous
    </button>
  ) : (
    <div />
  )}

  {/* Next / Add to Cart Button */}
  {step < 4 ? (
    <button
      onClick={() => {
        if (step === 1 && !user) {
          navigate("/login");
        } else {
          nextStep();
        }
      }}
      disabled={isNextDisabled || (step === 1 && !user)}
      className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
        isNextDisabled || (step === 1 && !user)
          ? "bg-gray-300 cursor-not-allowed text-gray-500"
          : "button-bg hover:scale-95 active:scale-90"
      }`}
    >
      {step === 1 && !user ? "Login to Continue" : "Next"}
    </button>
  ) : (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
        loading ? "bg-pink-300 cursor-not-allowed" : "button-bg hover:scale-95 active:scale-90"
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
          Adding...
        </div>
      ) : (
        `Add to Cart – ₹${finalPrice}`
      )}
    </button>
  )}
</div>

      </div>
    </div>
  )
}

export default Customize
