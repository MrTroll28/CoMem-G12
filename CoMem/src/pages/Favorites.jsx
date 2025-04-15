import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';  // Đảm bảo đường dẫn đúng

const Favorites = () => {
  // Lấy favorites từ context
  const { favorites, toggleFavorite } = useFavorites();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (favorites.length === 0) {
      setProducts([]); // Không có sản phẩm yêu thích nào
      setLoading(false);
      return;
    }

    const fetchFavoriteProducts = async () => {
      try {
        const productsPromises = favorites.map(async (productId) => {
          const response = await fetch(`http://localhost:5000/api/products/${productId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch product');
          }
          return response.json();
        });
        const productsData = await Promise.all(productsPromises);
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, [favorites]);  // Chạy lại mỗi khi favorites thay đổi

  const handleRemoveFavorite = (productId) => {
    // Sử dụng toggleFavorite để xóa sản phẩm khỏi favorites
    toggleFavorite(productId);
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold">You have no favorite products yet!</h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Favorite Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <span className="text-xl font-bold text-primary">${product.priceNow}</span>
              {product.priceOld && (
                <span className="text-sm text-gray-400 line-through">${product.priceOld}</span>
              )}
              <div className="mt-3 flex justify-between items-center">
                <Link 
                  to={`/product/${product.id}`} 
                  className="text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-all duration-300"
                >
                  View Details
                </Link>

                {/* Nút hủy yêu thích */}
                <button 
                  onClick={() => handleRemoveFavorite(product.id)}
                  className="ml-3 text-red-500 hover:text-red-700"
                >
                  Remove Favorite
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
