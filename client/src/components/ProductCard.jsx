
"use client"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"
import { AuthContext } from "../context/AuthContext"

const categoryLabels = {
  flower: "Flower Bouquet",
  chocolate: "Chocolate Bouquet",
  softtoy: "Soft Toy Bouquet",
  pipecleaner: "Pipecleaner Bouquet",
  butterfly: "Butterfly Bouquet",
  hairclip: "Hair Clip Bouquet",
  crochet: "Crochet Bouquet",
  origami: "Origami Bouquet",
  fruit: "Fruit Bouquet",
  skincare: "Skincare Bouquet",
}

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useContext(CartContext)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext)
  const { user } = useContext(AuthContext)

  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false) // ✅ local loading for this product only

  const productInCart = isInCart(product._id)
  const productInWishlist = isInWishlist(product._id)
  const isAdmin = user?.role === "admin"

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      alert("Please login to add items to cart")
      return
    }

    if (product.stock <= 0) {
      alert("Product is out of stock")
      return
    }

    try {
      setButtonLoading(true) // start loading for this product only
      await addToCart(product._id, 1)
    } catch (error) {
      console.error("Add to cart error:", error)
    } finally {
      setButtonLoading(false) // stop loading
    }
  }

  const handleWishlistToggle = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      alert("Please login to manage wishlist")
      return
    }

    try {
      if (productInWishlist) {
        await removeFromWishlist(product._id)
      } else {
        await addToWishlist(product._id)
      }
    } catch (error) {
      console.error("Wishlist error:", error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
            </div>
          )}

          <img
            src={imageError ? "/placeholder.svg?height=300&width=300" : product.images?.[0] || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false)
              setImageError(true)
            }}
          />

          {!isAdmin && (
            <button
              onClick={handleWishlistToggle}
              className={`absolute top-2 right-2 p-2 rounded-full transition-colors duration-200 ${
                productInWishlist
                  ? "bg-pink-500 text-white hover:bg-pink-600"
                  : "bg-white hover:bg-gray-100"
              }`}
              aria-label={productInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <svg
                className="w-4 h-4"
                fill={productInWishlist ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          )}

          {product.stock <= 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              Out of Stock
            </div>
          )}
          {product.featured && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
              Featured
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold mb-2 line-clamp-2 hover:text-pink-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mb-2">{categoryLabels[product.category] || "Other"}</p>
          <p className="text-sm mb-3 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-pink-600">₹{product.price}</span>
          </div>

          <div className="text-xs mb-3">
            {product.stock > 0 ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>
        </div>
      </Link>

      {!isAdmin && (
        <div className="px-4 pb-4">
          <button
            onClick={handleAddToCart}
            disabled={buttonLoading || product.stock <= 0 || productInCart}
            className={`w-full py-2 button-bg px-4 rounded-lg font-semibold transition-all duration-200 ${
              productInCart
                ? "bg-green-100 cursor-default"
                : product.stock <= 0
                ? "bg-gray-300 cursor-not-allowed"
                : buttonLoading
                ? "bg-pink-300 cursor-not-allowed"
                : "button-bg hover:scale-95 active:scale-90"
            }`}
          >
            {buttonLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                Adding...
              </div>
            ) : productInCart ? (
              "Added to Cart"
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductCard
