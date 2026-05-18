import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.slug}`} className="group block text-left">
      <div className="relative overflow-hidden border border-transparent bg-neutral-100 transition-all duration-500 group-hover:border-raw-yellow/50 group-hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.15)] dark:bg-neutral-900">
        <img
          src={product.image}
          alt={product.name}
          className="h-[500px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.tag && (
          <div className="absolute left-4 top-4 bg-raw-yellow px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black shadow-sm">
            {product.tag}
          </div>
        )}
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-black transition-colors group-hover:text-raw-yellow dark:text-white">
            {product.name}
          </h3>
          <p className="mt-1.5 text-xs text-neutral-500 transition-colors dark:text-neutral-400">
            {product.fit} / {product.color}
          </p>
        </div>
        <p className="text-sm font-semibold text-black transition-colors dark:text-white">
          {product.price} TND
        </p>
      </div>
    </Link>
  );
}
