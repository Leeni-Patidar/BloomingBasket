import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { faInstagram, faFacebook, faTwitter, faPinterest } from "@fortawesome/free-brands-svg-icons"
import styles from "../assets/Contact.module.css"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Contact = () => {
  return (
    <div className="contact-page">
      <Navbar />
      {/* Main Content */}
      <main className="py-5" style={{ backgroundColor: "#FFF5F7" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="mb-3 styles">We'd Love to Hear From You!</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
              Whether you have a question, need assistance, or just want to say hello, we're here to help. Reach out to
              us anytime, and we'll respond as quickly as possible!
            </p>
          </div>

          <div className="row g-6">
            {/* Contact Form */}
            <div className="col-lg-6">
              <div className="card  border-0 h-100">
                <div className={`card-body p-3 ${styles.contactForm}`}>
                  <h5 className={styles.formTitle}>Send us a Message</h5>
                  <form>
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={`form-label ${styles.formLabel}`}>
                        Name
                      </label>
                      <input type="text" className={`form-control ${styles.formControl}`} id="name" />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={`form-label ${styles.formLabel}`}>
                        Email Address
                      </label>
                      <input type="email" className={`form-control ${styles.formControl}`} id="email" />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="subject" className={`form-label ${styles.formLabel}`}>
                        Subject
                      </label>
                      <div className="position-relative">
                        <select className={`form-select ${styles.formControl}`} id="subject">
                          <option>General Inquiry</option>
                          <option>Order Status</option>
                          <option>Custom Request</option>
                          <option>Feedback</option>
                        </select>
                       </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="message" className={`form-label ${styles.formLabel}`}>
                        Message
                      </label>
                      <textarea className={`form-control ${styles.formTextarea}`} id="message" rows="3"></textarea>
                    </div>
                    <button
                      type="submit"
                      className={`btn w-100 text-white ${styles.formButton}`}
                      style={{ backgroundColor: "#EE5C8C", borderColor: "#EE5C8C" }}
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Info and Map */}
            <div className="col-lg-6">
              <div className={`card shadow-sm border-0 ${styles.infoCard}`}>
                <div className={`card-body ${styles.infoCardBody}`}>
                  <h3 className={styles.infoTitle}>Contact Information</h3>
                  <ul className={`list-unstyled ${styles.infoList}`}>
                    <li className={styles.infoListItem}>
                      <FontAwesomeIcon icon={faPhone} className="me-2 text-muted" />
                      <a href="tel:+15551234567" className="text-decoration-none text-dark">
                        +1 (555) 123-4567
                      </a>
                    </li>
                    <li className={styles.infoListItem}>
                      <FontAwesomeIcon icon={faEnvelope} className="me-2 text-muted" />
                      <a href="mailto:hello@bloomingbasket.com" className="text-decoration-none text-dark">
                        hello@bloomingbasket.com
                      </a>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faLocationDot} className="me-2 text-muted" />
                      <span>123 Flower Street, Garden City, CA 12345</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className={`card shadow-sm border-0 ${styles.infoCard}`}>
                <div className={`card-body ${styles.infoCardBody}`}>
                  <h3 className={styles.infoTitle}>Follow Us</h3>
                  <div className={`d-flex gap-2 ${styles.socialIcons}`}>
                    <a href="#" className="text-dark">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="#" className="text-dark">
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="#" className="text-dark">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="#" className="text-dark">
                      <FontAwesomeIcon icon={faPinterest} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="card shadow-sm border-0">
                <div className={`card-body ${styles.infoCardBody}`}>
                  <h3 className={styles.infoTitle}>Visit Our Store</h3>
                  <div className="text-center">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fJFUt3OGMZnAPgrvJE0AlUUwai4t2X.png"
                      alt="Store location map illustration"
                      className={`img-fluid ${styles.mapImage}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Contact

