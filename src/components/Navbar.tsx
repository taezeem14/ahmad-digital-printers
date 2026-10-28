import React, { useState } from 'react';
import { Phone, Shield, MessageCircle, Menu, X, Printer, MapPin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenCalculator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdminAuthenticated } = usePortfolio();

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work Showcase', href: '#portfolio' },
    { name: 'Print Calculator', href: '#calculator' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Sopore Workshop', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2 transition-all">
      <div className="max-w-7xl mx-auto">
        <div className="glass-pill rounded-full px-4 sm:px-6 py-3 flex items-center justify-between shadow-subtle-card border border-stone-200/80 bg-white/90 backdrop-blur-md">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-ink to-slate-800 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Printer className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-brand-purple transition-colors">
                Ahmad Digital Printers
              </span>
              <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1 -mt-0.5">
                <MapPin className="w-3 h-3 text-amber-500" /> Main Chowk Sopore
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-stone-100/80 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="tel:9797704198"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 bg-stone-100 hover:bg-stone-200 transition-colors border border-stone-200"
              title="Call 9797704198"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>9797704198</span>
            </a>

            <button
              onClick={onOpenCalculator}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 hover:opacity-95 shadow-sm transition-all hover:shadow-glow-purple"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Instant Quote</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isAdminAuthenticated
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-900 text-slate-100 hover:bg-slate-800'
              }`}
              title="Open Admin Portal to Manage Showcase Photos"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">{isAdminAuthenticated ? 'Admin Active' : 'Admin'}</span>
            </button>
          </div>

          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-full bg-slate-900 text-white text-xs"
              title="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-slate-700 hover:bg-stone-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 p-4 rounded-3xl bg-white/95 backdrop-blur-lg border border-stone-200 shadow-xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-stone-100"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
              <a
                href="tel:9797704198"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-stone-100 text-slate-800"
              >
                <Phone className="w-4 h-4 text-emerald-600" /> Call 9797704198
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCalculator();
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-amber-500"
              >
                <MessageCircle className="w-4 h-4" /> Calculate Quote
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white"
              >
                <Shield className="w-3.5 h-3.5 text-amber-400" /> Open Photo Moderation Admin
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};