"use client"

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
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewData, setReviewData] = useState({ rating: 5, comment: "" })

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
      fetchProduct()
    } catch (error) {
      const message = error.response?.data?.message || "Failed to submit review"
      toast.error(message)
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
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
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
              <img
                src={product.images?.[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-xl shadow"
              />
              {product.images?.length > 1 && (
                <div className="flex gap-2 overflow-x-auto mt-4">
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
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 px-4">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-2">{product.category}</p>
            <p className="text-3xl text-pink-600 font-semibold mb-6">₹{product.price}</p>

            <div className="flex items-center mb-6">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`fas fa-star ${
                    i < Math.floor(product.rating?.average) ? "text-yellow-400" : "text-gray-300"
                  }`}
                ></i>
              ))}
              <span className="ml-2 text-gray-500 text-sm">
                ({product.rating?.count || 0} reviews)
              </span>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            {product.careInstructions && (
              <div className="bg-gray-100 p-4 rounded mb-6">
                <h4 className="font-medium mb-2">Care Instructions</h4>
                <p className="text-sm text-gray-700">{product.careInstructions}</p>
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1 bg-pink-600 text-white px-6 py-3 rounded hover:bg-pink-700 disabled:opacity-50"
              >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`w-12 h-12 rounded-full border-2 ${
                  isInWishlist(product._id) ? "bg-pink-500 text-white" : "text-pink-600"
                }`}
              >
                <i className="fas fa-heart"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

          {user && (
            <div className="mb-6">
              <button
                onClick={() => setShowReviewForm((prev) => !prev)}
                className="bg-pink-600 text-white px-6 py-2 rounded"
              >
                {showReviewForm ? "Cancel Review" : "Write a Review"}
              </button>
            </div>
          )}

          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="bg-gray-50 p-6 rounded mb-6">
              <div className="mb-4">
                <label className="block mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`fas fa-star text-xl cursor-pointer ${
                        reviewData.rating >= star ? "text-yellow-400" : "text-gray-300"
                      }`}
                      onClick={() => setReviewData((r) => ({ ...r, rating: star }))}
                    ></i>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Comment</label>
                <textarea
                  className="w-full border rounded p-2"
                  rows={4}
                  required
                  value={reviewData.comment}
                  onChange={(e) => setReviewData((r) => ({ ...r, comment: e.target.value }))}
                ></textarea>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
                Submit Review
              </button>
            </form>
          )}

          <div className="space-y-4">
            {product.reviews?.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review._id} className="bg-white p-4 rounded shadow">
                  <div className="flex justify-between items-center mb-2">
                    <strong>{review.user?.name || "Anonymous"}</strong>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`fas fa-star text-sm ${
                          review.rating >= star ? "text-yellow-400" : "text-gray-300"
                        }`}
                      ></i>
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No reviews yet. Be the first to review this product.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
