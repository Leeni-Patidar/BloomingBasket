"use client"

import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "./AuthContext"
import { toast } from "react-toastify"

export const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext)
  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch wishlist when user logs in/out
  useEffect(() => {
    if (user) {
      fetchWishlist()
    } else {
      setWishlistItems([])
    }
  }, [user])

  const fetchWishlist = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) return

      const res = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })

      // Backend returns { wishlist: [...] }
      setWishlistItems(res.data.wishlist || [])
    } catch (err) {
      console.error("Wishlist fetch error:", err)
      if (err.response?.status !== 401) {
        toast.error("Failed to fetch wishlist.")
      }
    } finally {
      setLoading(false)
    }
  }

  const addToWishlist = async (productId) => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) {
        toast.warn("Please login to add items to wishlist")
        return
      }

      const res = await axios.post(
        "/api/user/wishlist/add",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      // Update wishlist with returned data
      setWishlistItems(res.data.wishlist || [])
      toast.success("Added to wishlist")
    } catch (err) {
      console.error("Add to wishlist error:", err)
      if (err.response?.data?.message === "Already in wishlist") {
        toast.info("Item already in wishlist")
      } else {
        toast.error(err.response?.data?.message || "Failed to add to wishlist.")
      }
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = async (productId) => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) return

      const res = await axios.delete(`/api/user/wishlist/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      // Update wishlist with returned data
      setWishlistItems(res.data.wishlist || [])
      toast.success("Removed from wishlist")
    } catch (err) {
      console.error("Remove from wishlist error:", err)
      toast.error("Failed to remove from wishlist.")
      fetchWishlist()
    } finally {
      setLoading(false)
    }
  }

  const isInWishlist = (productId) => {
    return Array.isArray(wishlistItems) && wishlistItems.some((item) => item._id === productId)
  }

  const getWishlistCount = () => wishlistItems.length

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        loading,
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
