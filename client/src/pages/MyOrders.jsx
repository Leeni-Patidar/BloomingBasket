import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

const MyOrders = () => {
  const { token } = useContext(AuthContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) fetchUserOrders()
  }, [token])

  const fetchUserOrders = async () => {
    try {
      const res = await axios.get("/api/orders/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setOrders(res.data.orders || [])
    } catch (err) {
      console.error("Fetch orders error:", err)
      toast.error("Failed to load your orders")
    } finally {
      setLoading(false)
    }
  }

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.put(`/api/orders/${orderId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success("Order cancelled")
      fetchUserOrders()
    } catch (err) {
      console.error("Cancel order error:", err)
      toast.error(err.response?.data?.message || "Failed to cancel order")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold  mb-6 text-center">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center ">
            <p>You haven’t placed any orders yet.</p>
            <Link to="/shop" className="text-pink-500 font-semibold hover:underline">Shop Now</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white p-5 rounded-lg shadow">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h2 className="text-lg font-semibold ">Order #{order.orderNumber}</h2>
                    <p className=" text-sm">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
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

                <div className="flex justify-between items-center">
                  <p className=" font-semibold">Total: ₹{order.total.toFixed(2)}</p>
                  <div className="flex gap-3">
                    <Link
                      to={`/order-confirmation/${order._id}`}
                      className="text-sm button-bg px-4 py-2 rounded button-bg:hover transition"
                    >
                      View
                    </Link>
                    {["pending", "confirmed"].includes(order.status) && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="text-sm bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200 transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders
