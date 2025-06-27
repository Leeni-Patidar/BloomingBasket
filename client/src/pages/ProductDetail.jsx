"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { toast } from "react-toastify"
import axios from "axios"

const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart, addToWishlist } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    fetchProduct()
    fetchRelatedProducts()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`)
      setProduct(response.data)
    } catch (error) {
      console.error("Error fetching product:", error)
      toast.error("Product not found")
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedProducts = async () => {
    try {
      const response = await axios.get(`/api/products?limit=4&exclude=${id}`)
      setRelatedProducts(response.data.products || response.data)
    } catch (error) {
      console.error("Error fetching related products:", error)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      toast.success("Product added to cart!")
    }
  }

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist(product)
      toast.success("Product added to wishlist!")
    }
  }

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Product Not Found</h2>
          <Link to="/shop" className="btn btn-success">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image]

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="breadcrumb-item active">{product.name}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-lg-6 mb-4">
          {/* Main Image */}
          <div className="mb-3">
            <img
              src={images[selectedImage] || "/placeholder.svg?height=500&width=500"}
              alt={product.name}
              className="img-fluid rounded shadow"
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
          </div>

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <div className="d-flex gap-2 overflow-auto">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg?height=100&width=100"}
                  alt={`${product.name} ${index + 1}`}
                  className={`img-thumbnail cursor-pointer ${selectedImage === index ? "border-success" : ""}`}
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="col-lg-6">
          <div className="mb-3">
            <span className="badge bg-success mb-2">{product.category}</span>
            <h1 className="h2 fw-bold">{product.name}</h1>
            <div className="d-flex align-items-center mb-3">
              <div className="text-warning me-2">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fas fa-star ${i < 4 ? "" : "text-muted"}`}></i>
                ))}
              </div>
              <span className="text-muted">(4.5 stars, 24 reviews)</span>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-success fw-bold">${product.price}</h3>
            {product.stock > 0 ? (
              <span className="badge bg-success">In Stock ({product.stock} available)</span>
            ) : (
              <span className="badge bg-danger">Out of Stock</span>
            )}
          </div>

          <div className="mb-4">
            <p className="text-muted">{product.description}</p>
          </div>

          {product.specifications && (
            <div className="mb-4">
              <h6 className="fw-semibold">Specifications:</h6>
              <ul className="list-unstyled">
                {product.specifications.height && <li>Height: {product.specifications.height}</li>}
                {product.specifications.width && <li>Width: {product.specifications.width}</li>}
                {product.specifications.care && <li>Care: {product.specifications.care}</li>}
              </ul>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="quantity" className="form-label fw-semibold">
              Quantity:
            </label>
            <div className="input-group" style={{ width: "150px" }}>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                className="form-control text-center"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                min="1"
                max={product.stock}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              >
                +
              </button>
            </div>
          </div>

          <div className="d-flex gap-3 mb-4">
            <button
              className="btn btn-success btn-lg flex-grow-1"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <i className="fas fa-shopping-cart me-2"></i>
              Add to Cart
            </button>
            <button className="btn btn-outline-danger btn-lg" onClick={handleAddToWishlist}>
              <i className="fas fa-heart"></i>
            </button>
          </div>

          <div className="row text-center">
            <div className="col-4">
              <i className="fas fa-truck text-success fa-2x mb-2"></i>
              <p className="small mb-0">Free Delivery</p>
              <p className="small text-muted">Orders over $50</p>
            </div>
            <div className="col-4">
              <i className="fas fa-shield-alt text-success fa-2x mb-2"></i>
              <p className="small mb-0">Fresh Guarantee</p>
              <p className="small text-muted">7-day freshness</p>
            </div>
            <div className="col-4">
              <i className="fas fa-undo text-success fa-2x mb-2"></i>
              <p className="small mb-0">Easy Returns</p>
              <p className="small text-muted">30-day policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-5">
          <h3 className="fw-bold mb-4">You Might Also Like</h3>
          <div className="row">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct._id} className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100">
                  <img
                    src={relatedProduct.image || "/placeholder.svg?height=200&width=300"}
                    className="card-img-top"
                    alt={relatedProduct.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h6 className="card-title">{relatedProduct.name}</h6>
                    <p className="text-success fw-bold">${relatedProduct.price}</p>
                    <Link to={`/product/${relatedProduct._id}`} className="btn btn-outline-success btn-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
