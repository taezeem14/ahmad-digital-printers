import React from 'react';
import { Printer, MapPin, Phone, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-t border-slate-900 transition-colors">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-900">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-amber-500 text-white flex items-center justify-center shadow">
                <Printer className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                Ahmad Digital Printers
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Industrial-grade offset and digital printing press in Main Chowk Sopore, Kashmir. Specialists in luxury wedding cards, high-visibility flex banners, commercial packaging, and business stationery.
            </p>
            <div className="pt-1 text-xs space-y-1.5">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Main Chowk Sopore, Near Old J&amp;K Bank Building, Sopore — 193201</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <a href="tel:9797704198" className="hover:text-white font-semibold">
                  +91 9797704198
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#services" className="hover:text-white transition-colors">Printing Services</a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">Works Showcase</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">Client Endorsements</a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">Sopore Workshop</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Order Inquiry</a>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Press Hours</h4>
            <div className="text-xs space-y-1 text-slate-300">
              <p>Mon - Sat: <span className="font-semibold text-white">9:00 AM - 8:30 PM</span></p>
              <p>Sunday: <span className="font-semibold text-white">10:00 AM - 5:00 PM</span></p>
              <p className="text-[11px] text-emerald-400 font-semibold pt-1">
                Same-Day Flex Dispatch Available
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            &copy; {new Date().getFullYear()} Ahmad Digital Printers. Main Chowk Sopore, Kashmir.
          </p>

          <button
            onClick={scrollToTop}
            className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
