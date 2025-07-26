import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get("/api/users/wishlist");
      setWishlist(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch wishlist");
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const res = await axios.post("/api/users/wishlist", { productId });

      // Assume server returns full product object in `res.data.product`
      const newProduct = res.data.product || res.data;

      const exists = wishlist.some((item) => item._id === newProduct._id);
      if (!exists) {
        setWishlist((prev) => [...prev, newProduct]);
        toast.success("Added to wishlist");
      } else {
        toast.info("Already in wishlist");
      }
    } catch (err) {
      toast.error("Failed to add to wishlist");
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`/api/users/wishlist/${productId}`);
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
      toast.info("Removed from wishlist");
    } catch (err) {
      toast.error("Failed to remove from wishlist");
    }
  };

  const isInWishlist = (productId) => {
    return wishlist?.some((item) => item._id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems: wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
