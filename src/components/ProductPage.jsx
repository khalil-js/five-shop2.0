import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from "./ProductCard";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-amber-50 to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-sky-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const imagePath = new URL(product.image, import.meta.url).href;
  const colors = ['Black', 'White', 'Navy', 'Gray'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select both color and size');
      return;
    }
    
    const cartItem = {
      ...product,
      color: selectedColor,
      size: selectedSize,
      quantity
    };
    
    addToCart(cartItem);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-amber-50 to-sky-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sky-600 hover:text-sky-700 mb-8 transition-colors duration-200"
        >
          <FaArrowLeft />
          <span>Back to Products</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
            <img
              src={imagePath}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-200"
            >
              {isFavorite ? (
                <FaHeart className="text-amber-500 text-xl" />
              ) : (
                <FaRegHeart className="text-amber-500 text-xl" />
              )}
            </button>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-sky-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1 bg-sky-100 px-3 py-1 rounded-full">
                  <FaStar className="text-amber-400" />
                  <span className="text-sky-800">4.5</span>
                </div>
                <span className="text-sky-600">|</span>
                <span className="text-sky-600">Free Shipping</span>
              </div>
              <p className="text-2xl font-bold text-amber-700 mb-4">${product.price}</p>
              <p className="text-sky-700">{product.description}</p>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-sky-900 mb-3">Color</h3>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === color
                        ? 'border-sky-600 bg-sky-50 text-sky-900'
                        : 'border-gray-200 hover:border-sky-300 text-gray-600'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-sky-900 mb-3">Size</h3>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-sky-600 bg-sky-50 text-sky-900'
                        : 'border-gray-200 hover:border-sky-300 text-gray-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-sky-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-200 hover:border-sky-300 text-gray-600"
                >
                  -
                </button>
                <span className="text-xl font-semibold text-sky-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-200 hover:border-sky-300 text-gray-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors duration-200 flex items-center justify-center gap-2 text-lg font-semibold"
            >
              <FaShoppingBag />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Recommended Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-sky-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 3)
              .map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
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

export default ProductPage;
