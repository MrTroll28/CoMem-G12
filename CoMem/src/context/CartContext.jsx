import React, { createContext, useContext, useReducer } from 'react';

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
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
