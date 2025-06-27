"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const ProductManagement = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    featured: false,
    image: "",
  })

  const categories = ["Roses", "Tulips", "Lilies", "Orchids", "Mixed Bouquets", "Wedding", "Sympathy"]

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products")
      setProducts(response.data.products || response.data)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("Failed to fetch products")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewProduct({
      ...newProduct,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct._id}`, newProduct)
        toast.success("Product updated successfully!")
      } else {
        await axios.post("/api/products", newProduct)
        toast.success("Product added successfully!")
      }

      setShowAddModal(false)
      setEditingProduct(null)
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        featured: false,
        image: "",
      })
      fetchProducts()
    } catch (error) {
      toast.error("Failed to save product")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      featured: product.featured,
      image: product.image,
    })
    setShowAddModal(true)
  }

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/api/products/${productId}`)
        toast.success("Product deleted successfully!")
        fetchProducts()
      } catch (error) {
        toast.error("Failed to delete product")
      }
    }
  }

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getStatusBadge = (stock) => {
    if (stock === 0) return <span className="badge bg-danger">Out of Stock</span>
    if (stock < 10) return <span className="badge bg-warning">Low Stock</span>
    return <span className="badge bg-success">In Stock</span>
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Product Management</h2>
          <p className="text-muted">Manage your flower inventory and listings</p>
        </div>
        <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
          <i className="fas fa-plus me-2"></i>
          Add Product
        </button>
      </div>

      {/* Search and Stats */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 text-md-end">
          <span className="text-muted">
            Showing {filteredProducts.length} of {products.length} products
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h3>{products.length}</h3>
              <p className="mb-0">Total Products</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3>{products.filter((p) => p.stock > 0).length}</h3>
              <p className="mb-0">In Stock</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h3>{products.filter((p) => p.stock < 10 && p.stock > 0).length}</h3>
              <p className="mb-0">Low Stock</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body text-center">
              <h3>{products.filter((p) => p.stock === 0).length}</h3>
              <p className="mb-0">Out of Stock</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Featured</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={product.image || "/placeholder.svg?height=50&width=50"}
                            alt={product.name}
                            className="rounded me-3"
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                          <div>
                            <h6 className="mb-0">{product.name}</h6>
                            <small className="text-muted">{product.description?.substring(0, 50)}...</small>
                          </div>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>${product.price}</td>
                      <td>{product.stock}</td>
                      <td>{getStatusBadge(product.stock)}</td>
                      <td>
                        {product.featured ? (
                          <span className="badge bg-warning">Featured</span>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-primary" onClick={() => handleEdit(product)}>
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn btn-outline-danger" onClick={() => handleDelete(product._id)}>
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProducts.length === 0 && (
                <div className="text-center py-5">
                  <i className="fas fa-search fa-3x text-muted mb-3"></i>
                  <h5>No products found</h5>
                  <p className="text-muted">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingProduct ? "Edit Product" : "Add New Product"}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingProduct(null)
                  }}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="category" className="form-label">
                        Category *
                      </label>
                      <select
                        className="form-select"
                        id="category"
                        name="category"
                        value={newProduct.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description *
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      value={newProduct.description}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="price" className="form-label">
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        id="price"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="stock" className="form-label">
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="stock"
                        name="stock"
                        value={newProduct.stock}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Options</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="featured"
                          name="featured"
                          checked={newProduct.featured}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="featured">
                          Featured Product
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Image URL
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="image"
                      name="image"
                      value={newProduct.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowAddModal(false)
                      setEditingProduct(null)
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        {editingProduct ? "Updating..." : "Adding..."}
                      </>
                    ) : editingProduct ? (
                      "Update Product"
                    ) : (
                      "Add Product"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductManagement
