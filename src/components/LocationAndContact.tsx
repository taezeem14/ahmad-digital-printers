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

export const LocationAndContact: React.FC = () => {
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
    <section id="location" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>Local Sopore Presence</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Visit Our Workshop in <span className="gradient-text-vibrant">Main Chowk Sopore</span>
        </h2>
        <p className="mt-3 text-base text-slate-600">
          Walk into our workshop for instant paper samples, foil swatch inspection, or order discussion near Old J&amp;K Bank Building.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="p-6 sm:p-8 rounded-[32px] bg-slate-900 text-white shadow-xl border border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white">Ahmad Digital Printers</h3>
                <p className="text-xs text-amber-400 font-medium">Premier Commercial Printing Press</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-200 block text-sm">Workshop Address:</span>
                  <p className="text-slate-300 leading-relaxed mt-0.5">
                    Main Chowk Sopore, Near Old J&amp;K Bank Building, Sopore, Baramulla, Jammu &amp; Kashmir — 193201
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-200 block text-sm">Order Inquiries &amp; Support:</span>
                  <a
                    href="tel:9797704198"
                    className="text-emerald-400 font-extrabold text-base hover:underline block mt-0.5"
                  >
                    +91 9797704198
                  </a>
                  <span className="text-[11px] text-slate-400">Direct press line for instant quotes</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-200 block text-sm">Working Hours:</span>
                  <p className="text-slate-300 mt-0.5">
                    Monday – Saturday: <span className="font-bold text-white">9:00 AM – 8:30 PM</span>
                  </p>
                  <p className="text-slate-400">
                    Sunday: <span className="font-medium text-slate-300">10:00 AM – 5:00 PM</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:9797704198"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-stone-100 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call 9797704198</span>
              </a>

              <a
                href="https://wa.me/919797704198?text=Hello%20Ahmad%20Digital%20Printers%2C%20I%20want%20to%20visit%20your%20workshop%20at%20Main%20Chowk%20Sopore"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:opacity-95 transition-opacity"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Location</span>
              </a>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-subtle-card space-y-3">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-violet-600" />
              <span>How to Find Us in Sopore</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>From Fruit Mandi Sopore:</strong> Head towards Main Chowk (approx. 5 minutes drive). Located right near Old J&amp;K Bank Building.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>From Iqbal Market / Main Bazar:</strong> 2 minutes walking distance right into the center of Main Chowk.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>From Baramulla / Sangrama Highway:</strong> Cross the historic Sopore bridge into Main Chowk.</span>
              </li>
            </ul>
          </div>
        </div>

        <div id="contact" className="lg:col-span-7 rounded-[32px] bg-white border border-stone-200/90 shadow-premium p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Submit an Order Inquiry or Request Proof
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Fill out your job specs below. Our team in Main Chowk Sopore will review and get back via WhatsApp or call within 15 minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Ahmad"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9797704198"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Business / Firm Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sopore Apple Traders / Clinic"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Service Required
                  </label>
                  <select
                    value={formData.productType}
                    onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none bg-white"
                  >
                    <option value="Wedding Cards">Luxury Kashmiri Wedding Cards</option>
                    <option value="Outdoor Flex & Hoardings">Outdoor Flex &amp; Banners</option>
                    <option value="Packaging & Apple Cartons">Custom Packaging &amp; Apple Boxes</option>
                    <option value="Corporate Stationery">Business Cards &amp; Letterheads</option>
                    <option value="Stickers & Labels">Vinyl Die-Cut Stickers</option>
                    <option value="Bill Books & Ledgers">Carbonless NCR Bill Books</option>
                    <option value="Acrylic & Glow Signboards">Shop Front Signage &amp; Glow Boards</option>
                    <option value="Other Custom Print Job">Other Custom Printing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Estimated Quantity
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 500 cards / 20x10 ft flex / 1000 boxes"
                    value={formData.estimatedQuantity}
                    onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Turnaround Urgency
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) =>
                      setFormData({ ...formData, urgency: e.target.value as InquiryFormState['urgency'] })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none bg-white"
                  >
                    <option value="Standard (2-3 Days)">Standard (2 - 3 Days)</option>
                    <option value="Express (24 Hours)">Express (24 Hours)</option>
                    <option value="Same Day Urgent">Same Day Urgent Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Job Specifications &amp; Design Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your size requirements, gold foil preferences, paper thickness, or whether you have a print-ready CDR / PDF / AI file..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 hover:opacity-95 shadow-lg shadow-violet-600/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>Send Inquiry to Ahmad Digital Printers (+91 9797704198)</span>
              </button>
            </form>
          </div>

          {submitted && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Inquiry dispatched! Opening WhatsApp with your pre-formatted order details.</span>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Direct phone line: 9797704198</span>
            <span>Pickup at Main Chowk Sopore</span>
          </div>
        </div>
      </div>
    </section>
  );
};