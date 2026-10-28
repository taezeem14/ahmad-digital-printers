import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  MessageCircle,
  Eye,
  Star,
  X,
  Phone,
  Layers
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProductCategory, PortfolioItem } from '../types';

const CATEGORIES: ProductCategory[] = [
  'All',
  'Wedding Cards',
  'Flex & Banners',
  'Packaging & Boxes',
  'Corporate Stationery',
  'Stickers & Labels',
  'Signage & Hoardings',
];

export const PortfolioGallery: React.FC = () => {
  const { approvedItems, isLoading } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const filteredItems = approvedItems.filter((item) =>
    selectedCategory === 'All' ? true : item.category === selectedCategory
  );

  return (
    <section id="portfolio" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Master Crafts Showcase</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Recent Works from Our <span className="gradient-text-vibrant">Sopore Press</span>
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Real print proofs and installations photographed directly from our workshop floor at Main Chowk Sopore.
        </p>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                active
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-700 border border-stone-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-stone-300 dark:border-slate-800 p-8">
          <Layers className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {isLoading ? 'Loading works from Cloud Firestore...' : 'No works in this category currently'}
          </h4>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 shadow-subtle-card overflow-hidden cursor-pointer hover:shadow-premium dark:hover:shadow-dark-card hover:-translate-y-1 transition-all"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-slate-800">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3.5">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-amber-400" /> View Finish Details
                    </span>
                  </div>

                  {item.isFeatured && (
                    <span className="absolute top-3 left-3 bg-amber-500 text-white text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shadow flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-white" /> Featured
                    </span>
                  )}

                  <span className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-stone-200 dark:border-slate-700">
                    {item.category}
                  </span>
                </div>

                {/* Card Info */}
                <div className="p-4 space-y-1">
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-violet-600 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 border-t border-stone-100 dark:border-slate-800">
                    <span className="truncate max-w-[120px] font-medium text-slate-600 dark:text-slate-300">
                      {item.client || 'Sopore Client'}
                    </span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      {item.finish ? item.finish.split('+')[0] : 'Print'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-stone-200 dark:border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-square md:aspect-auto h-64 md:h-full bg-stone-900">
                  <img
                    src={activeItem.imageUrl}
                    alt={activeItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 flex flex-col justify-between space-y-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-300">
                        {activeItem.category}
                      </span>
                      {activeItem.isFeatured && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-500" /> Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
                      {activeItem.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Client: {activeItem.client || 'Local Client'}</p>

                    <div className="mt-3 p-3 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 space-y-1.5 text-xs">
                      {activeItem.finish && (
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Finish:</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{activeItem.finish}</span>
                        </div>
                      )}
                      {activeItem.dimensions && (
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Dimensions:</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{activeItem.dimensions}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Location:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Main Chowk Sopore</span>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {activeItem.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-stone-200 dark:border-slate-800">
                    <a
                      href={`https://wa.me/919797704198?text=Hello%20Ahmad%20Digital%20Printers%2C%20I%20am%20interested%20in%20work%20like%20%22${encodeURIComponent(
                        activeItem.title
                      )}%22.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow hover:opacity-95"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Order Similar on WhatsApp</span>
                    </a>

                    <a
                      href="tel:9797704198"
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Call Press: 9797704198</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
