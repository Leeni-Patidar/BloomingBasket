"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products?featured=true&limit=6")
      if (response.ok) {
        const data = await response.json()
        setFeaturedProducts(data.products)
      }
    } catch (error) {
      console.error("Error fetching featured products:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section py-5 text-white">
        <div className="container">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1 className="display-4 fw-bold mb-4 fade-in">
                  Welcome to <span className="gradient-text">Blooming Basket</span>
                </h1>
                <p className="lead mb-4 fade-in">
                  Discover the most beautiful and fresh flowers for every occasion. From romantic roses to elegant
                  lilies, we bring nature's beauty to your doorstep.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 fade-in">
                  <Link to="/shop" className="btn btn-light btn-lg px-4">
                    <i className="fas fa-store me-2"></i>
                    Shop Now
                  </Link>
                  <Link to="/customize" className="btn btn-outline-light btn-lg px-4">
                    <i className="fas fa-palette me-2"></i>
                    Custom Bouquet
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image text-center">
                <img
                  src="/placeholder.svg?height=500&width=500"
                  alt="Beautiful flower arrangement"
                  className="img-fluid rounded-3 shadow-lg hover-lift"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="feature-card p-4 h-100">
                <div className="feature-icon mb-3">
                  <i className="fas fa-truck text-primary" style={{ fontSize: "3rem" }}></i>
                </div>
                <h4 className="h5 mb-3">Free Delivery</h4>
                <p className="text-muted">Free delivery on orders over $50. Fast and reliable service to your door.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card p-4 h-100">
                <div className="feature-icon mb-3">
                  <i className="fas fa-leaf text-primary" style={{ fontSize: "3rem" }}></i>
                </div>
                <h4 className="h5 mb-3">Fresh Flowers</h4>
                <p className="text-muted">Hand-picked fresh flowers sourced directly from local growers.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card p-4 h-100">
                <div className="feature-icon mb-3">
                  <i className="fas fa-heart text-primary" style={{ fontSize: "3rem" }}></i>
                </div>
                <h4 className="h5 mb-3">Made with Love</h4>
                <p className="text-muted">Each arrangement is carefully crafted with love and attention to detail.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="display-5 fw-bold mb-3">Featured Flowers</h2>
              <p className="lead text-muted">Discover our most popular and beautiful arrangements</p>
            </div>
          </div>

          {loading ? (
            <div className="row">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="col-lg-4 col-md-6 mb-4">
                  <div className="card h-100 shimmer">
                    <div className="card-img-top bg-light" style={{ height: "250px" }}></div>
                    <div className="card-body">
                      <div className="bg-light rounded mb-2" style={{ height: "20px", width: "80%" }}></div>
                      <div className="bg-light rounded mb-2" style={{ height: "16px", width: "100%" }}></div>
                      <div className="bg-light rounded" style={{ height: "16px", width: "60%" }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="row">
              {featuredProducts.map((product) => (
                <div key={product._id} className="col-lg-4 col-md-6 mb-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="row">
              <div className="col-12 text-center">
                <div className="empty-state py-5">
                  <i className="fas fa-seedling text-muted mb-3" style={{ fontSize: "4rem" }}></i>
                  <h4 className="text-muted">No featured products available</h4>
                  <p className="text-muted">Check back soon for our latest featured flowers!</p>
                  <Link to="/shop" className="btn btn-primary">
                    Browse All Products
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-12 text-center mt-4">
              <Link to="/shop" className="btn btn-outline-primary btn-lg">
                <i className="fas fa-eye me-2"></i>
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-5 bg-gradient-secondary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h3 className="h2 mb-3">Ready to brighten someone's day?</h3>
              <p className="lead mb-0">
                Create a custom bouquet or choose from our curated collection of beautiful arrangements.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link to="/customize" className="btn btn-light btn-lg">
                <i className="fas fa-magic me-2"></i>
                Create Custom Bouquet
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
