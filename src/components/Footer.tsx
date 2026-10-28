import React from 'react';
import { Printer, MapPin, Phone, Shield, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-amber-500 text-white flex items-center justify-center shadow-md">
                <Printer className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                Ahmad Digital Printers
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Industrial-grade offset and digital printing press in Main Chowk Sopore, Kashmir. Specialists in luxury wedding invitations, high-visibility flex banners, commercial packaging, and business stationery.
            </p>
            <div className="pt-2 text-xs space-y-2">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Main Chowk Sopore, Near Old J&amp;K Bank Building, Sopore, Kashmir — 193201</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="tel:9797704198" className="hover:text-white font-semibold">
                  +91 9797704198
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-white transition-colors">Printing Services</a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">Instant Price Estimator</a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">Recent Works Gallery</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">Client Testimonials</a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">Sopore Workshop Location</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Order Inquiry Form</a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Popular Services</h4>
            <ul className="space-y-2 text-xs">
              <li>Luxury Wedding Cards</li>
              <li>Outdoor Star Flex Hoardings</li>
              <li>Apple Cartons &amp; Rigid Boxes</li>
              <li>Embossed Business Cards</li>
              <li>Waterproof Vinyl Jar Stickers</li>
              <li>NCR Carbonless Bill Books</li>
              <li>Acrylic Glow Signboards</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Press Timings</h4>
            <div className="text-xs space-y-1.5 text-slate-300">
              <p>Mon - Sat: <span className="font-semibold text-white">9:00 AM - 8:30 PM</span></p>
              <p>Sunday: <span className="font-semibold text-white">10:00 AM - 5:00 PM</span></p>
              <p className="text-[11px] text-emerald-400 font-semibold pt-1">
                Same-Day Flex &amp; Urgent Deliveries Available
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-amber-400 border border-slate-800 transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Staff / Admin Moderation</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Ahmad Digital Printers. All rights reserved. Main Chowk Sopore, Kashmir.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-400">
              Vercel Ready &bull; Optimized Fast Delivery
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};