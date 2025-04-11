"use client"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Row, Col, Button } from "react-bootstrap"
import { addToCart } from "../redux/cartSlice"
import styles from "../assets/BouquetCustomizer.module.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function BouquetCustomizer() {
  const dispatch = useDispatch()
  const [selectedFlowers, setSelectedFlowers] = useState([])
  const [selectedColor, setSelectedColor] = useState("pink")
  const [selectedStyle, setSelectedStyle] = useState("round")
  const [extras, setExtras] = useState([])

  const flowers = [
    { id: "roses", name: "Roses", price: 4.5, image: "/placeholder.svg?height=200&width=200" },
    { id: "lilies", name: "Lilies", price: 3.5, image: "/placeholder.svg?height=200&width=200" },
    { id: "tulips", name: "Tulips", price: 3.0, image: "/placeholder.svg?height=200&width=200" },
  ]

  const colors = [
    { id: "pink", color: "#FFB6C1" },
    { id: "coral", color: "#FF7F50" },
    { id: "purple", color: "#B19CD9" },
    { id: "yellow", color: "#FFEB99" },
  ]

  const stylesList = [
    { id: "round", name: "Round Bouquet", price: 10.99 },
    { id: "cascading", name: "Cascading", price: 16.99 },
  ]

  const extraItems = [
    { id: "giftbox", name: "Gift Box", price: 5.99 },
    { id: "vase", name: "Glass Vase", price: 14.99 },
  ]

  const toggleFlower = (flowerId) => {
    if (selectedFlowers.includes(flowerId)) {
      setSelectedFlowers(selectedFlowers.filter((id) => id !== flowerId))
    } else {
      setSelectedFlowers([...selectedFlowers, flowerId])
    }
  }

  const toggleExtra = (extraId) => {
    if (extras.includes(extraId)) {
      setExtras(extras.filter((id) => id !== extraId))
    } else {
      setExtras([...extras, extraId])
    }
  }

  const calculateSubtotal = () => {
    const flowerCost = selectedFlowers.reduce((total, flowerId) => {
      const flower = flowers.find((f) => f.id === flowerId)
      return total + (flower?.price || 0)
    }, 0)

    const styleCost = stylesList.find((s) => s.id === selectedStyle)?.price || 0
    return flowerCost + styleCost
  }

  const calculateExtras = () => {
    return extras.reduce((total, extraId) => {
      const extra = extraItems.find((e) => e.id === extraId)
      return total + (extra?.price || 0)
    }, 0)
  }

  const calculateTotal = () => calculateSubtotal() + calculateExtras()

  const handleAddToCart = () => {
    if (selectedFlowers.length === 0) {
      alert("Please select at least one flower for your bouquet")
      return
    }

    const customBouquet = {
      id: `custom-${Date.now()}`,
      name: "Custom Bouquet",
      description: `${selectedFlowers.length} flower types in ${selectedColor} color, ${selectedStyle} style`,
      price: calculateTotal(),
      image: "/placeholder.svg?height=300&width=300",
      isCustom: true,
      customDetails: {
        flowers: selectedFlowers,
        color: selectedColor,
        style: selectedStyle,
        extras: extras,
      },
    }

    dispatch(addToCart(customBouquet))
    alert("Custom bouquet added to cart!")
  }

  return (
    <>
      <Navbar />
      <div className={styles.customizer}>
        <header className={styles.header}>
          <h1 className={styles.title}>Create Your Perfect Bouquet</h1>
          <p className={styles.subtitle}>
            At Blooming Basket, we believe that every flower tells a story. Design your own unique bouquet by selecting
            your favorite blooms, colors, and styles.
          </p>
        </header>

        <div className="container">
          <Row className="g-4">
            <Col lg={8}>
              {/* Flowers Section */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>1. Choose Your Flowers</h2>
                <Row className="g-3">
                  {flowers.map((flower) => (
                    <Col key={flower.id} sm={4}>
                      <div
                        className={`${styles.flowerCard} ${selectedFlowers.includes(flower.id) ? styles.selected : ""}`}
                        onClick={() => toggleFlower(flower.id)}
                      >
                        <div className={styles.imageContainer}>
                          <img
                            src={flower.image || "/placeholder.svg"}
                            alt={flower.name}
                            className={styles.flowerImage}
                          />
                        </div>
                        <div className={styles.flowerInfo}>
                          <h3>{flower.name}</h3>
                          <p>${flower.price.toFixed(2)}/stem</p>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </section>

              {/* Colors Section */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>2. Select Colors</h2>
                <div className={styles.colorOptions}>
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      className={`${styles.colorButton} ${selectedColor === color.id ? styles.selectedColor : ""}`}
                      style={{ backgroundColor: color.color }}
                      onClick={() => setSelectedColor(color.id)}
                      aria-label={`Select ${color.id} color`}
                    ></button>
                  ))}
                </div>
              </section>

              {/* Styles Section */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>3. Choose Style & Size</h2>
                <Row className="g-3">
                  {stylesList.map((style) => (
                    <Col key={style.id} md={6}>
                      <div
                        className={`${styles.styleCard} ${selectedStyle === style.id ? styles.selectedStyle : ""}`}
                        onClick={() => setSelectedStyle(style.id)}
                      >
                        <div className={styles.styleInfo}>
                          <h3>{style.name}</h3>
                          <p>${style.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </section>

              {/* Extras Section */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>4. Add Extras</h2>
                {extraItems.map((item) => (
                  <div key={item.id} className={styles.extraItem}>
                    <span>{item.name}</span>
                    <Button
                      variant={extras.includes(item.id) ? "danger" : "outline-danger"}
                      onClick={() => toggleExtra(item.id)}
                      className={extras.includes(item.id) ? styles.addedButton : ""}
                    >
                      {extras.includes(item.id) ? "Added" : `Add $${item.price.toFixed(2)}`}
                    </Button>
                  </div>
                ))}
              </section>
            </Col>

            {/* Summary Section */}
            <Col lg={4}>
              <aside className={styles.orderSummary}>
                <h3 className={styles.summaryTitle}>Your Bouquet</h3>
                <div className={styles.bouquetPreview}>
                  <div
                    className={styles.previewCircle}
                    style={{ backgroundColor: colors.find((c) => c.id === selectedColor)?.color }}
                  >
                    {selectedFlowers.length > 0 ? (
                      <span>{selectedFlowers.length} flower types</span>
                    ) : (
                      <span>Select flowers</span>
                    )}
                  </div>
                </div>
                <div className={styles.pricingSummary}>
                  <div className={styles.pricingRow}>
                    <span>Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className={styles.pricingRow}>
                    <span>Extras</span>
                    <span>${calculateExtras().toFixed(2)}</span>
                  </div>
                  <div className={`${styles.pricingRow} ${styles.totalRow}`}>
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Buttons */}
                <Button
                  variant="danger"
                  size="lg"
                  className={styles.addToCartButton}
                  onClick={handleAddToCart}
                  disabled={selectedFlowers.length === 0}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="link"
                  size="lg"
                  className={styles.resetButton}
                  onClick={() => {
                    setSelectedFlowers([])
                    setSelectedColor("pink")
                    setSelectedStyle("round")
                    setExtras([])
                  }}
                >
                  Reset Design
                </Button>
              </aside>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  )
}
