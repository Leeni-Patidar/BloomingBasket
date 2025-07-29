import { useEffect, useState, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"

const OrderDetail = () => {
  const { token } = useContext(AuthContext)
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId && token) fetchOrder()
  }, [orderId, token])

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setOrder(res.data.order)
    } catch (err) {
      console.error("Order fetch error:", err)
      toast.error("Failed to fetch order")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-500" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex justify-center items-center ">
        <p>Order not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <div className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold  mb-2">Order #{order.orderNumber}</h1>
          <p className="">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
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

        <div className="mb-6">
          <h2 className="text-lg font-semibold  mb-2">Items</h2>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-4 border p-3 rounded">
                <div className="flex items-center gap-3">
                  <img
                    src={item.productId?.images?.[0] || "/placeholder.svg"}
                    alt={item.productId?.name || "Product"}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium ">{item.productId?.name || "Product"}</p>
                    <p className="text-sm ">Qty: {item.quantity}</p>
                    <p className="text-sm ">Price: ₹{item.price}</p>
                  </div>
                </div>
                <p className="font-semibold ">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold  mb-2">Shipping Address</h2>
          <div className="border p-3 rounded ">
            <p className="font-semibold">{order.shippingAddress.fullName}</p>
            <p>
              {order.shippingAddress.addressLine1}
              {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}
            </p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </p>
            <p>Phone: {order.shippingAddress.phone}</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold  mb-2">Payment Summary</h2>
          <div className="border p-3 rounded  space-y-1">
            <p>Payment Method: <span className="font-medium">{order.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}</span></p>
            <p>Subtotal: ₹{order.subtotal.toFixed(2)}</p>
            <p>Delivery Fee: ₹{order.deliveryFee.toFixed(2)}</p>
            <p>Tax: ₹{order.tax.toFixed(2)}</p>
            <hr />
            <p className="font-semibold text-lg text-pink-600">Total: ₹{order.total.toFixed(2)}</p>
          </div>
        </div>

        {order.orderNotes && (
          <div className="mt-4">
            <h3 className="font-semibold  mb-1">Order Notes</h3>
            <p className="">{order.orderNotes}</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/my-orders"
            className="inline-block bg-pink-500 text-white px-6 py-3 rounded hover:bg-pink-600 transition"
          >
            Back to My Orders
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
