"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"
import { AuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"
// import styles from "./ProductDetail.module.css"

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
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
  })

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`)
      setProduct(response.data)
    } catch (error) {
      console.error("Error fetching product:", error)
      toast.error("Product not found")
      navigate("/shop")
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
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

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      toast.error("Please login to submit a review")
      return
    }

    try {
      await axios.post(`/api/products/${id}/reviews`, reviewData)
      toast.success("Review submitted successfully!")
      setShowReviewForm(false)
      setReviewData({ rating: 5, comment: "" })
      fetchProduct() // Refresh product data
    } catch (error) {
      const message = error.response?.data?.message || "Failed to submit review"
      toast.error(message)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] flex-col gap-4">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] flex-col gap-4">
        <h2 className="text-2xl font-semibold">Product not found</h2>
        <button
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => navigate("/shop")}
        >
          Back to Shop
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          {/* Product Images */}
          <div className="w-full lg:w-1/2 px-4 mb-4">
            <div className="sticky top-8">
              <div className="mb-4 rounded-xl overflow-hidden shadow-xl">
                <img
                  src={product.images?.[selectedImage] || "/placeholder.svg?height=500&width=500"}
                  alt={product.name}
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto py-2">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-transparent transition-all duration-300 ease-in-out ${selectedImage === index ? "border-[#ff4757]" : "hover:border-[#ff9a9e]"}`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="lg:pl-8 mt-8 lg:mt-0">
              <h1 className="text-3xl lg:text-[2.5rem] font-bold text-gray-800 mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star text-lg ${i < Math.floor(product.rating?.average || 0) ? "text-yellow-400" : "text-gray-300"}`}
                    ></i>
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  {product.rating?.average?.toFixed(1) || "0.0"} ({product.rating?.count || 0} reviews)
                </span>
              </div>

              <div className="text-3xl font-bold text-red-500 mb-6">${product.price}</div>

              <div className="mb-8">
                <p className="text-gray-600 leading-relaxed text-base">{product.description}</p>
              </div>

              {product.careInstructions && (
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h5 className="text-gray-800 mb-4 font-semibold">Care Instructions</h5>
                  <p className="text-gray-600 m-0 leading-relaxed">{product.careInstructions}</p>
                </div>
              )}

              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <div className="mb-2 last:mb-0 text-gray-600">
                  <strong>Category:</strong> {product.category}
                </div>
                <div className="mb-2 last:mb-0 text-gray-600">
                  <strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                </div>
                {product.dimensions && (
                  <div className="mb-2 last:mb-0 text-gray-600">
                    <strong>Dimensions:</strong> {product.dimensions.height}"H x {product.dimensions.width}"W
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <label className="font-semibold text-gray-800">Quantity:</label>
                  <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                    <button
                      className="bg-gray-50 border-none w-10 h-10 flex items-center justify-center font-bold text-gray-600 transition-all duration-300 ease-in-out hover:bg-[#ff9a9e] hover:text-white"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <span className="px-4 font-semibold min-w-[60px] text-center">{quantity}</span>
                    <button
                      className="bg-gray-50 border-none w-10 h-10 flex items-center justify-center font-bold text-gray-600 transition-all duration-300 ease-in-out hover:bg-[#ff9a9e] hover:text-white"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    className="flex-1 bg-gradient-to-br from-[#da81a4] to-[#fecfef] border-none text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    <i className="fas fa-shopping-cart mr-2"></i>
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                  <button
                    className={`w-full md:w-16 h-12 md:h-16 border-2 border-gray-200 bg-white rounded-lg flex items-center justify-center text-2xl text-gray-600 transition-all duration-300 ease-in-out hover:border-[#ff9a9e] hover:text-[#ff9a9e] ${isInWishlist(product._id) ? "border-[#ff4757] bg-[#ff4757] text-white" : ""}`}
                    onClick={handleWishlistToggle}
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <h3 className="text-gray-800 mb-8 font-semibold">Customer Reviews</h3>

          {user && (
            <div className="mb-8">
              <button
                className="bg-gradient-to-br from-[#da81a4] to-[#fecfef] border-none text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg"
                onClick={() => setShowReviewForm(!showReviewForm)}
              >
                Write a Review
              </button>
            </div>
          )}

          {showReviewForm && (
            <div className="bg-gray-50 p-8 rounded-xl mb-8">
              <h4 className="text-gray-800 mb-6 font-semibold">Write Your Review</h4>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Rating</label>
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`fas fa-star text-2xl cursor-pointer transition-colors duration-300 ease-in-out ${star <= reviewData.rating ? "text-yellow-400" : "text-gray-300"}`}
                        onClick={() => setReviewData({ ...reviewData, rating: star })}
                      ></i>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Comment</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows="4"
                    value={reviewData.comment}
                    onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                    required
                  ></textarea>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    type="submit"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                    onClick={() => setShowReviewForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="flex flex-col gap-6">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review._id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-2">
                    <div className="flex flex-col gap-2">
                      <strong>{review.user?.name || "Anonymous"}</strong>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star text-sm ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <div className="text-gray-600 text-sm">{new Date(review.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="text-gray-600 leading-relaxed m-0">
                    <p>{review.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-12 text-gray-600">
                <p>No reviews yet. Be the first to review this product!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
