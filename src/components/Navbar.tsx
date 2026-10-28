import React from 'react';
import { Phone, MessageCircle, Printer, MapPin, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work Showcase', href: '#portfolio' },
    { name: 'Sopore Workshop', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-6 pt-3 pb-2 transition-all">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-full px-3.5 sm:px-5 py-2.5 flex items-center justify-between shadow-subtle-card border border-stone-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-950 dark:bg-slate-800 text-white flex items-center justify-center shadow group-hover:scale-105 transition-transform">
              <Printer className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xs sm:text-sm tracking-tight text-slate-900 dark:text-white transition-colors">
                Ahmad Digital Printers
              </span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 -mt-0.5">
                <MapPin className="w-2.5 h-2.5 text-amber-500" /> Main Chowk Sopore
              </span>
            </div>
          </a>

          {/* Non-expandable Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors border border-stone-200 dark:border-slate-700"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-slate-700" />
              )}
            </button>

            {/* Direct Call */}
            <a
              href="tel:9797704198"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 transition-colors border border-stone-200 dark:border-slate-700"
              title="Call 9797704198"
            >
              <Phone className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>9797704198</span>
            </a>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919797704198?text=Hello%20Ahmad%20Digital%20Printers%2C%20I%20want%20to%20inquire%20about%20printing%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-amber-500 hover:opacity-95 shadow-sm transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Inquire</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
