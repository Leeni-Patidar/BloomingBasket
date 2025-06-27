"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"

const OrderDetail = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
  }, [id])

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`/api/orders/${id}`)
      setOrder(response.data)
    } catch (error) {
      console.error("Error fetching order:", error)
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

  const getStatusSteps = (currentStatus) => {
    const steps = ["pending", "confirmed", "processing", "shipped", "delivered"]
    const currentIndex = steps.indexOf(currentStatus)

    return steps.map((step, index) => ({
      name: step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }))
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

  if (!order) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Order Not Found</h2>
          <Link to="/my-orders" className="btn btn-success">
            Back to Orders
          </Link>
        </div>
      </div>
    )
  }

  const statusSteps = getStatusSteps(order.status)

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/my-orders">My Orders</Link>
          </li>
          <li className="breadcrumb-item active">Order #{order._id.slice(-8)}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-lg-8">
          {/* Order Status */}
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Order Status</h5>
              {getStatusBadge(order.status)}
            </div>
            <div className="card-body">
              <div className="row">
                {statusSteps.map((step, index) => (
                  <div key={step.name} className="col text-center">
                    <div
                      className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-2 ${
                        step.completed ? "bg-success text-white" : step.active ? "bg-warning" : "bg-light"
                      }`}
                      style={{ width: "40px", height: "40px" }}
                    >
                      {step.completed ? <i className="fas fa-check"></i> : index + 1}
                    </div>
                    <div className="small text-capitalize">{step.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Order Items</h5>
            </div>
            <div className="card-body">
              {order.items.map((item, index) => (
                <div key={index} className="row align-items-center py-3 border-bottom">
                  <div className="col-md-2">
                    <img
                      src={item.product?.image || "/placeholder.svg?height=80&width=80"}
                      alt={item.product?.name || "Product"}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-md-6">
                    <h6 className="mb-1">{item.product?.name || "Product"}</h6>
                    <p className="text-muted mb-0">{item.product?.description?.substring(0, 100)}...</p>
                  </div>
                  <div className="col-md-2 text-center">
                    <span className="fw-semibold">Qty: {item.quantity}</span>
                  </div>
                  <div className="col-md-2 text-end">
                    <span className="fw-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          {order.specialInstructions && (
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Special Instructions</h5>
              </div>
              <div className="card-body">
                <p className="mb-0">{order.specialInstructions}</p>
              </div>
            </div>
          )}
        </div>

        <div className="col-lg-4">
          {/* Order Summary */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Order #:</span>
                <span className="fw-semibold">{order._id.slice(-8)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Order Date:</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Payment Method:</span>
                <span className="text-capitalize">{order.paymentMethod.replace("_", " ")}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Payment Status:</span>
                <span className="text-capitalize">{order.paymentStatus}</span>
              </div>
              {order.deliveryDate && (
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Date:</span>
                  <span>{new Date(order.deliveryDate).toLocaleDateString()}</span>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between">
                <span className="fw-bold">Total:</span>
                <span className="fw-bold text-success">${order.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Shipping Address</h5>
            </div>
            <div className="card-body">
              <address className="mb-0">
                <strong>{order.shippingAddress.name}</strong>
                <br />
                {order.shippingAddress.street}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                <br />
                {order.shippingAddress.country}
                <br />
                <i className="fas fa-phone me-2"></i>
                {order.shippingAddress.phone}
              </address>
            </div>
          </div>

          {/* Actions */}
          <div className="d-grid gap-2">
            {order.status === "delivered" && <button className="btn btn-success">Reorder</button>}
            {order.status === "pending" && <button className="btn btn-outline-danger">Cancel Order</button>}
            <Link to="/my-orders" className="btn btn-outline-secondary">
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
