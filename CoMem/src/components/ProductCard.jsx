import React from 'react';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { MdLocalOffer } from 'react-icons/md';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl hover:scale-102 z-0">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
          <FiHeart className="text-[var(--color-primary)] w-5 h-5" />
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <MdLocalOffer className="text-[var(--color-primary)]" />
          <span className="text-sm text-gray-600">{product.category}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-[var(--color-primary)]">
            ${product.price}
          </span>
          <button className="btn-primary flex items-center gap-2">
            <FiShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
