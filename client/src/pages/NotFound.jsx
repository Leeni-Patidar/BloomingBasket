import { Link } from "react-router-dom"
// import styles from "./NotFound.module.css"

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center py-8 bg-gradient-to-br from-[#FDF2F8] to-white text-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full lg:w-2/3 text-center">
            <div className="p-8 md:p-12">
              {/* <div className="text-8xl font-bold leading-none mb-4 text-shadow opacity-80">404</div> */}
              {/* <div className="text-6xl mb-8 opacity-90">
                <i className="fas fa-seedling"></i>
              </div> */}
              <h1 className="text-3xl md:text-[2.5rem] font-bold mb-6 text-shadow">Oops! Page Not Found</h1>
              <p className="text-lg md:text-xl leading-relaxed mb-12 text-shadow-sm">
                The page you're looking for seems to have wilted away. Don't worry, our beautiful flowers are still
                blooming elsewhere on our site!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 flex-wrap">
                <Link
                  to="/"
                  className="px-8 py-4 rounded-lg no-underline font-semibold transition-all duration-300 flex items-center justify-center bg-white/20 text-black border-2 border-white hover:bg-[#f080ad] hover:text-white hover:-translate-y-0.5"
                >
                  <i className="fas fa-home mr-2"></i>
                  Go Home
                </Link>
                <Link
                  to="/shop"
                  className="px-8 py-4 rounded-lg no-underline font-semibold transition-all duration-300 flex items-center justify-center bg-gradient-to-br from-[#da81a4] to-[#fecfef] text-white border-2 border-transparent hover:bg-[#f080ad] hover:-translate-y-0.5 hover:text-white"
                >
                  <i className="fas fa-shopping-bag mr-2"></i>
                  Browse Flowers
                </Link>
              </div>
              <div className="bg-white/10 p-8 rounded-xl backdrop-blur-md">
                <h5 className="mb-4 font-semibold text-xl">You might be looking for:</h5>
                <ul className="list-none p-0 m-0">
                  <li className="mb-2 last:mb-0">
                    <Link
                      to="/shop"
                      className="text-black no-underline transition-colors duration-300 hover:text-[#f080ad] hover:underline"
                    >
                      Our Flower Collection
                    </Link>
                  </li>
                  <li className="mb-2 last:mb-0">
                    <Link
                      to="/customize"
                      className="text-black no-underline transition-colors duration-300 hover:text-[#f080ad] hover:underline"
                    >
                      Custom Bouquets
                    </Link>
                  </li>
                  <li className="mb-2 last:mb-0">
                    <Link
                      to="/about"
                      className="text-black no-underline transition-colors duration-300 hover:text-[#f080ad] hover:underline"
                    >
                      About Us
                    </Link>
                  </li>
                  <li className="mb-2 last:mb-0">
                    <Link
                      to="/contactUs"
                      className="text-black no-underline transition-colors duration-300 hover:text-[#f080ad] hover:underline"
                    >
                      Contact Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
