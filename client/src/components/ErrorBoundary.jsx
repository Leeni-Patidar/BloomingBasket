"use client"

import React from "react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console or error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI - redirect to 404
      return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="text-center">
                <div className="error-template">
                  <h1 className="display-1 text-primary">
                    <i className="fas fa-exclamation-triangle"></i>
                  </h1>
                  <h2 className="h3 mb-3">Oops! Something went wrong</h2>
                  <div className="error-details mb-4">
                    <p className="text-muted">
                      We're sorry, but something unexpected happened. Our team has been notified and is working to fix
                      this issue.
                    </p>
                  </div>
                  <div className="error-actions">
                    <a href="/" className="btn btn-primary btn-lg me-3">
                      <i className="fas fa-home me-2"></i>
                      Take Me Home
                    </a>
                    <button className="btn btn-outline-secondary btn-lg" onClick={() => window.location.reload()}>
                      <i className="fas fa-redo me-2"></i>
                      Try Again
                    </button>
                  </div>
                  {process.env.NODE_ENV === "development" && (
                    <div className="mt-4 text-start">
                      <details className="bg-light p-3 rounded">
                        <summary className="text-danger fw-bold">Error Details (Development Mode)</summary>
                        <pre className="mt-2 text-sm">
                          {this.state.error && this.state.error.toString()}
                          <br />
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </details>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
