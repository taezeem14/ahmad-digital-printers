import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  MessageCircle,
  Eye,
  Star,
  X,
  Phone,
  Shield,
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

interface PortfolioGalleryProps {
  onOpenAdmin: () => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ onOpenAdmin }) => {
  const { approvedItems, items } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const filteredItems = approvedItems.filter((item) =>
    selectedCategory === 'All' ? true : item.category === selectedCategory
  );

  return (
    <section id="portfolio" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Crafts Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Recent Work from Our <span className="gradient-text-vibrant">Sopore Press</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
            Real print proofs photographed directly from our workshop floor at Main Chowk Sopore.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-stone-200 text-xs font-semibold text-slate-700 hover:border-violet-500 shadow-sm transition-all"
            title="Open Admin Moderation"
          >
            <Shield className="w-4 h-4 text-amber-500" />
            <span>
              Showing {approvedItems.length} of {items.length} works (Manage in Admin)
            </span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                active
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-stone-300 p-8">
          <Layers className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-800">No approved photos in this category</h4>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Items may be pending approval in the Admin portal.
          </p>
          <button
            onClick={onOpenAdmin}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
          >
            Open Admin &amp; Approve Photos
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
                className="group relative rounded-3xl bg-white border border-stone-200/90 shadow-subtle-card overflow-hidden cursor-pointer hover:shadow-premium hover:-translate-y-1 transition-all"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-amber-400" /> View Specs &amp; Finish
                    </span>
                  </div>

                  {item.isFeatured && (
                    <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" /> Featured
                    </span>
                  )}

                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-stone-200">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 space-y-1.5">
                  <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-violet-700 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-stone-100">
                    <span className="truncate max-w-[130px] font-medium text-slate-600">
                      {item.client || 'Sopore Client'}
                    </span>
                    <span className="font-mono text-emerald-600 font-semibold">
                      {item.finish ? item.finish.split('+')[0] : 'Print'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl border border-stone-200 overflow-hidden"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-square md:aspect-auto h-72 md:h-full bg-stone-900">
                  <img
                    src={activeItem.imageUrl}
                    alt={activeItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-violet-100 text-violet-800">
                        {activeItem.category}
                      </span>
                      {activeItem.isFeatured && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-500" /> Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                      {activeItem.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Client: {activeItem.client || 'Local Client'}</p>

                    <div className="mt-4 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                      {activeItem.finish && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Finish / Coating:</span>
                          <span className="font-semibold text-slate-800">{activeItem.finish}</span>
                        </div>
                      )}
                      {activeItem.dimensions && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Dimensions:</span>
                          <span className="font-semibold text-slate-800">{activeItem.dimensions}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-500">Press Unit:</span>
                        <span className="font-semibold text-slate-800">Ahmad Digital Printers Main Chowk</span>
                      </div>
                    </div>

                    <p className="mt-4 text-xs text-slate-600 leading-relaxed">
                      {activeItem.description}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-stone-200">
                    <a
                      href={`https://wa.me/919797704198?text=Hello%20Ahmad%20Digital%20Printers%2C%20I%20am%20interested%20in%20work%20like%20%22${encodeURIComponent(
                        activeItem.title
                      )}%22.%20Please%20share%20pricing%20and%20sample%20details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md hover:opacity-95"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Order Similar on WhatsApp</span>
                    </a>

                    <a
                      href="tel:9797704198"
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-stone-100 hover:bg-stone-200"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Direct Inquiries: 9797704198</span>
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