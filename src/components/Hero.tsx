import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Phone,
  MessageCircle,
  Star,
  Printer,
  Sparkles,
  CheckCircle2,
  Activity,
  Maximize2
} from 'lucide-react';

interface HeroProps {
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCalculator }) => {
  return (
    <section className="relative px-3 sm:px-6 lg:px-8 pt-4 pb-12 sm:pb-20 overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-400/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-amber-400/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto rounded-[32px] sm:rounded-[44px] bg-[#FAF7F2] border border-stone-200/90 shadow-premium p-6 sm:p-10 lg:p-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200/90 shadow-sm text-xs font-semibold text-slate-800"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-brand-purple font-bold">Ahmad Digital Printers</span>
              <span className="text-stone-300">|</span>
              <span className="text-slate-600">Main Chowk Sopore, Kashmir</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]"
            >
              Master-crafted <br />
              <span className="gradient-text-vibrant">commercial print</span> <br />
              for modern brands.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed"
            >
              From royal Kashmiri wedding cards with gold foil stamping and high-tensile outdoor flex hoardings to custom fruit packaging and precision corporate stationery. Located near Old J&amp;K Bank Building, Sopore.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto"
            >
              <button
                onClick={onOpenCalculator}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 hover:opacity-95 shadow-md hover:shadow-glow-purple transition-all transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Instant Print Estimator</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:9797704198"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-slate-800 bg-white hover:bg-stone-50 border border-stone-200 shadow-sm transition-all hover:border-stone-300"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call 9797704198</span>
              </a>

              <a
                href="https://wa.me/919797704198?text=Assalam%20o%20Alaikum%20Ahmad%20Digital%20Printers%2C%20I%20want%20to%20discuss%20an%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Proofs</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 pt-1"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Same-day flex turnarounds
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> No minimum order on digital
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Free local sample check
              </span>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block z-0"
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 90 90 C 150 120, 200 160, 250 200"
                stroke="#F472B6"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-70"
              />
              <circle cx="210" cy="170" r="4" fill="#EC4899" />

              <path
                d="M 90 410 C 150 380, 200 340, 250 300"
                stroke="#8B5CF6"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-70"
              />
              <circle cx="210" cy="330" r="4" fill="#8B5CF6" />

              <path
                d="M 420 120 C 370 150, 340 180, 300 210"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-70"
              />
              <circle cx="340" cy="180" r="4" fill="#F59E0B" />
            </svg>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-10 mx-auto max-w-sm rounded-3xl bg-slate-950 text-white p-5 shadow-2xl border border-slate-800"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-amber-500 flex items-center justify-center">
                    <Printer className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-wide text-slate-100">Live Press Monitoring</h3>
                    <p className="text-[10px] text-slate-400">Heidelberg 4-Color &amp; Roland 1440</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online
                </span>
              </div>

              <div className="py-4">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                  <span className="flex items-center gap-1 font-mono">
                    <Activity className="w-3.5 h-3.5 text-violet-400" /> Active Job: #ADP-8924
                  </span>
                  <span className="font-mono text-emerald-400">Speed: 8,400 sheets/hr</span>
                </div>

                <div className="bg-slate-900/90 rounded-2xl p-3 border border-slate-800/80 space-y-2">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex justify-between">
                    <span>CMYK Ink Calibrations</span>
                    <span className="text-slate-500">Spectral 99.4%</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 pt-1">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-full bg-slate-800 h-14 rounded-lg overflow-hidden flex items-end p-0.5">
                        <div className="w-full bg-cyan-400 h-[88%] rounded-sm transition-all" />
                      </div>
                      <span className="text-[9px] font-mono text-cyan-400 font-bold">C 88%</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-full bg-slate-800 h-14 rounded-lg overflow-hidden flex items-end p-0.5">
                        <div className="w-full bg-pink-500 h-[94%] rounded-sm transition-all" />
                      </div>
                      <span className="text-[9px] font-mono text-pink-400 font-bold">M 94%</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-full bg-slate-800 h-14 rounded-lg overflow-hidden flex items-end p-0.5">
                        <div className="w-full bg-amber-400 h-[76%] rounded-sm transition-all" />
                      </div>
                      <span className="text-[9px] font-mono text-amber-400 font-bold">Y 76%</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-full bg-slate-800 h-14 rounded-lg overflow-hidden flex items-end p-0.5">
                        <div className="w-full bg-slate-300 h-[91%] rounded-sm transition-all" />
                      </div>
                      <span className="text-[9px] font-mono text-slate-300 font-bold">K 91%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-1 bg-white text-slate-900 rounded-2xl p-3.5 shadow-lg border border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-[10px]">
                    AD
                  </div>
                  <div className="text-[11px] font-semibold text-slate-800">
                    Sopore Main Chowk Press Floor
                  </div>
                  <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                    In Production
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  "Nikah Royal Box (Gold Leaf Foil on 400 GSM Velvet) approved for final trimming and binding."
                </p>
                <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 border-t border-stone-100 pt-2">
                  <span>Client: Dar Family, Sopore</span>
                  <span className="font-semibold text-emerald-600">Dispatch in 4 hrs</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -top-6 -right-2 sm:-right-6 z-20 bg-white rounded-2xl p-2.5 sm:p-3 shadow-xl border border-stone-200/80 flex items-center gap-2.5 backdrop-blur-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                  <span>5.0</span>
                  <div className="flex text-amber-400">
                    {'★★★★★'.split('').map((s, i) => (
                      <span key={i} className="text-[10px]">{s}</span>
                    ))}
                  </div>
                </div>
                <span className="text-[10px] text-slate-500">520+ Reviews in Sopore</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="hidden sm:flex absolute top-6 -left-8 z-20 bg-white rounded-2xl p-2 shadow-xl border border-stone-200 items-center gap-2 max-w-[190px]"
            >
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=120&q=80"
                alt="Gold Foil Wedding Sample"
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div className="text-[10px] leading-tight">
                <p className="font-bold text-slate-900 truncate">Gold Foil Invites</p>
                <p className="text-emerald-600 font-medium">Ready in 48 hrs</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="hidden sm:flex absolute -bottom-4 -left-6 z-20 bg-white rounded-2xl p-2.5 shadow-xl border border-stone-200 items-center gap-2.5 max-w-[220px]"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                FM
              </div>
              <div className="text-[10px] leading-tight">
                <p className="font-bold text-slate-900">Fruit Mandi Sopore</p>
                <p className="text-slate-500">"10,000 apple boxes printed spot-on"</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="hidden sm:flex absolute -bottom-6 -right-4 z-20 bg-white rounded-2xl p-2.5 shadow-xl border border-stone-200 items-center gap-2"
            >
              <div className="w-7 h-7 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
              <div className="text-[10px]">
                <span className="font-bold text-slate-800">Star Flex 380 GSM</span>
                <span className="block text-slate-400">1440 DPI EcoSolvent</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-8 border-t border-stone-200/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left mb-6">
            <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
              Powered by industrial-grade print machinery &amp; imported media
            </span>
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-purple">
              <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
              <span>Workshop open at Main Chowk Sopore: 9:00 AM – 8:30 PM</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all">
            <div className="flex flex-col items-center">
              <span className="font-black text-sm text-slate-800 tracking-tight">KONICA MINOLTA</span>
              <span className="text-[9px] text-slate-500">Digital Color Press</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-black text-sm text-slate-800 tracking-tight">HEIDELBERG</span>
              <span className="text-[9px] text-slate-500">Speedmaster 4-Color</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-black text-sm text-slate-800 tracking-tight">ROLAND DG</span>
              <span className="text-[9px] text-slate-500">Eco-Solvent Plotters</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-black text-sm text-slate-800 tracking-tight">POLAR MOHR</span>
              <span className="text-[9px] text-slate-500">Hydraulic Guillotine</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-black text-sm text-slate-800 tracking-tight">STAR FLEX</span>
              <span className="text-[9px] text-slate-500">Heavyweight Media</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-black text-sm text-slate-800 tracking-tight">DESHMUKH NCR</span>
              <span className="text-[9px] text-slate-500">Carbonless Books</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};