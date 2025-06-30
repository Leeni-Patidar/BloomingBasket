import { Link } from "react-router-dom"
import styles from "./HeroSection.module.css"

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-6">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Beautiful Flowers for Every
                <span className={styles.highlight}> Special Moment</span>
              </h1>
              <p className={styles.heroDescription}>
                Discover our stunning collection of fresh flowers, custom bouquets, and floral arrangements. Perfect for
                weddings, birthdays, anniversaries, and every celebration in between.
              </p>
              <div className={styles.heroButtons}>
                <Link to="/shop" className={`btn ${styles.btnPrimary}`}>
                  Shop Now
                </Link>
                <Link to="/customize" className={`btn ${styles.btnSecondary}`}>
                  Customize Bouquet
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className={styles.heroImage}>
              <img src="/home.png?height=200&width=200" alt="Beautiful flower bouquet" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
