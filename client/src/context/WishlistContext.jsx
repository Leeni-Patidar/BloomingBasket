// ✅ WishlistContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get("/api/users/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Ensure productId is extracted correctly
      const productIds = res.data.map((item) =>
        typeof item.productId === "object" ? item.productId._id : item.productId
      );

      setWishlistItems(productIds);
    } catch (err) {
      console.error("Wishlist fetch error:", err);
      toast.error("Failed to fetch wishlist");
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!productId) throw new Error("Product ID is required");

      // Ensure ID is a string
      const id = typeof productId === "object" ? productId._id : productId;

      const res = await axios.post(
        "/api/users/wishlist",
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWishlistItems((prev) => [...prev, res.data.productId]);
      toast.success("Added to wishlist");
    } catch (err) {
      console.error("Add to wishlist error:", err);
      toast.error("Failed to add to wishlist");
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const id = typeof productId === "object" ? productId._id : productId;

      await axios.delete(`/api/users/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlistItems((prev) => prev.filter((id_) => id_ !== id));
      toast.info("Removed from wishlist");
    } catch (err) {
      console.error("Remove from wishlist error:", err);
      toast.error("Failed to remove from wishlist");
    }
  };

  const isInWishlist = (productId) => {
    const id = typeof productId === "object" ? productId._id : productId;
    return wishlistItems.includes(id);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
