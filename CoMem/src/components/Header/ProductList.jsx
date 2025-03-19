import React, { useEffect, useState } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // currentIndex là vị trí bắt đầu của 4 sản phẩm hiện tại
  const [currentIndex, setCurrentIndex] = useState(0);

  // Số sản phẩm hiển thị trên 1 "slide"
  const itemsPerPage = 4;

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
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
  }, []);

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
      {/* Tiêu đề */}
      <h2 className="text-center text-xl md:text-2xl font-bold uppercase mb-6">
        Sản phẩm bán chạy nhất
      </h2>

      {/* Nút Prev */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="absolute left-[-40px] top-[180px] transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full disabled:opacity-50"
      >
        <FaAngleLeft size={20} />
      </button>

      {/* Danh sách sản phẩm */}
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
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-orange-600 font-bold">{product.price}</p>
          </div>
        ))}
      </div>

      {/* Nút Next */}
      <button
        onClick={handleNext}
        disabled={currentIndex + itemsPerPage >= products.length}
        className="absolute right-[-40px] top-[180px] transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full disabled:opacity-50"
      >
        <FaAngleRight size={20} />
      </button>
    </section>
  );
};

export default ProductList;
    