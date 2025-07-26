// ✅ ProductManagement.jsx (Frontend)

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const bouquetCategories = [
  { name: "Flower Bouquet", value: "flower" },
  { name: "Chocolate Bouquet", value: "chocolate" },
  { name: "Soft Toy Bouquet", value: "soft-toy" },
  { name: "Pipecleaner Bouquet", value: "pipecleaner" },
  { name: "Butterfly Bouquet", value: "butterfly" },
  { name: "Fairy Light Bouquet", value: "fairy-light" },
  { name: "Crochet Bouquet", value: "crochet" },
  { name: "Origami Bouquet", value: "origami" },
  { name: "Fruit Bouquet", value: "fruit" },
  { name: "Skincare Bouquet", value: "skincare" },
];

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    images: [],
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data.products);
    } catch (err) {
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const res = await axios.post("/api/upload/image", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedImages = [...formData.images];
      updatedImages[index] = res.data.url;
      setFormData({ ...formData, images: updatedImages });

      toast.success("Image uploaded");
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, category, price, stock, images } = formData;

    if (!name || !description || !category || !price || !stock || images.length === 0) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const payload = {
        name,
        description,
        category,
        price: parseFloat(price),
        stock: parseInt(stock),
        images: images.filter(Boolean),
      };

      const res = await axios.post("/api/products", payload);
      toast.success("Product added!");
      setFormData({ name: "", description: "", category: "", price: "", stock: "", images: [] });
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      const backendErrors = err.response?.data?.errors;
      if (backendErrors?.length) {
        toast.error(backendErrors[0].msg);
      } else {
        toast.error(err.response?.data?.message || "Failed to add product.");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-[var(--text-color-default)]">All Products</h2>
        <button
          className="px-6 py-2.5 rounded shadow-md font-medium button-bg"
          
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "Add Product"}
        </button>
      </div>

      {showForm && (
        <form className="bg-white rounded p-6 mb-8 shadow-md space-y-5 max-w-3xl" onSubmit={handleSubmit}>
          <div>
            <p className="font-medium text-base">Product Image</p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {Array(4).fill("").map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                    onChange={(e) => handleImageUpload(e, index)}
                  />
                  <img
                    className="max-w-24 h-24 cursor-pointer rounded border object-cover"
                    src={
                      formData.images[index] ||
                      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                    }
                    alt="upload"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-base">Product Name</label>
            <input
              type="text"
              className="px-3 py-2 rounded border border-gray-300"
              placeholder="Type here"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-base">Product Description</label>
            <textarea
              rows={4}
              required
              minLength={10}
              className="px-3 py-2 rounded border border-gray-300 resize-none"
              placeholder="Type here"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-base">Category</label>
            <select
              className="px-3 py-2 rounded border border-gray-300"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="">Select Category</option>
              {bouquetCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-5 flex-wrap">
            <div className="flex-1 min-w-[120px] flex flex-col gap-1">
              <label className="font-medium text-base">Price</label>
              <input
                type="number"
                className="px-3 py-2 rounded border border-gray-300"
                placeholder="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>

            <div className="flex-1 min-w-[120px] flex flex-col gap-1">
              <label className="font-medium text-base">Stock</label>
              <input
                type="number"
                className="px-3 py-2 rounded border border-gray-300"
                placeholder="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded font-medium shadow-md button-bg"
            
          >
            ADD
          </button>
        </form>
      )}

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 text-left rounded overflow-hidden rounded-2xl">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border">Product</th>
                <th className="py-3 px-4 border">Category</th>
                <th className="py-3 px-4 border">Price</th>
                <th className="py-3 px-4 border">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 border flex items-center gap-2">
                    {product.images?.[0] && (
                      <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover rounded" />
                    )}
                    {product.name}
                  </td>
                  <td className="py-3 px-4 border">{product.category}</td>
                  <td className="py-3 px-4 border">₹{product.price}</td>
                  <td className="py-3 px-4 border">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;