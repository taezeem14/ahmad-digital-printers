import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Maximize2,
  Package,
  Briefcase,
  Tag,
  BookOpen,
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_SERVICES } from '../data/initialData';

const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-amber-500" />,
  Maximize2: <Maximize2 className="w-5 h-5 text-violet-500" />,
  Package: <Package className="w-5 h-5 text-emerald-500" />,
  Briefcase: <Briefcase className="w-5 h-5 text-blue-500" />,
  Tag: <Tag className="w-5 h-5 text-pink-500" />,
  BookOpen: <BookOpen className="w-5 h-5 text-teal-500" />,
};

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Industrial Quality, Local Workshop</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Printing Capabilities for <span className="gradient-text-vibrant">Real Results</span>
        </h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Heavy-duty outdoor weather-resistant flex, custom fruit cartons, and regal hot foil embossed Kashmiri wedding stationery.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {INITIAL_SERVICES.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 shadow-subtle-card hover:shadow-premium dark:hover:shadow-dark-card p-5 sm:p-6 flex flex-col justify-between transition-all hover:-translate-y-1"
          >
            <div>
              {/* Icon & Turnaround Badge */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {ICON_MAP[service.iconName] || <Sparkles className="w-4 h-4 text-violet-500" />}
                </div>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-600 dark:text-slate-300 bg-stone-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  <Clock className="w-3 h-3 text-emerald-600" /> {service.turnaround}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-violet-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 mt-1 mb-2">
                {service.tagline}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Specs Bullet Points */}
              <div className="space-y-1.5 pt-3 border-t border-stone-100 dark:border-slate-800 mb-4">
                {service.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom: Pricing & CTA */}
            <div className="pt-3.5 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Estimated Base</span>
                <span className="text-xs font-black text-slate-900 dark:text-white">{service.startingPrice}</span>
              </div>

              <a
                href={`https://wa.me/919797704198?text=Hello%20Ahmad%20Digital%20Printers%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(
                  service.title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-900 dark:text-slate-100 bg-stone-100 dark:bg-slate-800 hover:bg-violet-600 hover:text-white transition-all shadow-sm"
              >
                <span>Order on WhatsApp</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
