// src/components/ProductsSection.jsx
import React from "react";
import ProductCard from "./ProductCard";
import { products } from "../data/products";

const ProductsSection = () => {
  // Get a mix of men's and women's products for the featured section
  const featuredProducts = products
    .filter(p => p.category === "shirts" || p.category === "dresses")
    .slice(0, 3);

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Popular Right Now
          </h2>
          <p className="text-gray-400 text-lg">
            Don't miss out on our most trending items
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
