import React from "react";
import {
  Cake,
  Glasses,
  Heart,
  Gem,
  HandHeart,
  Medal
} from "lucide-react";


const categories = [
  { label: "Birthday", icon: <Cake size={28} /> },
  { label: "Anniversary", icon: <Glasses size={28} /> },
  { label: "Wedding", icon: <Gem size={28} /> },
  { label: "Sympathy", icon: <HandHeart size={28} /> },
  { label: "Congratulations", icon: <Medal size={28} /> },
  { label: "Love & Romance", icon: <Heart size={28} /> },
];


const OccasionCategories = () => {
  return (
    <section className="bg-pink-50 py-12 min-h-screen" >
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-2xl md:text-3xl font-semibold  mb-8">
          Shop by Occasion
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
          {categories.map((category) => (
            <div
              key={category.label}
              className="flex flex-col items-center gap-2"
            >
              <div className="bg-white rounded-full shadow-md w-16 h-16 flex items-center justify-center hover:scale-105 transition">
                {category.icon}
              </div>
              <span className="text-sm font-medium ">
                {category.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OccasionCategories;
