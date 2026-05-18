import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function OrderConfirmation() {
  const [reference] = useState(() => `#RA-${Math.floor(10000 + Math.random() * 90000)}`);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-5 py-24 text-center transition-colors dark:bg-neutral-950">
      <div>
        <motion.svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="mx-auto text-raw-yellow"
          initial="hidden"
          animate="visible"
        >
          <motion.circle
            cx="60"
            cy="60"
            r="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            variants={{
              hidden: { pathLength: 0 },
              visible: { pathLength: 1 }
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          <motion.path
            d="M38 61 L53 76 L84 43"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0 },
              visible: { pathLength: 1 }
            }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeInOut" }}
          />
        </motion.svg>

        <h1 className="mt-8 font-heading text-4xl font-bold uppercase tracking-tight text-black dark:text-white">
          Order Received
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          We'll reach out within 24 hours to confirm your order and arrange delivery.
        </p>
        <p className="mt-6 font-mono text-sm font-bold uppercase tracking-widest text-raw-yellow">
          {reference}
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex h-12 items-center justify-center bg-black px-8 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-raw-yellow hover:text-black dark:bg-white dark:text-black dark:hover:bg-raw-yellow"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
