"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const OrderManagement = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [statusFilter, setStatusFilter] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const orderStatuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"]

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/orders")
      setOrders(response.data)
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast.error("Failed to fetch orders")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status: newStatus })
      toast.success("Order status updated successfully!")
      fetchOrders()
    } catch (error) {
      toast.error("Failed to update order status")
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

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = !statusFilter || order.status === statusFilter
    const matchesSearch =
      !searchTerm ||
      order._id.includes(searchTerm) ||
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesSearch
  })

  const getOrderStats = () => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      processing: orders.filter((o) => o.status === "processing").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      revenue: orders
        .filter((o) => o.status === "delivered")
        .reduce((sum, order) => sum + order.totalAmount, 0)
        .toFixed(2),
    }
  }

  const stats = getOrderStats()

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Order Management</h2>
          <p className="text-muted">Track and manage customer orders</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h3>{stats.total}</h3>
              <p className="mb-0">Total Orders</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h3>{stats.pending}</h3>
              <p className="mb-0">Pending Orders</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h3>{stats.processing}</h3>
              <p className="mb-0">Processing</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3>${stats.revenue}</h3>
              <p className="mb-0">Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by order ID, customer name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            {orderStatuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 text-end">
          <span className="text-muted">
            Showing {filteredOrders.length} of {orders.length} orders
          </span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <span className="fw-bold">#{order._id.slice(-8)}</span>
                      </td>
                      <td>
                        <div>
                          <div className="fw-semibold">{order.user?.name || "Guest"}</div>
                          <small className="text-muted">{order.user?.email}</small>
                        </div>
                      </td>
                      <td>
                        <div>
                          <span className="fw-semibold">{order.items.length} items</span>
                          <br />
                          <small className="text-muted">
                            {order.items.slice(0, 2).map((item, index) => (
                              <span key={index}>
                                {item.product?.name || "Product"}
                                {index < 1 && order.items.length > 1 ? ", " : ""}
                              </span>
                            ))}
                            {order.items.length > 2 && "..."}
                          </small>
                        </div>
                      </td>
                      <td>
                        <span className="fw-bold">${order.totalAmount}</span>
                      </td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>
                        <div>
                          <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                          <small className="text-muted">{new Date(order.createdAt).toLocaleTimeString()}</small>
                        </div>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => {
                              setSelectedOrder(order)
                              setShowOrderModal(true)
                            }}
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                            >
                              Status
                            </button>
                            <ul className="dropdown-menu">
                              {orderStatuses.map((status) => (
                                <li key={status}>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleStatusUpdate(order._id, status)}
                                  >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredOrders.length === 0 && (
                <div className="text-center py-5">
                  <i className="fas fa-shopping-bag fa-3x text-muted mb-3"></i>
                  <h5>No orders found</h5>
                  <p className="text-muted">No orders match your current filters</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {showOrderModal && selectedOrder && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order Details - #{selectedOrder._id.slice(-8)}</h5>
                <button type="button" className="btn-close" onClick={() => setShowOrderModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Customer Information</h6>
                    <p>
                      <strong>Name:</strong> {selectedOrder.user?.name || "Guest"}
                      <br />
                      <strong>Email:</strong> {selectedOrder.user?.email}
                      <br />
                      <strong>Phone:</strong> {selectedOrder.shippingAddress.phone}
                    </p>

                    <h6>Shipping Address</h6>
                    <address>
                      {selectedOrder.shippingAddress.name}
                      <br />
                      {selectedOrder.shippingAddress.street}
                      <br />
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{" "}
                      {selectedOrder.shippingAddress.zipCode}
                    </address>
                  </div>
                  <div className="col-md-6">
                    <h6>Order Information</h6>
                    <p>
                      <strong>Status:</strong> {getStatusBadge(selectedOrder.status)}
                      <br />
                      <strong>Payment:</strong> {selectedOrder.paymentMethod.replace("_", " ").toUpperCase()}
                      <br />
                      <strong>Total:</strong> ${selectedOrder.totalAmount}
                      <br />
                      <strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}
                    </p>

                    {selectedOrder.deliveryDate && (
                      <p>
                        <strong>Delivery Date:</strong> {new Date(selectedOrder.deliveryDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <h6>Order Items</h6>
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.product?.name || "Product"}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price}</td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {selectedOrder.specialInstructions && (
                  <div>
                    <h6>Special Instructions</h6>
                    <p className="text-muted">{selectedOrder.specialInstructions}</p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowOrderModal(false)}>
                  Close
                </button>
                <div className="dropdown">
                  <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    Update Status
                  </button>
                  <ul className="dropdown-menu">
                    {orderStatuses.map((status) => (
                      <li key={status}>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            handleStatusUpdate(selectedOrder._id, status)
                            setShowOrderModal(false)
                          }}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderManagement
