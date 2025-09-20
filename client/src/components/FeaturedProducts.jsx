import React, { useEffect, useState, useContext } from "react"
import axios from "axios"
import ProductCard from "./ProductCard"
import { WishlistContext } from "../context/WishlistContext"

const FeaturedProducts = () => {
  const [products, setProducts] = useState([])
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products/featured")

        // Filter out products starting with "Customize" and take only 8
        const filtered = res.data
          .filter((p) => !p.name?.toLowerCase().startsWith("customize"))
          .slice(0, 18)

        setProducts(filtered)
      } catch (err) {
        console.error("Failed to fetch featured products:", err)
      }
    }

    fetchProducts()
  }, [])

  if (!products || products.length === 0) return null

  return (
    <div className="max-w-full mx-auto px-6 md:px-8 lg:px-10 py-5">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-2xl md:text-3xl font-semibold  mb-8">
          Featured Products
        </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isWishlisted={isInWishlist(product._id)}
            onWishlistToggle={() =>
              isInWishlist(product._id)
                ? removeFromWishlist(product._id)
                : addToWishlist(product._id)
            }
          />
        ))}
      </div>
      </div>
    </div>
  )
}

export default FeaturedProducts
