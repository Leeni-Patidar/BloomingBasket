"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faFilter, faTimes } from "@fortawesome/free-solid-svg-icons"
import styles from "../assets/Shop.module.css"
import ProductCard from "../components/ProductCard"

// Sample product data
const products = [
  {
    id: 1,
    name: "Pink Perfection",
    description: "Fresh pink roses and peonies",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Mixed Pastel Posy",
    description: "Delicate mixed pastel flowers",
    price: 59.99,
    salePrice: 49.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Crystal Vase",
    description: "Elegant clear glass vase",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Burst of Spring",
    description: "Colorful spring arrangement",
    price: 54.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Pink Garden Delight",
    description: "Lush pink garden roses",
    price: 64.99,
    salePrice: 54.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    name: "Purple Dream",
    description: "Lavender and purple blooms",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 7,
    name: "Crystal Elegance Vase",
    description: "Modern crystal vase",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 8,
    name: "Red Romance",
    description: "Passionate red roses",
    price: 69.99,
    salePrice: 59.99,
    image: "/placeholder.svg?height=300&width=300",
  },
]

// Categories for filter buttons
const categories = [
  { id: "all", name: "All Flowers" },
  { id: "fresh", name: "Fresh Bouquets" },
  { id: "artifical", name: "Artifical Flowers" },
  { id: "vases", name: " Vases" },
  { id: "gifts", name: "Gift Bundles" },
]

const Shop = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("featured")

  // Animation on scroll
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(`.${styles.animateOnScroll}`)

      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight

        if (elementPosition < windowHeight - 100) {
          element.classList.add(styles.animated)
        }
      })
    }

    window.addEventListener("scroll", animateOnScroll)
    animateOnScroll() // Run once on initial load

    return () => window.removeEventListener("scroll", animateOnScroll)
  }, [])

  // Filter products when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProducts(products)
    } else {
      // This is a simplified filter - in a real app, products would have category IDs
      const filtered = products.filter((product) => {
        if (activeCategory === "fresh") return product.name.includes("Pink") || product.name.includes("Spring")
        if (activeCategory === "artifical") return product.name.includes("Purple") || product.name.includes("Pastel")
        if (activeCategory === "vases") return product.name.includes("Vase")
        if (activeCategory === "gifts") return product.name.includes("Romance") || product.name.includes("Delight")
        return true
      })

      setFilteredProducts(filtered)
    }
  }, [activeCategory])

  // Sort products when sortBy changes
  useEffect(() => {
    const sorted = [...filteredProducts]

    if (sortBy === "price-low") {
      sorted.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
    } else if (sortBy === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredProducts(sorted)
  }, [sortBy])

  const handleCustomizerClick = () => {
    navigate("/customizer")
  }

  return (
    <div className={styles.collectionPage}>
      <Navbar />

      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <div className="container">
          <h1 className={styles.pageTitle}>Our Collection</h1>
          <p className={styles.pageDescription}>
            Discover our handpicked flower bouquets and bring joy to your loved ones with our beautiful floral
            arrangements.
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className={styles.categoryButtons}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.categoryBtn} ${activeCategory === category.id ? styles.active : ""}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="d-flex align-items-center">
              <button className={styles.filterToggle} onClick={() => setShowFilters(!showFilters)}>
                <FontAwesomeIcon icon={showFilters ? faTimes : faFilter} className="me-2" />
                {showFilters ? "Close" : "Filter & Sort"}
              </button>

              <div className={`${styles.sortDropdown} ${showFilters ? styles.show : ""}`}>
                <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className={styles.productsSection}>
        <div className="container">
          <div className="row g-3">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="col-6 col-md-4 col-lg-3">
                <div className={`${styles.animateOnScroll}`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Create Your Own Bouquet */}
      <section className={`${styles.customSection} ${styles.animateOnScroll}`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className={styles.customTitle}>Create Your Own Bouquet</h2>
              <p className={styles.customText}>
                Design a personalized flower arrangement that perfectly captures your style and sentiment. Our florists
                will bring your vision to life with care and expertise.
              </p>
              <button className={styles.customBtn} onClick={handleCustomizerClick}>
                Get Started <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Shop
