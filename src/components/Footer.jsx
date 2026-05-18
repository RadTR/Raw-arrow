import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('idle');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 500);
  };

  return (
    <footer id="contact" className="snap-start bg-neutral-950 px-5 py-16 text-white lg:px-10">
      <div className="mx-auto grid max-w-screen-2xl gap-12 md:grid-cols-4 lg:grid-cols-5">
        <div className="md:col-span-2">
          <h3 className="font-heading text-3xl font-bold uppercase tracking-widest text-white">RAW ARROW</h3>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
            Precision engineering for everyday utility. Tunisian denim, uncompromising quality.
          </p>
          
          {/* Newsletter Input */}
          <div className="mt-8 max-w-sm">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-white">Join the Newsletter</h4>
            <form onSubmit={handleSubmit} className="relative flex items-center border-b border-neutral-700 focus-within:border-raw-yellow transition-colors duration-300">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="w-full bg-transparent py-3 pr-10 text-sm text-white placeholder:text-neutral-600 focus:outline-none"
              />
              <button className="absolute right-0 text-neutral-500 hover:text-raw-yellow transition-colors" disabled={status === 'sending'}>
                <ArrowRight size={18} strokeWidth={1.5} />
              </button>
            </form>
            {status === 'error' && <p className="mt-3 text-xs text-red-400">Enter a valid email.</p>}
            {status === 'sending' && <p className="mt-3 text-xs text-neutral-500">Sending...</p>}
            {status === 'success' && <p className="mt-3 text-xs text-raw-yellow">You're on the RawArrow list.</p>}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Explore</h4>
          <ul className="space-y-3 text-sm text-neutral-300">
            <li><Link to="/new-arrivals" className="hover:text-raw-yellow transition-colors">New Arrivals</Link></li>
            <li><Link to="/denim" className="hover:text-raw-yellow transition-colors">Denim</Link></li>
            <li><Link to="/campaigns" className="hover:text-raw-yellow transition-colors">Campaigns</Link></li>
            <li><Link to="/about" className="hover:text-raw-yellow transition-colors">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Help</h4>
          <ul className="space-y-3 text-sm text-neutral-300">
            <li><Link to="/shipping-returns" className="hover:text-raw-yellow transition-colors">Shipping & Returns</Link></li>
            <li><Link to="/size-guide" className="hover:text-raw-yellow transition-colors">Size Guide</Link></li>
            <li><Link to="/contact" className="hover:text-raw-yellow transition-colors">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-raw-yellow transition-colors">FAQ</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-screen-2xl border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between text-xs text-neutral-500">
        <p>&copy; 2026 Raw Arrow. All rights reserved.</p>
        <div className="mt-4 flex gap-6 md:mt-0">
          <a href="#" className="hover:text-raw-yellow transition-colors">Instagram</a>
          <a href="#" className="hover:text-raw-yellow transition-colors">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
