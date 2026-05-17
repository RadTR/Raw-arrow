import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ruler, ChevronLeft, AlertCircle, Plus } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import SizeChartModal from '../components/SizeChartModal';

export default function ProductDetails() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.slug === slug);
  
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [error, setError] = useState("");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-black dark:text-white transition-colors">Product not found</h2>
        <Link to="/" className="mt-8 bg-black dark:bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-white dark:text-black transition-colors hover:bg-neutral-800 dark:hover:bg-neutral-200">
          Back to collection
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Please select a size first.");
      return;
    }
    setError("");
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setError("Please select a size before buying.");
      return;
    }
    setError("");
    addToCart(product, selectedSize, quantity);
  };

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto max-w-screen-2xl px-5 py-10 lg:px-10 lg:py-16"
    >
      <Link to="/" className="mb-10 inline-flex items-center text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
        <ChevronLeft size={16} className="mr-2" /> Back to collection
      </Link>

      <div className="grid gap-12 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px] lg:gap-20">
        
        {/* Left Gallery */}
        <div className="flex flex-col gap-4">
          {product.gallery.map((img, index) => (
            <img 
              key={img} 
              src={img} 
              alt={`${product.name} detail`} 
              className={`w-full bg-neutral-100 dark:bg-neutral-900 object-cover ${index === 0 ? "h-[70vh] min-h-[500px]" : "h-[50vh]"}`} 
            />
          ))}
        </div>

        {/* Right Info Panel */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <div className="flex flex-col">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">{product.tag}</p>
            <h1 className="mt-2 font-heading text-3xl font-bold uppercase tracking-tight text-black dark:text-white lg:text-4xl transition-colors">{product.name}</h1>
            <p className="mt-4 text-xl font-medium text-black dark:text-white transition-colors">{product.price} TND</p>
            
            <div className="mt-6 flex flex-col gap-1 text-sm text-neutral-600 dark:text-neutral-400">
              <p><strong className="font-semibold text-black dark:text-white">Color:</strong> {product.color}</p>
              <p><strong className="font-semibold text-black dark:text-white">Fit:</strong> {product.fit}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-green-600 dark:text-green-500">{product.stock ? "In Stock" : "Sold Out"}</p>
            </div>

            <div className="mt-10">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-sm font-bold uppercase tracking-wider text-black dark:text-white transition-colors">Select Size</h4>
                <button 
                  onClick={() => setShowSizeChart(true)}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Ruler size={14} /> Size guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-4">
                {product.sizes.map((size) => (
                  <button 
                    key={size} 
                    onClick={() => { setSelectedSize(size); setError(""); }} 
                    className={`h-12 border text-sm font-semibold transition-colors ${
                      selectedSize === size 
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black" 
                        : "border-neutral-200 bg-white text-neutral-900 hover:border-black dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:border-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {error && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-500">
                  <AlertCircle size={14} /> {error}
                </motion.p>
              )}
            </div>

            <div className="mt-10 flex flex-col gap-4">
              <div className="flex h-12 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-colors">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                >-</button>
                <div className="flex flex-1 items-center justify-center text-sm font-semibold text-black dark:text-white transition-colors">{quantity}</div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                >+</button>
              </div>
              
              <button 
                onClick={handleAddToCart} 
                className="h-14 w-full bg-black text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                Add to Cart
              </button>
              
              <button 
                onClick={handleBuyNow} 
                className="h-14 w-full border border-black bg-white text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-neutral-50 dark:border-white dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900"
              >
                Buy Now
              </button>
            </div>

            {/* Accordion Details */}
            <div className="mt-12 divide-y divide-neutral-200 border-t border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800 transition-colors">
              <details className="group" open>
                <summary className="flex cursor-pointer items-center justify-between py-5 text-sm font-bold uppercase tracking-wider text-black dark:text-white transition-colors marker:content-none">
                  Description
                  <Plus size={16} className="transition-transform group-open:rotate-45" />
                </summary>
                <div className="pb-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 transition-colors">
                  {product.description}
                  <ul className="mt-4 list-inside list-disc space-y-2">
                    {product.details.map(detail => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </details>
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between py-5 text-sm font-bold uppercase tracking-wider text-black dark:text-white transition-colors marker:content-none">
                  Delivery & Returns
                  <Plus size={16} className="transition-transform group-open:rotate-45" />
                </summary>
                <div className="pb-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 transition-colors">
                  Standard delivery within 2-4 business days. Free returns within 14 days of receipt. All items must be unworn and in original condition.
                </div>
              </details>
            </div>

          </div>
        </div>
      </div>

      <SizeChartModal isOpen={showSizeChart} onClose={() => setShowSizeChart(false)} />
    </motion.main>
  );
}
