import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, ShoppingBag, User, X } from 'lucide-react';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchOverlay from './components/SearchOverlay';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CategoryPage from './pages/CategoryPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmation from './pages/OrderConfirmation';
import StoriesPage from './pages/StoriesPage';
import CollectionPage from './pages/CollectionPage';
import InfoPage from './pages/InfoPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-[#f4f2ed] dark:bg-neutral-950 text-neutral-950 dark:text-neutral-100 selection:bg-yellow-300 font-sans transition-colors duration-300">
            <Navbar setMenuOpen={setMenuOpen} setSearchOpen={setSearchOpen} />

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
                  <div className="mb-8 grid grid-cols-3 gap-3">
                    <button onClick={() => { setSearchOpen(true); setMenuOpen(false); }} className="flex h-12 items-center justify-center border border-white/10 text-white hover:border-raw-yellow hover:text-raw-yellow transition">
                      <Search size={18} />
                    </button>
                    <a href="/account" onClick={() => setMenuOpen(false)} className="flex h-12 items-center justify-center border border-white/10 text-white hover:border-raw-yellow hover:text-raw-yellow transition">
                      <User size={18} />
                    </a>
                    <a href="/checkout" onClick={() => setMenuOpen(false)} className="flex h-12 items-center justify-center border border-white/10 text-white hover:border-raw-yellow hover:text-raw-yellow transition">
                      <ShoppingBag size={18} />
                    </a>
                  </div>
                  <div className="space-y-5 text-xl font-black">
                    <a href="/collection" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300 transition">Collection</a>
                    <a href="/new-arrivals" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300 transition">New Arrivals</a>
                    <a href="/denim" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300 transition">Denim / Fit Guide</a>
                    <div className="space-y-3 border-l border-white/10 pl-4 text-base font-bold">
                      <a href="/category/pants" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300 transition">Pants</a>
                      <a href="/category/tshirts" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300 transition">T-Shirts</a>
                      <a href="/category/hoodies" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300 transition">Hoodies</a>
                      <a href="/category/caps" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300 transition">Caps</a>
                    </div>
                    <a href="/stories" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300 transition">Stories</a>
                    <div className="mt-6 space-y-5 border-t border-white/10 pt-6">
                      <a href="/about" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300 transition">About</a>
                      <a href="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300 transition">Contact</a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:slug" element={<ProductDetails />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/collection" element={<CollectionPage page="collection" />} />
                <Route path="/new-arrivals" element={<CollectionPage page="new-arrivals" />} />
                <Route path="/denim" element={<CollectionPage page="denim" />} />
                <Route path="/men" element={<CollectionPage page="men" />} />
                <Route path="/women" element={<CollectionPage page="women" />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/stories" element={<StoriesPage />} />
                <Route path="/campaigns" element={<InfoPage page="campaigns" />} />
                <Route path="/about" element={<InfoPage page="about" />} />
                <Route path="/shipping-returns" element={<InfoPage page="shipping" />} />
                <Route path="/size-guide" element={<InfoPage page="size-guide" />} />
                <Route path="/contact" element={<InfoPage page="contact" />} />
                <Route path="/faq" element={<InfoPage page="faq" />} />
                <Route path="/account" element={<InfoPage page="account" />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AnimatePresence>

            <Footer />
            <CartDrawer />
            <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}
