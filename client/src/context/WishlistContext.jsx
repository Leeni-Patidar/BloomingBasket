"use client"

import { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { AuthContext } from "./AuthContext"

export const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      fetchWishlist()
    } else {
      setWishlistItems([])
    }
  }, [user])

  const fetchWishlist = async () => {
    try {
      const response = await axios.get("/api/users/wishlist")
      setWishlistItems(response.data)
    } catch (error) {
      console.error("Fetch wishlist error:", error)
    }
  }

  const addToWishlist = async (product) => {
    if (!user) {
      alert("Please login to add items to wishlist")
      return
    }

    try {
      await axios.post(`/api/users/wishlist/${product._id}`)
      setWishlistItems((prevItems) => [...prevItems, product])
      alert(`${product.name} added to wishlist!`)
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add to wishlist"
      alert(message)
    }
  }

  const removeFromWishlist = async (productId) => {
    if (!user) return

    try {
      await axios.delete(`/api/users/wishlist/${productId}`)
      setWishlistItems((prevItems) => {
        const item = prevItems.find((item) => item._id === productId)
        if (item) {
          alert(`${item.name} removed from wishlist`)
        }
        return prevItems.filter((item) => item._id !== productId)
      })
    } catch (error) {
      const message = error.response?.data?.message || "Failed to remove from wishlist"
      alert(message)
    }
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId)
  }

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}
