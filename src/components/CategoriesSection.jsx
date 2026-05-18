import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { categories } from '../data/categories';

function CategoryCard({ cat, index }) {
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, { stiffness: 220, damping: 18 });
  const rotateY = useSpring(rotateYValue, { stiffness: 220, damping: 18 });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    rotateXValue.set((-offsetY / (rect.height / 2)) * 8);
    rotateYValue.set((offsetX / (rect.width / 2)) * 8);
  };

  const handleMouseLeave = () => {
    rotateXValue.set(0);
    rotateYValue.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={index === 4 ? "col-span-2 sm:col-span-1" : ""}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ z: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/category/${cat.slug}`}
        className="group relative block overflow-hidden border border-transparent transition-all duration-500 hover:border-raw-yellow/50 hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.15)]"
      >
        <div className="aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
          <img
            src={cat.image}
            alt={`${cat.name} category`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        {cat.tag !== null && (
          <div className="absolute left-3 top-3 bg-raw-yellow px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-black">
            {cat.tag}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">
            {cat.name}
          </h3>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-white/60">
            {cat.tagline}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CategoriesSection() {
  return (
    <section id="categories" className="snap-start mx-auto max-w-screen-2xl px-5 py-24 lg:px-10">
      <div className="mb-12">
        <div className="mb-4 h-1 w-12 bg-raw-yellow"></div>
        <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-black dark:text-white">
          Categories
        </h2>
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          Sharp streetwear layers built around the RawArrow denim language.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((cat, index) => (
          <CategoryCard key={cat.slug} cat={cat} index={index} />
        ))}
      </div>
    </section>
  );
}
