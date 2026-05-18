import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { stories } from '../data/products';

function StoryCard({ story, index, featured = false }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.1 }}
      whileHover="hover"
      className={`group relative cursor-pointer overflow-hidden border border-transparent transition-colors duration-500 hover:border-raw-yellow ${
        featured ? "lg:row-span-2" : "lg:col-span-2"
      }`}
    >
      <img
        src={story.image}
        alt={story.title}
        className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
          featured ? "aspect-[4/3] lg:aspect-[3/4]" : "aspect-[4/3]"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <span className="mb-3 inline-block bg-raw-yellow px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-black">
          {story.category}
        </span>
        <h3 className={`font-heading font-bold uppercase leading-tight tracking-tight text-white ${featured ? "text-2xl" : "text-xl"}`}>
          {story.title}
          <motion.span
            variants={{ hover: { width: "100%" } }}
            transition={{ duration: 0.35 }}
            className="mt-2 block h-px w-0 bg-raw-yellow"
          />
        </h3>
        <p className="mt-2 max-h-10 overflow-hidden text-xs leading-relaxed text-neutral-300">
          {story.excerpt}
        </p>
        <p className="mt-3 text-[10px] uppercase tracking-widest text-neutral-400">
          {story.date}
        </p>
      </div>
    </motion.article>
  );
}

export default function StoriesSection() {
  return (
    <section id="stories" className="snap-start bg-[#f8f7f3] px-5 py-24 transition-colors dark:bg-[#0d0d0d] lg:px-10">
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
            <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-black dark:text-white">
              From the Archive
            </h2>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
              Behind the denim, beyond the stitch.
            </p>
          </div>
          <Link
            to="/stories"
            className="text-xs font-bold uppercase tracking-widest text-black underline decoration-raw-yellow decoration-2 underline-offset-8 transition-all hover:text-raw-yellow dark:text-white dark:hover:text-raw-yellow"
          >
            Read All Stories
          </Link>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr] lg:grid-rows-[auto_auto]">
          {stories.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
