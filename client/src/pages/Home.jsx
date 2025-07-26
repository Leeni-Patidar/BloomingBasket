

import { useState, useEffect } from "react"
import axios from "axios"
import HeroSection from "../components/HeroSection"
import FeaturedProducts from "../components/FeaturedProducts"
import Categories from "../components/Categories"
import OccasionCategories from "../components/OccasionCategories"
import BouquetHero from "../components/BouquetHero"


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
    <div className="min-h-screen">
      <HeroSection />
      <Categories />
      <OccasionCategories/>
      <FeaturedProducts products={featuredProducts} loading={loading} />
      <BouquetHero/>
    
    </div>
  )
}

export default Home
