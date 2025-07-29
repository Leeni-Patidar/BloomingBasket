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
    if (orderId && token) {
      fetchOrderDetails()
    }
  }, [orderId, token])

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setOrder(response.data.order)
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
          <h1 className="text-2xl font-bold  mb-4">Order Not Found</h1>
          <Link to="/shop" className="text-pink-500 hover:text-pink-600">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
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
            <h1 className="text-3xl font-bold  mb-2">Order Confirmed!</h1>
            <p className="">Thank you for your order. We'll send you updates via email.</p>
          </div>

          {/* Order Info */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold ">Order #{order.orderNumber}</h2>
                  <p className="">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "confirmed"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "shipped"
                      ? "bg-purple-100 text-purple-800"
                      : order.status === "delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="mb-6">
              <h3 className="font-semibold  mb-3">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                    <img
                      src={item.productSnapshot?.images?.[0] || "/placeholder.svg"}
                      alt={item.productSnapshot?.name || "Product"}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium ">{item.productSnapshot?.name || "Product"}</h4>
                      <p className=" text-sm">Quantity: {item.quantity}</p>
                      <p className=" text-sm">Price: ₹{item.price}</p>
                    </div>
                    <span className="font-semibold ">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="mb-6">
              <h3 className="font-semibold  mb-3">Delivery Address</h3>
              <div className="p-3 border border-gray-200 rounded-lg">
                <p className="font-medium ">{order.shippingAddress.fullName}</p>
                <p className="">
                  {order.shippingAddress.addressLine1}
                  {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}
                </p>
                <p className="">
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
                <p className="">Phone: {order.shippingAddress.phone}</p>
              </div>
            </div>

            {/* Payment */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span className="">Payment Method:</span>
                <span className="font-medium ">
                  {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="">Subtotal:</span>
                <span className="">₹{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="">Delivery Fee:</span>
                <span className="">
                  {order.deliveryFee === 0 ? "FREE" : `₹${order.deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="">Tax:</span>
                <span className="">₹{order.tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-lg">
                <span className="">Total:</span>
                <span className="text-pink-600">₹{order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Notes */}
            {order.orderNotes && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-semibold  mb-2">Order Notes:</h3>
                <p className="">{order.orderNotes}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Link
              to="/my-orders"
              className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
            >
              View All Orders
            </Link>
            <Link
              to="/"
              className="bg-gray-200  px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
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
