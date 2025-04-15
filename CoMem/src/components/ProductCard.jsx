import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useFavorites } from '../context/FavoritesContext';  // Đảm bảo bạn import useFavorites đúng cách

const ProductCard = ({ product }) => {
  const { id, name, priceNow, priceOld, tagSale, image, category } = product;

  // Sử dụng context để truy cập favorites và toggleFavorite
  const { favorites, toggleFavorite } = useFavorites();

  // Kiểm tra xem sản phẩm có trong danh sách yêu thích không
  const isActive = favorites.includes(id);

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

        <div className="flex justify-between items-center mt-3 gap-3">
          <Link 
            to={`/product/${id}`} 
            className="flex-1 text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-all duration-300"
          >
            View Details
          </Link>

          <button 
            onClick={() => toggleFavorite(id)}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-sm hover:bg-red-100 transition-all duration-300"
          >
            <FaHeart className={`text-[18px] transition-colors duration-300 ${isActive ? 'text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
