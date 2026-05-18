import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const filters = ["ALL", "PANTS", "TOPS", "CAPS"];

export default function NowTrendingSection() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredProducts = useMemo(() => {
    const trending = products.filter((product) => product.trending);

    if (activeFilter === "PANTS") {
      return trending.filter((product) => product.category === "pants");
    }

    if (activeFilter === "TOPS") {
      return trending.filter((product) => product.category === "tshirts" || product.category === "hoodies");
    }

    if (activeFilter === "CAPS") {
      return trending.filter((product) => product.category === "caps");
    }

    return trending;
  }, [activeFilter]);

  return (
    <section id="trending" className="snap-start mx-auto max-w-screen-2xl px-5 py-24 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
      >
        <div>
          <div className="mb-4 h-1 w-12 bg-raw-yellow"></div>
          <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-black transition-colors dark:text-white">
            Now Trending
          </h2>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            Most-worn cuts from the latest RawArrow rotation.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  activeFilter === filter
                    ? "bg-raw-yellow text-black"
                    : "border border-neutral-300 text-neutral-600 hover:border-black dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <Link
          to="/collection"
          className="text-xs font-bold uppercase tracking-widest text-black underline decoration-raw-yellow decoration-2 underline-offset-8 transition-all hover:text-raw-yellow dark:text-white dark:hover:text-raw-yellow"
        >
          View All
        </Link>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-2 gap-6 lg:grid-cols-4"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative"
            >
              <ProductCard product={product} />
              <div className="pointer-events-none absolute right-3 top-3 bg-black px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white dark:bg-white dark:text-black">
                Trending
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
