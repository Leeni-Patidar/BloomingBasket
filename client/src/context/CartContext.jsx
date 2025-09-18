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

  // Fetch cart
  const fetchCart = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) return

      const res = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })

      setCartItems(res.data.items || [])
    } catch (err) {
      console.error("Cart fetch error:", err)
      if (err.response?.status !== 401 && err.response?.status !== 500)
        toast.error("Failed to fetch cart.")
    } finally {
      setLoading(false)
    }
  }

  // Fetch cart on login
  useEffect(() => {
    if (user) fetchCart()
    else setCartItems([])
  }, [user])

  // Add item
  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) return toast.warn("Please login to add items")

      await axios.post(
        "/api/user/cart",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      await fetchCart()
      toast.success("Added to cart!")
    } catch (err) {
      console.error("Add to cart error:", err)
      toast.error(err.response?.data?.message || "Failed to add item.")
    } finally {
      setLoading(false)
    }
  }

  // Update quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity < 1) return
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) return

      await axios.put(
        `/api/user/cart/${productId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      await fetchCart()
    } catch (err) {
      console.error("Update cart error:", err)
      toast.error("Failed to update quantity.")
    } finally {
      setLoading(false)
    }
  }

  // Remove item
  const removeFromCart = async (productId) => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) return

      await axios.delete(`/api/user/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      await fetchCart()
      toast.success("Removed from cart")
    } catch (err) {
      console.error("Remove cart error:", err)
      toast.error("Failed to remove item.")
    } finally {
      setLoading(false)
    }
  }

  // Clear cart
  const clearCart = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) return toast.error("You must be logged in")

      await axios.delete("/api/user/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })

      await fetchCart()
      toast.success("Cart cleared")
    } catch (err) {
      console.error("Clear cart error:", err)
      toast.error(err.response?.data?.message || "Failed to clear cart")
    } finally {
      setLoading(false)
    }
  }

  // Helpers
  const isInCart = (productId) =>
    cartItems.some((item) => (item.productId?._id || item.productId) === productId)

  const getCartItemsCount = () =>
    cartItems.reduce((total, item) => total + (item.quantity || 0), 0)

  const getCartTotal = () =>
    cartItems.reduce(
      (total, item) => total + (item.productId?.price || 0) * (item.quantity || 0),
      0
    )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isInCart,
        getCartItemsCount,
        getCartTotal, // ✅ included here
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
