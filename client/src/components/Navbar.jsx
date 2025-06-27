"use client"

import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useContext(AuthContext) || {}
  const { cartItems } = useContext(CartContext) || { cartItems: [] }
  const navigate = useNavigate()

  const handleProtectedRoute = (path) => {
    if (!user) {
      navigate("/login")
    } else {
      navigate(path)
    }
  }

  const handleLogout = () => {
    if (logout) {
      logout()
    }
    navigate("/")
  }

  // Safe navigation - redirect to 404 for non-working features
  const handleNavigation = (path) => {
    const workingPaths = ["/", "/shop", "/login"]
    if (workingPaths.includes(path)) {
      navigate(path)
    } else {
      navigate("/404")
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold text-success fs-3" to="/">
          <i className="fas fa-seedling me-2"></i>
          Blooming Basket
        </Link>

        {/* Mobile Toggle */}
        <button className="navbar-toggler border-0" type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Menu */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/">
                <i className="fas fa-home me-1"></i>Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/shop">
                <i className="fas fa-store me-1"></i>Shop
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link fw-medium text-decoration-none"
                onClick={() => handleNavigation("/about")}
              >
                <i className="fas fa-info-circle me-1"></i>About
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link fw-medium text-decoration-none"
                onClick={() => handleNavigation("/customize")}
              >
                <i className="fas fa-palette me-1"></i>Customize
              </button>
            </li>
          </ul>

          {/* Right Side Menu */}
          <div className="d-flex align-items-center gap-3">
            {user ? (
              <>
                {/* User Menu */}
                <div className="dropdown">
                  <button className="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    <i className="fas fa-user me-1"></i>
                    {user.name || "User"}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item" onClick={() => handleNavigation("/profile")}>
                        <i className="fas fa-user me-2"></i>Profile
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => handleNavigation("/my-orders")}>
                        <i className="fas fa-box me-2"></i>My Orders
                      </button>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Cart & Wishlist */}
                <button
                  className="btn btn-outline-danger position-relative"
                  onClick={() => handleProtectedRoute("/wishlist")}
                >
                  <i className="fas fa-heart"></i>
                </button>

                <button className="btn btn-success position-relative" onClick={() => handleProtectedRoute("/cart")}>
                  <i className="fas fa-shopping-cart me-1"></i>
                  Cart
                  {cartItems.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </>
            ) : (
              <Link className="btn btn-success" to="/login">
                <i className="fas fa-sign-in-alt me-1"></i>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
