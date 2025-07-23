"use client"

import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"
// import styles from "./Navbar.module.css"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isUserRegistered, setIsUserRegistered] = useState(false)

  const { user, logout } = useContext(AuthContext)
  const { getCartItemsCount } = useContext(CartContext)
  const { wishlistItems } = useContext(WishlistContext)

  const navigate = useNavigate()

  // Check registration flag from localStorage
  useEffect(() => {
    const registered = localStorage.getItem("isRegistered") === "true"
    setIsUserRegistered(registered)
  }, [])

  const handleProtectedRoute = (path) => {
    if (!user) {
      navigate(isUserRegistered ? "/login" : "/register", { state: { from: path } })
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-200 shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link className="text-2xl font-bold font-['Playfair_Display'] text-pink-700 flex items-center gap-2" to="/">
          <img src="logo.jpeg?height=40&width=40" alt="Blooming Basket" className="w-10 h-10 rounded-full" />
          Blooming Basket
        </Link>

        <button
          className="lg:hidden text-gray-600 focus:outline-none"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <i className="fas fa-bars text-2xl"></i>
        </button>

        <div className={`lg:flex flex-grow items-center ${isMenuOpen ? "block" : "hidden"} lg:block`} id="navbarNav">
          <ul className="flex flex-col lg:flex-row lg:ml-auto lg:mr-4 mt-4 lg:mt-0">
            <li className="nav-item">
              <Link
                className="block py-2 px-4 text-gray-600 font-medium transition-all duration-300 hover:text-gray-800 hover:underline hover:-translate-y-0.5"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="block py-2 px-4 text-gray-600 font-medium transition-all duration-300 hover:text-gray-800 hover:underline hover:-translate-y-0.5"
                to="/shop"
              >
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="block py-2 px-4 text-gray-600 font-medium transition-all duration-300 hover:text-gray-800 hover:underline hover:-translate-y-0.5"
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="block py-2 px-4 text-gray-600 font-medium transition-all duration-300 hover:text-gray-800 hover:underline hover:-translate-y-0.5"
                to="/contactUs"
              >
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="block py-2 px-4 text-gray-600 font-medium transition-all duration-300 hover:text-gray-800 hover:underline hover:-translate-y-0.5"
                to="/customize"
              >
                Customize
              </Link>
            </li>
          </ul>

          <ul className="flex flex-col lg:flex-row items-center mt-4 lg:mt-0">
            <li className="nav-item mb-2 lg:mb-0 lg:mr-2">
              <button
                className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                title="Search"
              >
                <i className="fas fa-search"></i>
              </button>
            </li>

            {isSearchOpen && (
              <li className="nav-item w-full lg:w-auto mb-2 lg:mb-0">
                <form className="w-full" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </form>
              </li>
            )}

            <li className="nav-item mb-2 lg:mb-0">
              <button
                className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={() => handleProtectedRoute("/wishlist")}
                title="Wishlist"
              >
                <i className="fas fa-heart"></i>
                {wishlistItems.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
            </li>

            <li className="nav-item mb-2 lg:mb-0">
              <button
                className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={() => handleProtectedRoute("/cart")}
                title="Shopping Cart"
              >
                <i className="fas fa-shopping-cart"></i>
                {getCartItemsCount() > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {getCartItemsCount()}
                  </span>
                )}
              </button>
            </li>

            {user ? (
              <li className="nav-item dropdown relative group">
                <button
                  className="py-2 px-4 text-gray-600 hover:text-gray-800 focus:outline-none flex items-center gap-2"
                  aria-expanded="false"
                >
                  <i className="fas fa-user"></i> {user.name} <i className="fas fa-chevron-down text-xs ml-1"></i>
                </button>
                <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform origin-top-right scale-95 group-hover:scale-100">
                  <li>
                    <Link
                      className="block py-3 px-6 text-gray-700 hover:bg-gradient-to-br from-[#da81a4] to-[#fecfef] hover:text-white rounded-t-lg transition-all duration-300"
                      to="/profile"
                    >
                      <i className="fas fa-user-circle mr-2"></i>Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block py-3 px-6 text-gray-700 hover:bg-gradient-to-br from-[#da81a4] to-[#fecfef] hover:text-white transition-all duration-300"
                      to="/my-orders"
                    >
                      <i className="fas fa-box mr-2"></i>My Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block py-3 px-6 text-gray-700 hover:bg-gradient-to-br from-[#da81a4] to-[#fecfef] hover:text-white transition-all duration-300"
                      to="/customize"
                    >
                      <i className="fas fa-palette mr-2"></i>Customize
                    </Link>
                  </li>
                  {user.role === "admin" && (
                    <>
                      <li>
                        <hr className="my-2 border-gray-200" />
                      </li>
                      <li>
                        <Link
                          className="block py-3 px-6 text-gray-700 hover:bg-gradient-to-br from-[#da81a4] to-[#fecfef] hover:text-white transition-all duration-300"
                          to="/admin/products"
                        >
                          <i className="fas fa-cog mr-2"></i>Manage Products
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="block py-3 px-6 text-gray-700 hover:bg-gradient-to-br from-[#da81a4] to-[#fecfef] hover:text-white transition-all duration-300"
                          to="/admin/orders"
                        >
                          <i className="fas fa-clipboard-list mr-2"></i>Manage Orders
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <hr className="my-2 border-gray-200" />
                  </li>
                  <li>
                    <button
                      className="w-full text-left py-3 px-6 text-gray-700 hover:bg-gradient-to-br from-[#da81a4] to-[#fecfef] hover:text-white rounded-b-lg transition-all duration-300"
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className="block py-2 px-4 text-gray-600 font-medium transition-all duration-300 hover:text-gray-800 hover:underline hover:-translate-y-0.5"
                  to={isUserRegistered ? "/login" : "/register"}
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  {isUserRegistered ? "Login" : "Register"}
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
