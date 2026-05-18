import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import ProductListingSection from '../components/ProductListingSection';
import { categories } from '../data/categories';
import { products } from '../data/products';

const copyByCategory = {
  pants: "Denim is the RawArrow foundation: structured washes, relaxed city proportions, and sharp yellow details.",
  tshirts: "Heavy cotton tops built to sit cleanly with wide denim, faded streets, and long Tunis evenings.",
  hoodies: "Layered fleece and zip shapes made for colder nights, oversized fits, and denim-heavy styling.",
  caps: "Low-profile headwear with denim language, utility details, and clean RawArrow marks.",
  accessories: "Utility pieces are still in development. Expect functional details, muted metals, and yellow tabs."
};

function EmptyAccessories({ category }) {
  return (
    <main className="min-h-screen bg-white transition-colors dark:bg-neutral-950">
      <section className="relative overflow-hidden bg-neutral-950 px-5 py-20 text-white lg:px-10">
        <img src={category?.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30"></div>
        <div className="relative mx-auto max-w-screen-2xl">
          <div className="mb-4 h-1 w-12 bg-raw-yellow"></div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-raw-yellow">Coming Soon</p>
          <h1 className="mt-3 font-heading text-5xl font-bold uppercase leading-none tracking-tight md:text-7xl">
            {category?.name || "Accessories"}
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-neutral-300">
            {copyByCategory.accessories}
          </p>
        </div>
      </section>
      <section className="mx-auto flex min-h-[45vh] max-w-screen-2xl flex-col items-center justify-center px-5 py-20 text-center lg:px-10">
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="mb-6 text-raw-yellow">
          <X size={64} strokeWidth={3} />
        </motion.div>
        <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-black dark:text-white">
          Coming Soon
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          This drop is still in the works. Check back shortly.
        </p>
        <Link
          to="/collection"
          className="mt-8 inline-flex h-12 items-center justify-center bg-black px-8 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-raw-yellow hover:text-black dark:bg-white dark:text-black dark:hover:bg-raw-yellow"
        >
          Explore Collection
        </Link>
      </section>
    </main>
  );
}

export default function CategoryPage() {
  const { slug } = useParams();
  const normalizedSlug = slug === "t-shirts" ? "tshirts" : slug;
  const category = categories.find((item) => item.slug === normalizedSlug || item.slug === slug);
  const availableProducts = products.filter((product) => product.category === normalizedSlug && product.stock);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (normalizedSlug === "accessories" || availableProducts.length === 0) {
    return <EmptyAccessories category={category} />;
  }

  return (
    <ProductListingSection
      title={category?.name || "Category"}
      eyebrow="Category"
      copy={copyByCategory[normalizedSlug] || "A focused RawArrow edit built around denim-forward streetwear language."}
      heroImage={category?.image}
      heroTagline={`${availableProducts.length} Products / ${category?.tagline || "RawArrow Drop"}`}
      initialCategory={normalizedSlug}
      emptyTitle="No matching pieces"
      emptyCopy="This category has products, but none match the active filters."
    />
  );
}
