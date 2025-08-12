import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"
import { AuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useContext(CartContext)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext)
  const { user } = useContext(AuthContext)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`)
      setProduct(response.data)
    } catch (error) {
      toast.error("Product not found")
      navigate("/shop")
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return
    addToCart(product._id, quantity)
    toast.success("Added to cart!")
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id)
      toast.info("Removed from wishlist")
    } else {
      addToWishlist(product)
      toast.success("Added to wishlist")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p>Loading...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] flex-col gap-4">
        <h2 className="text-2xl font-semibold">Product not found</h2>
        <button
          className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 text-white"
          onClick={() => navigate("/shop")}
        >
          Back to Shop
        </button>
      </div>
    )
  }

  const productInWishlist = isInWishlist(product._id)

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Product Image Section */}
          <div>
            <img
              src={product.images?.[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-xl shadow-md"
            />
            {product.images?.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                      i === selectedImage ? "border-pink-500" : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-lg text-gray-500 mb-1">{product.category}</p>
            <p className="text-3xl font-semibold text-pink-600 mb-4">₹{product.price}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>

            {product.careInstructions && (
              <div className="bg-gray-100 p-4 rounded mb-4">
                <h4 className="font-medium mb-2">Care Instructions</h4>
                <p className="text-sm text-gray-600">{product.careInstructions}</p>
              </div>
            )}

            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="button-bg button-bg:hover  px-6 py-3 rounded  disabled:opacity-50"
              >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>

              <button
                onClick={handleWishlistToggle}
                className={`p-3 rounded-full shadow transition-colors duration-200 ${
                  productInWishlist
                    ? "button-bg button-bg:hover text-white"
                    : "bg-white text-pink-600 hover:bg-gray-100"
                }`}
                title={productInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <i className="fas fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
