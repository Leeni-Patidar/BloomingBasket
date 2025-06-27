const FAQ = () => {
  const faqs = [
    {
      category: "Orders & Payment",
      questions: [
        {
          question: "How do I place an order?",
          answer:
            "You can place an order through our website by browsing our products, adding items to your cart, and proceeding to checkout. You can also call us at (555) 123-4567 or visit our store.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and cash on delivery for local orders.",
        },
        {
          question: "Can I modify or cancel my order?",
          answer:
            "Orders can be modified or cancelled up to 2 hours before the scheduled delivery time. Please contact us as soon as possible to make changes.",
        },
        {
          question: "Do you offer payment plans?",
          answer:
            "For large orders over $500 (such as wedding arrangements), we offer payment plans. Please contact us to discuss options.",
        },
      ],
    },
    {
      category: "Delivery & Shipping",
      questions: [
        {
          question: "What are your delivery areas?",
          answer:
            "We deliver within a 25-mile radius of our store. For areas outside this range, please contact us to discuss special arrangements.",
        },
        {
          question: "What are your delivery hours?",
          answer:
            "Standard delivery hours are Monday-Saturday 9 AM to 6 PM, and Sunday 10 AM to 4 PM. Special time requests may be accommodated for an additional fee.",
        },
        {
          question: "Do you offer same-day delivery?",
          answer:
            "Yes! Orders placed before 2 PM can be delivered the same day within our standard delivery area for an additional $15 fee.",
        },
        {
          question: "What if no one is home for delivery?",
          answer:
            "We'll attempt delivery and leave a note. You can authorize us to leave the arrangement in a safe location, or we can redeliver for a small fee.",
        },
      ],
    },
    {
      category: "Products & Care",
      questions: [
        {
          question: "How long do your flowers last?",
          answer:
            "With proper care, our flowers typically last 7-10 days. We provide care instructions with every arrangement and offer a 7-day freshness guarantee.",
        },
        {
          question: "Can I request specific flowers?",
          answer:
            "Yes! While we can't guarantee specific varieties due to seasonal availability, we'll do our best to accommodate your preferences. Custom arrangements are our specialty.",
        },
        {
          question: "Do you use pesticides on your flowers?",
          answer:
            "We source from farms that use minimal, eco-friendly treatments. Many of our flowers are organically grown. Please let us know if you have specific concerns.",
        },
        {
          question: "What should I do if my flowers arrive damaged?",
          answer:
            "Please contact us immediately with photos of the damaged arrangement. We'll either send a replacement or provide a full refund.",
        },
      ],
    },
    {
      category: "Custom Arrangements",
      questions: [
        {
          question: "How far in advance should I order custom arrangements?",
          answer:
            "For best results, we recommend ordering custom arrangements at least 3-5 days in advance. For weddings and large events, 2-4 weeks notice is preferred.",
        },
        {
          question: "Can you match a photo I provide?",
          answer:
            "We'll do our best to recreate arrangements from photos, though exact matches depend on flower availability. Our designers will suggest suitable alternatives if needed.",
        },
        {
          question: "Do you offer wedding packages?",
          answer:
            "Yes! We offer comprehensive wedding packages including bridal bouquets, boutonnieres, centerpieces, and ceremony decorations. Schedule a consultation to discuss your needs.",
        },
        {
          question: "Can I see my custom arrangement before delivery?",
          answer:
            "For large orders, we can arrange a preview appointment. For standard custom arrangements, we'll send photos before delivery upon request.",
        },
      ],
    },
  ]

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-success">Frequently Asked Questions</h1>
        <p className="lead text-muted">Find answers to common questions about our services</p>
      </div>

      <div className="row">
        <div className="col-lg-10 mx-auto">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-5">
              <h3 className="text-success mb-4">{category.category}</h3>
              <div className="accordion" id={`accordion-${categoryIndex}`}>
                {category.questions.map((faq, questionIndex) => (
                  <div key={questionIndex} className="accordion-item">
                    <h2 className="accordion-header" id={`heading-${categoryIndex}-${questionIndex}`}>
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${categoryIndex}-${questionIndex}`}
                        aria-expanded="false"
                        aria-controls={`collapse-${categoryIndex}-${questionIndex}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`collapse-${categoryIndex}-${questionIndex}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`heading-${categoryIndex}-${questionIndex}`}
                      data-bs-parent={`#accordion-${categoryIndex}`}
                    >
                      <div className="accordion-body">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-5">
        <div className="card bg-light">
          <div className="card-body p-4">
            <h4 className="mb-3">Still have questions?</h4>
            <p className="text-muted mb-3">
              Can't find the answer you're looking for? Our friendly customer service team is here to help!
            </p>
            <div className="d-flex justify-content-center gap-3">
              <a href="/contact-us" className="btn btn-success">
                Contact Us
              </a>
              <a href="tel:+15551234567" className="btn btn-outline-success">
                Call (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ
