// import styles from "./Policy.module.css"

const Policy = () => {
  return (
    <div className="py-8 min-h-screen bg-gradient-to-br from-[#FDF2F8] to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4 py-12 rounded-2xl text-black">
          <h1 className="text-3xl md:text-[2.5rem] font-bold mb-4 text-shadow">Privacy Policy</h1>
          <p className="text-[1.1rem] mb-2 text-shadow-sm">
            Your privacy is important to us. Learn how we protect your information.
          </p>
          {/* <small>Last updated: January 1, 2024</small> */}
        </div>

        <div className="flex justify-center">
          <div className="w-full lg:w-2/3">
            <div className="bg-white p-8 px-6 md:p-12 rounded-2xl shadow-xl">
              <section className="mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">1. Information We Collect</h2>
                <p className="text-gray-600 leading-[1.8] mb-4">
                  We collect information you provide directly to us, such as when you create an account, make a
                  purchase, or contact us for support. This may include:
                </p>
                <ul className="text-gray-600 leading-[1.8] pl-8 list-disc">
                  <li className="mb-2">Name, email address, and phone number</li>
                  <li className="mb-2">Billing and shipping addresses</li>
                  <li className="mb-2">Payment information (processed securely by our payment providers)</li>
                  <li className="mb-2">Order history and preferences</li>
                  <li className="mb-2">Communications with our customer service team</li>
                </ul>
              </section>

              <section className="mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">2. How We Use Your Information</h2>
                <p className="text-gray-600 leading-[1.8] mb-4">We use the information we collect to:</p>
                <ul className="text-gray-600 leading-[1.8] pl-8 list-disc">
                  <li className="mb-2">Process and fulfill your orders</li>
                  <li className="mb-2">Communicate with you about your orders and account</li>
                  <li className="mb-2">Provide customer support</li>
                  <li className="mb-2">Send you promotional emails (with your consent)</li>
                  <li className="mb-2">Improve our website and services</li>
                  <li className="mb-2">Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">3. Information Sharing</h2>
                <p className="text-gray-600 leading-[1.8] mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except in the
                  following circumstances:
                </p>
                <ul className="text-gray-600 leading-[1.8] pl-8 list-disc">
                  <li className="mb-2">With your explicit consent</li>
                  <li className="mb-2">
                    To trusted service providers who assist us in operating our website and conducting business
                  </li>
                  <li className="mb-2">To comply with legal requirements or protect our rights</li>
                  <li className="mb-2">In connection with a business transfer or merger</li>
                </ul>
              </section>

              <section className="mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">4. Data Security</h2>
                <p className="text-gray-600 leading-[1.8] mb-4">
                  We implement appropriate security measures to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. This includes:
                </p>
                <ul className="text-gray-600 leading-[1.8] pl-8 list-disc">
                  <li className="mb-2">SSL encryption for data transmission</li>
                  <li className="mb-2">Secure payment processing</li>
                  <li className="mb-2">Regular security audits</li>
                  <li className="mb-2">Limited access to personal information</li>
                </ul>
              </section>

              <section className="mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">5. Cookies and Tracking</h2>
                <p className="text-gray-600 leading-[1.8] mb-4">
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze website
                  traffic, and personalize content. You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section className="mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">6. Your Rights</h2>
                <p className="text-gray-600 leading-[1.8] mb-4">You have the right to:</p>
                <ul className="text-gray-600 leading-[1.8] pl-8 list-disc">
                  <li className="mb-2">Access and update your personal information</li>
                  <li className="mb-2">Request deletion of your account and data</li>
                  <li className="mb-2">Opt out of marketing communications</li>
                  <li className="mb-2">Request a copy of your data</li>
                  <li className="mb-2">Lodge a complaint with a supervisory authority</li>
                </ul>
              </section>

              <section className="mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">7. Children's Privacy</h2>
                <p className="text-gray-600 leading-[1.8] mb-4">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal
                  information from children under 13. If we become aware that we have collected such information, we
                  will take steps to delete it.
                </p>
              </section>

              <section className="mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">8. International Transfers</h2>
                <p className="text-gray-600 leading-[1.8] mb-4">
                  Your information may be transferred to and processed in countries other than your own. We ensure
                  appropriate safeguards are in place to protect your information in accordance with this privacy
                  policy.
                </p>
              </section>

              <section className="mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">9. Changes to This Policy</h2>
                <p className="text-gray-600 leading-[1.8] mb-4">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the
                  new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section className="mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">10. Contact Us</h2>
                <p className="text-gray-600 leading-[1.8] mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-[#ede8eb] p-6 rounded-lg mt-4">
                  <p className="mb-2 last:mb-0">
                    <strong>Email:</strong> privacy@bloomingbasket.com
                  </p>
                  <p className="mb-2 last:mb-0">
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                  <p className="mb-2 last:mb-0">
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

