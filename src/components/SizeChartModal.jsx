import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { sizeChart } from '../data/products';

export default function SizeChartModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.3 }}
            onClick={onClose} 
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 10 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.98, y: 10 }} 
            transition={{ duration: 0.3 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-white dark:bg-neutral-950 shadow-2xl transition-colors duration-300"
          >
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 p-6">
              <div>
                <h2 className="font-heading text-lg font-bold uppercase tracking-widest text-black dark:text-white">Size Guide</h2>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Measurements in cm</p>
              </div>
              <button onClick={onClose} className="text-neutral-400 hover:text-black dark:text-neutral-500 dark:hover:text-white transition-colors">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800">
                      <th className="pb-4 font-bold text-neutral-500 dark:text-neutral-400">Waist Size</th>
                      <th className="pb-4 font-bold text-neutral-500 dark:text-neutral-400">Waist</th>
                      <th className="pb-4 font-bold text-neutral-500 dark:text-neutral-400">Hip</th>
                      <th className="pb-4 font-bold text-neutral-500 dark:text-neutral-400">Inseam</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900">
                    {sizeChart.map((row) => (
                      <tr key={row.size}>
                        <td className="py-4 font-bold text-black dark:text-white transition-colors">{row.size}</td>
                        <td className="py-4 text-neutral-600 dark:text-neutral-300 transition-colors">{row.waist}</td>
                        <td className="py-4 text-neutral-600 dark:text-neutral-300 transition-colors">{row.hip}</td>
                        <td className="py-4 text-neutral-600 dark:text-neutral-300 transition-colors">{row.inseam}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
