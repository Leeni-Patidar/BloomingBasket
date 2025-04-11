"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUser,
  faShoppingBag,
  faHeadset,
  faFileAlt,
  faQuestionCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import styles from "../assets/Profile.module.css"

const Profile = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("orders")

  // Mock user data - in a real app, this would come from authentication/user context
  const userData = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
  }

  // Mock order data - in a real app, this would come from an API
  const orders = [
    {
      id: "ORD-1234",
      date: "April 2, 2023",
      status: "Delivered",
      total: 129.99,
      items: [
        { name: "Pink Perfection", quantity: 1, price: 49.99 },
        { name: "Elegant Harmony", quantity: 1, price: 59.99 },
        { name: "Crystal Vase", quantity: 1, price: 29.99 },
      ],
    },
    {
      id: "ORD-5678",
      date: "March 15, 2023",
      status: "Delivered",
      total: 54.99,
      items: [{ name: "Pastel Dream", quantity: 1, price: 54.99 }],
    },
  ]

  // FAQ data
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "You can place an order by browsing our shop, selecting the items you want, adding them to your cart, and proceeding to checkout. Follow the instructions to complete your purchase.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay. All transactions are secure and encrypted.",
    },
    {
      question: "How long will my flowers stay fresh?",
      answer:
        "Our flowers typically stay fresh for 5-7 days with proper care. We provide care instructions with every delivery to help you maximize the lifespan of your bouquet.",
    },
    {
      question: "Do you offer same-day delivery?",
      answer:
        "Yes, we offer same-day delivery for orders placed before 1 PM local time. Please note that same-day delivery may not be available in all areas.",
    },
    {
      question: "What is your return policy?",
      answer:
        "Due to the perishable nature of our products, we do not accept returns for flowers. However, if you're not satisfied with your purchase, please contact our customer service within 24 hours of delivery, and we'll work to make it right.",
    },
    {
      question: "Can I customize my bouquet?",
      answer:
        "Yes! We offer customization options through our 'Customize' page where you can select specific flowers, colors, and arrangements to create your perfect bouquet.",
    },
  ]

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    // For now, just navigate to home
    navigate("/")
  }

  return (
    <>
      <Navbar />
      <div className={styles.profilePage}>
        <div className="container py-4">
          <h1 className={styles.pageTitle}>My Account</h1>

          <div className="row">
            <div className="col-lg-3">
              {/* User Info Card */}
              <div className={styles.userCard}>
                <div className={styles.userAvatar}>
                  <FontAwesomeIcon icon={faUser} className={styles.avatarIcon} />
                </div>
                <div className={styles.userInfo}>
                  <h3 className={styles.userName}>{userData.name}</h3>
                  <p className={styles.userEmail}>{userData.email}</p>
                  <p className={styles.userPhone}>{userData.phone}</p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className={styles.navTabs}>
                <button
                  className={`${styles.navTab} ${activeTab === "orders" ? styles.active : ""}`}
                  onClick={() => setActiveTab("orders")}
                >
                  <FontAwesomeIcon icon={faShoppingBag} className={styles.tabIcon} />
                  My Orders
                </button>
                <button
                  className={`${styles.navTab} ${activeTab === "customer-care" ? styles.active : ""}`}
                  onClick={() => setActiveTab("customer-care")}
                >
                  <FontAwesomeIcon icon={faHeadset} className={styles.tabIcon} />
                  Customer Care
                </button>
                <button
                  className={`${styles.navTab} ${activeTab === "terms" ? styles.active : ""}`}
                  onClick={() => setActiveTab("terms")}
                >
                  <FontAwesomeIcon icon={faFileAlt} className={styles.tabIcon} />
                  Terms & Conditions
                </button>
                <button
                  className={`${styles.navTab} ${activeTab === "faqs" ? styles.active : ""}`}
                  onClick={() => setActiveTab("faqs")}
                >
                  <FontAwesomeIcon icon={faQuestionCircle} className={styles.tabIcon} />
                  FAQs
                </button>
                <button className={styles.logoutBtn} onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className={styles.tabIcon} />
                  Logout
                </button>
              </div>
            </div>

            <div className="col-lg-9">
              <div className={styles.contentCard}>
                {/* Orders Tab */}
                {activeTab === "orders" && (
                  <div className={styles.tabContent}>
                    <h2 className={styles.contentTitle}>My Orders</h2>
                    {orders.length > 0 ? (
                      <div className={styles.ordersList}>
                        {orders.map((order) => (
                          <div key={order.id} className={styles.orderItem}>
                            <div className={styles.orderHeader}>
                              <div>
                                <h4 className={styles.orderId}>Order #{order.id}</h4>
                                <p className={styles.orderDate}>{order.date}</p>
                              </div>
                              <div className={styles.orderStatus}>
                                <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
                                  {order.status}
                                </span>
                                <span className={styles.orderTotal}>${order.total.toFixed(2)}</span>
                              </div>
                            </div>
                            <div className={styles.orderItems}>
                              {order.items.map((item, index) => (
                                <div key={index} className={styles.orderItemRow}>
                                  <span className={styles.itemName}>{item.name}</span>
                                  <span className={styles.itemQuantity}>x{item.quantity}</span>
                                  <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                            <div className={styles.orderActions}>
                              <button className={styles.viewDetailsBtn}>View Details</button>
                              <button className={styles.reorderBtn}>Reorder</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={styles.emptyState}>
                        <p>You haven't placed any orders yet.</p>
                        <button className={styles.shopNowBtn} onClick={() => navigate("/shop")}>
                          Shop Now
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Customer Care Tab */}
                {activeTab === "customer-care" && (
                  <div className={styles.tabContent}>
                    <h2 className={styles.contentTitle}>Customer Care</h2>
                    <div className={styles.customerCare}>
                      <div className={styles.careSection}>
                        <h3>Contact Us</h3>
                        <p>
                          We're here to help! If you have any questions or concerns, please don't hesitate to reach out.
                        </p>
                        <ul className={styles.contactList}>
                          <li>
                            <strong>Email:</strong> support@bloombasket.com
                          </li>
                          <li>
                            <strong>Phone:</strong> +1 (800) 123-4567
                          </li>
                          <li>
                            <strong>Hours:</strong> Monday - Friday, 9am - 6pm EST
                          </li>
                        </ul>
                      </div>

                      <div className={styles.careSection}>
                        <h3>Flower Care Tips</h3>
                        <ul className={styles.tipsList}>
                          <li>Cut stems at a 45-degree angle before placing in water</li>
                          <li>Change water every 2-3 days</li>
                          <li>Keep flowers away from direct sunlight and heat sources</li>
                          <li>Remove any leaves that would be below the water line</li>
                          <li>Use the flower food packet provided with your bouquet</li>
                        </ul>
                      </div>

                      <div className={styles.careSection}>
                        <h3>Submit a Request</h3>
                        <p>
                          Have a specific question or issue? Fill out our contact form and we'll get back to you within
                          24 hours.
                        </p>
                        <button className={styles.contactBtn} onClick={() => navigate("/contact")}>
                          Contact Form
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Terms & Conditions Tab */}
                {activeTab === "terms" && (
                  <div className={styles.tabContent}>
                    <h2 className={styles.contentTitle}>Terms & Conditions</h2>
                    <div className={styles.termsContent}>
                      <h3>1. Introduction</h3>
                      <p>
                        Welcome to BloomBasket. These terms and conditions govern your use of our website and services.
                        By accessing or using our website, you agree to be bound by these terms.
                      </p>

                      <h3>2. Ordering & Delivery</h3>
                      <p>
                        All orders are subject to product availability. We reserve the right to discontinue any product
                        at any time. Delivery times are estimates and cannot be guaranteed. We are not responsible for
                        delays due to weather or other circumstances beyond our control.
                      </p>

                      <h3>3. Payment & Pricing</h3>
                      <p>
                        All prices are shown in USD and do not include applicable taxes and delivery fees, which will be
                        added at checkout. We accept various payment methods as indicated on our checkout page. All
                        payments are processed securely.
                      </p>

                      <h3>4. Returns & Refunds</h3>
                      <p>
                        Due to the perishable nature of our products, we do not accept returns for flowers. If you're
                        not satisfied with your purchase, please contact our customer service within 24 hours of
                        delivery, and we'll work to make it right.
                      </p>

                      <h3>5. Privacy Policy</h3>
                      <p>
                        We respect your privacy and are committed to protecting your personal data. Please refer to our
                        Privacy Policy for information on how we collect, use, and store your data.
                      </p>

                      <h3>6. Limitation of Liability</h3>
                      <p>
                        BloomBasket shall not be liable for any indirect, incidental, special, consequential, or
                        punitive damages resulting from your use or inability to use our services.
                      </p>

                      <p className={styles.lastUpdated}>Last Updated: April 1, 2023</p>
                    </div>
                  </div>
                )}

                {/* FAQs Tab */}
                {activeTab === "faqs" && (
                  <div className={styles.tabContent}>
                    <h2 className={styles.contentTitle}>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                      {faqs.map((faq, index) => (
                        <div key={index} className={styles.faqItem}>
                          <h3 className={styles.faqQuestion}>{faq.question}</h3>
                          <p className={styles.faqAnswer}>{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile
