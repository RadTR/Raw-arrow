import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product, size, quantity = 1) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.product.id === product.id && item.size === size);
      if (existingItemIndex >= 0) {
        const updated = [...prev];
        updated[existingItemIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, size, quantity, id: `${product.id}-${size}` }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const cartTotalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartOpen,
      setCartOpen,
      cartTotalQty,
      cartSubtotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
