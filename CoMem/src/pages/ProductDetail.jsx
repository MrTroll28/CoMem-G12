import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';


function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/products/${productId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product details. Please try again later.');
        setLoading(false);
      });
  }, [productId]);

  const handleQuantityChange = (value) => {
    if (value > 0) {
      setQuantity(value);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-28">
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center text-gray-500">Loading product details...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            product && (
              <div className="flex flex-col md:flex-row gap-8">
                {/* Product Image */}
                <div className="w-full md:w-1/2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full rounded-lg shadow-md"
                  />
                  {product.isNew && (
                    <span className="bg-green-500 text-white text-sm px-2 py-1 rounded absolute top-2 left-2">New</span>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="w-full md:w-1/2">
                  <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg text-primary font-semibold">${product.priceNow.toFixed(2)}</span>
                    {product.priceOld && (
                      <span className="text-sm text-gray-500 line-through">${product.priceOld.toFixed(2)}</span>
                    )}
                    {product.tagSale && (
                      <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">{product.tagSale}</span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-4">Category: {product.category}</p>
                  <p className="text-gray-600">Sold: {product.soldQuantity}</p>

                  <div className="mt-6 flex items-center w-full max-w-md bg-orange-500 text-white rounded-full overflow-hidden">
                  {/* Nút tăng giảm số lượng */}
                  <div className="flex items-center bg-white text-gray-800 rounded-full px-4 py-2">
                    <button className="px-2 text-lg font-semibold" onClick={() => handleQuantityChange(quantity - 1)}>
                      -
                    </button>
                    <span className="mx-3 text-lg font-semibold">{quantity}</span>
                    <button className="px-2 text-lg font-semibold" onClick={() => handleQuantityChange(quantity + 1)}>
                      +
                    </button>
                  </div>

                  {/* Nút thêm vào giỏ hàng */}
                  <button className="flex-1 text-center py-3 font-semibold">
                    Thêm vào giỏ hàng
                  </button>
                </div>

                </div>
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetail;
