import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import heroBanner from "../assets/img/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative w-full h-[85vh] ">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
        <img 
          src={heroBanner} 
          alt="Hero Banner" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Elevate Your Style with{" "}
            <span className="text-sky-400">Five.Shop</span>
        </h1>
          <p className="text-xl text-gray-200 mb-4">
            Discover the latest trends in fashion and express your unique style.
        </p>
          <p className="text-lg text-gray-300 mb-8">
            From casual essentials to statement pieces, we've got everything you need to create your perfect look.
          </p>
          <div className="flex gap-4">
            <Link
              to="/men"
              className="group px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/30"
            >
              Shop Men
              <FaArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
        <Link
              to="/women"
              className="group px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm"
        >
              Shop Women
              <FaArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
