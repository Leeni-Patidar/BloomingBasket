

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
// import styles from "./MyOrders.module.css"

const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  })

  useEffect(() => {
    fetchOrders()
  }, [pagination.currentPage])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`/api/orders/my-orders?page=${pagination.currentPage}`)
      setOrders(response.data.orders)
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        total: response.data.total,
      })
    } catch (error) {
      console.error("Error fetching orders:", error)
      alert("Failed to load orders")
    } finally {
      setLoading(false)
    }
  }

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return
    }

    try {
      await axios.put(`/api/orders/${orderId}/cancel`)
      alert("Order cancelled successfully")
      fetchOrders()
    } catch (error) {
      const message = error.response?.data?.message || "Failed to cancel order"
      alert(message)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#ffc107"
      case "confirmed":
        return "#17a2b8"
      case "processing":
        return "#fd7e14"
      case "shipped":
        return "#6f42c1"
      case "delivered":
        return "#28a745"
      case "cancelled":
        return "#dc3545"
      default:
        return "#6c757d"
    }
  }

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className=" ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12  button-bg rounded-2xl ">
          <h1 className="text-3xl md:text-[2rem] font-bold mb-4 ">My Orders</h1>
          <p className="text-[1.1rem] ">Track and manage your flower orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <i className="fas fa-box-open fa-5x mb-4 text-gray-400"></i>
            <h3 className="text-2xl font-semibold mb-2">No orders found</h3>
            <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
            <Link
              to="/shop"
              className="inline-block bg-gradient-to-br from-[#ba54a9] to-[#fecfef]  px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 button-bg:hover hover:shadow-lg"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl p-8 shadow-md transition-all duration-300 ease-in-out button-bg:hover hover:shadow-lg"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-gray-200 gap-4">
                    <div className="flex flex-col">
                      <h5 className="text-gray-800 mb-2 font-semibold">Order #{order.orderNumber}</h5>
                      <p className="text-gray-600 m-0 text-sm">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span
                        className="px-4 py-2 rounded-full  text-xs font-semibold uppercase"
                        style={{ backgroundColor: getStatusColor(order.orderStatus) }}
                      >
                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mb-6">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-gray-50 rounded-lg text-center sm:text-left"
                      >
                        <img
                          src={item.product?.images?.[0] || "/placeholder.svg?height=80&width=80"}
                          alt={item.product?.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h6 className="text-gray-800 mb-1 font-semibold">{item.product?.name}</h6>
                          <p className="text-gray-600 m-0 text-sm">Quantity: {item.quantity}</p>
                          <p className="text-red-500 font-semibold">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-4 border-t border-gray-200 gap-4">
                    <div className="text-lg text-gray-800 font-bold">Total: ${order.pricing.total.toFixed(2)}</div>
                    <div className="flex gap-4 w-full md:w-auto justify-between">
                      <Link
                        to={`/order/${order._id}`}
                        className="button-bg  px-4 py-2 rounded-lg no-underline font-semibold transition-all duration-300 ease-in-out button-bg:hover hover:shadow-lg hover:"
                      >
                        View Details
                      </Link>
                      {["pending", "confirmed"].includes(order.orderStatus) && (
                        <button
                          className="bg-red-600  border-none px-4 py-2 rounded-lg font-semibold transition-all duration-300 ease-in-out hover:bg-red-700 button-bg:hover"
                          onClick={() => handleCancelOrder(order._id)}
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>

                  {order.trackingNumber && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg text-blue-800 text-sm">
                      <i className="fas fa-truck mr-2"></i>
                      Tracking Number: <strong>{order.trackingNumber}</strong>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <nav className="mt-12">
                <ul className="flex justify-center space-x-1">
                  <li className={`page-item ${pagination.currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}>
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100"
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(pagination.totalPages)].map((_, index) => (
                    <li
                      key={index + 1}
                      className={`page-item ${pagination.currentPage === index + 1 ? "bg-blue-600  rounded-md" : ""}`}
                    >
                      <button
                        className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100"
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${pagination.currentPage === pagination.totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100"
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MyOrders
