
import React, { useState } from "react";
import { FaShoppingBag, FaHeart, FaStar, FaRegHeart, FaEye } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      className="group relative bg-gradient-to-b from-sky-50 to-amber-50 rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col border border-sky-200 hover:border-sky-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
              onError={(e) => {
                e.target.src = "https://placehold.co/400x500/1a1a1a/ffffff?text=Product+Image";
              }}
            />
           
            <div className="absolute inset-0 bg-gradient-to-t from-sky-900/90 via-sky-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            <button 
              onClick={handleFavorite}
              className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full transform translate-x-12 group-hover:translate-x-0 transition-all duration-300 hover:bg-white hover:scale-110 cursor-pointer"
            >
              {isFavorite ? (
                <FaHeart className="text-amber-500 text-lg" />
              ) : (
                <FaRegHeart className="text-amber-500 text-lg" />
              )}
            </button>
            <button 
              onClick={handleAddToCart}
              className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full transform translate-x-12 group-hover:translate-x-0 transition-all duration-300 hover:bg-white hover:scale-110 cursor-pointer"
            >
              <FaShoppingBag className="text-sky-500 text-lg" />
            </button>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 bg-sky-500/90 backdrop-blur-sm text-white text-sm font-medium rounded-full">
              {product.category}
            </span>
          </div>

          {/* View More Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <Link
              to={`/product/${product.id}`}
              className="px-8 py-3 bg-sky-600 text-white rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-sky-700 cursor-pointer flex items-center gap-2"
            >
              <FaEye className="text-lg" />
              <span>View More</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-sky-900 group-hover:text-sky-700 transition-colors duration-300 line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-1 bg-sky-100 px-2 py-1 rounded-full">
            <FaStar className="text-amber-400" />
            <span className="text-sky-800 text-sm">4.5</span>
          </div>
        </div>
        <p className="text-sky-700 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-sky-200">
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold text-amber-700">${product.price}</span>
            <span className="text-sky-600 text-xs sm:text-sm">Free Shipping</span>
          </div>
        </div>
      </div>

      {/* Toast Message */}
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-sky-600 text-white px-6 py-3 rounded-full animate-fade-in-out z-50">
          Added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductCard;

