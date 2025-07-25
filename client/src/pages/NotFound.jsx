import { Link } from "react-router-dom"
// import styles from "./NotFound.module.css"

const NotFound = () => {
  return (
    <div className="flex items-center  text-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full lg:w-2/3 text-center">
            <div className="p-8 md:p-12">

              <h1 className="text-3xl md:text-[2rem] font-bold mb-6 ">Oops! Page Not Found</h1>
              <p className="text-lg md:text-xl leading-relaxed mb-12 ">
                The page you're looking for seems to have wilted away. Don't worry, our beautiful flowers are still
                blooming elsewhere on our site!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 flex-wrap">
                <Link
                  to="/"
                  className="px-8 py-4 rounded-lg no-underline font-semibold transition-all duration-300 flex items-center justify-center button-bg  border-2 border-transparent  button-bg:hover "  >
                  <i className="fas fa-home mr-2"></i>
                  Go Home
                </Link>
                <Link
                  to="/shop"
                  className="px-8 py-4 rounded-lg no-underline font-semibold transition-all duration-300 flex items-center justify-center button-bg  border-2 border-transparent  button-bg:hover "  >
                  <i className="fas fa-shopping-bag mr-2"></i>
                  Browse Flowers
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
