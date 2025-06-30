"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import { WishlistContext } from "../../context/WishlistContext"
import styles from "./FeaturedProducts.module.css"

const FeaturedProducts = () => {
  const { addToCart } = useContext(CartContext)
  const { addToWishlist, isInWishlist } = useContext(WishlistContext)

  const products = [
    {
      id: 1,
      name: "Red Rose Bouquet",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: "Mixed Tulip Arrangement",
      price: 39.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviews: 89,
    },
    {
      id: 3,
      name: "Sunflower Delight",
      price: 34.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 156,
    },
    {
      id: 4,
      name: "Lily Elegance",
      price: 54.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 98,
    },
  ]

  return (
    <section className={styles.featured}>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2 className={styles.sectionTitle}>Featured Products</h2>
            <p className={styles.sectionDescription}>Discover our most popular and beautiful flower arrangements</p>
          </div>
        </div>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-6 mb-4">
              <div className={styles.productCard}>
                <div className={styles.productImage}>
                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                  <div className={styles.productActions}>
                    <button
                      className={`${styles.actionBtn} ${isInWishlist(product.id) ? styles.active : ""}`}
                      onClick={() => addToWishlist(product)}
                    >
                      <i className="fas fa-heart"></i>
                    </button>
                     </div>
                </div>
                <div className={styles.productContent}>
                  <h5 className={styles.productName}>{product.name}</h5>
                  <div className={styles.productRating}>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? styles.filled : ""}`}></i>
                      ))}
                    </div>
                    <span className={styles.reviewCount}>({product.reviews})</span>
                  </div>
                  <div className={styles.productPrice}>${product.price}</div>
                  <button className={styles.addToCartBtn} onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
