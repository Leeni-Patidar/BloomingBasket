// "use client"
// import { createContext, useContext, useEffect, useState } from "react"
// import axios from "axios"
// import { AuthContext } from "./AuthContext"
// import { toast } from "react-toastify"

// export const CartContext = createContext()

// export const CartProvider = ({ children }) => {
//   const { user, token, loading: authLoading } = useContext(AuthContext)
//   const [cartItems, setCartItems] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [cartError, setCartError] = useState(null)
//   const [addingProductId, setAddingProductId] = useState(null);

//   useEffect(() => {
//     if (user && token && !authLoading && !cartError) {
//       fetchCart()
//     } else if (!user && !token && !authLoading && !cartError) {
//       setCartItems([])
//     }
//   }, [user, token])

//   const fetchCart = async () => {
//     if (!token) return
//     try {
//       setLoading(true)
//       const res = await axios.get("/api/user/cart", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       setCartItems(res.data.items || [])
//     } catch (err) {
//       console.error("Cart fetch error:", err);
//       // Only show error toast if not a "no cart" case
//       if (err.response?.status !== 404) {
//         toast.error(err.response?.data?.message || "Failed to fetch cart.")
//         setCartError(err); // Set error state to prevent re-fetching
//       }
//       setCartItems([]) // Ensure frontend doesn't break
//     } finally {
//       setLoading(false)
//     }
//   }

//   const addToCart = async (productId, quantity = 1) => {
//     if (!token) {
//       toast.warn("Please login to add items to cart")
//       return
//     }
//     try {
//       setAddingProductId(productId);
//       setLoading(true)
//       const res = await axios.post(
//         "/api/user/cart",
//         { productId, quantity },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       )
//       setCartItems(res.data.items || [])
//       toast.success("Added to cart!")
//     } catch (err) {
//       console.error("Add to cart error:", err)
//  toast.error(err.response?.data?.message || "Failed to add item.");
//  setAddingProductId(null); // Ensure state is reset on error
//       throw err
//     } finally {
//       setLoading(false)
//     }
//   }

//   const removeFromCart = async (productId) => {
//     if (!token) return
//     try {
//       setLoading(true)
//       const res = await axios.delete(`/api/user/cart/${productId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       setCartItems(res.data.items || [])
//     } catch (err) {
//       console.error("Remove from cart error:", err)
//       toast.error("Failed to remove item.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const updateQuantity = async (productId, quantity) => {
//     if (quantity < 1) return
//     if (!token) return
//     try {
//       setLoading(true)
//       const res = await axios.put(
//         `/api/user/cart/${productId}`,
//         { quantity },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       )
//       setCartItems(res.data.items || [])
//     } catch (err) {
//       console.error("Update quantity error:", err)
//       toast.error("Failed to update quantity.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // ✅ Fixed clearCart to sync backend + frontend
//   const clearCart = async () => {
//     try {
//       if (!token) {
//         toast.error("You must be logged in to clear your cart")
//         return
//       }

//       await axios.delete("/api/user/cart", {
//         headers: { Authorization: `Bearer ${token}` },
//       })

//       setCartItems([]) // ✅ frontend update
//       toast.success("Cart cleared")
//     } catch (err) {
//       console.error("Clear cart error:", err)
//       toast.error(err.response?.data?.message || "Failed to clear cart")
//     }
//   }

//   const getCartItemsCount = () => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0)
//   }

//   const getCartTotal = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.quantity * (item.productId?.price || 0),
//       0
//     )
//   }

//   const isInCart = (productId) => {
//     if (!productId) return false
//     if (!cartItems || cartItems.length === 0) return false

//     return cartItems.some((item) => {
//       const itemProductId = item.productId?._id || item.productId
//       return itemProductId === productId
//     })
//   }

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         loading,
//  cartError,
//         addToCart,
//         addingProductId,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         getCartItemsCount,
//         getCartTotal,
//         isInCart,
//         fetchCart,
//         setCartItems
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   )
// }

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addingProductId, setAddingProductId] = useState(null);

  // Assume baseURL and Authorization header are set globally in AuthContext
  // So you can call axios without full URL or headers

  const fetchCart = async () => {
    if (!user || !token) {
      setCartItems([]);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get("/api/user/cart");
      setCartItems(res.data?.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user || !token) return;
    try {
      setAddingProductId(productId);
      const res = await axios.post("/api/user/cart", { productId, quantity });
      setCartItems(res.data?.items || []);
    } catch (err) {
      console.error("Error adding to cart:", err);
    } finally {
      setAddingProductId(null);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user || !token) return;
    try {
      const res = await axios.delete(`/api/user/cart/${productId}`);
      setCartItems(res.data?.items || []);
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user || !token) return;
    try {
      const res = await axios.put(`/api/user/cart/${productId}`, { quantity });
      setCartItems(res.data?.items || []);
    } catch (err) {
      console.error("Error updating cart quantity:", err);
    }
  };

  const clearCart = async () => {
    if (!user || !token) return;
    try {
      const res = await axios.delete("/api/user/cart");
      setCartItems(res.data?.items || []);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  const getCartItemsCount = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const getCartTotal = () =>
    cartItems.reduce((total, item) => {
      const price = item.productId?.price || item.price || 0;
      return total + item.quantity * price;
    }, 0);

  const isInCart = (productId) =>
    cartItems.some(
      (item) => (item.productId?._id || item.productId) === productId
    );

  useEffect(() => {
    fetchCart();
  }, [user, token]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        loading,
        addingProductId,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItemsCount,
        getCartTotal,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
