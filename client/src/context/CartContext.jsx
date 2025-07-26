import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const res = await axios.get("/api/users/cart");
      setCartItems(res.data.items || []);
    } catch (err) {
      toast.error("Failed to fetch cart");
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await axios.post("/api/users/cart", { productId, quantity });
      setCartItems(res.data.items || []);
      toast.success("Added to cart");
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await axios.put("/api/users/cart", { productId, quantity });
      setCartItems(res.data.items || []);
      toast.success("Cart updated");
    } catch (err) {
      toast.error("Failed to update cart");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`/api/users/cart/${productId}`);
      setCartItems(res.data.cart?.items || []);
      toast.info("Removed from cart");
    } catch (err) {
      toast.error("Failed to remove from cart");
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("/api/users/cart/clear");
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
      (acc, item) => acc + item.quantity * (item.price || 0),
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
