"use client"

import { useEffect, useState, useContext } from "react"
import axios from "axios"
import ProductCard from "../components/ProductCard"
import { AuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

// Mapping readable labels to backend enums
const categoryMap = {
  "Flower Bouquet": "flower",
  "Chocolate Bouquet": "chocolate",
  "Soft Toy Bouquet": "soft-toy",
  "Pipecleaner Bouquet": "pipecleaner",
  "Butterfly Bouquet": "butterfly",
  "Fairy Light Bouquet": "fairy-light",
  "Crochet Bouquet": "crochet",
  "Origami Bouquet": "origami",
  "Fruit Bouquet": "fruit",
  "Skincare Bouquet": "skincare",
}
const reverseCategoryMap = Object.fromEntries(Object.entries(categoryMap).map(([label, key]) => [key, label]))

const Shop = () => {
  const [products, setProducts] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    category: "all",
    sort: "latest",
    price: "",
    page: 1,
  })
  const [totalPages, setTotalPages] = useState(1)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
    if (user) fetchWishlist()
  }, [filters, user])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { category, sort, price, page } = filters

      const sortMap = {
        latest: "createdAt",
        price_low_high: "price-low",
        price_high_low: "price-high",
      }

      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12",
      })

      if (category !== "all") params.append("category", category)
      if (sort) params.append("sort", sortMap[sort] || sort)
      if (price) params.append("maxPrice", price)

      const res = await axios.get(`/api/products?${params.toString()}`)
      setProducts(res.data.products || [])
      setTotalPages(res.data.totalPages || 1)
    } catch (err) {
      console.error("Product fetch error:", err)
      toast.error("Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return

      const res = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })

      const wishlistItems = res.data.wishlist || []
      const ids = wishlistItems.map((item) => (typeof item === "object" ? item._id : item))
      setWishlist(ids)
    } catch (err) {
      console.error("fetchWishlist error:", err)
      if (err.response?.status !== 401) {
        toast.error("Failed to load wishlist")
      }
    }
  }

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
      page: 1,
    }))
  }

  const redirectToLogin = () => {
    const isRegistered = localStorage.getItem("isRegistered") === "true"
    navigate(isRegistered ? "/login?redirect=/shop" : "/register?redirect=/shop")
  }

  const handleAddToCart = async (product) => {
    if (!user) return redirectToLogin()
    if (user.role === "admin") return

    try {
      const token = localStorage.getItem("token")
      await axios.post(
        "/api/user/cart",
        { productId: product._id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      toast.success("Added to cart")
    } catch (err) {
      console.error("Add to cart error:", err)
      toast.error(err.response?.data?.message || "Failed to add to cart")
    }
  }

  const handleAddToWishlist = async (productId) => {
    if (!user) return redirectToLogin()
    if (user.role === "admin") return

    try {
      const token = localStorage.getItem("token")
      const isWished = wishlist.includes(productId)

      if (isWished) {
        await axios.delete(`/api/user/wishlist/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setWishlist((prev) => prev.filter((id) => id !== productId))
        toast.success("Removed from wishlist")
      } else {
        await axios.post("/api/user/wishlist", { productId }, { headers: { Authorization: `Bearer ${token}` } })
        setWishlist((prev) => [...prev, productId])
        toast.success("Added to wishlist")
      }
    } catch (err) {
      console.error("Wishlist update error:", err)
      toast.error(err.response?.data?.message || "Wishlist update failed")
    }
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Shop Flowers</h1>
          <p className="text-lg">Browse our beautiful selection of fresh floral arrangements.</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div>
              <label className="block font-semibold mb-2">Bouquet Type</label>
              <select
                value={filters.category === "all" ? "all" : reverseCategoryMap[filters.category]}
                onChange={(e) =>
                  handleFilterChange("category", e.target.value === "all" ? "all" : categoryMap[e.target.value])
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              >
                <option value="all">All Bouquets</option>
                {Object.keys(categoryMap).map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">Sort By</label>
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange("sort", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              >
                <option value="latest">Latest</option>
                <option value="price_low_high">Price: Low to High</option>
                <option value="price_high_low">Price: High to Low</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">Max Price (₹)</label>
              <input
                type="number"
                value={filters.price}
                onChange={(e) => handleFilterChange("price", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                placeholder="Enter max price"
                min="0"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() =>
                  setFilters({
                    category: "all",
                    sort: "latest",
                    price: "",
                    page: 1,
                  })
                }
                className="w-full p-3 bg-gray-200  rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        )}

        {/* Product List */}
        {!loading && products.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <i className="fas fa-search text-6xl text-gray-300"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-2">No products found</h3>
            <p className="mb-6">Try adjusting your filters or search criteria</p>
            <button
              onClick={() =>
                setFilters({
                  category: "all",
                  sort: "latest",
                  price: "",
                  page: 1,
                })
              }
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          !loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onAddToWishlist={() => handleAddToWishlist(product._id)}
                  isInWishlist={wishlist.includes(product._id)}
                />
              ))}
            </div>
          )
        )}

        {/* Pagination */}
        {!loading && products.length > 0 && totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => setFilters((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
              disabled={filters.page === 1}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filters.page === 1
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100 border border-gray-300"
              }`}
            >
              <i className="fas fa-chevron-left mr-2"></i>
              Previous
            </button>

            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum = filters.page
                if (totalPages <= 5) pageNum = i + 1
                else if (filters.page <= 3) pageNum = i + 1
                else if (filters.page >= totalPages - 2) pageNum = totalPages - 4 + i
                else pageNum = filters.page - 2 + i

                return (
                  <button
                    key={pageNum}
                    onClick={() => setFilters((prev) => ({ ...prev, page: pageNum }))}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      filters.page === pageNum
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                        : "bg-white hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => setFilters((prev) => ({ ...prev, page: Math.min(totalPages, prev.page + 1) }))}
              disabled={filters.page === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filters.page === totalPages
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100 border border-gray-300"
              }`}
            >
              Next
              <i className="fas fa-chevron-right ml-2"></i>
            </button>
          </div>
        )}

        {/* Footer Info */}
        {!loading && products.length > 0 && (
          <div className="text-center mt-8">
            <p>
              Showing page {filters.page} of {totalPages} ({products.length} products)
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Shop
