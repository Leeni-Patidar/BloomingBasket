import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";
import axios from "axios";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = async (product) => {
    if (!user) {
      toast.warn("Please login to add items to cart");
      navigate("/login");
      return;
    }
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
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    if (!user) {
      toast.warn("Please login to modify wishlist");
      navigate("/login");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/users/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      removeFromWishlist(productId);
      toast.info("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove from wishlist");
    }
  };

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="flex items-center min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full md:w-1/2 text-center">
              <i className="fas fa-heart fa-5x mb-4"></i>
              <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-4">
                Save your favorite flowers to your wishlist for easy access later.
              </p>
              <Link
                to="/shop"
                className="inline-block bg-gradient-to-br from-[#ba54a9] to-[#fecfef] px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-lg"
              >
                Browse Flowers
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 rounded-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">My Wishlist</h1>
          <p className="text-lg">
            Your saved favorite flowers ({wishlistItems.length} item{wishlistItems.length > 1 ? "s" : ""})
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
              onAddToWishlist={() => handleRemoveFromWishlist(product._id)}
              isInWishlist={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;