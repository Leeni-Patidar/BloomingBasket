const Terms = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-2 rounded-1xl text-black">
          <h1 className="text-3xl md:text-[2rem] font-bold mb-2 ">Terms & Conditions</h1>
          <p className="text-[1rem] mb-4 ">
            Please read these terms carefully before using our services
          </p>
          
        </div>

        {/* Replaced 'row justify-content-center' and 'col-lg-8' with Tailwind flexbox and width classes */}
        <div className="flex justify-center">
          <div className="w-full lg:w-2/3">
            <div className="bg-white p-8 px-6 md:p-12 rounded-2xl shadow-2xl">
              <section className="mb-2 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-1xl font-semibold mb-2 ">1. Acceptance of Terms</h2>
                <p className=" leading-[1.8] mb-2">
                  By accessing and using the Blooming Basket website and services, you accept and agree to be bound by
                  the terms and provision of this agreement. If you do not agree to abide by the above, please do not
                  use this service.
                </p>
              </section>

              <section className="mb-2 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-1xl font-semibold mb-2 ">2. Use License</h2>
                <p className=" leading-[1.8] mb-2">
                  Permission is granted to temporarily download one copy of the materials on Blooming Basket's website
                  for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer
                  of title, and under this license you may not:
                </p>
                <ul className=" leading-[1.8] pl-8 list-disc">
                  <li className="mb-2">modify or copy the materials</li>
                  <li className="mb-2">use the materials for any commercial purpose or for any public display</li>
                  <li className="mb-2">attempt to reverse engineer any software contained on the website</li>
                  <li className="mb-2">remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section className="mb-2 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-1xl font-semibold mb-2 ">3. Product Information</h2>
                <p className=" leading-[1.8] mb-2">
                  We strive to provide accurate product descriptions and images. However, we do not warrant that product
                  descriptions or other content is accurate, complete, reliable, current, or error-free. Colors of
                  flowers may vary due to natural variations and monitor display differences.
                </p>
              </section>

              <section className="mb-2 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-1xl font-semibold mb-2 ">4. Pricing and Payment</h2>
                <p className=" leading-[1.8] mb-2">
                  All prices are subject to change without notice. We reserve the right to modify prices at any time.
                  Payment must be received before delivery. We accept major credit cards, PayPal, and other payment
                  methods as indicated on our website.
                </p>
              </section>

              <section className="mb-2 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-1xl font-semibold mb-2 ">5. Delivery Terms</h2>
                <p className=" leading-[1.8] mb-2">
                  Delivery dates are estimates and not guaranteed. We will make every effort to deliver on the requested
                  date, but delays may occur due to weather, holidays, or other circumstances beyond our control.
                  Delivery is considered complete when flowers are left at the specified address.
                </p>
              </section>

              <section className="mb-2 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-1xl font-semibold mb-2 ">6. Freshness Guarantee</h2>
                <p className=" leading-[1.8] mb-2">
                  We guarantee the freshness of our flowers for 7 days from delivery when proper care instructions are
                  followed. If you are not satisfied with the freshness of your flowers, please contact us within 24
                  hours of delivery.
                </p>
              </section>

              <section className="mb-2 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-1xl font-semibold mb-2 ">7. Cancellation and Refunds</h2>
                <p className=" leading-[1.8] mb-2">
                  Orders may be cancelled up to 24 hours before the scheduled delivery date for a full refund.
                  Cancellations made less than 24 hours before delivery may be subject to a cancellation fee. Custom
                  arrangements may have different cancellation policies.
                </p>
              </section>

              <section className="mb-2 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-1xl font-semibold mb-2 ">8. Privacy Policy</h2>
                <p className=" leading-[1.8] mb-2">
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your
                  information when you use our services. By using our services, you agree to the collection and use of
                  information in accordance with our Privacy Policy.
                </p>
              </section>

              <section className="mb-2 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-1xl font-semibold mb-2 ">9. Limitation of Liability</h2>
                <p className=" leading-[1.8] mb-2">
                  In no event shall Blooming Basket or its suppliers be liable for any damages (including, without
                  limitation, damages for loss of data or profit, or due to business interruption) arising out of the
                  use or inability to use the materials on our website, even if we have been notified orally or in
                  writing of the possibility of such damage.
                </p>
              </section>

              <section className="mb-2 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-1xl font-semibold mb-2 ">10. Governing Law</h2>
                <p className=" leading-[1.8] mb-2">
                  These terms and conditions are governed by and construed in accordance with the laws of the United
                  States and you irrevocably submit to the exclusive jurisdiction of the courts in that State or
                  location.
                </p>
              </section>

              <section className="mb-2 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-1xl font-semibold mb-2 ">11. Changes to Terms</h2>
                <p className=" leading-[1] mb-2">
                  We reserve the right to revise these terms of service at any time without notice. By using this
                  website, you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>

              <section className="mb-2 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0">
                <h2 className="text-xl md:text-1xl font-semibold mb-2 ">12. Contact Information</h2>
                <p className=" leading-[1] mb-2">
                  If you have any questions about these Terms & Conditions, please contact us at:
                </p>
                <div className="shadow-2xl p-6 rounded-lg mt-4">
                  <p className="mb-2 last:mb-0">
                    <strong>Email:</strong> legal@bloomingbasket.com
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

export default Terms
