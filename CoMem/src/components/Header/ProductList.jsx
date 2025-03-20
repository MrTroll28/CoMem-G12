import React, { useEffect, useState } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const ProductList = ({ title, url, image }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Số sản phẩm hiển thị trên 1 slide
  const itemsPerPage = 4;

  useEffect(() => {
    fetch('http://localhost:5000/api/products' + url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < products.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Có lỗi xảy ra: {error}</div>;
  }

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="my-8 relative">
      <h2 className="text-center text-xl md:text-2xl font-bold uppercase mb-6">
        {title}
      </h2>

      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="absolute left-[-40px] top-[180px] transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full disabled:opacity-50"
      >
        <FaAngleLeft size={20} />
      </button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-center"
          >
            {product.isNew && (
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                New
              </span>
            )}

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-2"
            />

            <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
              {product.name}
            </h3>

            {/* Hiển thị giá mới, giá cũ và tagSale */}
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-2">
                <span className="text-orange-600 font-bold">
                  ${product.priceNow.toFixed(2)}
                </span>
                <span className="text-gray-500 line-through">
                  ${product.priceOld.toFixed(2)}
                </span>
              </div>
              {product.tagSale && (
                <span className="mt-1 text-xs text-white bg-red-500 rounded px-2 py-0.5">
                  {product.tagSale}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={currentIndex + itemsPerPage >= products.length}
        className="absolute right-[-40px] top-[180px] transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full disabled:opacity-50"
      >
        <FaAngleRight size={20} />
      </button>

      <div className="mt-8">
        <div className="w-full h-45" style={{ backgroundImage: `url(${image})` }}></div>
      </div>
    </section>
  );
};

export default ProductList;
