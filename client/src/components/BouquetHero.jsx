import React from "react";
import { Link } from "react-router-dom";


const BouquetHero = () => {
  return (
    <section className=" py-5">
      <div className="max-w-full mx-auto px-6 md:px-8 lg:px-10">
        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
          
          {/* Left Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-semibold  mb-4">
              Create Your Perfect Bouquet
            </h2>
            <p className=" mb-6">
              Design your own unique arrangement with our custom bouquet
              builder. Choose your favorite flowers, colors, and style.
            </p>
            <Link to="/customize">
              <button className="px-6 py-3 rounded-full button-bg button-bg:hover transition">
                Start Creating
              </button>
            </Link>
          </div>

          {/* Right Section - Image */}
          <div className="md:w-1/2">
            <img
  src="/home2.jpg"
  alt="Bouquet"
  className="rounded-xl w-full object-cover shadow-md"
/>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BouquetHero;
