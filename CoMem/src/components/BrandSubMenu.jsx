import React from "react";
import { FaAngleRight } from "react-icons/fa6";

const BrandSubMenu = ({ brands, setActiveBrand, activeBrand }) => {
  return (
    <div className="w-[250px] border-r border-gray-200 pr-4">
      <ul>
        {brands.slice(0, 5).map((brand, idx) => (
          <li
            key={idx}
            onMouseEnter={() => setActiveBrand(brand)}
            className={`p-2 cursor-pointer transition ${activeBrand === brand ? "bg-gray-200" : "hover:bg-gray-100"}`}
          >
            <span className="flex items-center justify-between text-gray-700">
              {brand}
              <FaAngleRight className="text-gray-400 ml-2" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandSubMenu;
