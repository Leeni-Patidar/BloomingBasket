"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import HeroSection from "../../components/HeroSection/HeroSection"
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts"
import Categories from "../../components/Categories/Categories"
import Testimonials from "../../components/Testimonials/Testimonials"
import styles from "./Home.module.css"

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get("/api/products?featured=true&limit=8")
      setFeaturedProducts(response.data.products)
    } catch (error) {
      console.error("Error fetching featured products:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.home}>
      <HeroSection />
      <Categories />
      <FeaturedProducts products={featuredProducts} loading={loading} />
      <Testimonials />
    </div>
  )
}

export default Home
