import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

import './mainpage.css'

function HeroSection() {

  const HERO_ILLUSTRATION_URL = 'bg1.png';

  return (
    <section className="flex flex-col items-center justify-between min-h-screen p-6 mt-10 overflow-hidden font-sans lg:flex-row lg:p-20">


      <div className="z-10 w-full mb-12 space-y-6 text-center lg:w-1/2 lg:text-left lg:space-y-8 lg:mb-0">


        <h1 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Explore Stories in
          <span className="text-purple-600"> Travel, Food, Lifestyle, Art </span>
          & More
        </h1>


        <p className="max-w-xl mx-auto text-lg text-gray-600 sm:text-xl lg:mx-0">
          Discover travel adventures, delicious food journeys, creative art, soulful music, lifestyle ideas, and the latest fashion trends. Dive into stories that spark curiosity and inspiration.
        </p>

        {/* Button */}
        <a
          href="/blog"
          className="inline-block px-10 py-4 text-lg font-bold text-white transition duration-300 ease-in-out transform bg-purple-600 rounded-full shadow-xl hover:bg-purple-700 hover:shadow-lg hover:-translate-y-1 shadow-purple-300/60"
        >
          Explore
        </a>
      </div>


      <div className="relative flex justify-center w-full lg:w-1/2">

        <div className="absolute w-56 h-56 bg-purple-300 rounded-full opacity-50 top-10 left-5 mix-blend-multiply filter blur-xl animate-blob"></div>


        <div className="absolute right-0 w-64 h-64 bg-pink-300 rounded-full opacity-50 bottom-10 mix-blend-multiply filter blur-xl animate-blob custom-delay-2000"></div>


        <div className="absolute w-40 h-40 transform -translate-x-1/2 -translate-y-1/2 bg-purple-500 rounded-full top-1/2 left-1/4 mix-blend-multiply filter blur-xl opacity-30 animate-blob custom-delay-4000"></div>

        <div className="relative z-10 w-full max-w-md p-0 lg:max-w-lg aspect-square ">

          <img
            src={HERO_ILLUSTRATION_URL}
            alt="People connecting with stories via a hashtag"
            className="object-contain w-full h-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
