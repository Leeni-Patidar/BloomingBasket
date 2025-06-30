"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import styles from "./MyOrders.module.css"

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
      toast.error("Failed to load orders")
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
      toast.success("Order cancelled successfully")
      fetchOrders()
    } catch (error) {
      const message = error.response?.data?.message || "Failed to cancel order"
      toast.error(message)
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
      <div className={styles.loading}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.myOrders}>
      <div className="container">
        <div className={styles.header}>
          <h1>My Orders</h1>
          <p>Track and manage your flower orders</p>
        </div>

        {orders.length === 0 ? (
          <div className={styles.emptyOrders}>
            <i className="fas fa-box-open fa-5x mb-4 text-muted"></i>
            <h3>No orders found</h3>
            <p className="text-muted mb-4">You haven't placed any orders yet.</p>
            <Link to="/shop" className="btn btn-primary btn-lg">
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.ordersList}>
              {orders.map((order) => (
                <div key={order._id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <div className={styles.orderInfo}>
                      <h5>Order #{order.orderNumber}</h5>
                      <p className={styles.orderDate}>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className={styles.orderStatus}>
                      <span
                        className={styles.statusBadge}
                        style={{ backgroundColor: getStatusColor(order.orderStatus) }}
                      >
                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className={styles.orderItems}>
                    {order.items.map((item, index) => (
                      <div key={index} className={styles.orderItem}>
                        <img
                          src={item.product?.images?.[0] || "/placeholder.svg?height=80&width=80"}
                          alt={item.product?.name}
                          className={styles.itemImage}
                        />
                        <div className={styles.itemDetails}>
                          <h6>{item.product?.name}</h6>
                          <p>Quantity: {item.quantity}</p>
                          <p className={styles.itemPrice}>${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.orderFooter}>
                    <div className={styles.orderTotal}>
                      <strong>Total: ${order.pricing.total.toFixed(2)}</strong>
                    </div>
                    <div className={styles.orderActions}>
                      <Link to={`/order/${order._id}`} className={styles.viewBtn}>
                        View Details
                      </Link>
                      {["pending", "confirmed"].includes(order.orderStatus) && (
                        <button className={styles.cancelBtn} onClick={() => handleCancelOrder(order._id)}>
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>

                  {order.trackingNumber && (
                    <div className={styles.trackingInfo}>
                      <i className="fas fa-truck me-2"></i>
                      Tracking Number: <strong>{order.trackingNumber}</strong>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <nav className={styles.pagination}>
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${pagination.currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(pagination.totalPages)].map((_, index) => (
                    <li key={index + 1} className={`page-item ${pagination.currentPage === index + 1 ? "active" : ""}`}>
                      <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${pagination.currentPage === pagination.totalPages ? "disabled" : ""}`}>
                    <button
                      className="page-link"
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
