import { Link } from "react-router-dom"
// import styles from "./HeroSection.module.css"

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-[#ff9a9e] to-[#fecfef] min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-10 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="w-full lg:w-1/2 text-center lg:text-left text-white mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-shadow">
              Beautiful Flowers for Every
              <span className="text-[#f080ad]"> Special Moment</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-8 text-shadow-sm">
              Discover our stunning collection of fresh flowers, custom bouquets, and floral arrangements. Perfect for
              weddings, birthdays, anniversaries, and every celebration in between.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/shop"
                className="bg-red-500 border-none text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 ease-in-out hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Shop Now
              </Link>
              <Link
                to="/customize"
                className="bg-transparent border-2 border-white text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 ease-in-out hover:bg-white hover:text-red-500 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Customize Bouquet
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 text-center relative z-10">
            <img
              src="/home.png?height=200&width=200"
              alt="Beautiful flower bouquet"
              className="max-w-full h-auto rounded-2xl shadow-2xl animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
