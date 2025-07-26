

import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"
// import styles from "./FeaturedProducts.module.css"

const FeaturedProducts = () => {
  const { addToCart } = useContext(CartContext)
  const { addToWishlist, isInWishlist } = useContext(WishlistContext)

  const products = [
    {
      id: 1,
      name: "Red Rose Bouquet",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: "Mixed Tulip Arrangement",
      price: 39.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviews: 89,
    },
    {
      id: 3,
      name: "Sunflower Delight",
      price: 34.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 156,
    },
    {
      id: 4,
      name: "Lily Elegance",
      price: 54.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 98,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and beautiful flower arrangements
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4">
          {products.map((product) => (
            <div key={product.id} className="w-full lg:w-1/4 md:w-1/2 px-4 mb-8">
              <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 ease-in-out h-full hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                    <button
                      className={`w-10 h-10 rounded-full border-none bg-white text-gray-600 flex items-center justify-center shadow-md transition-all duration-300 ease-in-out  hover: hover:scale-110 ${isInWishlist(product.id) ? "bg-red-500 " : ""}`}
                      onClick={() => addToWishlist(product)}
                      title="Add to Wishlist"
                    >
                      <i className="fas fa-heart"></i>
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="w-10 h-10 rounded-full border-none bg-white text-gray-600 flex items-center justify-center shadow-md transition-all duration-300 ease-in-out  hover: hover:scale-110"
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
                          className={`fas fa-star text-sm ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        ></i>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                  </div>
                  <div className="text-xl font-bold text-red-500 mb-4">${product.price}</div>
                  <button
                    className="bg-gradient-to-br from-[#ba54a9] to-[#fecfef] border-none  px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out w-full button-bg:hover hover:shadow-lg"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
