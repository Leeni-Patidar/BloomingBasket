import styles from "./Terms.module.css"

const Terms = () => {
  return (
    <div className={styles.terms}>
      <div className="container">
        <div className={styles.header}>
          <h1>Terms & Conditions</h1>
          <p>Please read these terms carefully before using our services</p>
          {/* <small>Last updated: January 1, 2024</small> */}
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className={styles.content}>
              <section className={styles.section}>
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the Blooming Basket website and services, you accept and agree to be bound by
                  the terms and provision of this agreement. If you do not agree to abide by the above, please do not
                  use this service.
                </p>
              </section>

              <section className={styles.section}>
                <h2>2. Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials on Blooming Basket's website
                  for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer
                  of title, and under this license you may not:
                </p>
                <ul>
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on the website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section className={styles.section}>
                <h2>3. Product Information</h2>
                <p>
                  We strive to provide accurate product descriptions and images. However, we do not warrant that product
                  descriptions or other content is accurate, complete, reliable, current, or error-free. Colors of
                  flowers may vary due to natural variations and monitor display differences.
                </p>
              </section>

              <section className={styles.section}>
                <h2>4. Pricing and Payment</h2>
                <p>
                  All prices are subject to change without notice. We reserve the right to modify prices at any time.
                  Payment must be received before delivery. We accept major credit cards, PayPal, and other payment
                  methods as indicated on our website.
                </p>
              </section>

              <section className={styles.section}>
                <h2>5. Delivery Terms</h2>
                <p>
                  Delivery dates are estimates and not guaranteed. We will make every effort to deliver on the requested
                  date, but delays may occur due to weather, holidays, or other circumstances beyond our control.
                  Delivery is considered complete when flowers are left at the specified address.
                </p>
              </section>

              <section className={styles.section}>
                <h2>6. Freshness Guarantee</h2>
                <p>
                  We guarantee the freshness of our flowers for 7 days from delivery when proper care instructions are
                  followed. If you are not satisfied with the freshness of your flowers, please contact us within 24
                  hours of delivery.
                </p>
              </section>

              <section className={styles.section}>
                <h2>7. Cancellation and Refunds</h2>
                <p>
                  Orders may be cancelled up to 24 hours before the scheduled delivery date for a full refund.
                  Cancellations made less than 24 hours before delivery may be subject to a cancellation fee. Custom
                  arrangements may have different cancellation policies.
                </p>
              </section>

              <section className={styles.section}>
                <h2>8. Privacy Policy</h2>
                <p>
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your
                  information when you use our services. By using our services, you agree to the collection and use of
                  information in accordance with our Privacy Policy.
                </p>
              </section>

              <section className={styles.section}>
                <h2>9. Limitation of Liability</h2>
                <p>
                  In no event shall Blooming Basket or its suppliers be liable for any damages (including, without
                  limitation, damages for loss of data or profit, or due to business interruption) arising out of the
                  use or inability to use the materials on our website, even if we have been notified orally or in
                  writing of the possibility of such damage.
                </p>
              </section>

              <section className={styles.section}>
                <h2>10. Governing Law</h2>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws of the United
                  States and you irrevocably submit to the exclusive jurisdiction of the courts in that State or
                  location.
                </p>
              </section>

              <section className={styles.section}>
                <h2>11. Changes to Terms</h2>
                <p>
                  We reserve the right to revise these terms of service at any time without notice. By using this
                  website, you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>

              <section className={styles.section}>
                <h2>12. Contact Information</h2>
                <p>If you have any questions about these Terms & Conditions, please contact us at:</p>
                <div className={styles.contactInfo}>
                  <p>
                    <strong>Email:</strong> legal@bloomingbasket.com
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

export default Terms
