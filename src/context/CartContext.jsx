import React, { createContext, useEffect, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('rawarrow-cart')) || [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('rawarrow-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, quantity = 1) => {
    if (!product.stock) return;
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.product.id === product.id && item.size === size);
      if (existingItemIndex >= 0) {
        const updated = [...prev];
        updated[existingItemIndex].quantity = Math.min(10, updated[existingItemIndex].quantity + quantity);
        return updated;
      }
      return [...prev, { product, size, quantity: Math.min(10, quantity), id: `${product.id}-${size}` }];
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
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.min(10, quantity) } : item));
  };

  const clearCart = () => {
    setCartItems([]);
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
      cartSubtotal,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
