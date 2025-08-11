"use client"
import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "./AuthContext"
import { toast } from "react-toastify"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const { user, token, loading: authLoading } = useContext(AuthContext)
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [addingProductId, setAddingProductId] = useState(null);

  useEffect(() => {
    if (user && token && !authLoading) {
      fetchCart()
    } else if (!user && !token && !authLoading) {
      setCartItems([])
    }
  }, [user, token])

  const fetchCart = async () => {
    if (!token) return
    try {
      setLoading(true)
      const res = await axios.get("/api/user/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setCartItems(res.data.items || [])
    } catch (err) {
      console.error("Cart fetch error:", err.response?.data || err.message)
      // Only show error toast if not a "no cart" case
      if (err.response?.status !== 404) {
        toast.error(err.response?.data?.message || "Failed to fetch cart.")
      }
      setCartItems([]) // Ensure frontend doesn't break
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    if (!token) {
      toast.warn("Please login to add items to cart")
      return
    }
    try {
      setAddingProductId(productId);
      setLoading(true)
      const res = await axios.post(
        "/api/user/cart",
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setCartItems(res.data.items || [])
      toast.success("Added to cart!")
    } catch (err) {
      console.error("Add to cart error:", err)
 toast.error(err.response?.data?.message || "Failed to add item.");
 setAddingProductId(null); // Ensure state is reset on error
      throw err
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (productId) => {
    if (!token) return
    try {
      setLoading(true)
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

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return
    if (!token) return
    try {
      setLoading(true)
      const res = await axios.put(
        `/api/user/cart/${productId}`,
        { quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setCartItems(res.data.items || [])
    } catch (err) {
      console.error("Update quantity error:", err)
      toast.error("Failed to update quantity.")
    } finally {
      setLoading(false)
    }
  }

  // ✅ Fixed clearCart to sync backend + frontend
  const clearCart = async () => {
    try {
      if (!token) {
        toast.error("You must be logged in to clear your cart")
        return
      }

      await axios.delete("/api/user/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })

      setCartItems([]) // ✅ frontend update
      toast.success("Cart cleared")
    } catch (err) {
      console.error("Clear cart error:", err)
      toast.error(err.response?.data?.message || "Failed to clear cart")
    }
  }

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * (item.productId?.price || 0),
      0
    )
  }

  const isInCart = (productId) => {
    if (!productId) return false
    if (!cartItems || cartItems.length === 0) return false

    return cartItems.some((item) => {
      const itemProductId = item.productId?._id || item.productId
      return itemProductId === productId
    })
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        addingProductId,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItemsCount,
        getCartTotal,
        isInCart,
        fetchCart,
        setCartItems
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
