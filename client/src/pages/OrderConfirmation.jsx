"use client"
import { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"
import axios from "axios"

const OrderConfirmation = () => {
  const { orderId } = useParams()
  const { token } = useContext(AuthContext)
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId && token) fetchOrderDetails()
  }, [orderId, token])

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setOrder(response.data || null)
    } catch (error) {
      console.error("Fetch order error:", error)
      toast.error("Failed to load order details")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <Link to="/shop" className="text-pink-500 hover:text-pink-600">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  // Fallbacks
  const orderStatus = order.orderStatus || "pending"
  const orderNumber = order.orderNumber || order._id || "N/A"
  const orderItems = order.orderItems || []

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p>Thank you for your order. We'll send you updates via email.</p>
          </div>

          {/* Order Info */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">Order #{orderNumber}</h2>
                  <p>Placed on {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    orderStatus === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : orderStatus === "confirmed"
                      ? "bg-blue-100 text-blue-800"
                      : orderStatus === "shipped"
                      ? "bg-purple-100 text-purple-800"
                      : orderStatus === "delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Order Items</h3>
              <div className="space-y-3">
                {orderItems.length > 0 ? (
                  orderItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name || "Unnamed Product"}</h4>
                        <p className="text-sm">Quantity: {item.quantity || 1}</p>
                        <p className="text-sm">Price: ₹{item.price || 0}</p>
                      </div>
                      <span className="font-semibold">₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                    </div>
                  ))
                ) : (
                  <p>No items found in this order.</p>
                )}
              </div>
            </div>

            {/* Address */}
            {order.shippingAddress && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Delivery Address</h3>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <p className="font-medium">{order.shippingAddress.fullName || "N/A"}</p>
                  <p>{order.shippingAddress.street || ""}</p>
                  {order.shippingAddress.landmark && <p>{order.shippingAddress.landmark}</p>}
                  <p>
                    {order.shippingAddress.city || ""}, {order.shippingAddress.state || ""} -{" "}
                    {order.shippingAddress.zipCode || ""}
                  </p>
                  <p>Phone: {order.shippingAddress.phone || "N/A"}</p>
                </div>
              </div>
            )}

            {/* Payment */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span>Payment Method:</span>
                <span className="font-medium">
                  {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span className="text-pink-600">₹{(order.total || 0).toFixed(2)}</span>
              </div>
            </div>

            {/* Notes */}
            {order.orderNotes && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-semibold mb-2">Order Notes:</h3>
                <p>{order.orderNotes}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Link
              to="/my-orders"
              className="button-bg button-bg:hover px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Orders
            </Link>
            <Link
              to="/"
              className="bg-gray-200 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Done
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation
