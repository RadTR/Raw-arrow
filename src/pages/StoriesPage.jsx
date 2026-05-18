import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { stories } from '../data/products';

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-16 transition-colors dark:bg-neutral-950 lg:px-10">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-12">
          <div className="mb-4 h-1 w-12 bg-raw-yellow"></div>
          <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-black dark:text-white">
            Stories
          </h1>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            Campaign notes, craft details, and Tunisian streetwear culture from the RawArrow archive.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((story, index) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="border border-neutral-200 bg-white transition-colors hover:border-raw-yellow dark:border-neutral-800 dark:bg-neutral-950"
            >
              <img src={story.image} alt={story.title} className="aspect-[4/3] w-full object-cover" />
              <div className="p-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-raw-yellow">{story.category} / {story.date}</p>
                <h2 className="mt-3 font-heading text-xl font-bold uppercase tracking-tight text-black dark:text-white">
                  {story.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {story.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <Link
          to="/"
          className="mt-12 inline-flex h-12 items-center justify-center bg-black px-8 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-raw-yellow hover:text-black dark:bg-white dark:text-black dark:hover:bg-raw-yellow"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
