"use client"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify"

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, isInWishlist } = useCart()
  const { user } = useAuth()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast.info("Please login to add items to cart")
      return
    }

    if (product.stock <= 0) {
      toast.error("Product is out of stock")
      return
    }

    addToCart(product)
  }

  const handleAddToWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast.info("Please login to add items to wishlist")
      return
    }

    addToWishlist(product)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  return (
    <div className="product-card card h-100 border-0 shadow-sm">
      <div className="position-relative overflow-hidden">
        <img
          src={product.images?.[0] || "/placeholder.svg?height=250&width=300"}
          className="card-img-top"
          alt={product.name}
          style={{ height: "250px", objectFit: "cover" }}
        />

        {/* Wishlist Button */}
        <button
          className={`btn position-absolute top-0 end-0 m-2 ${
            isInWishlist(product._id) ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={handleAddToWishlist}
          title={isInWishlist(product._id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <i className={`fas fa-heart ${isInWishlist(product._id) ? "" : "far"}`}></i>
        </button>

        {/* Badges */}
        <div className="position-absolute top-0 start-0 m-2">
          {product.featured && <span className="badge bg-primary mb-1 d-block">Featured</span>}
          {product.onSale && <span className="badge bg-warning text-dark mb-1 d-block">Sale</span>}
          {product.stock <= 0 && <span className="badge bg-danger mb-1 d-block">Out of Stock</span>}
          {product.stock > 0 && product.stock <= 5 && (
            <span className="badge bg-warning text-dark mb-1 d-block">Low Stock</span>
          )}
        </div>

        {/* Quick View Overlay */}
        <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-gradient-dark text-white opacity-0 product-overlay transition">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <small className="text-light">Quick Actions</small>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-light" title="Quick View">
                <i className="fas fa-eye"></i>
              </button>
              <button className="btn btn-sm btn-outline-light" title="Compare">
                <i className="fas fa-balance-scale"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card-body d-flex flex-column">
        {/* Product Category */}
        <div className="mb-2">
          <span className="badge bg-light text-dark text-capitalize">{product.category}</span>
        </div>

        {/* Product Name */}
        <h5 className="card-title mb-2 fw-semibold">{product.name}</h5>

        {/* Product Description */}
        <p className="card-text text-muted small flex-grow-1 mb-3">
          {product.description?.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}
        </p>

        {/* Rating */}
        {product.rating?.count > 0 && (
          <div className="mb-2">
            <div className="d-flex align-items-center">
              <div className="text-warning me-2">
                {[...Array(5)].map((_, index) => (
                  <i
                    key={index}
                    className={`fas fa-star ${index < Math.round(product.rating.average) ? "" : "text-muted"}`}
                  ></i>
                ))}
              </div>
              <small className="text-muted">({product.rating.count} reviews)</small>
            </div>
          </div>
        )}

        {/* Price */}
        <div className="mb-3">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              {product.onSale && product.salePrice ? (
                <>
                  <span className="h5 text-primary mb-0 fw-bold">{formatPrice(product.salePrice)}</span>
                  <span className="text-muted text-decoration-line-through ms-2">{formatPrice(product.price)}</span>
                </>
              ) : (
                <span className="h5 text-primary mb-0 fw-bold">{formatPrice(product.price)}</span>
              )}
            </div>
            <div>
              {product.stock > 0 ? (
                <span className="badge bg-success">In Stock ({product.stock})</span>
              ) : (
                <span className="badge bg-danger">Out of Stock</span>
              )}
            </div>
          </div>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="mb-3">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="badge bg-light text-dark me-1 small">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto">
          <div className="d-flex gap-2">
            <Link to={`/product/${product._id}`} className="btn btn-outline-primary flex-grow-1">
              <i className="fas fa-eye me-1"></i>
              View Details
            </Link>
            <button
              className="btn btn-primary"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              title={product.stock <= 0 ? "Out of stock" : "Add to cart"}
            >
              <i className="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>

      {/* CSS for hover effects */}
      <style jsx>{`
        .product-card:hover .product-overlay {
          opacity: 1 !important;
        }
        .product-card {
          transition: all 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  )
}

export default ProductCard
