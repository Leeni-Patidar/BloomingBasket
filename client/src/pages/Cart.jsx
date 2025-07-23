"use client"

import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"
import { toast } from "react-toastify"
// import styles from "./Cart.module.css"

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderData, setOrderData] = useState({
    shippingAddress: {
      name: user?.name || "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "USA",
      phone: "",
    },
    paymentInfo: {
      method: "credit_card",
    },
    deliveryDate: "",
    specialInstructions: "",
  })

  const subtotal = getCartTotal()
  const tax = subtotal * 0.08
  const shipping = subtotal > 50 ? 0 : 10
  const total = subtotal + tax + shipping

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setOrderData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setOrderData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleCheckout = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          customization: item.customization || {},
        })),
        ...orderData,
      }

      const response = await axios.post("/api/orders", orderPayload)
      toast.success("Order placed successfully!")
      clearCart()
      navigate(`/order/${response.data.order._id}`)
    } catch (error) {
      const message = error.response?.data?.message || "Failed to place order"
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center py-8 bg-gradient-to-br from-[#FDF2F8] to-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full md:w-1/2 text-center">
              <i className="fas fa-shopping-cart fa-5x mb-4 text-gray-400"></i>
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-4">Looks like you haven't added any flowers to your cart yet.</p>
              <button
                className="inline-block bg-gradient-to-br from-[#ba54a9] to-[#fecfef] text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 bg-gradient-to-br from-[#FDF2F8] to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <h1 className="text-3xl md:text-[2.5rem] font-bold mb-8 text-gray-800">Shopping Cart</h1>
          </div>
        </div>

        {!showCheckout ? (
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-2/3 px-4">
              <div className="flex flex-col gap-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={item.images?.[0] || "/placeholder.svg?height=100&width=100"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h5 className="text-gray-800 font-semibold">{item.name}</h5>
                      <p className="text-gray-600 font-medium">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="w-8 h-8 border-none bg-gray-200 rounded-md font-bold cursor-pointer hover:bg-gray-300"
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="min-w-[24px] text-center font-semibold">{item.quantity}</span>
                      <button
                        className="w-8 h-8 border-none bg-gray-200 rounded-md font-bold cursor-pointer hover:bg-gray-300"
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="w-20 text-right font-bold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      className="bg-transparent border-none text-red-600 text-xl hover:text-red-700"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/3 px-4 mt-8 lg:mt-0">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-gray-800 font-semibold mb-4">Order Summary</h4>
                <div className="flex justify-between mb-3">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <strong>Total:</strong>
                  <strong>${total.toFixed(2)}</strong>
                </div>
                <button
                  className="w-full bg-gradient-to-br from-[#da81a4] to-[#fecfef] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg mt-6"
                  onClick={() => setShowCheckout(true)}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-2/3 px-4">
              <form onSubmit={handleCheckout} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-8">
                  <h4 className="text-gray-800 font-semibold mb-4">Shipping Information</h4>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ba54a9] focus:ring-4 focus:ring-[#ff9a9e]/25"
                        name="shippingAddress.name"
                        value={orderData.shippingAddress.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-1">Phone</label>
                      <input
                        type="tel"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ba54a9] focus:ring-4 focus:ring-[#ff9a9e]/25"
                        name="shippingAddress.phone"
                        value={orderData.shippingAddress.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="w-full px-2 mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-1">Street Address</label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ba54a9] focus:ring-4 focus:ring-[#ff9a9e]/25"
                        name="shippingAddress.street"
                        value={orderData.shippingAddress.street}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-2 mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-1">City</label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ba54a9] focus:ring-4 focus:ring-[#ff9a9e]/25"
                        name="shippingAddress.city"
                        value={orderData.shippingAddress.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-2 mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-1">State</label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ba54a9] focus:ring-4 focus:ring-[#ff9a9e]/25"
                        name="shippingAddress.state"
                        value={orderData.shippingAddress.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-2 mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-1">Zip Code</label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ba54a9] focus:ring-4 focus:ring-[#ff9a9e]/25"
                        name="shippingAddress.zipCode"
                        value={orderData.shippingAddress.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-gray-800 font-semibold mb-4">Delivery Information</h4>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-1">Preferred Delivery Date</label>
                      <input
                        type="date"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ba54a9] focus:ring-4 focus:ring-[#ff9a9e]/25"
                        name="deliveryDate"
                        value={orderData.deliveryDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                    <div className="w-full px-2 mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-1">Special Instructions</label>
                      <textarea
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-base transition-all duration-300 ease-in-out focus:border-[#ba54a9] focus:ring-4 focus:ring-[#ff9a9e]/25"
                        name="specialInstructions"
                        value={orderData.specialInstructions}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Any special delivery instructions..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-gray-800 font-semibold mb-4">Payment Method</h4>
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <input
                        className="form-radio h-4 w-4 text-[#ba54a9] transition-colors duration-300 ease-in-out focus:ring-[#ff9a9e]"
                        type="radio"
                        name="paymentInfo.method"
                        value="credit_card"
                        checked={orderData.paymentInfo.method === "credit_card"}
                        onChange={handleInputChange}
                      />
                      <label className="ml-2 text-gray-700">Credit Card</label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        className="form-radio h-4 w-4 text-[#ba54a9] transition-colors duration-300 ease-in-out focus:ring-[#ff9a9e]"
                        type="radio"
                        name="paymentInfo.method"
                        value="paypal"
                        checked={orderData.paymentInfo.method === "paypal"}
                        onChange={handleInputChange}
                      />
                      <label className="ml-2 text-gray-700">PayPal</label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        className="form-radio h-4 w-4 text-[#ba54a9] transition-colors duration-300 ease-in-out focus:ring-[#ff9a9e]"
                        type="radio"
                        name="paymentInfo.method"
                        value="cash_on_delivery"
                        checked={orderData.paymentInfo.method === "cash_on_delivery"}
                        onChange={handleInputChange}
                      />
                      <label className="ml-2 text-gray-700">Cash on Delivery</label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-300 hover:-translate-y-0.5"
                    onClick={() => setShowCheckout(false)}
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-br from-[#da81a4] to-[#fecfef] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:transform-none"
                    disabled={loading}
                  >
                    {loading ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              </form>
            </div>

            <div className="w-full lg:w-1/3 px-4 mt-8 lg:mt-0">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-gray-800 font-semibold mb-4">Order Summary</h4>
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between mb-2">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <hr className="my-4" />
                <div className="flex justify-between mb-3">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <strong>Total:</strong>
                  <strong>${total.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
