"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { CartContext } from "../../context/CartContext"
import { WishlistContext } from "../../context/WishlistContext"
import { AuthContext } from "../../context/AuthContext"
import { toast } from "react-toastify"
import styles from "./ProductDetail.module.css"

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
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id)
    } else {
      addToWishlist(product)
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
      <div className={styles.loading}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <button className="btn btn-primary" onClick={() => navigate("/shop")}>
          Back to Shop
        </button>
      </div>
    )
  }

  return (
    <div className={styles.productDetail}>
      <div className="container">
        <div className="row">
          {/* Product Images */}
          <div className="col-lg-6 mb-4">
            <div className={styles.imageSection}>
              <div className={styles.mainImage}>
                <img
                  src={product.images?.[selectedImage] || "/placeholder.svg?height=500&width=500"}
                  alt={product.name}
                />
              </div>
              {product.images && product.images.length > 1 && (
                <div className={styles.thumbnails}>
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ""}`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6">
            <div className={styles.productInfo}>
              <h1 className={styles.productName}>{product.name}</h1>

              <div className={styles.rating}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${i < Math.floor(product.rating?.average || 0) ? styles.filled : ""}`}
                    ></i>
                  ))}
                </div>
                <span className={styles.ratingText}>
                  {product.rating?.average?.toFixed(1) || "0.0"} ({product.rating?.count || 0} reviews)
                </span>
              </div>

              <div className={styles.price}>${product.price}</div>

              <div className={styles.description}>
                <p>{product.description}</p>
              </div>

              {product.careInstructions && (
                <div className={styles.careInstructions}>
                  <h5>Care Instructions</h5>
                  <p>{product.careInstructions}</p>
                </div>
              )}

              <div className={styles.productMeta}>
                <div className={styles.metaItem}>
                  <strong>Category:</strong> {product.category}
                </div>
                <div className={styles.metaItem}>
                  <strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                </div>
                {product.dimensions && (
                  <div className={styles.metaItem}>
                    <strong>Dimensions:</strong> {product.dimensions.height}"H x {product.dimensions.width}"W
                  </div>
                )}
              </div>

              <div className={styles.actions}>
                <div className={styles.quantitySelector}>
                  <label>Quantity:</label>
                  <div className={styles.quantityControls}>
                    <button className={styles.quantityBtn} onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      -
                    </button>
                    <span className={styles.quantity}>{quantity}</span>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={styles.actionButtons}>
                  <button className={styles.addToCartBtn} onClick={handleAddToCart} disabled={product.stock === 0}>
                    <i className="fas fa-shopping-cart me-2"></i>
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                  <button
                    className={`${styles.wishlistBtn} ${isInWishlist(product._id) ? styles.active : ""}`}
                    onClick={handleWishlistToggle}
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className={styles.reviewsSection}>
          <div className="row">
            <div className="col-12">
              <h3>Customer Reviews</h3>

              {user && (
                <div className={styles.reviewActions}>
                  <button className={styles.writeReviewBtn} onClick={() => setShowReviewForm(!showReviewForm)}>
                    Write a Review
                  </button>
                </div>
              )}

              {showReviewForm && (
                <div className={styles.reviewForm}>
                  <h4>Write Your Review</h4>
                  <form onSubmit={handleReviewSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Rating</label>
                      <div className={styles.ratingInput}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <i
                            key={star}
                            className={`fas fa-star ${star <= reviewData.rating ? styles.filled : ""}`}
                            onClick={() => setReviewData({ ...reviewData, rating: star })}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Comment</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        value={reviewData.comment}
                        onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                        required
                      ></textarea>
                    </div>
                    <div className={styles.reviewFormActions}>
                      <button type="submit" className="btn btn-primary">
                        Submit Review
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={() => setShowReviewForm(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className={styles.reviewsList}>
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((review) => (
                    <div key={review._id} className={styles.reviewItem}>
                      <div className={styles.reviewHeader}>
                        <div className={styles.reviewerInfo}>
                          <strong>{review.user?.name || "Anonymous"}</strong>
                          <div className={styles.reviewStars}>
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`fas fa-star ${i < review.rating ? styles.filled : ""}`}></i>
                            ))}
                          </div>
                        </div>
                        <div className={styles.reviewDate}>{new Date(review.createdAt).toLocaleDateString()}</div>
                      </div>
                      <div className={styles.reviewComment}>
                        <p>{review.comment}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.noReviews}>
                    <p>No reviews yet. Be the first to review this product!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
