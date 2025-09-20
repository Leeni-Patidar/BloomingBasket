import React, { useContext } from "react"
import { WishlistContext } from "../context/WishlistContext"
import { Link } from "react-router-dom"

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext)

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <i className="fas fa-heart text-6xl text-gray-300 mb-4"></i>
            <h2 className="text-3xl font-bold mb-2">Your Wishlist is empty</h2>
            <p className="mb-6">
              Looks like you haven't added anything to your wishlist yet.
            </p>
            <div className="space-x-4">
              <Link
                to="/shop"
                className="inline-flex items-center px-6 py-3 button-bg button-bg:hover rounded-full transition-all duration-200 hover:shadow-lg transform hover:scale-105"
              >
                <i className="fas fa-shopping-bag mr-2"></i>
                Shop Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        My Wishlist
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlistItems.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover rounded-t-2xl"
              />
            </Link>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <Link to={`/product/${product._id}`}>
                  <h3 className="text-lg font-semibold text-gray-800 hover:underline">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    ₹{product.price}
                  </p>
                </Link>
              </div>

              <button
                onClick={() => removeFromWishlist(product._id)}
                className="mt-4 button-bg button-bg:hover text-sm font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Remove from Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist
