"use client"

import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPlus, faMinus, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { removeFromCart, addToCart, removeItemCompletely } from "../redux/cartSlice"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import styles from "../assets/Cart.module.css"

const Cart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const totalAmount = useSelector((state) => state.cart.totalAmount)

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleAddItem = (item) => {
    dispatch(addToCart(item))
  }

  const handleDeleteItem = (id) => {
    dispatch(removeItemCompletely(id))
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className={styles.emptyCart}>
          <div className="container text-center py-5">
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/shop" className={styles.continueShoppingBtn}>
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className={styles.cartPage}>
        <div className="container py-4">
          <h1 className={styles.pageTitle}>Your Cart</h1>

          <div className="row">
            <div className="col-lg-8">
              <div className={styles.cartItems}>
                {cartItems.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemImage}>
                      <img src={item.image || "/placeholder.svg"} alt={item.name} />
                    </div>
                    <div className={styles.itemDetails}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <p className={styles.itemDescription}>{item.description}</p>
                      <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                    </div>
                    <div className={styles.itemQuantity}>
                      <button className={styles.quantityBtn} onClick={() => handleRemoveItem(item.id)}>
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span>{item.quantity}</span>
                      <button className={styles.quantityBtn} onClick={() => handleAddItem(item)}>
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    <div className={styles.itemTotal}>
                      <p>${item.totalPrice.toFixed(2)}</p>
                    </div>
                    <button className={styles.removeBtn} onClick={() => handleDeleteItem(item.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </div>

              <Link to="/shop" className={styles.continueShoppingBtn}>
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Continue Shopping
              </Link>
            </div>

            <div className="col-lg-4">
              <div className={styles.orderSummary}>
                <h3 className={styles.summaryTitle}>Order Summary</h3>
                <div className={styles.summaryDetails}>
                  <div className={styles.summaryRow}>
                    <span>Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
                <button className={styles.checkoutBtn}>Proceed to Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Cart
