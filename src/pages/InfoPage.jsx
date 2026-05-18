import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const pageContent = {
  campaigns: {
    title: "Campaigns",
    eyebrow: "Lookbook",
    copy: "Campaign stories are being built around Tunis streets, denim movement, and the yellow RawArrow stitch.",
    points: ["Night-wash editorial drops", "Street casting and local movement", "Seasonal fit direction"]
  },
  about: {
    title: "About RawArrow",
    eyebrow: "Brand",
    copy: "RawArrow is a Tunisian denim and streetwear concept shaped by precise cuts, utility details, and city energy.",
    points: ["Built around denim first", "Muted yellow as the signal detail", "Premium without losing street utility"]
  },
  shipping: {
    title: "Shipping & Returns",
    eyebrow: "Help",
    copy: "Local delivery and returns workflows are being prepared. Checkout currently confirms orders via WhatsApp or email.",
    points: ["Standard delivery estimate: 3-5 days", "Express delivery concept: 1-2 days", "Returns accepted for unworn pieces"]
  },
  "size-guide": {
    title: "Size Guide",
    eyebrow: "Fit",
    copy: "RawArrow sizing is built around waist, hip, inseam, and intended silhouette. Denim fits should be chosen by shape first.",
    points: ["Straight: true everyday cut", "Loose: relaxed utility volume", "Stacked: longer inseam street proportion"]
  },
  contact: {
    title: "Contact",
    eyebrow: "Support",
    copy: "For now, RawArrow order confirmation and support are handled through direct WhatsApp or email follow-up.",
    points: ["WhatsApp confirmation after checkout", "Email support placeholder", "Campaign and stock requests welcome"]
  },
  faq: {
    title: "FAQ",
    eyebrow: "Help",
    copy: "A fuller FAQ is coming as the store goes live. These are the answers customers need first.",
    points: ["Orders are confirmed manually for now", "Sizing help is available before shipping", "Accessory drops are still in development"]
  },
  account: {
    title: "Account",
    eyebrow: "Coming Soon",
    copy: "Customer accounts are coming soon. For now, checkout and order confirmation stay lightweight and direct.",
    points: ["Saved addresses", "Order history", "Wishlist and drop alerts"]
  }
};

export default function InfoPage({ page = "about" }) {
  const content = pageContent[page] || pageContent.about;

  return (
    <main className="min-h-screen bg-white px-5 py-16 transition-colors dark:bg-neutral-950 lg:px-10">
      <div className="mx-auto max-w-screen-2xl">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid min-h-[60vh] gap-12 lg:grid-cols-[1fr_420px] lg:items-center"
        >
          <div>
            <div className="mb-4 h-1 w-12 bg-raw-yellow"></div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-raw-yellow">{content.eyebrow}</p>
            <h1 className="mt-4 font-heading text-5xl font-bold uppercase leading-none tracking-tight text-black dark:text-white md:text-7xl">
              {content.title}
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {content.copy}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/collection" className="bg-black px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-raw-yellow hover:text-black dark:bg-white dark:text-black dark:hover:bg-raw-yellow">
                Shop Collection
              </Link>
              <Link to="/" className="border border-neutral-300 px-8 py-4 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:border-black dark:border-neutral-700 dark:text-white dark:hover:border-white">
                Back Home
              </Link>
            </div>
          </div>
          <div className="border border-neutral-200 bg-[#f8f7f3] p-8 transition-colors dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-black dark:text-white">
              What to know
            </h2>
            <ul className="mt-6 space-y-5">
              {content.points.map((point) => (
                <li key={point} className="border-l-2 border-raw-yellow pl-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
