const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-success text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">About Blooming Basket</h1>
              <p className="lead">
                For over 20 years, we've been bringing the beauty of fresh flowers to life's most precious moments. Our
                passion for floral artistry and commitment to quality has made us a trusted name in the community.
              </p>
            </div>
            <div className="col-lg-6">
              <img src="/placeholder.svg?height=400&width=600" alt="Our flower shop" className="img-fluid rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-5 fw-bold mb-4">Our Story</h2>
              <p className="lead text-muted mb-4">
                Founded in 2003 by master florist Sarah Johnson, Blooming Basket began as a small neighborhood flower
                shop with a simple mission: to create beautiful, meaningful floral arrangements that celebrate life's
                special moments.
              </p>
              <p className="text-muted">
                What started as a passion project has grown into a full-service floral design studio, serving customers
                across the region with fresh, locally-sourced flowers and custom arrangements. We believe that flowers
                have the power to express what words cannot, and we're honored to be part of your most important
                celebrations and milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Our Values</h2>
            <p className="lead text-muted">What drives us every day</p>
          </div>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card border-0 h-100 text-center">
                <div className="card-body">
                  <i className="fas fa-leaf fa-3x text-success mb-3"></i>
                  <h5 className="card-title">Freshness</h5>
                  <p className="card-text text-muted">
                    We source our flowers daily from local farms and trusted suppliers to ensure every arrangement
                    features the freshest blooms.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card border-0 h-100 text-center">
                <div className="card-body">
                  <i className="fas fa-heart fa-3x text-success mb-3"></i>
                  <h5 className="card-title">Craftsmanship</h5>
                  <p className="card-text text-muted">
                    Each arrangement is carefully crafted by our skilled florists who bring years of experience and
                    artistic vision to every design.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card border-0 h-100 text-center">
                <div className="card-body">
                  <i className="fas fa-users fa-3x text-success mb-3"></i>
                  <h5 className="card-title">Service</h5>
                  <p className="card-text text-muted">
                    We're committed to providing exceptional customer service and making every interaction with us a
                    delightful experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Meet Our Team</h2>
            <p className="lead text-muted">The talented people behind Blooming Basket</p>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card border-0 text-center">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  className="card-img-top rounded-circle mx-auto mt-3"
                  alt="Sarah Johnson"
                  style={{ width: "200px", height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Sarah Johnson</h5>
                  <p className="text-success">Founder & Master Florist</p>
                  <p className="card-text text-muted">
                    With over 25 years of experience, Sarah brings artistic vision and passion to every arrangement.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card border-0 text-center">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  className="card-img-top rounded-circle mx-auto mt-3"
                  alt="Michael Chen"
                  style={{ width: "200px", height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Michael Chen</h5>
                  <p className="text-success">Senior Floral Designer</p>
                  <p className="card-text text-muted">
                    Michael specializes in wedding arrangements and large-scale event florals with modern aesthetic.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card border-0 text-center">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  className="card-img-top rounded-circle mx-auto mt-3"
                  alt="Emma Rodriguez"
                  style={{ width: "200px", height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Emma Rodriguez</h5>
                  <p className="text-success">Customer Experience Manager</p>
                  <p className="card-text text-muted">
                    Emma ensures every customer receives personalized attention and exceptional service from order to
                    delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Awards & Recognition</h2>
            <p className="lead text-muted">Honored to be recognized by our community</p>
          </div>

          <div className="row text-center">
            <div className="col-md-3 mb-4">
              <i className="fas fa-trophy fa-3x text-warning mb-3"></i>
              <h5>Best Florist 2023</h5>
              <p className="text-muted">City Business Awards</p>
            </div>
            <div className="col-md-3 mb-4">
              <i className="fas fa-star fa-3x text-warning mb-3"></i>
              <h5>5-Star Rating</h5>
              <p className="text-muted">Google Reviews</p>
            </div>
            <div className="col-md-3 mb-4">
              <i className="fas fa-certificate fa-3x text-warning mb-3"></i>
              <h5>Certified Florist</h5>
              <p className="text-muted">Professional Florists Association</p>
            </div>
            <div className="col-md-3 mb-4">
              <i className="fas fa-heart fa-3x text-warning mb-3"></i>
              <h5>Community Choice</h5>
              <p className="text-muted">Local Community Awards</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
