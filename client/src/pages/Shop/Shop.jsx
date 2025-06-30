"use client"

import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { CartContext } from "../../context/CartContext"
import { WishlistContext } from "../../context/WishlistContext"
import ProductCard from "../../components/ProductCard/ProductCard"
import styles from "./Shop.module.css"

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
    <div className={styles.shop}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={styles.shopHeader}>
              <h1>Shop Flowers</h1>
              <p>Discover our beautiful collection of fresh flowers and arrangements</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 mb-4">
            <div className={styles.sidebar}>
              <div className={styles.filterSection}>
                <h5>Search</h5>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search flowers..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                />
              </div>

              <div className={styles.filterSection}>
                <h5>Categories</h5>
                <div className={styles.categoryList}>
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      className={`${styles.categoryBtn} ${filters.category === category.value ? styles.active : ""}`}
                      onClick={() => handleFilterChange("category", category.value)}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterSection}>
                <h5>Price Range</h5>
                <div className="row">
                  <div className="col-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.filterSection}>
                <h5>Sort By</h5>
                <select
                  className="form-select"
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

          <div className="col-lg-9 col-md-8">
            <div className={styles.productsHeader}>
              <span>{pagination.total} products found</span>
            </div>

            {loading ? (
              <div className={styles.loading}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <div className="row">
                  {products.map((product) => (
                    <div key={product._id} className="col-lg-4 col-md-6 mb-4">
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
                  <div className={styles.noProducts}>
                    <i className="fas fa-search fa-3x mb-3"></i>
                    <h4>No products found</h4>
                    <p>Try adjusting your search or filter criteria</p>
                  </div>
                )}

                {pagination.totalPages > 1 && (
                  <nav className={styles.pagination}>
                    <ul className="pagination justify-content-center">
                      <li className={`page-item ${pagination.currentPage === 1 ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(pagination.currentPage - 1)}
                          disabled={pagination.currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      {[...Array(pagination.totalPages)].map((_, index) => (
                        <li
                          key={index + 1}
                          className={`page-item ${pagination.currentPage === index + 1 ? "active" : ""}`}
                        >
                          <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${pagination.currentPage === pagination.totalPages ? "disabled" : ""}`}>
                        <button
                          className="page-link"
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
