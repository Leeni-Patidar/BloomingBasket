"use client"

import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { WishlistContext } from "../context/WishlistContext"
import { CartContext } from "../context/CartContext"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext)
  const { addToCart, cartItems } = useContext(CartContext)
  const navigate = useNavigate()

  const inCart = cartItems?.some((item) => item.productId._id === product._id)
  const inWishlist = isInWishlist(product._id)

  // Add to Cart Handler
  const handleAddToCart = async () => {
    if (!user) {
      toast.warn("Please login to add items to cart")
      return navigate("/login")
    }
    if (user.role === "admin") return

    if (!inCart) {
      await addToCart(product._id, 1)
    }
  }

  // Toggle Wishlist Handler
  const handleToggleWishlist = async () => {
    if (!user) {
      toast.warn("Please login to modify wishlist")
      return navigate("/login")
    }
    if (user.role === "admin") return

    if (inWishlist) {
      await removeFromWishlist(product._id)
    } else {
      await addToWishlist(product._id)
    }
  }

  return (
    <div className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-200 overflow-hidden">
      {/* Wishlist Heart Icon */}
      {user?.role !== "admin" && (
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 text-2xl z-10 transition-all duration-200 ${
            inWishlist ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-red-400"
          }`}
          title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <i className={`fas fa-heart ${inWishlist ? "animate-pulse" : ""}`} />
        </button>
      )}

      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          className="w-full h-64 object-cover rounded-t-2xl hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 truncate hover:text-pink-600 transition">
            {product.name}
          </h3>
        </Link>
        <p className="text-pink-600 font-bold mt-2 text-xl">₹{product.price}</p>

        {product.description && <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>}

        {/* Add to Cart Button */}
        {user?.role !== "admin" && (
          <button
            onClick={handleAddToCart}
            disabled={inCart}
            className={`mt-4 w-full py-2 px-4 rounded-full font-semibold transition-all duration-200 ${
              inCart
                ? "bg-green-100 text-green-700 cursor-not-allowed border border-green-300"
                : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 hover:shadow-lg transform hover:scale-105"
            }`}
          >
            {inCart ? (
              <>
                <i className="fas fa-check mr-2"></i>
                Added to Cart
              </>
            ) : (
              <>
                <i className="fas fa-shopping-cart mr-2"></i>
                Add to Cart
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard
