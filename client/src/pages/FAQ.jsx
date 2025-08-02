

import { useState } from "react"
// import styles from "./FAQ.module.css"

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      question: "How fresh are your flowers?",
      answer:
        "All our flowers are sourced directly from trusted growers and are delivered within 24-48 hours of being cut. We guarantee freshness and quality with every order.",
    },
    {
      question: "What areas do you deliver to?",
      answer:
        "We currently deliver nationwide across the United States. Delivery times may vary based on location, but most orders are delivered within 1-3 business days.",
    },
    {
      question: "Can I schedule a delivery for a specific date?",
      answer:
        "Yes! You can choose your preferred delivery date during checkout. We recommend ordering at least 2 days in advance for special occasions to ensure availability.",
    },
    {
      question: "What if I'm not satisfied with my order?",
      answer:
        "We offer a 100% satisfaction guarantee. If you're not completely happy with your flowers, please contact us within 24 hours of delivery and we'll make it right.",
    },
    {
      question: "Do you offer same-day delivery?",
      answer:
        "Same-day delivery is available in select metropolitan areas for orders placed before 12 PM. Additional fees may apply.",
    },
    {
      question: "How should I care for my flowers?",
      answer:
        "Cut stems at an angle under running water, place in clean vase with fresh water, remove leaves below waterline, and change water every 2-3 days. Keep away from direct sunlight and heat sources.",
    },
    {
      question: "Can I customize my bouquet?",
      answer:
        "Use our custom bouquet builder to create a personalized arrangement. Choose your flowers, colors, size, and add a personal message.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and cash on delivery in select areas.",
    },
    {
      question: "Do you offer corporate or bulk orders?",
      answer:
        "Yes, we offer special pricing for corporate events, weddings, and bulk orders. Please contact our customer service team for a custom quote.",
    },
    {
      question: "What happens if no one is home during delivery?",
      answer:
        "Our delivery team will attempt to leave flowers in a safe location or with a neighbor. If unsuccessful, we'll contact you to reschedule delivery.",
    },
  ]

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className=" ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-0.5  rounded-2xl text-black">
          <h1 className="text-3xl md:text-[2rem] font-bold mb-4 ">Frequently Asked Questions</h1>
          <p className="text-[1rem] mb-4">
            Find answers to common questions about our flowers and services
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full lg:w-2/3">
            <div className="mb-16">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl mb-4 shadow-md overflow-hidden">
                  <button
                    className={`w-full bg-transparent border-none p-6 md:p-8 text-left flex justify-between items-center text-lg font-semibold  cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-50 ${
                      activeIndex === index ? "bg-[#fecfef] text-black" : ""
                    }`}
                    onClick={() => toggleFAQ(index)}
                  >
                    <span>{faq.question}</span>
                    <i
                      className={`fas fa-chevron-down transition-transform duration-300 ease-in-out ${
                        activeIndex === index ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>
                  <div
                    className={`max-h-0 overflow-hidden transition-all duration-300 ease-in-out ${
                      activeIndex === index ? "max-h-48" : ""
                    }`}
                  >
                    <p className="px-8 pb-6 m-0  leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default FAQ
