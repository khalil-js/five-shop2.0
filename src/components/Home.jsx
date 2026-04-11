import React from 'react';
import Hero from './Hero';
import ProductsSection from './ProductsSection';
import BannerSplit from './BannerSplit';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProductsSection />
      <BannerSplit />
    </div>
  );
};

export default Home; 