import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="text-success mb-3">🌸 Blooming Basket</h5>
            <p className="text-muted">
              Your premier destination for beautiful, fresh flowers and custom bouquets. We bring nature's beauty to
              your special moments.
            </p>
            <div className="d-flex">
              <a href="#" className="text-light me-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>

          <div className="col-md-2 mb-4">
            <h6 className="text-success mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-muted text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-muted text-decoration-none">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted text-decoration-none">
                  About
                </Link>
              </li>
              <li>
                <Link to="/customize" className="text-muted text-decoration-none">
                  Customize
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-2 mb-4">
            <h6 className="text-success mb-3">Support</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/contact-us" className="text-muted text-decoration-none">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted text-decoration-none">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-muted text-decoration-none">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/policy" className="text-muted text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h6 className="text-success mb-3">Contact Info</h6>
            <div className="text-muted">
              <p>
                <i className="fas fa-map-marker-alt me-2"></i>123 Flower Street, Garden City, GC 12345
              </p>
              <p>
                <i className="fas fa-phone me-2"></i>+1 (555) 123-4567
              </p>
              <p>
                <i className="fas fa-envelope me-2"></i>info@bloomingbasket.com
              </p>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-muted mb-0">&copy; 2024 Blooming Basket. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <Link to="/terms" className="text-muted text-decoration-none me-3">
              Terms & Conditions
            </Link>
            <Link to="/policy" className="text-muted text-decoration-none">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
