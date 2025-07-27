// ✅ Shop.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const bouquetTypes = [
  "Flower Bouquet", "Chocolate Bouquet", "Soft Toy Bouquet",
  "Pipecleaner Bouquet", "Butterfly Bouquet", "Fairy Light Bouquet",
  "Crochet Bouquet", "Origami Bouquet", "Fruit Bouquet", "Skincare Bouquet",
];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filters, setFilters] = useState({
    category: "all",
    sort: "latest",
    price: "",
    page: 1,
  });
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    if (user) fetchWishlist();
  }, [filters, user]);

  const fetchProducts = async () => {
    try {
      const { category, sort, price, page } = filters;
      const query = `?category=${category}&sort=${sort}&price=${price}&page=${page}`;
      const res = await axios.get(`/api/products${query}`);
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Product fetch error:", err);
      toast.error("Failed to load products");
    }
  };

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get("/api/users/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Ensure consistent IDs
      const ids = res.data.map((item) =>
        typeof item.productId === "object" ? item.productId._id : item.productId
      );
      setWishlist(ids);
    } catch (err) {
      console.error("fetchWishlist error:", err);
      toast.error("Failed to load wishlist");
    }
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
      page: 1,
    }));
  };

  const redirectToLogin = () => {
    const isRegistered = localStorage.getItem("isRegistered") === "true";
    navigate(isRegistered ? "/login?redirect=/shop" : "/register?redirect=/shop");
  };

  const handleAddToCart = async (product) => {
    if (!user) return redirectToLogin();
    if (user.role === "admin") return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/users/cart",
        { productId: product._id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Added to cart");
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Failed to add to cart");
    }
  };

  const handleAddToWishlist = async (productId) => {
    if (!user) return redirectToLogin();
    if (user.role === "admin") return;

    try {
      const token = localStorage.getItem("token");
      const isWished = wishlist.includes(productId);

      if (isWished) {
        await axios.delete(`/api/users/wishlist/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist((prev) => prev.filter((id) => id !== productId));
        toast.info("Removed from wishlist");
      } else {
        await axios.post(
          "/api/users/wishlist",
          { productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWishlist((prev) => [...prev, productId]);
        toast.success("Added to wishlist");
      }
    } catch (err) {
      console.error("Wishlist update error:", err);
      toast.error("Wishlist update failed");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Shop Flowers</h1>
          <p className="text-lg">
            Browse our beautiful selection of fresh floral arrangements.
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          <div>
            <label className="block font-semibold mb-1">Bouquet Type</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="all">All Bouquets</option>
              {bouquetTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Sort By</label>
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="latest">Latest</option>
              <option value="price_low_high">Price: Low to High</option>
              <option value="price_high_low">Price: High to Low</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Max Price</label>
            <input
              type="number"
              value={filters.price}
              onChange={(e) => handleFilterChange("price", e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter max price"
            />
          </div>
        </div>

        {/* Product List */}
        {products.length === 0 ? (
          <div className="text-gray-600">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        )}

        {/* Pagination */}
        <div className="mt-10 flex justify-center items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setFilters((prev) => ({ ...prev, page: i + 1 }))}
              className={`px-4 py-2 rounded ${
                filters.page === i + 1
                  ? "button-bg"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
