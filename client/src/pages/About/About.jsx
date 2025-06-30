import styles from "./About.module.css"

const About = () => {
  return (
    <div className={styles.about}>
      <div className="container">
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className={styles.heroTitle}>About Blooming Basket</h1>
              <p className={styles.heroDescription}>
                We've been bringing joy and beauty to people's lives through fresh, stunning flowers for over 15 years.
                Our passion for floriculture and commitment to quality has made us a trusted name in the industry.
              </p>
            </div>
            <div className="col-lg-6">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="About us"
                className={`img-fluid ${styles.heroImage}`}
              />
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className={styles.storySection}>
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className={styles.sectionTitle}>Our Story</h2>
            </div>
            <div className="col-lg-6 mb-4">
              <div className={styles.storyCard}>
                <h4>Founded with Love</h4>
                <p>
                  Blooming Basket was founded in 2008 by Sarah and Michael Johnson, two passionate florists who wanted
                  to share their love for flowers with the world. What started as a small local flower shop has grown
                  into a thriving online business serving customers nationwide.
                </p>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className={styles.storyCard}>
                <h4>Quality First</h4>
                <p>
                  We source our flowers directly from trusted growers and ensure they're fresh, vibrant, and
                  long-lasting. Every arrangement is carefully crafted by our skilled florists who take pride in their
                  artistry and attention to detail.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className={styles.valuesSection}>
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className={styles.sectionTitle}>Our Values</h2>
            </div>
            <div className="col-md-4 mb-4">
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <i className="fas fa-heart"></i>
                </div>
                <h5>Passion</h5>
                <p>We pour our heart into every arrangement, ensuring each bouquet tells a beautiful story.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <i className="fas fa-leaf"></i>
                </div>
                <h5>Sustainability</h5>
                <p>We're committed to eco-friendly practices and supporting sustainable flower farming.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <i className="fas fa-users"></i>
                </div>
                <h5>Community</h5>
                <p>We believe in giving back to our community and supporting local causes.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className={styles.teamSection}>
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className={styles.sectionTitle}>Meet Our Team</h2>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className={styles.teamCard}>
                <img src="/placeholder.svg?height=300&width=300" alt="Sarah Johnson" />
                <h5>Sarah Johnson</h5>
                <p className={styles.teamRole}>Co-Founder & Head Florist</p>
                <p>With over 20 years of experience, Sarah brings creativity and expertise to every arrangement.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className={styles.teamCard}>
                <img src="/placeholder.svg?height=300&width=300" alt="Michael Johnson" />
                <h5>Michael Johnson</h5>
                <p className={styles.teamRole}>Co-Founder & Operations Manager</p>
                <p>Michael ensures smooth operations and maintains our high standards of customer service.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className={styles.teamCard}>
                <img src="/placeholder.svg?height=300&width=300" alt="Emma Davis" />
                <h5>Emma Davis</h5>
                <p className={styles.teamRole}>Senior Florist</p>
                <p>Emma specializes in wedding arrangements and brings artistic flair to special occasions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
