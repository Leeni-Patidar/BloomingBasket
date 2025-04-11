"use client"

import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faShoppingCart, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { removeFromWishlist } from "../redux/wishlistSlice"
import { addToCart } from "../redux/cartSlice"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import styles from "../assets/Wishlist.module.css"

const Wishlist = () => {
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state) => state.wishlist.items)

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id))
  }

  const handleAddToCart = (item) => {
    dispatch(addToCart(item))
  }

  if (wishlistItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className={styles.emptyWishlist}>
          <div className="container text-center py-5">
            <h2>Your Wishlist is Empty</h2>
            <p>Save your favorite items to your wishlist for later.</p>
            <Link to="/shop" className={styles.continueShoppingBtn}>
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className={styles.wishlistPage}>
        <div className="container py-4">
          <h1 className={styles.pageTitle}>Your Wishlist</h1>

          <div className="row g-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="col-md-6 col-lg-4">
                <div className={styles.wishlistItem}>
                  <div className={styles.itemImage}>
                    <img src={item.image || "/placeholder.svg"} alt={item.name} />
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      title="Remove from wishlist"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemDescription}>{item.description}</p>
                    <div className={styles.itemFooter}>
                      <p className={styles.itemPrice}>
                        ${item.salePrice ? item.salePrice.toFixed(2) : item.price.toFixed(2)}
                      </p>
                      <button className={styles.addToCartBtn} onClick={() => handleAddToCart(item)} title="Add to cart">
                        <FontAwesomeIcon icon={faShoppingCart} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link to="/shop" className={styles.continueShoppingBtn}>
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Wishlist
