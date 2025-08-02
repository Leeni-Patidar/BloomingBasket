import React from "react";
import { Link } from "react-router-dom";

const bouquetCategories = [
  { name: "Flower Bouquet", image: "/images/categories/flower.jpg" },
  { name: "Chocolate Bouquet", image: "/images/categories/chocolate.jpg" },
  { name: "Soft Toy Bouquet", image: "/images/categories/softtoy.jpg" },
  { name: "Pipecleaner Bouquet", image: "/images/categories/pipecleaner.jpg" },
  { name: "Butterfly Bouquet", image: "/images/categories/butterfly.jpg" },
  { name: "Hair Clip Bouquet", image: "/images/categories/hairclip.jpg" },
  { name: "Crochet Bouquet", image: "/images/categories/crochet.jpg" },
  { name: "Origami Bouquet", image: "/images/categories/origami.jpg" },
  { name: "Fruit Bouquet", image: "/images/categories/fruit.jpg" },
  { name: "Skincare Bouquet", image: "/images/categories/skincare.jpg" },
];

const CategoryGrid = () => {
  return (
    <div className="p-4">
        <div className="max-w-6xl mx-auto text-center px-4">
      <h2 className="text-2xl md:text-3xl font-semibold  mb-8">
          Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
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
      </div>
    </div>
  );
};

export default CategoryGrid;
