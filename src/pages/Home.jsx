import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoriesSection from '../components/CategoriesSection';
import ChooseByFitSection from '../components/ChooseByFitSection';
import DenimCanvas from '../components/DenimCanvas';
import FloatingJean from '../components/FloatingJean';
import NowTrendingSection from '../components/NowTrendingSection';
import StoriesSection from '../components/StoriesSection';
import { products } from '../data/products';
import { X } from 'lucide-react';

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(media.matches);

    const handleChange = () => setPrefersReduced(media.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  return prefersReduced;
}

function CountStat({ target, suffix = "", label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return undefined;

    const step = Math.max(1, Math.ceil(target / 30));
    const interval = setInterval(() => {
      setValue((current) => {
        const next = Math.min(target, current + step);
        if (next === target) clearInterval(interval);
        return next;
      });
    }, 35);

    return () => clearInterval(interval);
  }, [isInView, target]);

  return (
    <div ref={ref}>
      <div className="font-heading text-3xl font-black text-raw-yellow">
        {value}{suffix}
      </div>
      <div className="mt-1 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
        {label}
      </div>
    </div>
  );
}

function StaticStat({ value, label }) {
  return (
    <div>
      <div className="font-heading text-3xl font-black text-raw-yellow">
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
        {label}
      </div>
    </div>
  );
}

