import React from "react";
import { Link } from "react-router-dom";
import womanImage from "../assets/img/pexels-celine-3776818-14344830.jpg";
import middleBanner from "../assets/img/Adobe Express - file - Copie.png";
import manImage from "../assets/img/Stay Warm and Stylish_ Casual Winter Outfits for Men! 160.jpeg";

const BannerSplit = () => {
  return (
    <div className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Explore Our Collections
        </h2>
        <div className="flex justify-center items-center gap-8 flex-wrap">
          {/* Woman */}
          <div className="relative group">
            <div className="overflow-hidden rounded-lg shadow-2xl">
              <img 
                src={womanImage} 
                alt="Woman" 
                className="max-w-xs md:max-w-md transform group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <Link
              to="/women"
              className="absolute bottom-6 left-1/2 -translate-x-1/2 transform bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-full text-lg font-bold uppercase tracking-wide hover:bg-white/20 hover:text-black transition-all duration-300 shadow-lg"
            >
              Women
            </Link>
          </div>

          {/* Center Image */}
          <div className="hidden lg:block transform hover:scale-105 transition-transform duration-500">
            <img src={middleBanner} alt="Banner" className="max-h-[500px] rounded-lg shadow-2xl" />
          </div>

          {/* Man */}
          <div className="relative group">
            <div className="overflow-hidden rounded-lg shadow-2xl">
              <img 
                src={manImage} 
                alt="Man" 
                className="max-w-xs md:max-w-md transform group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <Link
              to="/men"
              className="absolute bottom-6 left-1/2 -translate-x-1/2 transform bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-full text-lg font-bold uppercase tracking-wide hover:bg-white/20 hover:text-black transition-all duration-300 shadow-lg"
            >
              Men
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSplit;
