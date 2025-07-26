import React from "react";
import { Link } from "react-router-dom";

const bouquetCategories = [
  { name: "Flower Bouquet", image: "/images/flower.jpg" },
  { name: "Chocolate Bouquet", image: "/images/chocolate.jpg" },
  { name: "Soft Toy Bouquet", image: "/images/softtoy.jpg" },
  { name: "Pipecleaner Bouquet", image: "/images/pipecleaner.jpg" },
  { name: "Butterfly Bouquet", image: "/images/butterfly.jpg" },
  { name: "Fairy Light Bouquet", image: "/images/fairylight.jpg" },
  { name: "Crochet Bouquet", image: "/images/crochet.jpg" },
  { name: "Origami Bouquet", image: "/images/origami.jpg" },
  { name: "Fruit Bouquet", image: "/images/fruit.jpg" },
  { name: "Skincare Bouquet", image: "/images/skincare.jpg" },
];

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 p-4">
      {bouquetCategories.map((cat, index) => (
        <Link
          key={index}
          to={`/bouquets/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
          className="flex flex-col items-center text-center hover:text-[#ba54a9] transition"
        >
          <span className="text-sm md:text-base font-medium mb-2">
            {cat.name}
          </span>
          <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-md border border-gray-300">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
