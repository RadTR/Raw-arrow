import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from './ProductCard';
import { categories } from '../data/categories';
import { products } from '../data/products';

const categoryNames = {
  pants: "Pants",
  tshirts: "T-Shirts",
  hoodies: "Hoodies",
  caps: "Caps",
  accessories: "Accessories"
};

const priceRanges = [
  { label: "All Prices", value: "all" },
  { label: "Under 75 TND", value: "under-75" },
  { label: "75-150 TND", value: "75-150" },
  { label: "150+ TND", value: "150-plus" }
];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price Low to High", value: "price-asc" },
  { label: "Price High to Low", value: "price-desc" },
  { label: "Trending", value: "trending" }
];

function uniqueValues(items, key) {
  return [...new Set(items.flatMap((item) => Array.isArray(item[key]) ? item[key] : [item[key]]).filter(Boolean))];
}

function FilterButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${
        active
          ? "border-raw-yellow bg-raw-yellow text-black"
          : "border-neutral-200 text-neutral-600 hover:border-black dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-white"
      }`}
    >
      {children}
    </button>
  );
}

export default function ProductListingSection({
  title = "Collection",
  eyebrow = "RawArrow",
  copy = "Premium denim and streetwear pieces built for everyday city movement.",
  heroImage,
  initialCategory = "all",
  initialStatus = "all",
  showHero = true,
  heroTagline,
  emptyTitle = "No products found",
  emptyCopy = "Try clearing a filter or exploring the full RawArrow collection."
}) {
  const [category, setCategory] = useState(initialCategory);
  const [size, setSize] = useState("all");
  const [fit, setFit] = useState("all");
  const [color, setColor] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [status, setStatus] = useState(initialStatus);
  const [stock, setStock] = useState("in-stock");
  const [sort, setSort] = useState("newest");

  const baseProducts = useMemo(() => products, []);
  const sizes = useMemo(() => uniqueValues(baseProducts, "sizes"), [baseProducts]);
  const fits = useMemo(() => uniqueValues(baseProducts, "fit"), [baseProducts]);
  const colors = useMemo(() => uniqueValues(baseProducts, "color"), [baseProducts]);

  const filteredProducts = useMemo(() => {
    const next = baseProducts.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (size !== "all" && !product.sizes.includes(size)) return false;
      if (fit !== "all" && product.fit !== fit) return false;
      if (color !== "all" && product.color !== color) return false;
      if (stock === "in-stock" && !product.stock) return false;
      if (stock === "sold-out" && product.stock) return false;
      if (status === "new" && !product.isNew) return false;
      if (status === "trending" && !product.trending) return false;
      if (priceRange === "under-75" && product.price >= 75) return false;
      if (priceRange === "75-150" && (product.price < 75 || product.price > 150)) return false;
      if (priceRange === "150-plus" && product.price < 150) return false;
      return true;
    });

    return [...next].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "trending") return Number(b.trending) - Number(a.trending);
      return Number(b.isNew) - Number(a.isNew) || b.id - a.id;
    });
  }, [baseProducts, category, color, fit, priceRange, size, sort, status, stock]);

  const resetFilters = () => {
    setCategory(initialCategory);
    setSize("all");
    setFit("all");
    setColor("all");
    setPriceRange("all");
    setStatus(initialStatus);
    setStock("in-stock");
    setSort("newest");
  };

  return (
    <main className="min-h-screen bg-white transition-colors dark:bg-neutral-950">
      {showHero && (
        <section className="relative overflow-hidden bg-neutral-950 px-5 py-20 text-white lg:px-10">
          {heroImage && (
            <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20"></div>
          <div className="relative mx-auto max-w-screen-2xl">
            <div className="mb-4 h-1 w-12 bg-raw-yellow"></div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-raw-yellow">{eyebrow}</p>
            <h1 className="mt-3 font-heading text-5xl font-bold uppercase leading-none tracking-tight md:text-7xl">
              {title}
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-neutral-300">
              {copy}
            </p>
            {heroTagline && (
              <p className="mt-8 text-xs font-bold uppercase tracking-widest text-white/70">{heroTagline}</p>
            )}
          </div>
        </section>
      )}

      <section className="sticky top-16 z-30 border-b border-neutral-200 bg-white/95 px-5 py-5 backdrop-blur-md transition-colors dark:border-neutral-800 dark:bg-neutral-950/95 lg:px-10">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
              <SlidersHorizontal size={16} />
              <span>{filteredProducts.length} Products</span>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">Sort</label>
              <select value={sort} onChange={(event) => setSort(event.target.value)} className="border border-neutral-200 bg-transparent px-3 py-2 text-sm text-black transition-colors focus:outline-none dark:border-neutral-800 dark:text-white">
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <FilterButton active={category === "all"} onClick={() => setCategory("all")}>All</FilterButton>
            {categories.map((item) => (
              <FilterButton key={item.slug} active={category === item.slug} onClick={() => setCategory(item.slug)}>
                {item.name}
              </FilterButton>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <select value={size} onChange={(event) => setSize(event.target.value)} className="border border-neutral-200 bg-transparent px-3 py-2 text-sm text-black dark:border-neutral-800 dark:text-white">
              <option value="all">All Sizes</option>
              {sizes.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select value={fit} onChange={(event) => setFit(event.target.value)} className="border border-neutral-200 bg-transparent px-3 py-2 text-sm text-black dark:border-neutral-800 dark:text-white">
              <option value="all">All Fits</option>
              {fits.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select value={color} onChange={(event) => setColor(event.target.value)} className="border border-neutral-200 bg-transparent px-3 py-2 text-sm text-black dark:border-neutral-800 dark:text-white">
              <option value="all">All Colors</option>
              {colors.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select value={priceRange} onChange={(event) => setPriceRange(event.target.value)} className="border border-neutral-200 bg-transparent px-3 py-2 text-sm text-black dark:border-neutral-800 dark:text-white">
              {priceRanges.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="border border-neutral-200 bg-transparent px-3 py-2 text-sm text-black dark:border-neutral-800 dark:text-white">
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="trending">Trending</option>
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <FilterButton active={stock === "in-stock"} onClick={() => setStock("in-stock")}>In Stock</FilterButton>
            <FilterButton active={stock === "sold-out"} onClick={() => setStock("sold-out")}>Sold Out</FilterButton>
            <button type="button" onClick={resetFilters} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white">
              <X size={14} /> Reset
            </button>
          </div>
        </div>
      </section>

      {filteredProducts.length === 0 ? (
        <section className="mx-auto flex min-h-[45vh] max-w-screen-2xl flex-col items-center justify-center px-5 py-20 text-center lg:px-10">
          <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-black dark:text-white">
            {emptyTitle}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {emptyCopy}
          </p>
          <button onClick={resetFilters} className="mt-8 bg-black px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-raw-yellow hover:text-black dark:bg-white dark:text-black dark:hover:bg-raw-yellow">
            Clear Filters
          </button>
        </section>
      ) : (
        <section className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-6 px-5 py-10 lg:grid-cols-3 lg:px-10 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: index * 0.04 }}
              className="relative"
            >
              <ProductCard product={product} />
              {!product.stock && (
                <div className="absolute inset-x-0 top-4 mx-auto w-fit bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white dark:bg-white dark:text-black">
                  Coming Soon
                </div>
              )}
            </motion.div>
          ))}
        </section>
      )}

      <section className="mx-auto max-w-screen-2xl px-5 pb-20 lg:px-10">
        <Link to="/collection" className="text-xs font-bold uppercase tracking-widest text-black underline decoration-raw-yellow decoration-2 underline-offset-8 transition-colors hover:text-raw-yellow dark:text-white dark:hover:text-raw-yellow">
          Back to Collection
        </Link>
      </section>
    </main>
  );
}

export { categoryNames };
