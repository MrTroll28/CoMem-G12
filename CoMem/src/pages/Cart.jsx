import React from 'react';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, dispatch } = useCart();

  const handleRemove = (index) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: index });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-4 rounded shadow"
            >
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p>Size: {item.selectedSize} | Màu: {item.selectedColor}</p>
                  <p>Số lượng: {item.quantity}</p>
                  <p className="text-orange-600 font-bold">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(index)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Xoá
              </button>
            </div>
          ))}
          <div className="text-right text-xl font-bold text-gray-800">
            Tổng cộng: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
