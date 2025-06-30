import { Link } from "react-router-dom"
import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className={styles.footerSection}>
              <h5 className={styles.footerTitle}>Blooming Basket</h5>
              <p className={styles.footerDescription}>
                Your trusted partner for beautiful flowers and memorable moments. We deliver fresh, stunning
                arrangements right to your doorstep.
              </p>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className={styles.socialLink}>
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className={styles.socialLink}>
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className={styles.socialLink}>
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <div className={styles.footerSection}>
              <h6 className={styles.footerSubtitle}>Quick Links</h6>
              <ul className={styles.footerLinks}>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                {/* <li>
                  <Link to="/contact">Contact</Link>
                </li> */}
                <li>
                  <Link to="/customize">Customize</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <div className={styles.footerSection}>
              <h6 className={styles.footerSubtitle}>Support</h6>
              <ul className={styles.footerLinks}>
                <li>
                  <Link to="/help">Help Center</Link>
                </li>
                <li>
                  <Link to="/faq">FAQ</Link>
                </li>
                <li>
                  <Link to="/contactUs">Contact Us</Link>
                </li>
                <li>
                  <Link to="/policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className={styles.footerSection}>
              <h6 className={styles.footerSubtitle}>Contact Info</h6>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>123 Flower Street, Garden City, GC 12345</span>
                </div>
                <div className={styles.contactItem}>
                  <i className="fas fa-phone"></i>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className={styles.contactItem}>
                  <i className="fas fa-envelope"></i>
                  <span>info@bloomingbasket.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className={styles.footerDivider} />

        <div className="row">
          <div className="col-12 text-center">
            <p className={styles.copyright}>
              © 2024 Blooming Basket. All rights reserved. Made with ❤️ for flower lovers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
