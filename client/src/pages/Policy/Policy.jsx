import styles from "./Policy.module.css"

const Policy = () => {
  return (
    <div className={styles.policy}>
      <div className="container">
        <div className={styles.header}>
          <h1>Privacy Policy</h1>
          <p>Your privacy is important to us. Learn how we protect your information.</p>
          {/* <small>Last updated: January 1, 2024</small> */}
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className={styles.content}>
              <section className={styles.section}>
                <h2>1. Information We Collect</h2>
                <p>
                  We collect information you provide directly to us, such as when you create an account, make a
                  purchase, or contact us for support. This may include:
                </p>
                <ul>
                  <li>Name, email address, and phone number</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information (processed securely by our payment providers)</li>
                  <li>Order history and preferences</li>
                  <li>Communications with our customer service team</li>
                </ul>
              </section>

              <section className={styles.section}>
                <h2>2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your orders and account</li>
                  <li>Provide customer support</li>
                  <li>Send you promotional emails (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className={styles.section}>
                <h2>3. Information Sharing</h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties except in the
                  following circumstances:
                </p>
                <ul>
                  <li>With your explicit consent</li>
                  <li>To trusted service providers who assist us in operating our website and conducting business</li>
                  <li>To comply with legal requirements or protect our rights</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
              </section>

              <section className={styles.section}>
                <h2>4. Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. This includes:
                </p>
                <ul>
                  <li>SSL encryption for data transmission</li>
                  <li>Secure payment processing</li>
                  <li>Regular security audits</li>
                  <li>Limited access to personal information</li>
                </ul>
              </section>

              <section className={styles.section}>
                <h2>5. Cookies and Tracking</h2>
                <p>
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze website
                  traffic, and personalize content. You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section className={styles.section}>
                <h2>6. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your account and data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request a copy of your data</li>
                  <li>Lodge a complaint with a supervisory authority</li>
                </ul>
              </section>

              <section className={styles.section}>
                <h2>7. Children's Privacy</h2>
                <p>
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal
                  information from children under 13. If we become aware that we have collected such information, we
                  will take steps to delete it.
                </p>
              </section>

              <section className={styles.section}>
                <h2>8. International Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than your own. We ensure
                  appropriate safeguards are in place to protect your information in accordance with this privacy
                  policy.
                </p>
              </section>

              <section className={styles.section}>
                <h2>9. Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the
                  new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section className={styles.section}>
                <h2>10. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                <div className={styles.contactInfo}>
                  <p>
                    <strong>Email:</strong> privacy@bloomingbasket.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Flower Street, Garden City, GC 12345
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Policy
