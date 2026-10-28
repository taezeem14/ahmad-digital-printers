import React, { useState } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PrintCalculator } from './components/PrintCalculator';
import { PortfolioGallery } from './components/PortfolioGallery';
import { Testimonials } from './components/Testimonials';
import { LocationAndContact } from './components/LocationAndContact';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/AdminPortal';
import { Phone, MessageCircle } from 'lucide-react';

export const AppContent: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleOpenCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (_serviceTitle: string) => {
    handleOpenCalculator();
  };

  return (
    <div className="min-h-screen bg-[#f5f1ea] text-slate-800 flex flex-col font-sans selection:bg-violet-500/20 selection:text-violet-900">
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenCalculator={handleOpenCalculator}
      />

      <main className="flex-1 space-y-4 sm:space-y-8">
        <Hero onOpenCalculator={handleOpenCalculator} />
        <ServicesSection onSelectServiceForQuote={handleSelectService} />
        <PrintCalculator />
        <PortfolioGallery onOpenAdmin={() => setIsAdminOpen(true)} />
        <Testimonials />
        <LocationAndContact />
      </main>

      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <a
          href="tel:9797704198"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900 text-white text-xs font-bold shadow-xl hover:bg-slate-800 transition-all border border-slate-700"
          title="Direct Phone Call"
        >
          <Phone className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">Call Press</span>
        </a>

        <a
          href="https://wa.me/919797704198?text=Hello%20Ahmad%20Digital%20Printers%2C%20I%20have%20an%20inquiry%20regarding%20printing%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-extrabold shadow-2xl hover:opacity-95 transition-all transform hover:scale-105"
          title="WhatsApp Proofs & Inquiries"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp 9797704198</span>
        </a>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
};

export default App;