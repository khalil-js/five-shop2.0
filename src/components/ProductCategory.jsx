import React from "react";
import ProductCard from "./ProductCard";

const ProductCategory = ({ title, products }) => {
  if (!products.length) return null;

  return (
    <section className="mb-8 sm:mb-12">
      <h2 className="text-xl sm:text-2xl font-bold text-sky-900 border-b border-sky-200 mb-4 sm:mb-6">{title}</h2>
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6" style={{ maxWidth: '1280px', width: '100%' }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategory;
