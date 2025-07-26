import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { WishlistContext } from "../context/WishlistContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductCard = ({ product, onAddToCart }) => {
  const { user } = useContext(AuthContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  const inWishlist = isInWishlist(product._id);

  // 🛒 Add to Cart
  const handleAddToCart = () => {
    if (!user) {
      toast.warn("Please login to add items to cart");
      navigate(`/login?redirect=/product/${product._id}`);
      return;
    }

    if (user.role === "admin") return;
    onAddToCart();
  };

  // ❤️ Wishlist toggle
  const handleToggleWishlist = () => {
    if (!user) {
      toast.warn("Please login to add items to wishlist");
      navigate(`/login?redirect=/product/${product._id}`);
      return;
    }

    if (user.role === "admin") return;

    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-200 overflow-hidden">
      {/* ❤️ Wishlist Icon */}
      {user?.role !== "admin" && (
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 text-xl z-10 transition ${
            inWishlist ? "text-pink-600" : "text-gray-400 hover:text-pink-500"
          }`}
        >
          <i className={`fas ${inWishlist ? "fa-heart" : "fa-heart-circle-plus"}`} />
        </button>
      )}

      {/* 🖼️ Product Image */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-t-2xl"
        />
      </Link>

      {/* 📝 Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="text-pink-600 font-bold mt-2 text-md">₹{product.price}</p>

        {/* 🛒 Add to Cart Button */}
        {user?.role !== "admin" && (
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full button-bg button-bg:hover py-2 rounded-2xl transition"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
