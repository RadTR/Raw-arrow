import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { fits } from '../data/products';

function FitCard({ fit, index, activeFit, setActiveFit }) {
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, { stiffness: 220, damping: 20 });
  const rotateY = useSpring(rotateYValue, { stiffness: 220, damping: 20 });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    rotateXValue.set((-offsetY / (rect.height / 2)) * 6);
    rotateYValue.set((offsetX / (rect.width / 2)) * 6);
  };

  const handleMouseLeave = () => {
    rotateXValue.set(0);
    rotateYValue.set(0);
  };

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      onClick={() => setActiveFit(fit.slug)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`group relative w-48 flex-shrink-0 cursor-pointer overflow-hidden border-b-2 text-left transition-colors duration-500 lg:w-auto ${
        activeFit === fit.slug ? "border-raw-yellow" : "border-transparent"
      }`}
    >
      <img
        src={fit.image}
        alt={`${fit.name} fit`}
        className="aspect-[2/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/20"></div>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <motion.div className="mb-3 h-px w-0 bg-raw-yellow transition-all duration-500 group-hover:w-full" />
        <h3 className="font-heading text-lg font-bold uppercase tracking-widest text-white">
          {fit.name}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-neutral-300">
          {fit.desc}
        </p>
        <p className="mt-3 text-[10px] uppercase tracking-widest text-raw-yellow">
          {fit.products} Products
        </p>
      </div>
    </motion.button>
  );
}

export default function ChooseByFitSection() {
  const [activeFit, setActiveFit] = useState(fits[0]?.slug || "");

  return (
    <section id="fit-guide" className="snap-start bg-neutral-950 px-5 py-24 dark:bg-neutral-950 lg:px-10">
      <div className="mx-auto max-w-screen-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-4 h-1 w-12 bg-raw-yellow"></div>
            <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-white">
              Choose By Fit
            </h2>
            <p className="mt-3 text-sm text-neutral-400">
              Find the denim shape that moves with your city rhythm.
            </p>
          </div>
          <Link
            to="/denim"
            className="text-xs font-bold uppercase tracking-widest text-raw-yellow underline decoration-raw-yellow underline-offset-8 transition-colors hover:text-white"
          >
            Shop All Denim
          </Link>
        </motion.div>

        <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] lg:grid lg:grid-cols-5 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          {fits.map((fit, index) => (
            <FitCard
              key={fit.slug}
              fit={fit}
              index={index}
              activeFit={activeFit}
              setActiveFit={setActiveFit}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
