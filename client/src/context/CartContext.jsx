"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "react-toastify"

// Create and export the CartContext
export const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(false)

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    const savedWishlist = localStorage.getItem("wishlistItems")

    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }

    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist))
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToCart = (product, quantity = 1, customization = null) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item._id === product._id && JSON.stringify(item.customization) === JSON.stringify(customization),
      )

      if (existingItemIndex > -1) {
        // Update quantity if item already exists
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        // Add new item
        return [
          ...prevItems,
          {
            ...product,
            quantity,
            customization,
            cartId: Date.now() + Math.random(), // Unique ID for cart item
          },
        ]
      }
    })
    toast.success(`${product.name} added to cart!`)
  }

  const removeFromCart = (cartId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.cartId !== cartId))
    toast.info("Item removed from cart")
  }

  const updateCartItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) => prevItems.map((item) => (item._id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCartItems([])
    toast.info("Cart cleared")
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.customization?.totalPrice || item.price
      return total + price * item.quantity
    }, 0)
  }

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id)

      if (existingItem) {
        toast.info("Item already in wishlist")
        return prevItems
      } else {
        toast.success(`${product.name} added to wishlist!`)
        return [...prevItems, product]
      }
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item._id !== productId))
    toast.info("Item removed from wishlist")
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId)
  }

  const moveToCart = (product) => {
    addToCart(product)
    removeFromWishlist(product._id)
  }

  const isInCart = (productId, customization = null) => {
    return cartItems.some(
      (item) => item._id === productId && JSON.stringify(item.customization) === JSON.stringify(customization),
    )
  }

  const value = {
    cartItems,
    wishlistItems,
    loading,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    moveToCart,
    isInCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
