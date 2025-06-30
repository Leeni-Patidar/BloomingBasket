import { Link } from "react-router-dom"
import styles from "./NotFound.module.css"

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className={styles.content}>
              <div className={styles.errorCode}>404</div>
              <div className={styles.errorIcon}>
                <i className="fas fa-seedling"></i>
              </div>
              <h1>Oops! Page Not Found</h1>
              <p>
                The page you're looking for seems to have wilted away. Don't worry, our beautiful flowers are still
                blooming elsewhere on our site!
              </p>
              <div className={styles.actions}>
                <Link to="/" className={styles.homeBtn}>
                  <i className="fas fa-home me-2"></i>
                  Go Home
                </Link>
                <Link to="/shop" className={styles.shopBtn}>
                  <i className="fas fa-shopping-bag me-2"></i>
                  Browse Flowers
                </Link>
              </div>
              <div className={styles.suggestions}>
                <h5>You might be looking for:</h5>
                <ul>
                  <li>
                    <Link to="/shop">Our Flower Collection</Link>
                  </li>
                  <li>
                    <Link to="/customize">Custom Bouquets</Link>
                  </li>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Support</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
