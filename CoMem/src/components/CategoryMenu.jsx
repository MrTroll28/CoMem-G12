import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import BrandSubMenu from "./BrandSubMenu";
import ProductMenuList from "./ProductMenuList";

const CategoryMenu = ({ category, products, setHoveredCategory, hoveredCategory, activeBrand, setActiveBrand }) => {
  const getBrandsByCategory = (category) => {
    const filtered = products.filter(p => p.category === category);
    return [...new Set(filtered.map(p => p.brand))];
  };

  return (
    <li
      className="relative group"
      onMouseEnter={() => setHoveredCategory(category)}
      onMouseLeave={() => {
        setHoveredCategory(null);
        setActiveBrand(null);
      }}
    >
      <Link
        to={`/product?category=${category}`}
        className="inline-flex items-center text-white font-medium text-[15.5px] h-[42px] px-[15px] capitalize hover:border-b-2 border-grey-500 ease-in-out transition-all"
      >
        {category}
      </Link>

      {hoveredCategory === category && (
        <div className="absolute top-full left-0 flex bg-white shadow-lg border-t-4 border-gray-300 z-50 w-[1100px] min-h-[300px] p-4">
          <BrandSubMenu 
            brands={getBrandsByCategory(category)} 
            setActiveBrand={setActiveBrand}
            activeBrand={activeBrand} 
          />
          <ProductMenuList 
            category={category} 
            activeBrand={activeBrand} 
            products={products} 
          />
        </div>
      )}
    </li>
  );
};

export default CategoryMenu;
