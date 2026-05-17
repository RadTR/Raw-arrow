import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-[#f4f2ed] dark:bg-neutral-950 text-neutral-950 dark:text-neutral-100 selection:bg-yellow-300 font-sans transition-colors duration-300">
            <Navbar setMenuOpen={setMenuOpen} />

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  className="fixed inset-y-0 left-0 z-50 w-80 bg-neutral-950 dark:bg-neutral-900 p-6 text-white shadow-2xl"
                >
                  <button className="mb-10 rounded-full bg-white/10 p-2 hover:bg-white/20 transition" onClick={() => setMenuOpen(false)}>
                    <X size={20} />
                  </button>
                  <div className="space-y-6 text-2xl font-black">
                    <a href="/#collection" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300 transition">Collection</a>
                    <a href="/#story" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300 transition">Story</a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:slug" element={<ProductDetails />} />
              </Routes>
            </AnimatePresence>

            <Footer />
            <CartDrawer />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}
