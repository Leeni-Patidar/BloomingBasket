import React from "react";

const ShippingDelivery = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 ">Shipping and Delivery Policy</h1>

      <p className="mb-4">
        At <strong>Blooming Basket</strong>, we are committed to delivering your floral gifts and
        special items in perfect condition and on time.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">🚚 Delivery Areas</h2>
      <p className="mb-4">
        We offer delivery across most cities and towns in India. Availability may vary based on
        product and location.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">⏱ Delivery Timelines</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Standard Delivery: <strong>3–7 business days</strong></li>
        <li>Same-Day / Next-Day Delivery: Available in select cities and on select products</li>
        <li>Customized Orders: May require additional processing time</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">💸 Shipping Charges</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Free shipping on orders above ₹999</li>
        <li>Shipping charges between ₹49–₹99 apply for orders below ₹999 depending on location</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">🔍 Order Tracking</h2>
      <p className="mb-4">
        Once your order is dispatched, you will receive a tracking ID via SMS or email. You can use
        this to track the status and location of your package in real-time.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">📦 Packaging & Handling</h2>
      <p className="mb-4">
        Our team ensures that all products are carefully packaged to maintain freshness and prevent
        damage during transit. We use eco-friendly materials wherever possible.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">❗ Delivery Delays</h2>
      <p className="mb-4">
        While we strive to deliver on time, delays may occur due to unforeseen circumstances such as
        weather conditions, public holidays, or courier issues. We appreciate your patience and will
        notify you of any delays.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">📭 Missed Deliveries</h2>
      <p>
        If the recipient is unavailable at the time of delivery, our delivery partner will attempt
        re-delivery or contact you. Re-delivery charges may apply in such cases.
      </p>
    </div>
  );
};

export default ShippingDelivery;
