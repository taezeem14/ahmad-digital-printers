import React from 'react';
import { Star, MapPin } from 'lucide-react';

interface Testimonial {
  id: string;
  author: string;
  role: string;
  business: string;
  location: string;
  quote: string;
  rating: number;
  service: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Haji Ghulam Nabi Dar',
    role: 'Managing Partner',
    business: 'Kashmir Valley Fruit Exporters',
    location: 'Fruit Mandi Sopore',
    quote: 'We ordered over 25,000 branded apple carton packaging and multi-color bill books for the harvest season. Ahmad Digital Printers delivered pristine colors with strong corrugated boxes right on schedule. Best printing press in North Kashmir.',
    rating: 5,
    service: 'Apple Packaging & NCR Books',
  },
  {
    id: 't-2',
    author: 'Shahid & Mehak Mir',
    role: 'Wedding Clients',
    business: 'Mir Residency',
    location: 'Model Town Sopore',
    quote: 'Our Nikah invitation cards were executed in velvet royal navy with embossed gold calligraphy. Our relatives in Srinagar and Jammu could not stop asking where we got them printed! Ahmad Digital Printers made it a masterpiece.',
    rating: 5,
    service: 'Luxury Gold Foil Wedding Box',
  },
  {
    id: 't-3',
    author: 'Dr. Aijaz Ahmad Lone',
    role: 'Chief Medical Director',
    business: 'Valley Diagnostic & Polyclinic',
    location: 'Main Chowk Sopore',
    quote: 'From executive prescription pads on watermark bond paper to our large backlit acrylic outdoor clinic board, their attention to sharpness and quality is second to none. Having them right at Main Chowk is immensely convenient.',
    rating: 5,
    service: 'Stationery & Glow Signage',
  },
  {
    id: 't-4',
    author: 'Advocate Javid Beigh',
    role: 'Senior Counsel',
    business: 'Baramulla District Bar Association',
    location: 'Sopore Court Complex',
    quote: 'Superb matte visiting cards with gold edges and heavy GSM legal brief covers. Friendly, respectful service and rapid delivery. Highly recommended for any serious business in Baramulla district.',
    rating: 5,
    service: 'Executive Visiting Cards',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="why-us" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold mb-3">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>Trusted Across Baramulla &amp; Kashmir</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Client Endorsements from <span className="gradient-text-vibrant">Sopore &amp; Beyond</span>
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Over 5,000 commercial print jobs, banners, and wedding invitation suites delivered with zero compromise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 shadow-subtle-card hover:shadow-premium dark:hover:shadow-dark-card transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {t.service}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic mb-4">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">{t.author}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">{t.role} &bull; {t.business}</p>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-800/60">
                <MapPin className="w-3 h-3 text-amber-600" />
                <span>{t.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
