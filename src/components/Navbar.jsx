import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingBag, Moon, Sun, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ setMenuOpen, setSearchOpen }) {
  const { setCartOpen, cartTotalQty } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-5 lg:px-10">
        
        {/* Mobile Menu & Search (Left) */}
        <div className="flex flex-1 items-center gap-4 lg:hidden">
          <button className="text-neutral-900 dark:text-white" onClick={() => setMenuOpen(true)}>
            <Menu size={20} strokeWidth={1.5} />
          </button>
          <button className="text-neutral-900 dark:text-white" onClick={() => setSearchOpen(true)}>
            <Search size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Desktop Nav (Left) */}
        <nav className="hidden flex-1 items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 lg:flex">
          <Link to="/men" className="hover:text-black dark:hover:text-white transition-colors">Men</Link>
          <Link to="/women" className="hover:text-black dark:hover:text-white transition-colors">Women</Link>
          <Link to="/new-arrivals" className="text-black dark:text-white hover:text-raw-yellow transition-colors">New Arrivals</Link>
          <Link to="/denim" className="hover:text-black dark:hover:text-white transition-colors">Denim</Link>
          <Link to="/#categories" className="hover:text-black dark:hover:text-white transition-colors">Categories</Link>
          <Link to="/stories" className="hover:text-black dark:hover:text-white transition-colors">Lookbook</Link>
        </nav>
        
        {/* Logo (Center) */}
        <div className="flex justify-center flex-1">
          <Link to="/" className="text-2xl font-heading font-black tracking-widest text-black dark:text-white transition-colors">
            RAW ARROW
          </Link>
        </div>
        
        {/* Icons (Right) */}
        <div className="flex flex-1 items-center justify-end gap-5">
          <button className="hidden text-neutral-900 dark:text-white hover:text-raw-yellow transition-colors lg:block" onClick={() => setSearchOpen(true)}>
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link to="/account" className="hidden text-neutral-900 dark:text-white hover:text-raw-yellow transition-colors lg:block">
            <User size={20} strokeWidth={1.5} />
          </Link>
          <button onClick={toggleTheme} className="text-neutral-900 dark:text-white hover:text-raw-yellow transition-colors">
            {theme === 'light' ? <Moon size={20} strokeWidth={1.5} /> : <Sun size={20} strokeWidth={1.5} />}
          </button>
          <button onClick={() => setCartOpen(true)} className="relative flex items-center text-neutral-900 dark:text-white hover:text-raw-yellow transition-colors">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartTotalQty > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-sm bg-raw-yellow text-[9px] font-bold text-white">
                {cartTotalQty}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
