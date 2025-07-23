"use client"

import { Link } from "react-router-dom"
// import styles from "./ProductCard.module.css"

const ProductCard = ({ product, onAddToCart, onAddToWishlist, isInWishlist }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 ease-in-out h-full hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.images?.[0] || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
          <button
            className={`w-10 h-10 rounded-full border-none bg-white text-gray-600 flex items-center justify-center shadow-md transition-all duration-300 ease-in-out hover:bg-[#ba54a9] hover:text-white hover:scale-110 ${isInWishlist ? "bg-red-500 text-white" : ""}`}
            onClick={onAddToWishlist}
            title="Add to Wishlist"
          >
            <i className="fas fa-heart"></i>
          </button>
          <Link
            to={`/product/${product._id}`}
            className="w-10 h-10 rounded-full border-none bg-white text-gray-600 flex items-center justify-center shadow-md transition-all duration-300 ease-in-out hover:bg-[#ba54a9] hover:text-white hover:scale-110"
            title="View Details"
          >
            <i className="fas fa-eye"></i>
          </Link>
        </div>
      </div>
      <div className="p-6 text-center">
        <h5 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h5>
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`fas fa-star text-sm ${i < Math.floor(product.rating?.average || 0) ? "text-yellow-400" : "text-gray-300"}`}
              ></i>
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.rating?.count || 0})</span>
        </div>
        <div className="text-xl font-bold text-red-500 mb-4">${product.price}</div>
        <button
          className="bg-gradient-to-br from-[#ff9a9e] to-[#fecfef] border-none text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out w-full hover:-translate-y-0.5 hover:shadow-lg"
          onClick={onAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
