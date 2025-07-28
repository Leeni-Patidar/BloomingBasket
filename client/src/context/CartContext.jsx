"use client"

import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "./AuthContext"
import { toast } from "react-toastify"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext)
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch cart items on load or login
  useEffect(() => {
    if (user) {
      fetchCart()
    } else {
      setCartItems([])
    }
  }, [user])

  const fetchCart = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) return

      const res = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      // Updated to handle the new backend response structure
      setCartItems(res.data.items || [])
    } catch (err) {
      console.error("Cart fetch error:", err)
      if (err.response?.status !== 401) {
        toast.error("Failed to fetch cart.")
      }
    } finally {
      setLoading(false)
    }
  }

  // Add to Cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) {
        toast.warn("Please login to add items to cart")
        return
      }

      const res = await axios.post(
        "/api/user/cart",
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      setCartItems(res.data.items || [])
      toast.success("Added to cart!")
    } catch (err) {
      console.error("Add to cart error:", err)
      toast.error(err.response?.data?.message || "Failed to add item.")
    } finally {
      setLoading(false)
    }
  }

  // Remove from Cart
  const removeFromCart = async (productId) => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) return

      const res = await axios.delete(`/api/user/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setCartItems(res.data.items || [])
    } catch (err) {
      console.error("Remove from cart error:", err)
      toast.error("Failed to remove item.")
    } finally {
      setLoading(false)
    }
  }

  // Update Quantity
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return

    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) return

      const res = await axios.put(
        `/api/user/cart/${productId}`,
        { quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      setCartItems(res.data.items || [])
    } catch (err) {
      console.error("Update quantity error:", err)
      toast.error("Failed to update quantity.")
    } finally {
      setLoading(false)
    }
  }

  // Clear All Items
  const clearCart = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) return

      await axios.delete("/api/user/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setCartItems([])
      toast.success("Cart cleared successfully")
    } catch (err) {
      console.error("Clear cart error:", err)
      toast.error("Failed to clear cart.")
    } finally {
      setLoading(false)
    }
  }

  // Total Quantity Badge
  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  // Total Price
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * (item.productId?.price || 0), 0)
  }

  // Check if product is in cart
  const isInCart = (productId) => {
    return cartItems.some((item) => item.productId._id === productId)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItemsCount,
        getCartTotal,
        isInCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
