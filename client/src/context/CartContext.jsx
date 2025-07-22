"use client"

import { createContext, useState, useEffect } from "react"
import { toast } from "react-toastify"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, quantity = 1, customization = {}) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id)
      if (existingItem) {
        const updatedItems = prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item,
        )
        alert(`${product.name} quantity updated in cart!`)
        return updatedItems
      }
      alert(`${product.name} added to cart!`)
      return [...prevItems, { ...product, quantity, customization }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item._id === productId)
      if (item) {
        alert(`${item.name} removed from cart`)
      }
      return prevItems.filter((item) => item._id !== productId)
    })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((prevItems) => prevItems.map((item) => (item._id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCartItems([])
    alert("Cart cleared")
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
