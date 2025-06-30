"use client"

import { useState } from "react"
import styles from "./FAQ.module.css"

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      question: "How fresh are your flowers?",
      answer:
        "All our flowers are sourced directly from trusted growers and are delivered within 24-48 hours of being cut. We guarantee freshness and quality with every order.",
    },
    {
      question: "What areas do you deliver to?",
      answer:
        "We currently deliver nationwide across the United States. Delivery times may vary based on location, but most orders are delivered within 1-3 business days.",
    },
    {
      question: "Can I schedule a delivery for a specific date?",
      answer:
        "Yes! You can choose your preferred delivery date during checkout. We recommend ordering at least 2 days in advance for special occasions to ensure availability.",
    },
    {
      question: "What if I'm not satisfied with my order?",
      answer:
        "We offer a 100% satisfaction guarantee. If you're not completely happy with your flowers, please contact us within 24 hours of delivery and we'll make it right.",
    },
    {
      question: "Do you offer same-day delivery?",
      answer:
        "Same-day delivery is available in select metropolitan areas for orders placed before 12 PM. Additional fees may apply.",
    },
    {
      question: "How should I care for my flowers?",
      answer:
        "Cut stems at an angle under running water, place in clean vase with fresh water, remove leaves below waterline, and change water every 2-3 days. Keep away from direct sunlight and heat sources.",
    },
    {
      question: "Can I customize my bouquet?",
      answer:
        "Use our custom bouquet builder to create a personalized arrangement. Choose your flowers, colors, size, and add a personal message.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and cash on delivery in select areas.",
    },
    {
      question: "Do you offer corporate or bulk orders?",
      answer:
        "Yes, we offer special pricing for corporate events, weddings, and bulk orders. Please contact our customer service team for a custom quote.",
    },
    {
      question: "What happens if no one is home during delivery?",
      answer:
        "Our delivery team will attempt to leave flowers in a safe location or with a neighbor. If unsuccessful, we'll contact you to reschedule delivery.",
    },
  ]

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className={styles.faq}>
      <div className="container">
        <div className={styles.header}>
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our flowers and services</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className={styles.faqList}>
              {faqs.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <button
                    className={`${styles.faqQuestion} ${activeIndex === index ? styles.active : ""}`}
                    onClick={() => toggleFAQ(index)}
                  >
                    <span>{faq.question}</span>
                    <i className={`fas fa-chevron-down ${styles.chevron}`}></i>
                  </button>
                  <div className={`${styles.faqAnswer} ${activeIndex === index ? styles.show : ""}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.contactSection}>
          <h3>Still have questions?</h3>
          <p>Can't find what you're looking for? Our customer service team is here to help!</p>
          <div className={styles.contactOptions}>
            <div className={styles.contactOption}>
              <i className="fas fa-phone"></i>
              <div>
                <h5>Call Us</h5>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className={styles.contactOption}>
              <i className="fas fa-envelope"></i>
              <div>
                <h5>Email Us</h5>
                <p>support@bloomingbasket.com</p>
              </div>
            </div>
            <div className={styles.contactOption}>
              <i className="fas fa-comments"></i>
              <div>
                <h5>Live Chat</h5>
                <p>Available 9 AM - 6 PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ
