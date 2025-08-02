"use client"

import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    loading,
  } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleQuantityChange = async (productId, newQuantity) => {
    if (!user) {
      toast.warn("Please login to update cart")
      navigate("/login")
      return
    }
    if (newQuantity < 1) return
    await updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = async (item) => {
    if (!user) {
      toast.warn("Please login to update cart")
      navigate("/login")
      return
    }
    await removeFromCart(item.productId._id)
    toast.success(`${item.productId?.name} removed from cart`)
  }

  // ✅ Improved clear cart handler
  const handleClearCart = async () => {
    if (!user) {
      toast.warn("Please login to clear cart")
      navigate("/login")
      return
    }

    const confirmed = window.confirm("Are you sure you want to clear your entire cart?")
    if (!confirmed) return

    try {
      await clearCart()
      toast.success("Cart cleared successfully")
    } catch (err) {
      toast.error("Failed to clear cart")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
            <h2 className="text-3xl font-bold mb-2">Your cart is empty</h2>
            <p className="mb-6">Looks like you haven't added anything to your cart yet.</p>
            <div className="space-x-4">
              <Link
                to="/shop"
                className="inline-flex items-center px-6 py-3 button-bg button-bg:hover rounded-full transition-all duration-200 hover:shadow-lg transform hover:scale-105"
              >
                <i className="fas fa-shopping-bag mr-2"></i>
                Shop Products
              </Link>
              <Link
                to="/customize"
                className="inline-flex items-center px-6 py-3 button-bg button-bg:hover rounded-full transition-all duration-200 hover:shadow-lg transform hover:scale-105"
              >
                <i className="fas fa-palette mr-2"></i>
                Customize Bouquet
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const totalItems = getCartItemsCount()
  const totalAmount = getCartTotal()

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-lg">
            You have {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="hidden md:block bg-white px-6 py-4">
                <div className="grid grid-cols-12 gap-4 font-semibold">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={`cart-item-${item.productId?._id || item._id}`} className="p-6">
                    {/* Mobile Layout */}
                    <div className="md:hidden">
                      <div className="flex items-start space-x-4">
                        <img
                          src={item.productId?.image || "/placeholder.svg?height=80&width=80"}
                          alt={item.productId?.name || "Product"}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{item.productId?.name}</h3>
                          {item.productId?.isCustom && item.productId?.customization && (
                            <div className="text-xs mb-1">
                              <p>Custom: {item.productId.customization.bouquetType}</p>
                              <p>Size: {item.productId.customization.size}</p>
                            </div>
                          )}
                          <p className="font-bold text-lg mb-2">₹{item.productId?.price}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(item.productId._id, item.quantity - 1)
                                }
                                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
                                disabled={item.quantity <= 1 || loading}
                              >
                                <i className="fas fa-minus text-xs"></i>
                              </button>
                              <span className="w-12 text-center font-semibold">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(item.productId._id, item.quantity + 1)
                                }
                                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
                                disabled={loading}
                              >
                                <i className="fas fa-plus text-xs"></i>
                              </button>
                            </div>

                            <div className="text-right">
                              <p className="font-bold text-lg">
                                ₹{(item.productId?.price || 0) * item.quantity}
                              </p>
                              <button
                                onClick={() => handleRemoveItem(item)}
                                className="text-red-500 hover:text-red-700 transition mt-1"
                                disabled={loading}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:block">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6 flex items-center space-x-4">
                          <img
                            src={item.productId?.image || "/placeholder.svg?height=64&width=64"}
                            alt={item.productId?.name || "Product"}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="font-semibold">{item.productId?.name}</h3>
                            {item.productId?.isCustom && item.productId?.customization && (
                              <div className="text-xs">
                                <p>Custom: {item.productId.customization.bouquetType}</p>
                                <p>Size: {item.productId.customization.size}</p>
                              </div>
                            )}
                            <button
                              onClick={() => handleRemoveItem(item)}
                              className="text-red-500 hover:text-red-700 transition text-sm mt-1"
                              disabled={loading}
                            >
                              <i className="fas fa-trash mr-1"></i>
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="col-span-2 text-center">
                          <span className="font-semibold">₹{item.productId?.price}</span>
                        </div>

                        <div className="col-span-2 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.productId._id, item.quantity - 1)
                              }
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
                              disabled={item.quantity <= 1 || loading}
                            >
                              <i className="fas fa-minus text-xs"></i>
                            </button>
                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.productId._id, item.quantity + 1)
                              }
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
                              disabled={loading}
                            >
                              <i className="fas fa-plus text-xs"></i>
                            </button>
                          </div>
                        </div>

                        <div className="col-span-2 text-center">
                          <span className="font-bold text-lg">
                            ₹{(item.productId?.price || 0) * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clear Cart Button */}
            <div className="mt-4">
              <button
                onClick={handleClearCart}
                className="px-6 py-2 button-bg button-bg:hover rounded-full transition"
                disabled={loading}
              >
                <i className="fas fa-trash mr-2"></i>
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Items ({totalItems})</span>
                  <span className="font-semibold">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-pink-600">₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to="/checkout"
                  className="w-full block text-center py-3 button-bg button-bg:hover rounded-full transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                >
                  <i className="fas fa-credit-card mr-2"></i>
                  Proceed to Checkout
                </Link>

                <Link
                  to="/shop"
                  className="w-full block text-center py-3 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
