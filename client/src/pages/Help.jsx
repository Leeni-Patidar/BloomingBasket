const Help = () => {
  const helpTopics = [
    {
      icon: "fas fa-shopping-cart",
      title: "Placing Orders",
      description: "Learn how to browse products, add items to cart, and complete your purchase",
      links: [
        { text: "How to place an order", href: "#placing-order" },
        { text: "Payment methods", href: "#payment" },
        { text: "Order confirmation", href: "#confirmation" },
      ],
    },
    {
      icon: "fas fa-truck",
      title: "Delivery & Shipping",
      description: "Information about delivery areas, timing, and special delivery options",
      links: [
        { text: "Delivery areas", href: "#delivery-areas" },
        { text: "Delivery times", href: "#delivery-times" },
        { text: "Same-day delivery", href: "#same-day" },
      ],
    },
    {
      icon: "fas fa-palette",
      title: "Custom Arrangements",
      description: "Create personalized bouquets and arrangements for special occasions",
      links: [
        { text: "How to customize", href: "#customize" },
        { text: "Upload inspiration photos", href: "#photos" },
        { text: "Wedding packages", href: "#weddings" },
      ],
    },
    {
      icon: "fas fa-user",
      title: "Account Management",
      description: "Manage your profile, view order history, and update preferences",
      links: [
        { text: "Create an account", href: "#create-account" },
        { text: "Order history", href: "#order-history" },
        { text: "Update profile", href: "#update-profile" },
      ],
    },
    {
      icon: "fas fa-heart",
      title: "Care Instructions",
      description: "Tips and guidelines to keep your flowers fresh and beautiful longer",
      links: [
        { text: "Flower care basics", href: "#care-basics" },
        { text: "Extending flower life", href: "#extend-life" },
        { text: "Troubleshooting", href: "#troubleshooting" },
      ],
    },
    {
      icon: "fas fa-headset",
      title: "Customer Support",
      description: "Get help with issues, returns, and general inquiries",
      links: [
        { text: "Contact support", href: "#contact-support" },
        { text: "Return policy", href: "#returns" },
        { text: "Freshness guarantee", href: "#guarantee" },
      ],
    },
  ]

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-success">Help Center</h1>
        <p className="lead text-muted">Find answers and get support for all your floral needs</p>
      </div>

      {/* Search Bar */}
      <div className="row mb-5">
        <div className="col-lg-6 mx-auto">
          <div className="input-group input-group-lg">
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input type="text" className="form-control" placeholder="Search for help topics..." />
            <button className="btn btn-success" type="button">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Help Topics Grid */}
      <div className="row">
        {helpTopics.map((topic, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="mb-3">
                  <i className={`${topic.icon} fa-3x text-success`}></i>
                </div>
                <h5 className="card-title">{topic.title}</h5>
                <p className="card-text text-muted">{topic.description}</p>
                <ul className="list-unstyled">
                  {topic.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="mb-2">
                      <a href={link.href} className="text-success text-decoration-none">
                        {link.text} <i className="fas fa-arrow-right fa-sm"></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card bg-success text-white">
            <div className="card-body text-center py-5">
              <h3 className="mb-4">Need Immediate Help?</h3>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <i className="fas fa-phone fa-2x mb-3"></i>
                  <h5>Call Us</h5>
                  <p className="mb-2">Speak with our customer service team</p>
                  <a href="tel:+15551234567" className="btn btn-light">
                    (555) 123-4567
                  </a>
                </div>
                <div className="col-md-4 mb-3">
                  <i className="fas fa-envelope fa-2x mb-3"></i>
                  <h5>Email Support</h5>
                  <p className="mb-2">Send us a detailed message</p>
                  <a href="mailto:support@bloomingbasket.com" className="btn btn-light">
                    Email Us
                  </a>
                </div>
                <div className="col-md-4 mb-3">
                  <i className="fas fa-comments fa-2x mb-3"></i>
                  <h5>Live Chat</h5>
                  <p className="mb-2">Chat with us in real-time</p>
                  <button className="btn btn-light">Start Chat</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Articles */}
      <div className="row mt-5">
        <div className="col-12">
          <h3 className="mb-4">Popular Help Articles</h3>
          <div className="list-group">
            <a
              href="#"
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              <div>
                <h6 className="mb-1">How to care for your fresh flowers</h6>
                <p className="mb-1 text-muted">Essential tips to keep your arrangements looking beautiful longer</p>
              </div>
              <i className="fas fa-arrow-right text-success"></i>
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              <div>
                <h6 className="mb-1">Same-day delivery options</h6>
                <p className="mb-1 text-muted">Learn about our same-day delivery service and requirements</p>
              </div>
              <i className="fas fa-arrow-right text-success"></i>
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              <div>
                <h6 className="mb-1">Creating custom bouquets</h6>
                <p className="mb-1 text-muted">Step-by-step guide to designing your perfect arrangement</p>
              </div>
              <i className="fas fa-arrow-right text-success"></i>
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              <div>
                <h6 className="mb-1">Wedding flower planning</h6>
                <p className="mb-1 text-muted">Complete guide to planning flowers for your special day</p>
              </div>
              <i className="fas fa-arrow-right text-success"></i>
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              <div>
                <h6 className="mb-1">Return and refund policy</h6>
                <p className="mb-1 text-muted">Understanding our freshness guarantee and return process</p>
              </div>
              <i className="fas fa-arrow-right text-success"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help
