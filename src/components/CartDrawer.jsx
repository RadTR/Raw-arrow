import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cartItems, updateQuantity, removeFromCart, cartSubtotal } = useCart();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.3 }}
            onClick={() => setCartOpen(false)} 
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" 
          />
          <motion.aside 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }} 
            transition={{ type: "tween", duration: 0.4, ease: "circOut" }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white dark:bg-neutral-950 shadow-2xl transition-colors duration-300"
          >
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 p-6">
              <h3 className="font-heading text-lg font-bold uppercase tracking-widest text-black dark:text-white transition-colors">Bag ({cartItems.length})</h3>
              <button onClick={() => setCartOpen(false)} className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-heading text-sm font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">Your bag is empty</p>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className="mt-6 border-b border-black pb-1 text-xs font-bold uppercase tracking-widest text-black dark:border-white dark:text-white transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="group relative flex gap-5 border-b border-neutral-100 dark:border-neutral-900 pb-6 transition-colors duration-300">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="absolute right-0 top-0 text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                      <Link to={`/product/${item.product.slug}`} onClick={() => setCartOpen(false)}>
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="h-32 w-24 object-cover" 
                        />
                      </Link>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <Link to={`/product/${item.product.slug}`} onClick={() => setCartOpen(false)} className="hover:text-neutral-500 text-black dark:text-white transition-colors">
                            <h4 className="font-heading text-sm font-bold uppercase tracking-wide leading-tight pr-6">{item.product.name}</h4>
                          </Link>
                          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 transition-colors">Size: {item.size}</p>
                          <p className="mt-2 text-sm font-semibold text-black dark:text-white transition-colors">{item.product.price} TND</p>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center border border-neutral-200 dark:border-neutral-800 transition-colors">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1.5 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-xs font-semibold text-black dark:text-white transition-colors">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1.5 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 transition-colors duration-300">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-bold text-black dark:text-white transition-colors">
                    <span className="uppercase tracking-widest">Subtotal</span>
                    <span>{cartSubtotal} TND</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 transition-colors">
                    <span>Shipping & Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                <button 
                  className="mt-6 flex h-14 w-full items-center justify-center bg-black text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
