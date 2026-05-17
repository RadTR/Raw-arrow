import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { X } from 'lucide-react';

export default function Home() {
  const heroImage = products.length > 2 ? products[2].image : products[0].image;
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const milestones = [
    { year: "2023", title: "Concept", desc: "RawArrow begins as a Tunisian denim concept built around sharp cuts and local streetwear energy." },
    { year: "2024", title: "First Stitches", desc: "Initial denim samples created, testing structure, fit, and signature yellow detailing." },
    { year: "2024", title: "Local Campaign", desc: "First editorial photoshoot built around Tunisian city movement and raw denim texture." },
    { year: "2025", title: "Online Launch", desc: "RawArrow moves into a digital storefront with product drops, size guides, and direct customer orders." },
    { year: "2026", title: "Signature Fit System", desc: "The brand starts building its own fit language: straight, tapered, loose, stacked, and utility denim." },
    { year: "Future", title: "X Marks Forward", desc: "RawArrow expands beyond jeans into a full premium streetwear direction." }
  ];

  return (
    <main id="home" className="bg-white dark:bg-neutral-950 transition-colors duration-300">
      
      {/* 1. Cinematic Hero Section */}
      <section className="snap-start relative h-screen min-h-[700px] w-full overflow-hidden bg-black">
        <motion.div 
          className="absolute inset-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <img 
            src={heroImage} 
            alt="Raw Arrow Campaign" 
            className="h-full w-full object-cover object-top opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
        </motion.div>
        
        <div className="relative z-10 mx-auto flex h-full max-w-screen-2xl flex-col justify-end px-5 pb-32 lg:px-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} 
            className="max-w-3xl"
          >
            <h1 className="font-heading text-6xl font-bold uppercase leading-[0.85] tracking-tight text-white md:text-8xl lg:text-[10rem]">
              The New <br/> Standard.
            </h1>
            <p className="mt-8 max-w-md text-sm font-medium leading-relaxed text-neutral-300 sm:text-base">
              Precision-cut denim engineered for the modern silhouette. Sharp, uncompromising, and distinctly Raw Arrow.
            </p>
            <div className="mt-10 flex gap-4">
              <a href="#collection" className="inline-flex h-14 items-center justify-center bg-white px-10 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-raw-yellow hover:text-black">
                Shop Collection
              </a>
              <a href="#story" className="inline-flex h-14 items-center justify-center border border-white/30 px-10 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:border-raw-yellow hover:text-raw-yellow">
                The Journey
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Products / Collection Section */}
      <section id="collection" className="snap-start mx-auto min-h-screen max-w-screen-2xl px-5 py-32 lg:px-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-4 inline-block h-1 w-12 bg-raw-yellow"></div>
            <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-black dark:text-white transition-colors">New Arrivals</h2>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">Latest drops from the core collection.</p>
          </div>
          <Link to="/#collection" className="text-xs font-bold uppercase tracking-widest text-black underline decoration-raw-yellow decoration-2 underline-offset-8 dark:text-white transition-all hover:text-raw-yellow dark:hover:text-raw-yellow">
            View All
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Story / Roadmap Section */}
      <section id="story" className="snap-start relative border-t border-neutral-200 dark:border-neutral-900 bg-[#fbfbfb] dark:bg-[#0a0a0a] transition-colors duration-300">
        <div className="mx-auto grid min-h-screen max-w-screen-2xl lg:grid-cols-[1fr_450px] xl:grid-cols-[1fr_500px]">
          
          {/* Left Column: Scrolling Roadmap */}
          <div className="relative px-5 py-32 lg:border-r border-neutral-200 dark:border-neutral-800 lg:px-16 lg:pr-24">
            
            {/* Curved SVG Path (Desktop) */}
            <div className="absolute inset-0 z-0 hidden lg:block overflow-hidden pointer-events-none">
              <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
                <path 
                  d="M 50 0 Q 80 150, 50 300 T 50 600 Q 20 750, 50 900 T 50 1000" 
                  vectorEffect="non-scaling-stroke"
                  fill="none" 
                  stroke="var(--color-raw-yellow)" 
                  strokeWidth="2" 
                  strokeDasharray="8 8"
                  className="opacity-60"
                />
              </svg>
            </div>
            
            {/* Straight Dashed Line (Mobile) */}
            <div className="absolute bottom-0 left-[27px] top-0 z-0 w-[2px] border-l-2 border-dashed border-raw-yellow/50 lg:hidden"></div>

            {/* Mobile Header (Hidden on Desktop) */}
            <div className="mb-16 lg:hidden">
              <div className="mb-4 h-1 w-12 bg-raw-yellow"></div>
              <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-black dark:text-white">The Journey</h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">A denim label shaped by local energy, sharp cuts, and a forward-moving identity.</p>
            </div>

            <div className="relative z-10 space-y-24 lg:space-y-48">
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`relative flex items-center lg:w-[85%] ${index % 2 === 0 ? "lg:ml-auto" : "lg:mr-auto"}`}
                >
                  {/* The X Marker (Mobile: Left, Desktop: Absolute Center tracking the curve) */}
                  <div className={`absolute -left-5 flex h-10 w-10 items-center justify-center bg-[#fbfbfb] dark:bg-[#0a0a0a] lg:-left-12 lg:top-1/2 lg:-translate-y-1/2 lg:bg-transparent ${index % 2 === 0 ? "lg:-left-16" : "lg:-right-16 lg:left-auto"} transition-colors`}>
                    <X size={24} strokeWidth={3} className="text-raw-yellow" />
                  </div>

                  {/* Content Card */}
                  <div className="ml-12 w-full lg:ml-0">
                    <div className="group relative border border-neutral-200 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-raw-yellow hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.2)] dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-raw-yellow">
                      <span className="mb-2 block font-heading text-3xl font-black text-raw-yellow/20 transition-colors group-hover:text-raw-yellow">
                        {milestone.year}
                      </span>
                      <h3 className="mb-3 font-heading text-xl font-bold uppercase tracking-widest text-black dark:text-white transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Sticky Brand Panel (Desktop only) */}
          <div className="hidden h-screen flex-col justify-center sticky top-0 p-16 lg:flex">
            <div className="mb-6 h-1 w-12 bg-raw-yellow"></div>
            <h2 className="font-heading text-5xl font-bold uppercase tracking-tight leading-[0.95] text-black dark:text-white">
              THE RAWARROW<br/>JOURNEY
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 max-w-sm">
              A denim label shaped by local energy, sharp cuts, and a forward-moving identity. Built in Tunisia, designed for the future.
            </p>
            <div className="mt-12 aspect-[3/4] w-full max-w-[350px] overflow-hidden bg-neutral-200 dark:bg-neutral-800 relative group">
               <img src={products[0].image} alt="RawArrow Campaign" className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
               <div className="absolute inset-0 border border-raw-yellow/50 m-4 pointer-events-none transition-all duration-700 group-hover:m-2"></div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
