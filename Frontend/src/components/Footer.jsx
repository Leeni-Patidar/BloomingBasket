import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faInstagram, faPinterestP } from "@fortawesome/free-brands-svg-icons"
import styles from "../assets/Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row g-3">
          <div className="col-md-4">
            <h5 className={styles.footerTitle}>BloomBasket</h5>
            <p className={styles.footerText}>Beautiful blooms for every occasion, delivered with care and love.</p>
          </div>

          <div className="col-md-4">
            <h5 className={styles.footerTitle}>Quick Links</h5>
            <ul className={styles.footerLinks}>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/shop">Shop</a>
              </li>
              <li>
                <a href="/customizer">Custom</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5 className={styles.footerTitle}>Customer Service</h5>
            <ul className={styles.footerLinks}>
              <li>
                <a href="#">Delivery Information</a>
              </li>
              <li>
                <a href="#">Return Policy</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
          <p className={styles.copyright}>© 2023 BloomBasket. All rights reserved.</p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className={styles.socialLink}>
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className={styles.socialLink}>
              <FontAwesomeIcon icon={faPinterestP} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
