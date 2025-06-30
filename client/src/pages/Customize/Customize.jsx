"use client"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import { toast } from "react-toastify"
import styles from "./Customize.module.css"

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
    <div className={styles.customize}>
      <div className="container">
        <div className={styles.header}>
          <h1>Customize Your Perfect Bouquet</h1>
          <p>Create a unique floral arrangement tailored to your special occasion</p>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressBar}>
          <div className={styles.progressSteps}>
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className={`${styles.progressStep} ${step >= stepNum ? styles.active : ""}`}>
                <div className={styles.stepNumber}>{stepNum}</div>
                <div className={styles.stepLabel}>
                  {stepNum === 1 && "Occasion"}
                  {stepNum === 2 && "Flowers"}
                  {stepNum === 3 && "Details"}
                  {stepNum === 4 && "Review"}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.progressLine}>
            <div className={styles.progressFill} style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
          </div>
        </div>

        <div className={styles.customizationContent}>
          {/* Step 1: Occasion */}
          {step === 1 && (
            <div className={styles.step}>
              <h3>What's the occasion?</h3>
              <div className={styles.occasionGrid}>
                {occasions.map((occasion) => (
                  <div
                    key={occasion.id}
                    className={`${styles.occasionCard} ${
                      customization.occasion === occasion.id ? styles.selected : ""
                    }`}
                    onClick={() => handleInputChange("occasion", occasion.id)}
                  >
                    <i className={occasion.icon}></i>
                    <span>{occasion.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Flowers and Colors */}
          {step === 2 && (
            <div className={styles.step}>
              <h3>Choose your flowers and colors</h3>

              <div className={styles.subsection}>
                <h4>Flower Types (Select multiple)</h4>
                <div className={styles.flowerGrid}>
                  {flowerTypes.map((flower) => (
                    <div
                      key={flower.id}
                      className={`${styles.flowerCard} ${
                        customization.flowerTypes.includes(flower.id) ? styles.selected : ""
                      }`}
                      onClick={() => handleArrayToggle("flowerTypes", flower.id)}
                    >
                      <span className={styles.flowerName}>{flower.name}</span>
                      <span className={styles.flowerPrice}>+${flower.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.subsection}>
                <h4>Color Scheme (Select multiple)</h4>
                <div className={styles.colorGrid}>
                  {colors.map((color) => (
                    <div
                      key={color.id}
                      className={`${styles.colorCard} ${
                        customization.colors.includes(color.id) ? styles.selected : ""
                      }`}
                      onClick={() => handleArrayToggle("colors", color.id)}
                    >
                      <div
                        className={styles.colorSwatch}
                        style={{
                          background: color.hex.includes("gradient") ? color.hex : color.hex,
                          border: color.id === "white" ? "2px solid #ddd" : "none",
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
            <div className={styles.step}>
              <h3>Size and special details</h3>

              <div className={styles.subsection}>
                <h4>Arrangement Size</h4>
                <div className={styles.sizeGrid}>
                  {sizes.map((size) => (
                    <div
                      key={size.id}
                      className={`${styles.sizeCard} ${customization.size === size.id ? styles.selected : ""}`}
                      onClick={() => handleInputChange("size", size.id)}
                    >
                      <h5>{size.name}</h5>
                      <p>{size.description}</p>
                      <span className={styles.sizePrice}>${size.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.subsection}>
                <h4>Personal Message (Optional)</h4>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Add a personal message for the card..."
                  value={customization.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                ></textarea>
              </div>

              <div className={styles.subsection}>
                <div className="row">
                  <div className="col-md-6">
                    <h4>Preferred Delivery Date</h4>
                    <input
                      type="date"
                      className="form-control"
                      value={customization.deliveryDate}
                      onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="col-md-6">
                    <h4>Budget Range (Optional)</h4>
                    <select
                      className="form-select"
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

              <div className={styles.subsection}>
                <h4>Special Instructions (Optional)</h4>
                <textarea
                  className="form-control"
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
            <div className={styles.step}>
              <h3>Review your custom arrangement</h3>

              <div className={styles.reviewCard}>
                <div className={styles.reviewSection}>
                  <h4>Occasion</h4>
                  <p>{occasions.find((o) => o.id === customization.occasion)?.name}</p>
                </div>

                <div className={styles.reviewSection}>
                  <h4>Flowers</h4>
                  <p>{customization.flowerTypes.map((id) => flowerTypes.find((f) => f.id === id)?.name).join(", ")}</p>
                </div>

                <div className={styles.reviewSection}>
                  <h4>Colors</h4>
                  <p>{customization.colors.map((id) => colors.find((c) => c.id === id)?.name).join(", ")}</p>
                </div>

                <div className={styles.reviewSection}>
                  <h4>Size</h4>
                  <p>{sizes.find((s) => s.id === customization.size)?.name}</p>
                </div>

                {customization.message && (
                  <div className={styles.reviewSection}>
                    <h4>Personal Message</h4>
                    <p>"{customization.message}"</p>
                  </div>
                )}

                {customization.deliveryDate && (
                  <div className={styles.reviewSection}>
                    <h4>Delivery Date</h4>
                    <p>{new Date(customization.deliveryDate).toLocaleDateString()}</p>
                  </div>
                )}

                <div className={styles.priceSection}>
                  <h4>Estimated Price</h4>
                  <div className={styles.priceBreakdown}>
                    <div className={styles.priceItem}>
                      <span>Base arrangement ({sizes.find((s) => s.id === customization.size)?.name})</span>
                      <span>${sizes.find((s) => s.id === customization.size)?.price}</span>
                    </div>
                    {customization.flowerTypes.map((flowerType) => {
                      const flower = flowerTypes.find((f) => f.id === flowerType)
                      return (
                        <div key={flowerType} className={styles.priceItem}>
                          <span>{flower?.name}</span>
                          <span>+${flower?.price}</span>
                        </div>
                      )
                    })}
                    <div className={styles.totalPrice}>
                      <strong>Total: ${calculatePrice()}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className={styles.navigation}>
            {step > 1 && (
              <button className={styles.prevBtn} onClick={prevStep}>
                <i className="fas fa-arrow-left me-2"></i>Previous
              </button>
            )}
            {step < 4 ? (
              <button className={styles.nextBtn} onClick={nextStep}>
                Next<i className="fas fa-arrow-right ms-2"></i>
              </button>
            ) : (
              <button className={styles.addToCartBtn} onClick={handleAddToCart}>
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
