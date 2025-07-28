"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { WishlistContext } from "../context/WishlistContext"
import { CartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext)
  const { user } = useContext(AuthContext)
  const { addToCart, cartItems } = useContext(CartContext)
  const navigate = useNavigate()

  const handleAddToCart = async (product) => {
    if (!user) {
      toast.warn("Please login to add items to cart")
      return navigate("/login")
    }

    const inCart = cartItems?.some((item) => item.productId._id === product._id)
    if (inCart) {
      toast.info("Item already in cart")
      return
    }

    await addToCart(product._id, 1)
  }

  const handleRemoveFromWishlist = async (productId) => {
    await removeFromWishlist(productId)
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-8">
            <i className="fas fa-heart text-6xl text-gray-300 mb-4"></i>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save your favorite products to your wishlist for easy access later.</p>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            >
              <i className="fas fa-shopping-bag mr-2"></i>
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Wishlist</h1>
          <p className="text-lg text-gray-600">
            Your saved favorites ({wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""})
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => {
            const inCart = cartItems?.some((item) => item.productId._id === product._id)

            return (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-200 overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative">
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.image || "/placeholder.svg?height=256&width=256"}
                      alt={product.name}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Remove from Wishlist Button */}
                  <button
                    onClick={() => handleRemoveFromWishlist(product._id)}
                    className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                    title="Remove from wishlist"
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <Link to={`/product/${product._id}`}>
                    <h3 className="text-lg font-semibold text-gray-800 truncate hover:text-pink-600 transition mb-2">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-pink-600 font-bold text-xl mb-3">₹{product.price}</p>

                  {product.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={inCart}
                      className={`w-full py-2 px-4 rounded-full font-semibold transition-all duration-200 ${
                        inCart
                          ? "bg-green-100 text-green-700 cursor-not-allowed border border-green-300"
                          : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 hover:shadow-lg transform hover:scale-105"
                      }`}
                    >
                      {inCart ? (
                        <>
                          <i className="fas fa-check mr-2"></i>
                          In Cart
                        </>
                      ) : (
                        <>
                          <i className="fas fa-shopping-cart mr-2"></i>
                          Add to Cart
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleRemoveFromWishlist(product._id)}
                      className="w-full py-2 px-4 border border-red-300 text-red-600 rounded-full font-semibold hover:bg-red-50 transition-all duration-200"
                    >
                      <i className="fas fa-trash mr-2"></i>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Wishlist
