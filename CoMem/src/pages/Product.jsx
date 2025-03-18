import React, { useState } from 'react';
import { FiFilter, FiShoppingBag } from 'react-icons/fi';
import { MdCategory } from 'react-icons/md';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import '../css/product.css';

function Product() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <>
      <span className='fixed top-0 left-0 w-full z-50'>
        <Header />
      </span>
      <div className='min-h-screen bg-gray-50 pt-[100px] z-0'>
        <div className="container mx-auto px-4 py-8">
          {/* Title and Filter Section */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
              <FiShoppingBag className="text-[var(--color-primary)]" />
              Our Products
            </h1>
            <div className="flex items-center gap-2">
              <FiFilter className="text-[var(--color-primary)]" />
              <span className="text-gray-600">Filter by:</span>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex justify-center space-x-4">
            {['All', 'Clothing', 'Accessories'].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                  selectedCategory === category
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <MdCategory />
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid - Updated to always show 3 columns */}
          <div className="grid grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Product;
