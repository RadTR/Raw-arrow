import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-5 py-20 text-center text-white">
      <div>
        <p className="font-heading text-8xl font-black uppercase tracking-tight text-raw-yellow">404</p>
        <h1 className="mt-6 font-heading text-4xl font-bold uppercase tracking-tight">Wrong Turn</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-400">
          This route is not part of the current RawArrow drop. Head back to the shop or return home.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/collection" className="bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-raw-yellow">
            Return to Shop
          </Link>
          <Link to="/" className="border border-white/30 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-raw-yellow hover:text-raw-yellow">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