export default function Home() {
  const heroImage = products.length > 2 ? products[2].image : products[0].image;
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const prefersReduced = usePrefersReducedMotion();
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const milestones = [
    { year: "2023", title: "Concept", desc: "RawArrow begins as a Tunisian denim concept built around sharp cuts and local streetwear energy.", notes: ["Moodboards built around Tunis streets, workwear utility, and washed grey denim.", "The yellow stitch becomes the first recognizable brand signal."], design: "Early direction focused on a straight jean, sharp pocket lines, and a minimal RAW mark.", image: products[0].image },
    { year: "2024", title: "First Stitches", desc: "Initial denim samples created, testing structure, fit, and signature yellow detailing.", notes: ["First fit samples explore straight, tapered, loose, and stacked proportions.", "Hardware and pocket reinforcement are tested for daily wear."], design: "The collection starts moving away from generic denim into a clearer RawArrow fit language.", image: products[1].image },
    { year: "2024", title: "Local Campaign", desc: "First editorial photoshoot built around Tunisian city movement and raw denim texture.", notes: ["Campaign direction uses night streets, concrete textures, and movement.", "Product photography starts treating denim as a hero object."], design: "The brand tone becomes more editorial: minimal layouts, strong type, and fabric-first visuals.", image: products[2].image },
    { year: "2025", title: "Online Launch", desc: "RawArrow moves into a digital storefront with product drops, size guides, and direct customer orders.", notes: ["The store structure expands into categories, cart, checkout, and editorial content.", "Product details gain material, care, model sizing, and stock language."], design: "The site becomes a functional ecommerce-style experience while keeping a premium visual system.", image: products[3].image },
    { year: "2026", title: "Signature Fit System", desc: "The brand starts building its own fit language: straight, tapered, loose, stacked, and utility denim.", notes: ["Fit guide cards explain silhouettes before customers choose products.", "Denim becomes the organizing system for future tees, hoodies, caps, and accessories."], design: "RawArrow moves toward a full denim/streetwear platform with a recognizable fit vocabulary.", image: products[4].image },
    { year: "Future", title: "X Marks Forward", desc: "RawArrow expands beyond jeans into a full premium streetwear direction.", notes: ["Accessories, deeper campaigns, and stronger account/order tooling are planned.", "The X marker becomes a forward-facing symbol for future drops."], design: "The brand grows from storefront to culture: products, stories, fit education, and local identity.", image: products[8].image }
  ];

  return (
    <main id="home" className="bg-white dark:bg-neutral-950 transition-colors duration-300">
      
      {/* 1. Cinematic Hero Section */}
      <section className="snap-start relative h-screen min-h-[700px] w-full overflow-hidden bg-black">
        <DenimCanvas />
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
          <FloatingJean className="-right-24 top-[32%] h-80 w-56 -translate-y-1/2 opacity-25 sm:-right-16 sm:h-96 sm:w-64 md:opacity-35 lg:right-4 lg:top-1/2 lg:h-[32rem] lg:w-[22rem] lg:opacity-90 xl:right-12 xl:h-[36rem] xl:w-[25rem]" />
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
            <motion.div
              className="mt-8 h-px bg-gradient-to-r from-raw-yellow to-transparent"
              initial={{ width: 0 }}
              animate={{ width: "12rem" }}
              transition={{ duration: 1.2, delay: 1 }}
            />
            <div className="mt-10 flex gap-4">
              <Link to="/collection" className="inline-flex h-14 items-center justify-center bg-white px-10 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-raw-yellow hover:text-black">
                Shop Collection
              </Link>
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
          className="mb-16 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-4 inline-block h-1 w-12 bg-raw-yellow"></div>
            <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-black dark:text-white transition-colors">New Arrivals</h2>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">Latest drops from the core collection.</p>
            <div className="mt-10 flex flex-wrap gap-8 sm:gap-12">
              <CountStat target={4} label="Drops" />
              <CountStat target={100} suffix="%" label="Denim" />
              <StaticStat value="Made" label="in Tunisia" />
            </div>
          </div>
          <div className="flex items-end gap-8">
            <motion.div
              className="hidden h-40 w-32 origin-center overflow-hidden border border-neutral-200 bg-neutral-100 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 md:block"
              animate={prefersReduced ? { rotateY: 0 } : { rotateY: [0, 10, 0, -10, 0] }}
              transition={prefersReduced ? { duration: 0 } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformPerspective: 700 }}
              aria-hidden="true"
            >
              <img
                src={products[1].image}
                alt=""
                className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
              />
            </motion.div>
            <Link to="/collection" className="text-xs font-bold uppercase tracking-widest text-black underline decoration-raw-yellow decoration-2 underline-offset-8 dark:text-white transition-all hover:text-raw-yellow dark:hover:text-raw-yellow">
              View All
            </Link>
          </div>
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

      <CategoriesSection />
      <ChooseByFitSection />
      <NowTrendingSection />
      <StoriesSection />

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
                    <motion.div
                      whileHover={{ rotateX: -3, rotateY: 5, z: 10 }}
                      style={{ transformPerspective: 800 }}
                      onClick={() => setSelectedMilestone(milestone)}
                      className="group relative border border-neutral-200 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-raw-yellow hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.2)] dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-raw-yellow"
                    >
                      <span className="mb-2 block font-heading text-3xl font-black text-raw-yellow/20 transition-colors group-hover:text-raw-yellow">
                        {milestone.year}
                      </span>
                      <h3 className="mb-3 font-heading text-xl font-bold uppercase tracking-widest text-black dark:text-white transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                        {milestone.desc}
                      </p>
                      <p className="mt-5 text-[10px] font-bold uppercase tracking-widest text-raw-yellow">Read milestone</p>
                    </motion.div>
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

      <AnimatePresence>
        {selectedMilestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/70 p-4 backdrop-blur-md"
            onClick={() => setSelectedMilestone(null)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: "circOut" }}
              onClick={(event) => event.stopPropagation()}
              className="ml-auto flex h-full w-full max-w-xl flex-col overflow-y-auto bg-white p-6 shadow-2xl dark:bg-neutral-950 lg:p-10"
            >
              <button onClick={() => setSelectedMilestone(null)} className="mb-8 ml-auto rounded-full bg-neutral-100 p-2 text-black transition-colors hover:bg-raw-yellow dark:bg-neutral-900 dark:text-white dark:hover:text-black">
                <X size={20} />
              </button>
              <img src={selectedMilestone.image} alt="" className="aspect-[4/3] w-full object-cover grayscale" />
              <p className="mt-8 font-heading text-5xl font-black text-raw-yellow/40">{selectedMilestone.year}</p>
              <h2 className="mt-2 font-heading text-3xl font-bold uppercase tracking-tight text-black dark:text-white">
                {selectedMilestone.title}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {selectedMilestone.desc}
              </p>
              <div className="mt-8 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                <h3 className="text-xs font-bold uppercase tracking-widest text-black dark:text-white">Milestone Notes</h3>
                <ul className="mt-4 space-y-3">
                  {selectedMilestone.notes.map((note) => (
                    <li key={note} className="border-l-2 border-raw-yellow pl-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 border border-neutral-200 bg-[#f8f7f3] p-5 dark:border-neutral-800 dark:bg-neutral-900">
                <h3 className="text-xs font-bold uppercase tracking-widest text-raw-yellow">Campaign / Design Notes</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {selectedMilestone.design}
                </p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
