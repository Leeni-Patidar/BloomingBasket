"use client"

import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"
import { HiOutlineMenu, HiX } from "react-icons/hi"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isUserRegistered, setIsUserRegistered] = useState(false)

  const { user, logout } = useContext(AuthContext)
  const { getCartItemsCount } = useContext(CartContext)
  const { wishlistItems } = useContext(WishlistContext)

  const navigate = useNavigate()

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
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#e8eaef] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-pink-700 font-['Playfair_Display']">
          <img src="logo.jpeg" alt="Blooming Basket" className="w-11 h-11 rounded-full shadow" />
          Blooming Basket
        </Link>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-gray-800 bg-transparent focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <HiX className="h-6 w-6" /> : <HiOutlineMenu className="h-6 w-6" />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {["/", "/shop", "/about", "/contactUs", "/customize"].map((path, i) => (
            <Link
              key={path}
              to={path}
              className="text-gray-700 hover:text-pink-600 transition font-medium"
            >
              {["Home", "Shop", "About", "Contact Us", "Customize"][i]}
            </Link>
          ))}

          {/* Admin OR User */}
          {user?.role === "admin" ? (
            <>
              <Link to="/admin/orders" className="text-gray-700 hover:text-pink-600 font-medium">Order Management</Link>
              <Link to="/admin/products" className="text-gray-700 hover:text-pink-600 font-medium">Product Management</Link>
            </>
          ) : (
            <>
              {/* Wishlist */}
              {user ? (
                <Link to="/wishlist" className="relative text-gray-700 hover:text-pink-600 transition">
                  <i className="fas fa-heart"></i>
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
              ) : (
                <button
                  onClick={() => handleProtectedRoute("/wishlist")}
                  className="relative text-gray-700 hover:text-pink-600 transition"
                >
                  <i className="fas fa-heart"></i>
                </button>
              )}

              {/* Cart */}
              {user ? (
                <Link to="/cart" className="relative text-gray-700 hover:text-pink-600 transition">
                  <i className="fas fa-shopping-cart"></i>
                  {getCartItemsCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
                      {getCartItemsCount()}
                    </span>
                  )}
                </Link>
              ) : (
                <button
                  onClick={() => handleProtectedRoute("/cart")}
                  className="relative text-gray-700 hover:text-pink-600 transition"
                >
                  <i className="fas fa-shopping-cart"></i>
                </button>
              )}
            </>
          )}

          {/* User Auth */}
          {user ? (
            <div className="relative group">
              <button className="text-gray-700 hover:text-pink-600 flex items-center gap-1">
                <i className="fas fa-user"></i> {user.name}
              </button>
              <div className="absolute right-0 top-10 w-48 bg-white border border-gray-200 shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-40">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                <Link to="/my-orders" className="block px-4 py-2 hover:bg-gray-100">My Orders</Link>
                {user.role === "admin" && (
                  <>
                    <Link to="/admin/products" className="block px-4 py-2 hover:bg-gray-100">Manage Products</Link>
                    <Link to="/admin/orders" className="block px-4 py-2 hover:bg-gray-100">Manage Orders</Link>
                  </>
                )}
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 bg-transparent">Logout</button>
              </div>
            </div>
          ) : (
            <Link to={isUserRegistered ? "/login" : "/register"} className="text-gray-700 hover:text-pink-600 transition">
              <i className="fas fa-sign-in-alt mr-1"></i>{isUserRegistered ? "Login" : "Register"}
            </Link>
          )}
        </div>
      </div>

      {/* Pink Gradient Border Bottom */}
      <div className="h-1 w-full bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400"></div>

      {/* Search Input (Mobile) */}
      {isSearchOpen && (
        <div className="px-4 pb-2 bg-white md:hidden">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </form>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-100 shadow-md px-4 py-4 space-y-2">
          {["/", "/shop", "/about", "/contactUs", "/customize"].map((path, i) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 font-medium"
            >
              {["Home", "Shop", "About", "Contact Us", "Customize"][i]}
            </Link>
          ))}

          {user?.role === "admin" && (
            <>
              <Link to="/admin/orders" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 font-medium">
                Order Management
              </Link>
              <Link to="/admin/products" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 font-medium">
                Product Management
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
