import React, { useState } from "react";
import { useSearch } from "../context/SearchContext";
import { products } from "../data/products";
import ProductCategory from "./ProductCategory";

const Men = () => {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const { searchQuery } = useSearch();

  const menProducts = products.filter(p => p.gender === "men");
  
  const filtered = menProducts.filter(p => {
    const matchCategory = category === "all" || p.category === category;
    const matchSearch = searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchPrice = priceRange === "all" || 
      (priceRange === "under50" && p.price < 50) ||
      (priceRange === "50to100" && p.price >= 50 && p.price <= 100) ||
      (priceRange === "100to200" && p.price > 100 && p.price <= 200) ||
      (priceRange === "over200" && p.price > 200);
    return matchCategory && matchSearch && matchPrice;
  });

  const categories = [...new Set(menProducts.map(p => p.category))];
  const filteredCategories = category === "all" 
    ? categories 
    : categories.filter(cat => cat === category);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-amber-50">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-sky-900">Men's Collection</h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 sm:mb-8">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white text-sky-900 w-full sm:w-1/4 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white text-sky-900 w-full sm:w-1/4 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Prices</option>
            <option value="under50">Under $50</option>
            <option value="50to100">$50 - $100</option>
            <option value="100to200">$100 - $200</option>
            <option value="over200">Over $200</option>
          </select>
        </div>

        <div className="w-full">
          {filteredCategories.map((cat) => {
            const categoryProducts = filtered.filter(p => p.category === cat);
            if (categoryProducts.length === 0) return null;
            return (
              <ProductCategory
                key={cat}
                title={cat.charAt(0).toUpperCase() + cat.slice(1)}
                products={categoryProducts}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Men;
