import React from "react";
import { Link } from "react-router-dom";

const ProductMenuList = ({ category, activeBrand, products }) => {
  const getProducts = (category, brand) => {
    return products.filter(p => p.category === category && (brand ? p.brand === brand : true));
  };

  return (
    <div className="flex pl-4">
      {getProducts(category, activeBrand).slice(0, 4).map((product) => (
        <div key={product.id} className="relative border border-gray-200 p-2 min-w-[200px] max-w-[220px]">
          {product.tagSale && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 text-xs font-bold rounded-sm">
              {product.tagSale}
            </div>
          )}
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.name} className="w-full h-[160px] object-cover" />
          </Link>
          <p className="mt-2 text-sm font-medium text-gray-700">{product.name}</p>
          <div className="flex items-center space-x-2">
            <p className="text-red-500">{product.priceNow}</p>
            {product.priceOld && (
              <p className="text-gray-500 line-through">{product.priceOld}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductMenuList;
