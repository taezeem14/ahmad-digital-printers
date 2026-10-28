import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Navigation,
  Send,
  Building,
  CheckCircle2
} from 'lucide-react';
import { InquiryFormState } from '../types';
import { usePortfolio } from '../context/PortfolioContext';

export const LocationAndContact: React.FC = () => {
  const { addInquiry } = usePortfolio();
  const [formData, setFormData] = useState<InquiryFormState>({
    name: '',
    phone: '',
    businessName: '',
    productType: 'Wedding Cards',
    estimatedQuantity: '',
    details: '',
    urgency: 'Standard (2-3 Days)',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter your name and phone number.');
      return;
    }

    // Save directly to Cloud Firestore so the admin sees it in real time
    addInquiry(formData).catch((err) => console.warn('Inquiry cloud log:', err));

    const message = encodeURIComponent(
      `*New Order Inquiry via Ahmad Digital Printers Website*\n\n` +
      `*Client Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Business/Firm:* ${formData.businessName || 'Individual'}\n` +
      `*Service Required:* ${formData.productType}\n` +
      `*Estimated Quantity:* ${formData.estimatedQuantity || 'To be discussed'}\n` +
      `*Urgency:* ${formData.urgency}\n` +
      `*Details & Requirements:*\n${formData.details || 'Standard specifications requested'}\n\n` +
      `Kindly reply with quote & sample timeline.`
    );

    window.open(`https://wa.me/919797704198?text=${message}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="location" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>Local Sopore Presence</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Visit Our Workshop in <span className="gradient-text-vibrant">Main Chowk Sopore</span>
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Walk in for physical sample inspection, wedding card cardboards, foil swatches, or direct order discussions near Old J&amp;K Bank Building.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Workshop Details & Landmark Guide */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          {/* Main Address Card */}
          <div className="p-6 rounded-[32px] bg-slate-900 text-white shadow-xl border border-slate-800 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">Ahmad Digital Printers</h3>
                <p className="text-[11px] text-amber-400 font-medium">Premier Commercial Printing Press</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-200 block text-xs">Workshop Address:</span>
                  <p className="text-slate-300 leading-relaxed mt-0.5">
                    Main Chowk Sopore, Near Old J&amp;K Bank Building, Sopore, Baramulla, Kashmir — 193201
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-200 block text-xs">Direct Press Line:</span>
                  <a
                    href="tel:9797704198"
                    className="text-emerald-400 font-extrabold text-sm hover:underline block mt-0.5"
                  >
                    +91 9797704198
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-200 block text-xs">Working Hours:</span>
                  <p className="text-slate-300 mt-0.5">
                    Mon – Sat: <span className="font-bold text-white">9:00 AM – 8:30 PM</span>
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    Sun: 10:00 AM – 5:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row gap-2.5">
              <a
                href="tel:9797704198"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-stone-100 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call Press</span>
              </a>

              <a
                href="https://wa.me/919797704198?text=Hello%20Ahmad%20Digital%20Printers%2C%20I%20want%20to%20visit%20your%20workshop%20at%20Main%20Chowk%20Sopore"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:opacity-95 transition-opacity"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Sopore Landmark Directions */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 shadow-subtle-card space-y-2.5">
            <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Navigation className="w-4 h-4 text-violet-600" />
              <span>How to Reach Us in Sopore</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>From Fruit Mandi Sopore:</strong> 5-minute drive right towards Main Chowk.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>From Iqbal Market:</strong> 2 minutes walking distance near Old J&amp;K Bank Building.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>From Baramulla Highway:</strong> Cross historic Sopore bridge into Main Chowk.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Direct Order Inquiry Form */}
        <div id="contact" className="lg:col-span-7 rounded-[32px] bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 shadow-premium dark:shadow-dark-card p-6 sm:p-8 flex flex-col justify-between transition-colors">
          <div>
            <div className="mb-5">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Submit an Order Inquiry
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Enter your requirements below. Our Main Chowk Sopore team will reply via WhatsApp or phone within 15 minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Ahmad"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9797704198"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Business / Firm Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apple Mandi Shop / Clinic"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Service Required
                  </label>
                  <select
                    value={formData.productType}
                    onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                  >
                    <option value="Wedding Cards">Luxury Kashmiri Wedding Cards</option>
                    <option value="Outdoor Flex & Hoardings">Outdoor Flex &amp; Banners</option>
                    <option value="Packaging & Apple Cartons">Custom Packaging &amp; Apple Boxes</option>
                    <option value="Corporate Stationery">Business Cards &amp; Letterheads</option>
                    <option value="Stickers & Labels">Vinyl Die-Cut Stickers</option>
                    <option value="Bill Books & Ledgers">Carbonless NCR Bill Books</option>
                    <option value="Signage & Acrylic Boards">Signage &amp; Glow Boards</option>
                    <option value="Other Custom Print Job">Other Custom Printing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Estimated Quantity
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 500 cards / 20x10 flex"
                    value={formData.estimatedQuantity}
                    onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Turnaround Urgency
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) =>
                      setFormData({ ...formData, urgency: e.target.value as InquiryFormState['urgency'] })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                  >
                    <option value="Standard (2-3 Days)">Standard (2 - 3 Days)</option>
                    <option value="Express (24 Hours)">Express (24 Hours)</option>
                    <option value="Same Day Urgent">Same Day Urgent Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Design Notes / Specs
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe dimensions, foil color, paper thickness, or file formats (CDR, PDF, AI)..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 hover:opacity-95 shadow transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>Send to Ahmad Digital Printers (+91 9797704198)</span>
              </button>
            </form>
          </div>

          {submitted && (
            <div className="mt-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Inquiry ready! WhatsApp is opening with preformatted specifications.</span>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Direct helpline: 9797704198</span>
            <span>Workshop at Main Chowk Sopore</span>
          </div>
        </div>
      </div>
    </section>
  );
};
