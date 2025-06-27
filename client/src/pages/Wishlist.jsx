"use client"

import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { toast } from "react-toastify"

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useCart()

  const handleAddToCart = (product) => {
    addToCart(product)
    toast.success("Product added to cart!")
  }

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId)
    toast.success("Product removed from wishlist!")
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <i className="fas fa-heart fa-4x text-muted mb-4"></i>
          <h2>Your wishlist is empty</h2>
          <p className="text-muted mb-4">Save your favorite flowers to your wishlist</p>
          <Link to="/shop" className="btn btn-success">
            Browse Flowers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Wishlist</h2>
        <span className="text-muted">{wishlistItems.length} items</span>
      </div>

      <div className="row">
        {wishlistItems.map((item) => (
          <div key={item._id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
              <div className="position-relative">
                <img
                  src={item.image || "/placeholder.svg?height=250&width=300"}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <button
                  className="btn btn-danger position-absolute top-0 end-0 m-2"
                  onClick={() => handleRemoveFromWishlist(item._id)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text text-muted flex-grow-1">{item.description?.substring(0, 100)}...</p>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="h5 text-success mb-0">${item.price}</span>
                  {item.stock > 0 ? (
                    <span className="badge bg-success">In Stock</span>
                  ) : (
                    <span className="badge bg-danger">Out of Stock</span>
                  )}
                </div>

                <div className="d-flex gap-2">
                  <Link to={`/product/${item._id}`} className="btn btn-outline-success flex-grow-1">
                    View Details
                  </Link>
                  <button className="btn btn-success" onClick={() => handleAddToCart(item)} disabled={item.stock === 0}>
                    <i className="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Link to="/shop" className="btn btn-outline-success">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default Wishlist
