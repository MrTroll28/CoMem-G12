import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { MdCategory } from 'react-icons/md';
import { GiClothes } from 'react-icons/gi';
import { FaAccessibleIcon } from 'react-icons/fa';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import '../css/product.css';

function Product() {
  const location = useLocation(); // Lấy thông tin URL hiện tại
  const navigate = useNavigate(); // Dùng useNavigate để điều hướng

  // Lấy các giá trị từ query parameter
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';
  const initialPriceRange = Number(queryParams.get('priceRange')) || 200;
  const initialSortBy = queryParams.get('sortBy') || 'default';
  const initialKeyword = queryParams.get('keyword') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [keyword, setKeyword] = useState(initialKeyword);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 9;

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      });
  }, []); // Chỉ chạy 1 lần khi component được mount

  // Đồng bộ lại các giá trị lọc khi URL thay đổi
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setSelectedCategory(queryParams.get('category') || 'All');
    setPriceRange(Number(queryParams.get('priceRange')) || 200);
    setSortBy(queryParams.get('sortBy') || 'default');
    setKeyword(queryParams.get('keyword') || '');
  }, [location.search]);

  // Bộ lọc sản phẩm: lọc theo danh mục, giá và từ khóa tìm kiếm
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const priceMatch = product.priceNow <= priceRange;
    const keywordMatch = keyword === '' || product.name.toLowerCase().includes(keyword.toLowerCase());
    return categoryMatch && priceMatch && keywordMatch;
  });

  // Hàm sắp xếp sản phẩm
  const sortProducts = (products) => {
    switch (sortBy) {
      case 'price-low':
        return [...products].sort((a, b) => a.priceNow - b.priceNow);
      case 'price-high':
        return [...products].sort((a, b) => b.priceNow - a.priceNow);
      case 'name':
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return products;
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortProducts(filteredProducts).slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Khi người dùng chọn danh mục, cập nhật URL
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    navigate({
      pathname: '/product',
      search: `?category=${category}&priceRange=${priceRange}&sortBy=${sortBy}&keyword=${encodeURIComponent(keyword)}`,
    });
  };

  return (
    <>
      <span className='fixed top-0 left-0 w-full z-50'>
        <Header />
      </span>
      <div className='min-h-screen bg-gray-50 py-10 z-0'>
        <div className="container mx-auto px-4 py-8">
          {/* Title Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
              <FiShoppingBag className="text-[var(--color-primary)]" />
              Our Products
            </h1>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              {error}
            </div>
          ) : (
            <div className="flex gap-8">
              {/* Left Sidebar - Danh mục sản phẩm */}
              <div className="w-64 flex-shrink-0">
                <div className="bg-white p-4 rounded-lg shadow-sm sticky top-[180px]">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <MdCategory className="text-[var(--color-primary)]" />
                    Categories
                  </h2>
                  <div className="flex flex-col gap-2">
                    {['All', ...new Set(products.map(p => p.category))].map(category => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all text-left hover:bg-gray-50 ${selectedCategory === category
                            ? 'bg-primary text-white hover:bg-primary'
                            : 'hover:border-primary border border-transparent'
                          }`}
                      >
                        {category === 'Clothing' ? (
                          <GiClothes className="text-lg" />
                        ) : category === 'Accessories' ? (
                          <FaAccessibleIcon className="text-lg" />
                        ) : (
                          <MdCategory className="text-lg" />
                        )}
                        {category}
                        <span className="ml-auto text-sm">
                          ({category === 'All'
                            ? products.length
                            : products.filter(p => p.category === category).length})
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Price Range Filter */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                    <div className="flex flex-col gap-2">
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>$0</span>
                        <span>${priceRange}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content - Sản phẩm */}
              <div className="flex-1">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-600">
                      Showing {currentProducts.length} of {filteredProducts.length} products
                    </div>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:border-primary"
                    >
                      <option value="default">Default Sort</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name">Name</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {currentProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {currentProducts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No products found matching your criteria.
                  </div>
                )}

                {totalPages > 1 && (
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-md ${currentPage === 1
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-primary text-white hover:bg-primary-dark'
                        }`}
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 rounded-md ${currentPage === index + 1
                            ? 'bg-primary text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                          }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-md ${currentPage === totalPages
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-primary text-white hover:bg-primary-dark'
                        }`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Product;
