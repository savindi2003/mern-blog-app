import React from "react";

const categories = [
  {
    name: "Travel",
    description: "Explore amazing destinations around the world.",
    image: "/c1.jpg",
  },
  {
    name: "Food",
    description: "Delicious recipes and food adventures.",
    image: "/c2.jpg",
  },
  {
    name: "Lifestyle",
    description: "Tips and ideas to improve your lifestyle.",
    image: "/c3.png",
  },
  {
    name: "Art",
    description: "Discover creative artworks and artists.",
    image: "/c4.jpg",
  },
  {
    name: "Music",
    description: "Latest trends in music and entertainment.",
    image: "/c5.jpg",
  },
  {
    name: "Fashion",
    description: "Stay updated with fashion and style.",
    image: "/c6.jpg",
  },
];

const Categories = () => {
  return (
    <div className="container px-4 py-10 mx-auto">
     
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="relative overflow-hidden transition duration-300 transform shadow-lg cursor-pointer group rounded-xl hover:scale-105"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="object-cover w-full h-48 transition duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center transition duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
              <h3 className="mb-2 text-xl font-semibold text-white">
                {cat.name}
              </h3>
              <p className="text-sm text-white">{cat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
