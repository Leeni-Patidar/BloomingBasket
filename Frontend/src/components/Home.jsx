"use client"

import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import "bootstrap/dist/css/bootstrap.min.css"
import { Cake, Gem, Heart, Handshake, PartyPopper, HelpingHand, ArrowRight, LucideHeart } from "lucide-react"
import styles from "../assets/Home.module.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { addToWishlist } from "../redux/wishlistSlice"
import { addToCart } from "../redux/cartSlice"

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleGetStartedClick = () => {
    navigate("/customizer")
  }

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product))
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  return (
    <div className={styles.Home}>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className={styles.heroContent}>
                <h2 className={styles.heroTitle}>Beautiful Blooms for Every Occasion</h2>
                <p className={styles.heroText}>
                  Discover our handpicked flower bouquets and bring joy to your loved ones with our beautiful floral
                  arrangements.
                </p>
                <div className="d-flex gap-3 mt-4">
                  <a href="/shop" className={styles.outlineButton}>
                    Shop Now
                  </a>
                  <a href="/contact" className={styles.outlineButton}>
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className={styles.heroImageWrapper}>
                <img
                  src="/images/Home/home-1.png"
                  alt="Beautiful flower bouquet"
                  className={styles.heroImage}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className={styles.categorySection}>
        <div className="container">
          <h3 className={`${styles.sectionTitle} text-center mb-4`}>Shop by Category</h3>
          <div className="row g-4">
            {categories.map((category, index) => (
              <div key={index} className="col-6 col-md-3">
                <div className={styles.categoryCard}>
                  <div className={styles.categoryImageWrapper}>
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className={styles.categoryImage}
                      loading="lazy"
                    />
                  </div>
                  <h4 className={styles.categoryName}>{category.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Occasion */}
      <section className={styles.occasionSection}>
        <div className="container">
          <h3 className={`${styles.sectionTitle} text-center mb-4`}>Shop by Occasion</h3>
          <div className="row g-4 justify-content-center">
            {occasions.map((occasion, index) => {
              const Icon = occasion.icon
              return (
                <div key={index} className="col-4 col-md-2">
                  <div className={styles.occasionItem}>
                    <div className={styles.occasionIcon}>
                      <Icon size={32} />
                    </div>
                    <p className={styles.occasionName}>{occasion.name}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.productsSection}>
        <div className="container">
          <h3 className={`${styles.sectionTitle} text-center mb-4`}>Featured Products</h3>
          <div className="row g-4">
            {products.map((product, index) => (
              <div key={index} className="col-6 col-md-3">
                <div className={styles.productCard}>
                  <div className={styles.productImageWrapper}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className={styles.productImage}
                      loading="lazy"
                    />
                    <button
                      className={`${styles.wishlistBtn} ${styles.iconButton}`}
                      onClick={() => handleAddToWishlist(product)}
                    >
                      <LucideHeart size={18} />
                    </button>
                  </div>
                  <div className={styles.productInfo}>
                    <h4 className={styles.productName}>{product.name}</h4>
                    <p className={styles.productDescription}>{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <span className={styles.productPrice}>${product.price}</span>
                      <button className={styles.addToCartBtn} onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Bouquet Section */}
      <section className={styles.customSection}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className={styles.customContent}>
                <h3 className={styles.customTitle}>Create Your Perfect Bouquet</h3>
                <p className={styles.customText}>
                  Design a personalized flower arrangement that perfectly captures your style and sentiment. Our
                  florists will bring your vision to life with care and expertise.
                </p>
                <button className={`${styles.btnPrimary} ${styles.btnAnimated} mt-3`} onClick={handleGetStartedClick}>
                  Get Started <ArrowRight size={18} className="ms-2" />
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.customImageWrapper}>
                <img
                  src="/images/Home/home-6.jpeg"
                  alt="Custom bouquet"
                  className={styles.customImage}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Sample Data
const categories = [
  { name: "Fresh Bouquets", image: "/images/Home/home-2.webp" },
  { name: "Dried Flowers", image: "/images/Home/home-3.jpg" },
  { name: "Plants & Vases", image: "/images/Home/home-4.jpg" },
  { name: "Gift Bundles", image: "/images/Home/home-5.jpeg" },
]

const occasions = [
  { name: "Birthday", icon: Cake },
  { name: "Wedding", icon: Gem },
  { name: "Anniversary", icon: Heart },
  { name: "Sympathy", icon: HelpingHand },
  { name: "Congratulations", icon: PartyPopper },
  { name: "Love & Romance", icon: Handshake },
]

const products = [
  {
    id: 1,
    name: "Pink Perfection",
    description: "Fresh pink roses and peonies",
    price: 49.99,
    image: "/images/Home/flower-1.jpg",
  },
  {
    id: 2,
    name: "Elegant Harmony",
    description: "Mixed roses with eucalyptus",
    price: 59.99,
    image: "/images/Home/flower-2.jpg",
  },
  {
    id: 3,
    name: "Crystal Vase",
    description: "Modern clear glass vase",
    price: 29.99,
    image: "/images/Home/vase-1.jpg",
  },
  {
    id: 4,
    name: "Pastel Dream",
    description: "Soft pastel arrangement",
    price: 54.99,
    image: "/images/Home/flower-3.jpg",
  },
]

export default Home
