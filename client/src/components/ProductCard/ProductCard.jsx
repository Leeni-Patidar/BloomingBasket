"use client"

import { Link } from "react-router-dom"
import styles from "./ProductCard.module.css"

const ProductCard = ({ product, onAddToCart, onAddToWishlist, isInWishlist }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img src={product.images?.[0] || "/placeholder.svg?height=300&width=300"} alt={product.name} />
        <div className={styles.productActions}>
          <button
            className={`${styles.actionBtn} ${isInWishlist ? styles.active : ""}`}
            onClick={onAddToWishlist}
            title="Add to Wishlist"
          >
            <i className="fas fa-heart"></i>
          </button>
          <Link to={`/product/${product._id}`} className={styles.actionBtn} title="View Details">
            <i className="fas fa-eye"></i>
          </Link>
        </div>
      </div>
      <div className={styles.productContent}>
        <h5 className={styles.productName}>{product.name}</h5>
        <div className={styles.productRating}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`fas fa-star ${i < Math.floor(product.rating?.average || 0) ? styles.filled : ""}`}
              ></i>
            ))}
          </div>
          <span className={styles.reviewCount}>({product.rating?.count || 0})</span>
        </div>
        <div className={styles.productPrice}>${product.price}</div>
        <button className={styles.addToCartBtn} onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
