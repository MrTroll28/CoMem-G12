import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';


function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/products/${productId}`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setProduct(data);
        // Không cần thiết lập selectedSize và selectedColor ở đây nữa
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setError('Không thể tải chi tiết sản phẩm. Vui lòng thử lại sau.');
        setLoading(false);
      });

    // Fetch suggested products based on category
    fetch(`http://localhost:5000/api/products?category=${product?.category}`)
      .then(response => response.json())
      .then(data => setSuggestedProducts(data.filter(item => item.id !== parseInt(productId)).slice(0, 4))) // Lọc sản phẩm hiện tại và lấy tối đa 4 sản phẩm
      .catch(error => console.error('Error fetching suggested products:', error));
  }, [productId, product?.category]);

  const handleQuantityChange = (value) => {
    if (value > 0) setQuantity(value);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const { dispatch } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
  
    const item = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.priceNow,
      selectedSize,
      selectedColor,
      quantity
    };
  
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center text-gray-500">Đang tải chi tiết sản phẩm...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : product && (
            <div className="flex flex-col md:flex-row gap-12">
              {/* Hình ảnh sản phẩm */}
              <div className="relative w-full md:w-1/2">
                <div className="flex justify-center items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-[600px] w-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* Thông tin sản phẩm */}
              <div className="w-full md:w-1/2 space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                <p className="text-lg text-gray-600">Thương hiệu: <span className="font-medium">{product.brand}</span></p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl text-orange-600 font-semibold">${product.priceNow?.toFixed(2)}</span>
                  {product.priceOld && (
                    <span className="line-through text-gray-500 text-lg">${product.priceOld?.toFixed(2)}</span>
                  )}
                  {product.tagSale && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">{product.tagSale}</span>
                  )}
                </div>

                {/* Đánh giá */}
                <p className="text-yellow-500 text-lg">Đánh giá: {product.rating} ★</p>

                {/* Tình trạng hàng */}
                <p className="text-gray-700 text-md">Tình trạng:
                  <span className={`ml-2 font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                  </span>
                </p>

                {/* Mô tả */}
                <p className="text-md text-gray-700 mt-4">{product.description}</p>

                {/* Chọn size */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-6">
                    <label className="block text-md font-medium text-gray-700">Kích cỡ</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          className={`px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 ${selectedSize === size ? 'bg-orange-100 border-orange-500 font-semibold' : ''}`}
                          onClick={() => handleSizeSelect(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chọn màu sắc */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-6">
                    <label className="block text-md font-medium text-gray-700">Màu sắc</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.colors.map(color => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full border border-gray-300 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 ${selectedColor === color ? 'ring-2 ring-orange-500 border-orange-500' : ''}`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorSelect(color)}
                        ></button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chọn số lượng và thêm giỏ hàng */}
                <div className="mt-6 flex items-center gap-6">
                  <div className="flex items-center border border-gray-300 rounded-full px-6 py-3 bg-white shadow-md">
                    <button onClick={() => handleQuantityChange(quantity - 1)} className="text-2xl px-3">-</button>
                    <span className="mx-4 text-lg font-medium">{quantity}</span>
                    <button onClick={() => handleQuantityChange(quantity + 1)} className="text-2xl px-3">+</button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock || !selectedSize || !selectedColor}
                    className={`flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold shadow-lg transition-transform transform ${
                      product.inStock && selectedSize && selectedColor
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <FiShoppingCart size={20} />
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sản phẩm gợi ý - hàng ngang */}
          {suggestedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Có thể bạn cũng thích</h2>
              <div className="flex overflow-x-auto gap-8">
                {suggestedProducts.map((item) => (
                  <Link key={item.id} to={`/product/${item.id}`} className="relative flex-none w-[200px] sm:w-[250px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-[200px] sm:h-[250px] object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent text-white text-center py-4 px-2">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <span className="text-lg font-bold">${item.priceNow?.toFixed(2)}</span>
                      {item.priceOld && (
                        <span className="line-through text-gray-300 text-sm ml-2">${item.priceOld?.toFixed(2)}</span>
                      )}
                      {item.tagSale && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{item.tagSale}</span>
                      )}
                      {item.isNew && (
                        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductDetail;