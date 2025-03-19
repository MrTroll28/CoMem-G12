import React from 'react';
import { Link } from 'react-router-dom';
const ProductCard = ({ product }) => {
  const { id, name, priceNow, priceOld, tagSale, image, category, link } = product;

  return (
    <div id={id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-64 object-cover"
        />
        {tagSale && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md">
            {tagSale}
          </span>
        )}
      </div>
      
      <div className="p-4">
        <span className="text-sm text-gray-500 mb-2 block">{category}</span>
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">${priceNow}</span>
          {priceOld && (
            <span className="text-sm text-gray-400 line-through">${priceOld}</span>
          )}
        </div>
        
        <Link 
          to={link} 
          className="mt-3 block text-center bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
