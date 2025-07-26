import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center  ">
      <div className="container mx-auto relative z-10 px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-80px)] gap-y-12 lg:gap-x-16">
          {/* Left: Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Beautiful Flowers for Every
              <span className="text-[#f080ad]"> Special Moment</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-8">
              Discover our stunning collection of fresh flowers, custom bouquets, and floral arrangements. Perfect for
              weddings, birthdays, anniversaries, and every celebration in between.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/shop"
                className="px-8 py-4 no-underline font-semibold transition-all rounded-full duration-300 flex items-center justify-center button-bg border-2 border-transparent button-bg:hover"
              >
                Shop Now
              </Link>
              <Link
                to="/customize"
                className="px-8 py-4 no-underline font-semibold transition-all rounded-full duration-300 flex items-center justify-center button-bg border-2 border-transparent button-bg:hover"
              >
                Customize Bouquet
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="w-full lg:w-1/2 text-center relative z-10">
            <img
              src="/home.png?height=200&width=200"
              alt="Beautiful flower bouquet"
              className="max-w-[90%] md:max-w-[400px] h-auto rounded-2xl shadow-2xl animate-float mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
