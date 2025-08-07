import React from "react";

const CancellationRefund = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 ">Cancellation and Refund Policy</h1>

      <p className="mb-4">
        At <strong>Blooming Basket</strong>, every order is crafted with care to ensure the
        freshest, highest-quality products are delivered to your doorstep.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">🚫 No Cancellation Policy</h2>
      <p className="mb-4">
        Once an order is placed, it <strong>cannot be cancelled</strong> for any reason. This
        includes standard, express, or customized product orders.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">🚫 No Return or Exchange</h2>
      <p className="mb-4">
        Due to the <strong>perishable and personalized nature</strong> of our products (including
        flowers, edibles, and custom bouquets), <strong>returns and exchanges are not accepted</strong>.
        All purchases made on Blooming Basket are considered final.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">📌 Exceptions</h2>
      <p className="mb-4">
        In rare cases where you receive a <strong>damaged or incorrect item</strong>, please reach
        out to our customer care team within <strong>24 hours of delivery</strong>, along with
        photos for verification. Our team may provide a replacement or store credit on a case-by-case basis.
      </p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Customer Support</h2>
        <p>
          📧 <strong>Email:</strong> info@bloomingbasket.com <br />
          📞 <strong>Phone:</strong> +91-XXXXXXXXXX
        </p>
      </div>
    </div>
  );
};

export default CancellationRefund;
