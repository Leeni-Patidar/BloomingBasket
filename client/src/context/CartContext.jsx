// ✅ CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (user) fetchCart();
    else setCartItems([]);
  }, [user]);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get("/api/users/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error("Cart fetch error:", err);
      toast.error("Failed to fetch cart");
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const token = localStorage.getItem("token");
      if (!productId) throw new Error("Product ID is required");

      await axios.post(
        "/api/users/cart",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
      toast.success("Added to cart");
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Failed to add to cart");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "/api/users/cart",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
      toast.success("Cart updated");
    } catch (err) {
      console.error("Update cart error:", err);
      toast.error("Failed to update cart");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`/api/users/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
      toast.info("Removed from cart");
    } catch (err) {
      console.error("Remove from cart error:", err);
      toast.error("Failed to remove from cart");
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete("/api/users/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems([]);
      toast.success("Cart cleared");
    } catch (err) {
      toast.error("Failed to clear cart");
    }
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.quantity * (item.productId?.price || 0),
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartItemsCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
