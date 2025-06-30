import { Link } from "react-router-dom"
import styles from "./Help.module.css"

const Help = () => {
  const helpCategories = [
    {
      title: "Getting Started",
      icon: "fas fa-play-circle",
      description: "Learn how to place your first order and navigate our website",
      links: [
        { text: "How to place an order", href: "#" },
        { text: "Creating an account", href: "#" },
        { text: "Understanding our products", href: "#" },
        { text: "Payment methods", href: "#" },
      ],
    },
    {
      title: "Orders & Delivery",
      icon: "fas fa-truck",
      description: "Everything about ordering, tracking, and receiving your flowers",
      links: [
        { text: "Order tracking", href: "#" },
        { text: "Delivery options", href: "#" },
        { text: "Changing delivery address", href: "#" },
        { text: "Delivery troubleshooting", href: "#" },
      ],
    },
    {
      title: "Flower Care",
      icon: "fas fa-seedling",
      description: "Tips and guides to keep your flowers fresh and beautiful",
      links: [
        { text: "Basic flower care", href: "#" },
        { text: "Extending flower life", href: "#" },
        { text: "Seasonal care tips", href: "#" },
        { text: "Troubleshooting wilting", href: "#" },
      ],
    },
    {
      title: "Account & Billing",
      icon: "fas fa-user-cog",
      description: "Manage your account, payments, and billing information",
      links: [
        { text: "Update profile information", href: "#" },
        { text: "Payment issues", href: "#" },
        { text: "Refunds and returns", href: "#" },
        { text: "Account security", href: "#" },
      ],
    },
    {
      title: "Custom Arrangements",
      icon: "fas fa-palette",
      description: "Learn about our customization options and special requests",
      links: [
        { text: "Using the bouquet builder", href: "#" },
        { text: "Special occasion arrangements", href: "#" },
        { text: "Corporate orders", href: "#" },
        { text: "Wedding services", href: "#" },
      ],
    },
    {
      title: "Technical Support",
      icon: "fas fa-tools",
      description: "Get help with website issues and technical problems",
      links: [
        { text: "Website not loading", href: "#" },
        { text: "Login problems", href: "#" },
        { text: "Mobile app issues", href: "#" },
        { text: "Browser compatibility", href: "#" },
      ],
    },
  ]

  return (
    <div className={styles.help}>
      <div className="container">
        <div className={styles.header}>
          <h1>Help Center</h1>
          <p>Find answers, guides, and support for all your flower needs</p>
        </div>

        {/* Search Bar */}
        <div className={styles.searchSection}>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className={styles.searchBox}>
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search for help articles..." className={styles.searchInput} />
                <button className={styles.searchBtn}>Search</button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.quickLinks}>
          <h3>Popular Help Topics</h3>
          <div className="row">
            <div className="col-md-3 mb-3">
              <Link to="/faq" className={styles.quickLink}>
                <i className="fas fa-question-circle"></i>
                <span>FAQ</span>
              </Link>
            </div>
            <div className="col-md-3 mb-3">
              <Link to="/contact" className={styles.quickLink}>
                <i className="fas fa-envelope"></i>
                <span>Contact Us</span>
              </Link>
            </div>
            <div className="col-md-3 mb-3">
              <a href="#" className={styles.quickLink}>
                <i className="fas fa-truck"></i>
                <span>Track Order</span>
              </a>
            </div>
            <div className="col-md-3 mb-3">
              <a href="#" className={styles.quickLink}>
                <i className="fas fa-undo"></i>
                <span>Returns</span>
              </a>
            </div>
          </div>
        </div>

        {/* Help Categories */}
        <div className={styles.helpCategories}>
          <h3>Browse by Category</h3>
          <div className="row">
            {helpCategories.map((category, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className={styles.categoryCard}>
                  <div className={styles.categoryHeader}>
                    <i className={category.icon}></i>
                    <h4>{category.title}</h4>
                  </div>
                  <p>{category.description}</p>
                  <ul className={styles.categoryLinks}>
                    {category.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href={link.href}>{link.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className={styles.supportSection}>
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h3>Still Need Help?</h3>
              <p>Our customer support team is available to assist you with any questions or concerns.</p>

              <div className={styles.supportOptions}>
                <div className={styles.supportOption}>
                  <i className="fas fa-phone"></i>
                  <h5>Phone Support</h5>
                  <p>+1 (555) 123-4567</p>
                  <small>Mon-Fri: 8 AM - 8 PM EST</small>
                </div>

                <div className={styles.supportOption}>
                  <i className="fas fa-envelope"></i>
                  <h5>Email Support</h5>
                  <p>support@bloomingbasket.com</p>
                  <small>Response within 24 hours</small>
                </div>

                <div className={styles.supportOption}>
                  <i className="fas fa-comments"></i>
                  <h5>Live Chat</h5>
                  <p>Chat with our team</p>
                  <small>Available 9 AM - 6 PM EST</small>
                </div>
              </div>

              <Link to="/contact" className={styles.contactBtn}>
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help
