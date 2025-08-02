import React, { useEffect, useState, useRef, useContext } from "react"
import axios from "axios"
import ProductCard from "./ProductCard"
import { WishlistContext } from "../context/WishlistContext"

const FeaturedProducts = () => {
  const [products, setProducts] = useState([])
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext)
  const [centeredId, setCenteredId] = useState(null)
  const containerRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products/featured")
        setProducts(res.data)
      } catch (err) {
        console.error("Failed to fetch featured products:", err)
      }
    }
    fetchProducts()
  }, [])

  // IntersectionObserver to detect centered card
  useEffect(() => {
    if (!containerRef.current) return
    itemRefs.current = itemRefs.current.slice(0, products.length)

    const options = {
      root: containerRef.current,
      rootMargin: "0px",
      threshold: Array.from({ length: 101 }, (_, i) => i / 100), // fine-grained
    }

    let bestEntry = null

    const observer = new IntersectionObserver((entries) => {
      // Choose the entry with largest intersectionRatio (closest to center viewport)
      entries.forEach((entry) => {
        if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
          bestEntry = entry
        }
      })

      if (bestEntry) {
        const id = bestEntry.target.getAttribute("data-id")
        setCenteredId(id)
      }
      bestEntry = null
    }, options)

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [products])

  if (!products || products.length === 0) return null

  return (
    <div className="max-w-full mx-auto px-6 md:px-8 lg:px-10 py-5">
      <div
        ref={containerRef}
        className="flex overflow-x-auto space-x-4 snap-x snap-mandatory py-4 px-2 scrollbar-hide"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {products.map((product, idx) => {
          const isCentered = centeredId === product._id.toString()
          return (
            <div
              key={product._id}
              data-id={product._id}
              ref={(el) => (itemRefs.current[idx] = el)}
              className={`snap-center flex-shrink-0 transition-transform duration-300 ${
                isCentered ? "scale-105" : "scale-100"
              }`}
              style={{
                width: "calc(25% - 1rem)", // four per view minus spacing
                minWidth: "220px",
                maxWidth: "300px",
              }}
            >
              <ProductCard
                product={product}
                isWishlisted={isInWishlist(product._id)}
                onWishlistToggle={() =>
                  isInWishlist(product._id)
                    ? removeFromWishlist(product._id)
                    : addToWishlist(product._id)
                }
              />
            </div>
          )
        })}
      </div>
      {/* Optional: left/right fade overlays for affordance */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />
    </div>
  )
}

export default FeaturedProducts
