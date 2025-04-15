import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const item = action.payload;
      const existing = state.find(
        (i) =>
          i.id === item.id &&
          i.selectedSize === item.selectedSize &&
          i.selectedColor === item.selectedColor
      );

      if (existing) {
        return state.map((i) =>
          i.id === item.id &&
          i.selectedSize === item.selectedSize &&
          i.selectedColor === item.selectedColor
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...state, item];
      }

    case 'REMOVE_FROM_CART':
      return state.filter((i, index) => index !== action.payload);

    case 'UPDATE_QUANTITY':
      return state.map((item, index) =>
        index === action.payload.index
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  // Lấy giỏ hàng từ localStorage hoặc khởi tạo giỏ hàng rỗng nếu không có
  const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Lưu giỏ hàng vào localStorage mỗi khi cart thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Tính tổng số lượng tất cả sản phẩm
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  // Tính số sản phẩm không trùng lặp (theo id + biến thể size/color)
  const uniqueItemCount = cart.length;

  return (
    <CartContext.Provider value={{ cart, dispatch, totalQuantity, uniqueItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
