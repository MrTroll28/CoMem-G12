import React, { useEffect, useState } from "react";
import CategoryMenu from "../CategoryMenu";

const Navigator = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [activeBrand, setActiveBrand] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const uniqueCategories = [...new Set(data.map(p => p.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error("Lỗi tải sản phẩm:", err));
  }, []);

  return (
    <nav>
      <ul className="flex items-center space-x-2 px-4">
        {categories.map((category, index) => (
          <CategoryMenu 
            key={index} 
            category={category} 
            products={products} 
            setHoveredCategory={setHoveredCategory}
            hoveredCategory={hoveredCategory}
            activeBrand={activeBrand}
            setActiveBrand={setActiveBrand}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navigator;
