import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token, user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [addingProductId, setAddingProductId] = useState(null);

  const API =
    window.location.hostname === "localhost"
      ? "http://localhost:5001"
      : "https://bloomingbasket-server.onrender.com";

  // ✅ Fetch cart
  const fetchCart = async () => {
    if (!token || !user) return;
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/user/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.items || []);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add product to cart
  const addToCart = async (productId, quantity = 1) => {
    if (!token || !user) return;
    try {
      setAddingProductId(productId);
      const res = await axios.post(
        `${API}/api/user/cart/add`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(res.data.items || []);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setAddingProductId(null);
    }
  };

  // ✅ Update quantity
  const updateQuantity = async (productId, quantity) => {
    if (!token || !user) return;
    try {
      const res = await axios.put(
        `${API}/api/user/cart/update/${productId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(res.data.items || []);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  // ✅ Remove product from cart
  const removeFromCart = async (productId) => {
    if (!token || !user) return;
    try {
      const res = await axios.delete(`${API}/api/user/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.items || []);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // ✅ Clear cart
  const clearCart = async () => {
    if (!token || !user) return;
    try {
      const res = await axios.delete(`${API}/api/user/cart/clear`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.items || []);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // ✅ Helpers
  const getCartItemsCount = () =>
    cartItems.reduce((count, item) => count + item.quantity, 0);

  const getCartTotal = () =>
    cartItems.reduce((sum, item) => {
      const price = item.product?.price ?? item.productId?.price ?? 0;
      return sum + price * item.quantity;
    }, 0);

  const isInCart = (productId) =>
    cartItems.some(
      (item) =>
        item.productId === productId ||
        item.productId?._id === productId ||
        item.product?._id === productId
    );

  // ✅ Load cart when user logs in
  useEffect(() => {
    fetchCart();
  }, [token, user]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        loading,
        addingProductId,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartItemsCount,
        getCartTotal,
        isInCart,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
