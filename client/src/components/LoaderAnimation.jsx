const LoaderAnimation = () => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        {/* Floating Petals */}
        <div className="floating-petals">
          <div className="floating-petal petal-float-1">🌸</div>
          <div className="floating-petal petal-float-2">🌺</div>
          <div className="floating-petal petal-float-3">🌼</div>
          <div className="floating-petal petal-float-4">🌻</div>
          <div className="floating-petal petal-float-5">🌷</div>
        </div>

        {/* Brand Section */}
        <div className="loader-brand">
          <h1 className="brand-text">🌸 Blooming Basket</h1>
          <p className="brand-tagline">Where flowers bloom, hearts flourish</p>
        </div>

        {/* Flower Loader */}
        <div className="flower-loader">
          <div className="flower-center">
            <div className="petal petal-1"></div>
            <div className="petal petal-2"></div>
            <div className="petal petal-3"></div>
            <div className="petal petal-4"></div>
            <div className="petal petal-5"></div>
            <div className="petal petal-6"></div>
            <div className="flower-core"></div>
          </div>
        </div>

        {/* Loading Progress */}
        <div className="loading-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p className="loading-text">Preparing your garden...</p>
        </div>
      </div>
    </div>
  )
}

export default LoaderAnimation
