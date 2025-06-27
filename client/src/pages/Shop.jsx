"use client"

import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"

const Shop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  })
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  })

  const categories = [
    { value: "", label: "All Categories" },
    { value: "roses", label: "Roses" },
    { value: "tulips", label: "Tulips" },
    { value: "lilies", label: "Lilies" },
    { value: "orchids", label: "Orchids" },
    { value: "sunflowers", label: "Sunflowers" },
    { value: "mixed", label: "Mixed Bouquets" },
    { value: "arrangements", label: "Arrangements" },
  ]

  const sortOptions = [
    { value: "createdAt-desc", label: "Newest First" },
    { value: "createdAt-asc", label: "Oldest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ]

  useEffect(() => {
    fetchProducts()
  }, [filters, pagination.currentPage])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({
        page: pagination.currentPage,
        limit: 12,
        ...filters,
      })

      const response = await fetch(`http://localhost:5000/api/products?${queryParams}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
        setPagination({
          currentPage: data.currentPage,
          totalPages: data.totalPages,
          total: data.total,
        })
      }
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

  const handleSortChange = (value) => {
    const [sortBy, sortOrder] = value.split("-")
    setFilters((prev) => ({ ...prev, sortBy, sortOrder }))
    setPagination((prev) => ({ ...prev, currentPage: 1 }))
  }

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="shop-page py-5">
      <div className="container">
        {/* Page Header */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold mb-3">Our Flower Collection</h1>
            <p className="lead text-muted">Discover beautiful flowers for every occasion</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="row mb-4">
          <div className="col-lg-3 col-md-6 mb-3">
            <label className="form-label fw-medium">Search Flowers</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search flowers..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
              <button className="btn btn-outline-primary" type="button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <label className="form-label fw-medium">Category</label>
            <select
              className="form-select"
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <label className="form-label fw-medium">Sort By</label>
            <select
              className="form-select"
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-3 col-md-6 mb-3 d-flex align-items-end">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => {
                setFilters({
                  category: "",
                  search: "",
                  sortBy: "createdAt",
                  sortOrder: "desc",
                })
                setPagination((prev) => ({ ...prev, currentPage: 1 }))
              }}
            >
              <i className="fas fa-undo me-2"></i>
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <p className="text-muted mb-0">
                {loading ? "Loading..." : `Showing ${products.length} of ${pagination.total} products`}
              </p>
              <div className="d-flex align-items-center gap-2">
                <span className="text-muted">Page:</span>
                <span className="fw-medium">
                  {pagination.currentPage} of {pagination.totalPages}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="row">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100 shimmer">
                  <div className="card-img-top bg-light" style={{ height: "250px" }}></div>
                  <div className="card-body">
                    <div className="bg-light rounded mb-2" style={{ height: "20px", width: "80%" }}></div>
                    <div className="bg-light rounded mb-2" style={{ height: "16px", width: "100%" }}></div>
                    <div className="bg-light rounded" style={{ height: "16px", width: "60%" }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-lg-3 col-md-6 mb-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            <div className="col-12">
              <div className="empty-state text-center py-5">
                <i className="fas fa-search text-muted mb-3" style={{ fontSize: "4rem" }}></i>
                <h4 className="text-muted">No products found</h4>
                <p className="text-muted">Try adjusting your search criteria or browse all categories.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setFilters({
                      category: "",
                      search: "",
                      sortBy: "createdAt",
                      sortOrder: "desc",
                    })
                    setPagination((prev) => ({ ...prev, currentPage: 1 }))
                  }}
                >
                  <i className="fas fa-undo me-2"></i>
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="row">
            <div className="col-12">
              <nav aria-label="Products pagination">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${pagination.currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                  </li>

                  {[...Array(pagination.totalPages)].map((_, index) => {
                    const page = index + 1
                    return (
                      <li key={page} className={`page-item ${pagination.currentPage === page ? "active" : ""}`}>
                        <button className="page-link" onClick={() => handlePageChange(page)}>
                          {page}
                        </button>
                      </li>
                    )
                  })}

                  <li className={`page-item ${pagination.currentPage === pagination.totalPages ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Shop
