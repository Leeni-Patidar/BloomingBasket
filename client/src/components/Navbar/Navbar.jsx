"use client"

import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { CartContext } from "../../context/CartContext"
import { WishlistContext } from "../../context/WishlistContext"
import styles from "./Navbar.module.css"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { user, logout } = useContext(AuthContext)
  const { getCartItemsCount } = useContext(CartContext)
  const { wishlistItems } = useContext(WishlistContext)
  const navigate = useNavigate()

  const handleProtectedRoute = (path) => {
    if (!user) {
      navigate("/login", { state: { from: path } })
    } else {
      navigate(path)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsSearchOpen(false)
    }
  }

  return (
    <nav className={`navbar navbar-expand-lg  fixed-top ${styles.navbar}`}>
      <div className="container">
        <Link className={`navbar-brand ${styles.brand}`} to="/">
  <img src="logo.jpeg?height=40&width=40" alt="Blooming Basket" className={styles.logo} />
  Blooming Basket
</Link>


        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop">Shop</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contactUs">Contact Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customize">Customize</Link>
            </li>
          </ul>

          <ul className="navbar-nav align-items-center">
            <li className="nav-item me-2">
              <button
                className={`nav-link btn btn-link ${styles.iconBtn}`}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                title="Search"
              >
                <i className="fas fa-search"></i>
              </button>
            </li>

            {isSearchOpen && (
              <li className="nav-item">
                <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    className={`form-control ${styles.searchInput}`}
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </form>
              </li>
            )}

            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${styles.iconBtn}`}
                onClick={() => handleProtectedRoute("/wishlist")}
                title="Wishlist"
              >
                <i className="fas fa-heart"></i>
                {wishlistItems.length > 0 && <span className={styles.badge}>{wishlistItems.length}</span>}
              </button>
            </li>

            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${styles.iconBtn}`}
                onClick={() => handleProtectedRoute("/cart")}
                title="Shopping Cart"
              >
                <i className="fas fa-shopping-cart"></i>
                {getCartItemsCount() > 0 && <span className={styles.badge}>{getCartItemsCount()}</span>}
              </button>
            </li>

            {user ? (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user"></i> {user.name}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <i className="fas fa-user-circle me-2"></i>Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/my-orders">
                      <i className="fas fa-box me-2"></i>My Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/customize">
                      <i className="fas fa-palette me-2"></i>Customize
                    </Link>
                  </li>
                  {user.role === "admin" && (
                    <>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <Link className="dropdown-item" to="/admin/products">
                          <i className="fas fa-cog me-2"></i>Manage Products
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/orders">
                          <i className="fas fa-clipboard-list me-2"></i>Manage Orders
                        </Link>
                      </li>
                    </>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i>Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <i className="fas fa-sign-in-alt me-2"></i>Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
