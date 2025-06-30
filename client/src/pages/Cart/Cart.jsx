"use client"

import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { toast } from "react-toastify"
import styles from "./Cart.module.css"

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
      <div className={styles.emptyCart}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <i className="fas fa-shopping-cart fa-5x mb-4 text-muted"></i>
              <h2>Your cart is empty</h2>
              <p className="text-muted mb-4">Looks like you haven't added any flowers to your cart yet.</p>
              <button className="btn btn-primary btn-lg" onClick={() => navigate("/shop")}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.cart}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className={styles.pageTitle}>Shopping Cart</h1>
          </div>
        </div>

        {!showCheckout ? (
          <div className="row">
            <div className="col-lg-8">
              <div className={styles.cartItems}>
                {cartItems.map((item) => (
                  <div key={item._id} className={styles.cartItem}>
                    <div className={styles.itemImage}>
                      <img src={item.images?.[0] || "/placeholder.svg?height=100&width=100"} alt={item.name} />
                    </div>
                    <div className={styles.itemDetails}>
                      <h5>{item.name}</h5>
                      <p className={styles.itemPrice}>${item.price}</p>
                    </div>
                    <div className={styles.quantityControls}>
                      <button
                        className={styles.quantityBtn}
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button
                        className={styles.quantityBtn}
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</div>
                    <button className={styles.removeBtn} onClick={() => removeFromCart(item._id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <div className={styles.orderSummary}>
                <h4>Order Summary</h4>
                <div className={styles.summaryRow}>
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <hr />
                <div className={styles.summaryRow}>
                  <strong>Total: ${total.toFixed(2)}</strong>
                </div>
                <button className={styles.checkoutBtn} onClick={() => setShowCheckout(true)}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              <form onSubmit={handleCheckout}>
                <div className={styles.checkoutSection}>
                  <h4>Shipping Information</h4>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="shippingAddress.name"
                        value={orderData.shippingAddress.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="shippingAddress.phone"
                        value={orderData.shippingAddress.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">Street Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="shippingAddress.street"
                        value={orderData.shippingAddress.street}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="shippingAddress.city"
                        value={orderData.shippingAddress.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="shippingAddress.state"
                        value={orderData.shippingAddress.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Zip Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="shippingAddress.zipCode"
                        value={orderData.shippingAddress.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.checkoutSection}>
                  <h4>Delivery Information</h4>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Preferred Delivery Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="deliveryDate"
                        value={orderData.deliveryDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">Special Instructions</label>
                      <textarea
                        className="form-control"
                        name="specialInstructions"
                        value={orderData.specialInstructions}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Any special delivery instructions..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className={styles.checkoutSection}>
                  <h4>Payment Method</h4>
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentInfo.method"
                        value="credit_card"
                        checked={orderData.paymentInfo.method === "credit_card"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Credit Card</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentInfo.method"
                        value="paypal"
                        checked={orderData.paymentInfo.method === "paypal"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">PayPal</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentInfo.method"
                        value="cash_on_delivery"
                        checked={orderData.paymentInfo.method === "cash_on_delivery"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Cash on Delivery</label>
                    </div>
                  </div>
                </div>

                <div className={styles.checkoutActions}>
                  <button type="button" className="btn btn-secondary me-3" onClick={() => setShowCheckout(false)}>
                    Back to Cart
                  </button>
                  <button type="submit" className={styles.placeOrderBtn} disabled={loading}>
                    {loading ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              </form>
            </div>

            <div className="col-lg-4">
              <div className={styles.orderSummary}>
                <h4>Order Summary</h4>
                {cartItems.map((item) => (
                  <div key={item._id} className={styles.summaryItem}>
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <hr />
                <div className={styles.summaryRow}>
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <hr />
                <div className={styles.summaryRow}>
                  <strong>Total: ${total.toFixed(2)}</strong>
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
