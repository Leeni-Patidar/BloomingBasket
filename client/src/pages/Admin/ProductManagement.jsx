"use client"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { toast } from "react-toastify"
import axios from "axios"

const ProductManagement = () => {
  const { token } = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "flower",
    stock: "",
    images: [""],
    featured: false,
  })

  const categories = [
    "flower",
    "chocolate",
    "soft-toy",
    "pipecleaner",
    "butterfly",
    "hair-clip",
    "crochet",
    "origami",
    "fruit",
    "skincare",
  ]

  useEffect(() => {
    fetchProducts()
  }, [currentPage, searchTerm, categoryFilter])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
        ...(categoryFilter !== "all" && { category: categoryFilter }),
      })

      const response = await axios.get(`/api/products?${params}`)
      setProducts(response.data.products || [])
      setPagination(response.data.pagination || {})
    } catch (error) {
      console.error("Fetch products error:", error)
      toast.error("Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!productForm.name || !productForm.description || !productForm.price) {
      toast.error("Please fill all required fields")
      return
    }

    try {
      const productData = {
        ...productForm,
        price: Number.parseFloat(productForm.price),
        stock: Number.parseInt(productForm.stock) || 0,
        images: productForm.images.filter((img) => img.trim() !== ""),
      }

      if (editingProduct) {
        const response = await axios.put(`/api/products/${editingProduct._id}`, productData, {
          headers: { Authorization: `Bearer ${token}` },
        })

        setProducts(products.map((p) => (p._id === editingProduct._id ? response.data.product : p)))
        toast.success("Product updated successfully")
      } else {
        const response = await axios.post("/api/products", productData, {
          headers: { Authorization: `Bearer ${token}` },
        })

        setProducts([response.data.product, ...products])
        toast.success("Product created successfully")
      }

      resetForm()
    } catch (error) {
      console.error("Submit product error:", error)
      toast.error(error.response?.data?.message || "Failed to save product")
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      images: product.images.length > 0 ? product.images : [""],
      featured: product.featured,
    })
    setShowAddForm(true)
  }

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return
    }

    try {
      await axios.delete(`/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setProducts(products.filter((p) => p._id !== productId))
      toast.success("Product deleted successfully")
    } catch (error) {
      console.error("Delete product error:", error)
      toast.error("Failed to delete product")
    }
  }

  const resetForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: "",
      category: "flower",
      stock: "",
      images: [""],
      featured: false,
    })
    setEditingProduct(null)
    setShowAddForm(false)
  }

  const addImageField = () => {
    setProductForm((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }))
  }

  const removeImageField = (index) => {
    setProductForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const updateImageField = (index, value) => {
    setProductForm((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => (i === index ? value : img)),
    }))
  }

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateImageField(index, reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Product Management</h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="button-bg px-6 py-2 rounded-lg button-bg:hover transition-colors"
            >
              Add New Product
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
              />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="fixed inset-0  bg-opacity-30 flex items-center justify-center z-50 p-4" style={{ backdropFilter: "blur(4px)" }}>
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
                  <button onClick={resetForm}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Product Name *"
                    value={productForm.name}
                    onChange={(e) => setProductForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                  <textarea
                    placeholder="Description *"
                    rows="3"
                    value={productForm.description}
                    onChange={(e) => setProductForm((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Price *"
                      value={productForm.price}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, price: e.target.value }))}
                      className="border border-gray-300 rounded-lg px-3 py-2"
                      required
                    />
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, category: e.target.value }))}
                      className="border border-gray-300 rounded-lg px-3 py-2"
                      required
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Stock"
                      value={productForm.stock}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, stock: e.target.value }))}
                      className="border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>

                  {/* Local file upload with preview */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Upload Images</label>
                    {productForm.images.map((img, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, index)}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                        />
                        {img && (
                          <img src={img} alt="preview" className="w-16 h-16 object-cover rounded" />
                        )}
                        {productForm.images.length > 1 && (
                          <button type="button" onClick={() => removeImageField(index)} className="text-red-500">
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addImageField} className="button-bg button-bg:hover text-sm rounded p-2 mt-1">
                      + Add Another Image
                    </button>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button type="submit" className="button-bg button-bg:hover px-6 py-2 rounded-lg">
                      {editingProduct ? "Update Product" : "Create Product"}
                    </button>
                    <button type="button" onClick={resetForm} className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Product Cards */}
          {products.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow text-center">No products match your current filters.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => {
                const trimmedDescription = product.description.split(" ").slice(0, 15).join(" ") + (product.description.split(" ").length > 20 ? "..." : "")
                return (
                  <div key={product._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="h-60 bg-gray-100 overflow-hidden">
                      <img src={product.images?.[0] || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold line-clamp-1 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-700 mb-3">{trimmedDescription}</p>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-pink-600 font-bold">₹{product.price}</span>
                        <span>Stock: {product.stock}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4 text-xs">
                        <span className="capitalize">{product.category.replace("-", " ")}</span>
                        <span className={`px-2 py-1 rounded ${product.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {product.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(product)} className="flex-1 button-bg button-bg:hover py-2 px-3 rounded text-sm">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="flex-1 py-2 px-3 rounded text-sm bg-red-100 hover:bg-red-200">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === page ? "bg-pink-500 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.pages))}
                disabled={currentPage === pagination.pages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductManagement
