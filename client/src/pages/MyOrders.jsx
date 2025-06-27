"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

const MyOrders = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/orders/my-orders")
      setOrders(response.data)
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-warning",
      confirmed: "bg-info",
      processing: "bg-primary",
      shipped: "bg-secondary",
      delivered: "bg-success",
      cancelled: "bg-danger",
    }

    return <span className={`badge ${statusClasses[status] || "bg-secondary"}`}>{status.toUpperCase()}</span>
  }

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <i className="fas fa-shopping-bag fa-4x text-muted mb-4"></i>
          <h2>No orders yet</h2>
          <p className="text-muted mb-4">You haven't placed any orders yet</p>
          <Link to="/shop" className="btn btn-success">
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Orders</h2>

      <div className="row">
        {orders.map((order) => (
          <div key={order._id} className="col-12 mb-4">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Order #{order._id.slice(-8)}</h6>
                  <small className="text-muted">Placed on {new Date(order.createdAt).toLocaleDateString()}</small>
                </div>
                <div className="text-end">
                  {getStatusBadge(order.status)}
                  <div className="mt-1">
                    <strong>${order.totalAmount}</strong>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-md-8">
                    <h6>Items ({order.items.length})</h6>
                    {order.items.slice(0, 3).map((item, index) => (
                      <div key={index} className="d-flex align-items-center mb-2">
                        <img
                          src={item.product?.image || "/placeholder.svg?height=50&width=50"}
                          alt={item.product?.name || "Product"}
                          className="rounded me-3"
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                        <div>
                          <div className="fw-semibold">{item.product?.name || "Product"}</div>
                          <small className="text-muted">
                            Qty: {item.quantity} × ${item.price}
                          </small>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <small className="text-muted">and {order.items.length - 3} more items...</small>
                    )}
                  </div>

                  <div className="col-md-4">
                    <h6>Delivery Address</h6>
                    <address className="small">
                      {order.shippingAddress.name}
                      <br />
                      {order.shippingAddress.street}
                      <br />
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </address>

                    {order.deliveryDate && (
                      <div>
                        <strong>Delivery Date:</strong>
                        <br />
                        <small>{new Date(order.deliveryDate).toLocaleDateString()}</small>
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    <small className="text-muted">Payment: {order.paymentMethod.replace("_", " ").toUpperCase()}</small>
                    <br />
                    <small className="text-muted">Status: {order.paymentStatus.toUpperCase()}</small>
                  </div>
                  <div>
                    <Link to={`/order/${order._id}`} className="btn btn-outline-success btn-sm me-2">
                      View Details
                    </Link>
                    {order.status === "delivered" && <button className="btn btn-success btn-sm">Reorder</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Link to="/shop" className="btn btn-success">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default MyOrders
