import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-gradient-primary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card shadow-xl border-0 rounded-2xl">
              <div className="card-body p-5 text-center">
                {/* 404 Icon */}
                <div className="mb-4">
                  <i className="fas fa-seedling text-primary" style={{ fontSize: "5rem" }}></i>
                </div>

                {/* 404 Title */}
                <h1 className="display-1 fw-bold text-primary mb-3">404</h1>
                <h2 className="h3 mb-4 text-secondary">Oops! This garden path doesn't exist</h2>

                {/* Description */}
                <div className="mb-5">
                  <p className="text-muted lead mb-3">
                    It seems like you've wandered into an uncharted part of our garden. The page you're looking for
                    might have been moved, deleted, or is currently under construction.
                  </p>
                  <p className="text-muted">
                    Don't worry though - our beautiful flowers are still blooming on the main paths!
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="mb-4">
                  <span className="h2 me-3">🌸</span>
                  <span className="h2 me-3">🌺</span>
                  <span className="h2 me-3">🌼</span>
                  <span className="h2 me-3">🌻</span>
                  <span className="h2">🌷</span>
                </div>

                {/* Action Buttons */}
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <Link to="/" className="btn btn-primary btn-lg px-4">
                    <i className="fas fa-home me-2"></i>
                    Back to Garden
                  </Link>
                  <Link to="/shop" className="btn btn-outline-primary btn-lg px-4">
                    <i className="fas fa-store me-2"></i>
                    Browse Flowers
                  </Link>
                </div>

                {/* Help Section */}
                <div className="mt-5 pt-4 border-top">
                  <h5 className="text-secondary mb-3">What you can do:</h5>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <div className="p-3 bg-light rounded">
                        <i className="fas fa-search text-primary mb-2 d-block h4"></i>
                        <small className="text-muted">
                          <strong>Search</strong>
                          <br />
                          Look for specific flowers
                        </small>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="p-3 bg-light rounded">
                        <i className="fas fa-phone text-primary mb-2 d-block h4"></i>
                        <small className="text-muted">
                          <strong>Contact Us</strong>
                          <br />
                          Get help from our team
                        </small>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="p-3 bg-light rounded">
                        <i className="fas fa-heart text-primary mb-2 d-block h4"></i>
                        <small className="text-muted">
                          <strong>Explore</strong>
                          <br />
                          Discover new arrangements
                        </small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Message */}
                <div className="mt-4">
                  <small className="text-muted">
                    If you believe this is an error, please{" "}
                    <a href="mailto:support@bloomingbasket.com" className="text-primary">
                      contact our support team
                    </a>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
