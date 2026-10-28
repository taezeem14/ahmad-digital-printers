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

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  return (
    <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-800 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Industrial Quality, Local Convenience</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Printing Capabilities Engineered for <span className="gradient-text-vibrant">Results</span>
        </h2>
        <p className="mt-4 text-base text-slate-600">
          From high-volume offset runs and heavy-duty outdoor weather-resistant flex to intricate hot foil embossed Kashmiri wedding stationery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {INITIAL_SERVICES.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative rounded-3xl bg-white border border-stone-200/90 shadow-subtle-card hover:shadow-premium p-6 sm:p-7 flex flex-col justify-between transition-all hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {ICON_MAP[service.iconName] || <Sparkles className="w-5 h-5 text-violet-500" />}
                </div>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-stone-100 px-2.5 py-1 rounded-full">
                  <Clock className="w-3 h-3 text-emerald-600" /> {service.turnaround}
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-violet-700 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs font-semibold text-violet-700 mt-1 mb-2.5">
                {service.tagline}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {service.description}
              </p>

              <div className="space-y-1.5 pt-3 border-t border-stone-100 mb-4">
                {service.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2 text-[11px] text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Rates</span>
                <span className="text-xs font-black text-slate-900">{service.startingPrice}</span>
              </div>

              <button
                onClick={() => onSelectServiceForQuote(service.title)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-900 bg-stone-100 hover:bg-violet-600 hover:text-white transition-all shadow-sm"
              >
                <span>Instant Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};