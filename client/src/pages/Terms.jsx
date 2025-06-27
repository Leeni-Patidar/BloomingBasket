const Terms = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="text-center mb-5">Terms & Conditions</h1>

          <div className="card">
            <div className="card-body">
              <p className="text-muted">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <h3>1. Acceptance of Terms</h3>
              <p>
                By accessing and using the Blooming Basket website and services, you accept and agree to be bound by the
                terms and provision of this agreement.
              </p>

              <h3>2. Products and Services</h3>
              <p>
                Blooming Basket provides fresh flower arrangements, bouquets, and related floral services. All products
                are subject to availability and seasonal variations.
              </p>

              <h3>3. Ordering and Payment</h3>
              <ul>
                <li>All orders are subject to acceptance and availability</li>
                <li>Prices are subject to change without notice</li>
                <li>Payment is required at the time of order</li>
                <li>We accept major credit cards and PayPal</li>
              </ul>

              <h3>4. Delivery</h3>
              <ul>
                <li>Delivery times are estimates and not guaranteed</li>
                <li>Someone must be available to receive the delivery</li>
                <li>Delivery fees may apply based on location</li>
                <li>We are not responsible for deliveries left unattended at customer's request</li>
              </ul>

              <h3>5. Freshness Guarantee</h3>
              <p>
                We guarantee the freshness of our flowers for 7 days from delivery. If you are not satisfied with the
                freshness, please contact us within 24 hours of delivery.
              </p>

              <h3>6. Returns and Refunds</h3>
              <ul>
                <li>Due to the perishable nature of flowers, returns are not accepted</li>
                <li>Refunds may be issued for damaged or unsatisfactory products</li>
                <li>Custom arrangements are non-refundable unless damaged</li>
              </ul>

              <h3>7. Limitation of Liability</h3>
              <p>
                Blooming Basket shall not be liable for any indirect, incidental, special, or consequential damages
                resulting from the use or inability to use our products or services.
              </p>

              <h3>8. Privacy</h3>
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our
                services.
              </p>

              <h3>9. Modifications</h3>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                posting on our website.
              </p>

              <h3>10. Contact Information</h3>
              <p>
                For questions about these terms, please contact us at:
                <br />
                Email: legal@bloomingbasket.com
                <br />
                Phone: +1 (555) 123-4567
                <br />
                Address: 123 Flower Street, Garden City, GC 12345
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terms
