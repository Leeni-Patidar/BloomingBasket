"use client"

import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"
import ProductCard from "../components/ProductCard"
const Shop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: "all",
    search: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  })
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  })

  const { addToCart } = useContext(CartContext)
  const { addToWishlist, isInWishlist } = useContext(WishlistContext)

  const categories = [
    { value: "all", label: "All Flowers" },
    { value: "roses", label: "Roses" },
    { value: "tulips", label: "Tulips" },
    { value: "sunflowers", label: "Sunflowers" },
    { value: "lilies", label: "Lilies" },
    { value: "orchids", label: "Orchids" },
    { value: "carnations", label: "Carnations" },
    { value: "wedding", label: "Wedding" },
    { value: "birthday", label: "Birthday" },
    { value: "anniversary", label: "Anniversary" },
  ]

  useEffect(() => {
    fetchProducts()
  }, [filters, pagination.currentPage])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: 12,
        ...filters,
      })

      const response = await axios.get(`/api/products?${params}`)
      setProducts(response.data.products)
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        total: response.data.total,
      })
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPagination((prev) => ({ ...prev, currentPage: 1 }))
  }

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="py-8 bg-gradient-to-br from-[#FDF2F8] to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-[2.5rem] font-bold mb-4 text-shadow">Shop Flowers</h1>
              <p className="text-[1.1rem] text-shadow-sm">
                Discover our beautiful collection of fresh flowers and arrangements
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/3 lg:w-1/4 px-4 mb-4">
            <div className="bg-white rounded-lg p-5 shadow-md">
              <div className="mb-6">
                <h5 className="text-lg font-semibold mb-2">Search</h5>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Search flowers..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                />
              </div>

              <div className="mb-6">
                <h5 className="text-lg font-semibold mb-2">Categories</h5>
                <div className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      className={`px-3 py-1.5 border border-gray-300 rounded text-left bg-white transition-all duration-200 hover:bg-gray-100 ${filters.category === category.value ? "bg-blue-600 text-white border-blue-600" : ""}`}
                      onClick={() => handleFilterChange("category", category.value)}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h5 className="text-lg font-semibold mb-2">Price Range</h5>
                <div className="flex flex-wrap -mx-2">
                  <div className="w-1/2 px-2">
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                    />
                  </div>
                  <div className="w-1/2 px-2">
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h5 className="text-lg font-semibold mb-2">Sort By</h5>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split("-")
                    handleFilterChange("sortBy", sortBy)
                    handleFilterChange("sortOrder", sortOrder)
                  }}
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating.average-desc">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3 lg:w-3/4 px-4">
            <div className="mb-4">
              <span className="text-gray-700">{pagination.total} products found</span>
            </div>

            {loading ? (
              <div className="text-center mt-8">
                <div className="spinner-border text-blue-600" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div key={product._id}>
                      <ProductCard
                        product={product}
                        onAddToCart={() => addToCart(product)}
                        onAddToWishlist={() => addToWishlist(product)}
                        isInWishlist={isInWishlist(product._id)}
                      />
                    </div>
                  ))}
                </div>

                {products.length === 0 && (
                  <div className="text-center mt-8">
                    <i className="fas fa-search fa-3x mb-3 text-gray-400"></i>
                    <h4 className="text-xl font-semibold mb-2">No products found</h4>
                    <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                  </div>
                )}

                {pagination.totalPages > 1 && (
                  <nav className="mt-8">
                    <ul className="flex justify-center space-x-1">
                      <li
                        className={`page-item ${pagination.currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <button
                          className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100"
                          onClick={() => handlePageChange(pagination.currentPage - 1)}
                          disabled={pagination.currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      {[...Array(pagination.totalPages)].map((_, index) => (
                        <li
                          key={index + 1}
                          className={`page-item ${pagination.currentPage === index + 1 ? "bg-blue-600 text-white rounded-md" : ""}`}
                        >
                          <button
                            className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100"
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li
                        className={`page-item ${pagination.currentPage === pagination.totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <button
                          className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100"
                          onClick={() => handlePageChange(pagination.currentPage + 1)}
                          disabled={pagination.currentPage === pagination.totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
