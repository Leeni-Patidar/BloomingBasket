;

import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) fetchWishlist();
    else setWishlistItems([]);
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const { data } = await axios.get("/api/users/wishlist");
      setWishlistItems(data);
    } catch (error) {
      console.error("Fetch wishlist error:", error);
    }
  };

  const addToWishlist = async (product) => {
    if (!user) return toast.warn("Please login to add items to wishlist");

    try {
      await axios.post(`/api/users/wishlist/${product._id}`);
      setWishlistItems((prevItems) => [...prevItems, product]);
      toast.success(`${product.name} added to wishlist!`);
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add to wishlist";
      toast.error(message);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return;

    try {
      await axios.delete(`/api/users/wishlist/${productId}`);
      setWishlistItems((prevItems) => {
        const item = prevItems.find((item) => item._id === productId);
        if (item) toast.info(`${item.name} removed from wishlist`);
        return prevItems.filter((item) => item._id !== productId);
      });
    } catch (error) {
      const message = error.response?.data?.message || "Failed to remove from wishlist";
      toast.error(message);
    }
  };

  const isInWishlist = (productId) =>
    wishlistItems.some((item) => item._id === productId);

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
