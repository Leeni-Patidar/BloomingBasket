"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { addToCart } from "../redux/cartSlice"
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice"
import styles from "../assets/ProductCard.module.css"

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state) => state.wishlist.items)
  const isFavorite = wishlistItems.some((item) => item.id === product.id)

  const { id, name, description, price, salePrice, image } = product

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    if (isFavorite) {
      dispatch(removeFromWishlist(id))
    } else {
      dispatch(addToWishlist(product))
    }
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    dispatch(addToCart(product))
  }

  return (
    <div
      className={styles.productCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.productImageWrapper}>
        <img src={image || "/placeholder.svg"} alt={name} className={styles.productImage} />
        <button className={`${styles.wishlistBtn} ${isFavorite ? styles.active : ""}`} onClick={handleFavoriteClick}>
          <FontAwesomeIcon icon={faHeart} />
        </button>

        <div className={`${styles.quickActions} ${isHovered ? styles.visible : ""}`}>
          <button className={styles.addToCartBtn} onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
            Add to Cart
          </button>
        </div>
      </div>

      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{name}</h3>
        <p className={styles.productDescription}>{description}</p>

        <div className={styles.productPricing}>
          {salePrice ? (
            <>
              <span className={styles.salePrice}>${salePrice}</span>
              <span className={styles.originalPrice}>${price}</span>
            </>
          ) : (
            <span className={styles.price}>${price}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
