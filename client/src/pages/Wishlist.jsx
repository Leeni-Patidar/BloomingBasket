;

import { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="flex items-center min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full md:w-1/2 text-center">
              <i className="fas fa-heart fa-5x mb-4 text-gray-400"></i>
              <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-4">
                Save your favorite flowers to your wishlist for easy access later.
              </p>
              <Link
                to="/shop"
                className="inline-block bg-gradient-to-br from-[#ba54a9] to-[#fecfef]  px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 button-bg:hover hover:shadow-lg"
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
        <div className="text-center mb-12  rounded-2xl  button-bg">
          <h1 className="text-3xl md:text-[2rem] font-bold mb-4">My Wishlist</h1>
          <p className="text-[1.1rem]">
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
