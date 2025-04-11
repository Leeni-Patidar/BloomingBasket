"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faShoppingCart, faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons"
import styles from "../assets/Navbar.module.css"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.items)
  const wishlistItems = useSelector((state) => state.wishlist.items)
  const cartQuantity = useSelector((state) => state.cart.totalQuantity)
  const wishlistQuantity = useSelector((state) => state.wishlist.totalItems)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className={styles.navbar}>
      <div className="container">
        <div className={styles.navbarContent}>
          <div className={styles.navbarBrand}>
            <Link to="/">BloomBasket</Link>
          </div>

          <div className={`${styles.navbarLinks} ${isMenuOpen ? styles.active : ""}`}>
            <ul>
              <li>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={() => setIsMenuOpen(false)}>
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/customizer" onClick={() => setIsMenuOpen(false)}>
                  Customize
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.navbarActions}>
            <button className={styles.actionBtn} onClick={() => navigate("/wishlist")}>
              <FontAwesomeIcon icon={faHeart} />
              {wishlistQuantity > 0 && <span className={styles.badge}>{wishlistQuantity}</span>}
            </button>
            <button className={styles.actionBtn} onClick={() => navigate("/cart")}>
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartQuantity > 0 && <span className={styles.badge}>{cartQuantity}</span>}
            </button>
            <button className={styles.actionBtn} onClick={() => navigate("/profile")}>
              <FontAwesomeIcon icon={faUser} />
            </button>
            <button className={styles.menuToggle} onClick={toggleMenu}>
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
