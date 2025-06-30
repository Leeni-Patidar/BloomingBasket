import styles from "./Testimonials.module.css"

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
    <section className={styles.testimonials}>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2 className={styles.sectionTitle}>What Our Customers Say</h2>
            <p className={styles.sectionDescription}>
              Read reviews from our happy customers who trust us with their special moments
            </p>
          </div>
        </div>
        <div className="row">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="col-lg-4 col-md-6 mb-4">
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialContent}>
                  <div className={styles.stars}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  <p className={styles.comment}>"{testimonial.comment}"</p>
                </div>
                <div className={styles.testimonialAuthor}>
                  <img src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                  <span className={styles.authorName}>{testimonial.name}</span>
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
