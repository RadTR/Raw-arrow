import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { categories } from '../data/categories';
import { products, stories } from '../data/products';

function ResultLink({ to, title, meta, image, onClose }) {
  return (
    <Link to={to} onClick={onClose} className="group flex gap-4 border-b border-neutral-200 py-4 transition-colors hover:border-raw-yellow dark:border-neutral-800">
      {image && <img src={image} alt="" className="h-16 w-12 object-cover" />}
      <div>
        <p className="font-heading text-sm font-bold uppercase tracking-wide text-black transition-colors group-hover:text-raw-yellow dark:text-white">
          {title}
        </p>
        <p className="mt-1 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          {meta}
        </p>
      </div>
    </Link>
  );
}

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setQuery("");
  }, [isOpen]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return { productResults: products.slice(0, 4), categoryResults: categories.slice(0, 4), storyResults: stories.slice(0, 2) };
    }

    const includes = (value) => String(value || "").toLowerCase().includes(normalized);

    return {
      productResults: products.filter((product) => (
        includes(product.name) || includes(product.fit) || includes(product.color) || includes(product.category)
      )),
      categoryResults: categories.filter((category) => (
        includes(category.name) || includes(category.tagline)
      )),
      storyResults: stories.filter((story) => (
        includes(story.title) || includes(story.category) || includes(story.excerpt)
      ))
    };
  }, [query]);

  const hasResults = results.productResults.length || results.categoryResults.length || results.storyResults.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/70 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="mx-auto mt-10 max-h-[86vh] max-w-5xl overflow-y-auto bg-white p-6 shadow-2xl dark:bg-neutral-950 lg:p-10"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="mb-3 h-1 w-12 bg-raw-yellow"></div>
                <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-black dark:text-white">
                  Search RawArrow
                </h2>
              </div>
              <button onClick={onClose} className="rounded-full bg-neutral-100 p-2 text-black transition-colors hover:bg-raw-yellow dark:bg-neutral-900 dark:text-white dark:hover:text-black">
                <X size={20} />
              </button>
            </div>

            <div className="mt-8 flex items-center gap-4 border-b border-neutral-300 pb-3 focus-within:border-black dark:border-neutral-700 dark:focus-within:border-white">
              <Search size={20} className="text-neutral-400" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, categories, stories..."
                className="w-full bg-transparent text-lg text-black outline-none placeholder:text-neutral-400 dark:text-white"
              />
            </div>

            {!hasResults ? (
              <div className="py-16 text-center">
                <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-black dark:text-white">No Results</h3>
                <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">Try denim, tee, cap, fit, or campaign.</p>
              </div>
            ) : (
              <div className="mt-8 grid gap-8 lg:grid-cols-3">
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-raw-yellow">Products</h3>
                  <div className="mt-3">
                    {results.productResults.slice(0, 6).map((product) => (
                      <ResultLink key={product.id} to={`/product/${product.slug}`} title={product.name} meta={`${product.fit} / ${product.color}`} image={product.image} onClose={onClose} />
                    ))}
                  </div>
                </section>
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-raw-yellow">Categories</h3>
                  <div className="mt-3">
                    {results.categoryResults.map((category) => (
                      <ResultLink key={category.slug} to={`/category/${category.slug}`} title={category.name} meta={category.tagline} image={category.image} onClose={onClose} />
                    ))}
                  </div>
                </section>
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-raw-yellow">Stories</h3>
                  <div className="mt-3">
                    {results.storyResults.map((story) => (
                      <ResultLink key={story.id} to="/stories" title={story.title} meta={`${story.category} / ${story.date}`} image={story.image} onClose={onClose} />
                    ))}
                  </div>
                </section>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
