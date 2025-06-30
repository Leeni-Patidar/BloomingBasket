"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { WishlistContext } from "../../context/WishlistContext"
import { CartContext } from "../../context/CartContext"
import ProductCard from "../../components/ProductCard/ProductCard"
import styles from "./Wishlist.module.css"

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext)
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className={styles.emptyWishlist}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <i className="fas fa-heart fa-5x mb-4 text-muted"></i>
              <h2>Your wishlist is empty</h2>
              <p className="text-muted mb-4">Save your favorite flowers to your wishlist for easy access later.</p>
              <Link to="/shop" className="btn btn-primary btn-lg">
                Browse Flowers
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wishlist}>
      <div className="container">
        <div className={styles.header}>
          <h1>My Wishlist</h1>
          <p>Your saved favorite flowers ({wishlistItems.length} items)</p>
        </div>

        <div className="row">
          {wishlistItems.map((product) => (
            <div key={product._id} className="col-lg-3 col-md-6 mb-4">
              <ProductCard
                product={product}
                onAddToCart={() => handleAddToCart(product)}
                onAddToWishlist={() => handleRemoveFromWishlist(product._id)}
                isInWishlist={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
