const Policy = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="text-center mb-5">Privacy Policy</h1>

          <div className="card">
            <div className="card-body">
              <p className="text-muted">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <h3>1. Information We Collect</h3>
              <p>
                We collect information you provide directly to us, such as when you create an account, make a purchase,
                or contact us for support. This may include:
              </p>
              <ul>
                <li>Name and contact information</li>
                <li>Payment and billing information</li>
                <li>Delivery addresses</li>
                <li>Order history and preferences</li>
              </ul>

              <h3>2. How We Use Your Information</h3>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders</li>
                <li>Provide customer support</li>
                <li>Send you promotional materials (with your consent)</li>
                <li>Improve our services</li>
              </ul>

              <h3>3. Information Sharing</h3>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                consent, except as described in this policy. We may share your information with:
              </p>
              <ul>
                <li>Service providers who assist us in operating our business</li>
                <li>Delivery partners to fulfill your orders</li>
                <li>Legal authorities when required by law</li>
              </ul>

              <h3>4. Data Security</h3>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. However, no method of transmission over the internet is
                100% secure.
              </p>

              <h3>5. Your Rights</h3>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and personal information</li>
                <li>Opt-out of marketing communications</li>
              </ul>

              <h3>6. Cookies</h3>
              <p>
                We use cookies and similar technologies to enhance your experience on our website, analyze usage
                patterns, and provide personalized content.
              </p>

              <h3>7. Changes to This Policy</h3>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the
                new policy on this page and updating the "Last updated" date.
              </p>

              <h3>8. Contact Us</h3>
              <p>
                If you have any questions about this privacy policy, please contact us at:
                <br />
                Email: privacy@bloomingbasket.com
                <br />
                Phone: +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Policy
