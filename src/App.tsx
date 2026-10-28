import React, { useState, useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioGallery } from './components/PortfolioGallery';
import { Testimonials } from './components/Testimonials';
import { LocationAndContact } from './components/LocationAndContact';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/AdminPortal';
import { Phone, MessageCircle } from 'lucide-react';

export const AppContent: React.FC = () => {
  // Discreet route detection: checks /admin or #/admin
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    return (
      window.location.pathname.toLowerCase() === '/admin' ||
      window.location.hash.toLowerCase() === '#/admin' ||
      window.location.pathname.toLowerCase().endsWith('/admin')
    );
  });

  useEffect(() => {
    const handleRoute = () => {
      setIsAdminRoute(
        window.location.pathname.toLowerCase() === '/admin' ||
        window.location.hash.toLowerCase() === '#/admin' ||
        window.location.pathname.toLowerCase().endsWith('/admin')
      );
    };

    window.addEventListener('popstate', handleRoute);
    window.addEventListener('hashchange', handleRoute);
    return () => {
      window.removeEventListener('popstate', handleRoute);
      window.removeEventListener('hashchange', handleRoute);
    };
  }, []);

  const navigateToSite = () => {
    window.history.pushState({}, '', '/');
    setIsAdminRoute(false);
  };

  // If visiting /admin discreet route, render dedicated Admin Portal
  if (isAdminRoute) {
    return <AdminPortal onBackToSite={navigateToSite} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-violet-500/20 selection:text-violet-900 dark:selection:text-violet-200">
      {/* Sleek, Non-Expandable Navbar with Dark Mode Toggle */}
      <Navbar />

      {/* Main Public Content */}
      <main className="flex-1 space-y-4 sm:space-y-8">
        <Hero />
        <ServicesSection />
        <PortfolioGallery />
        <Testimonials />
        <LocationAndContact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Quick WhatsApp and Phone Buttons */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <a
          href="tel:9797704198"
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold shadow-xl hover:bg-slate-800 dark:hover:bg-slate-700 transition-all border border-slate-700"
          title="Direct Phone Call"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">9797704198</span>
        </a>

        <a
          href="https://wa.me/919797704198?text=Hello%20Ahmad%20Digital%20Printers%2C%20I%20have%20an%20inquiry%20regarding%20printing%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-extrabold shadow-xl hover:opacity-95 transition-all transform hover:scale-105"
          title="WhatsApp Inquiries"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Press</span>
        </a>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <AppContent />
      </PortfolioProvider>
    </ThemeProvider>
  );
};

export default App;
