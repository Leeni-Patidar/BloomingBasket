// import styles from "./Testimonials.module.css"

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely beautiful flowers! The arrangement exceeded my expectations and arrived fresh and on time.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment: "Perfect for our anniversary. The custom bouquet was exactly what we wanted. Highly recommend!",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Emily Davis",
      rating: 5,
      comment: "Great service and stunning flowers. The team helped me create the perfect wedding bouquet.",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Read reviews from our happy customers who trust us with their special moments
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full lg:w-1/3 md:w-1/2 px-4 mb-8">
              <div className="bg-white rounded-xl p-8 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg h-full flex flex-col justify-between">
                <div className="mb-6">
                  <div className="flex justify-center gap-0.5 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star text-yellow-400 text-lg"></i>
                    ))}
                  </div>
                  <p className="italic text-gray-700 leading-relaxed text-center m-0">"{testimonial.comment}"</p>
                </div>
                <div className="flex items-center justify-center gap-4">
                  {/* <img src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" /> */}
                  <span className="font-semibold text-gray-800">{testimonial.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
