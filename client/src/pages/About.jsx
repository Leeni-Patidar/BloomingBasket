"use client"
import { Link } from "react-router-dom"
const About = () => {
  return (
    <div className="">
      <div className="container mx-auto px-4">

        {/* Hero Image */}
        <div className="w-full mb-10">
          <img
            src="/about.jpg" // Replace with your actual image path
            alt="Cherry blossoms"
            className="w-full h-auto max-h-[500px] object-cover rounded-xl"
          />
        </div>

        {/* Our Mission */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 ">Our Mission</h2>
          <div className="max-w-4xl mx-auto  text-base md:text-lg leading-relaxed px-2 md:px-6 ">
            <p className="mb-4">
              At Blooming Basket, our mission is simple yet profound: to bring joy, beauty, and thoughtfulness to every occasion through the timeless gift of flowers.We believe that flowers have the power to express emotions, celebrate milestones, and brighten any space. We are committed to providing only the freshest, most beautiful blooms, sourced from trusted growers with a focus on sustainability and quality.Each bouquet is designed with love and care, offering a personalized experience that transforms any floral arrangement into something truly special.
            </p>
            
            <p>
              Our goal is to make every moment memorable. Whether it's a heartfelt gift or a treat for yourself, Blooming Basket brings a smile and a touch of nature’s beauty to your door.
            </p>
          </div>
        </section>

        {/* Why Choose */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 ">Why Choose Blooming Basket?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🌸", title: "Fresh Picks", desc: "Handpicked daily from trusted farms" },
              { icon: "🖌️", title: "Custom Designs", desc: "Tailored to your message or event" },
              { icon: "🚚", title: "Same-Day Delivery", desc: "Fast delivery, even last minute" },
              { icon: "🌿", title: "Eco-Friendly", desc: "Committed to sustainable practices" }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white text-center p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h5 className="text-lg font-semibold mb-2">{item.title}</h5>
                <p className=" text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-16 flex flex-col lg:flex-row items-center ">
          <div className="w-full lg:w-1/3">
            <img
              src="/about2.png" 
              alt="Florist"
              className="w-90 rounded-xl shadow-md"
            />
          </div>
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 ">Our Story</h2>
            <p className=" leading-relaxed text-base md:text-lg text-justify" >
             Blooming Basket was born out of a simple yet powerful love for flowers and the belief that each bloom has a unique way of expressing emotions. What started as a small dream to share the beauty of nature with others quickly grew into a passion to make every occasion brighter and more memorable through carefully curated floral arrangements.
Our founder’s journey began with a deep appreciation for the magic flowers bring — from the joy of receiving a fresh bouquet to the comforting power they hold during life’s most significant moments. With this in mind, Blooming Basket was created to offer more than just flowers; we wanted to provide a heartfelt experience that connects people and celebrates their special moments.
Today, we continue to pour that same passion and care into every bouquet we create. Whether it’s for a birthday, anniversary, or just because, we aim to deliver beauty, joy, and warmth to our customers’ lives. 
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center mt-16">
          <h2 className="text-2xl md:text-3xl font-bold  mb-4">
            Ready to Create Something Beautiful?
          </h2>
          <p className=" mb-6">
            Let us help you design the perfect floral arrangement for any occasion.
          </p>
          <div className="flex justify-center gap-4">
           <Link
                  to="/shop"
                  className="px-8 py-4 rounded-lg no-underline font-semibold transition-all duration-300 flex items-center justify-center button-bg  border-2 border-transparent  button-bg:hover "  >
                  
                  Shop Now
                </Link>
            <Link
                  to="/contactUs"
                  className="px-8 py-4 rounded-lg no-underline font-semibold transition-all duration-300 flex items-center justify-center button-bg  border-2 border-transparent  button-bg:hover "  >
                  
                 Contact Us
                </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
