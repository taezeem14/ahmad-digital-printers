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

export const Hero: React.FC = () => {
  return (
    <section className="relative px-3 sm:px-6 lg:px-8 pt-2 pb-10 sm:pb-16 overflow-hidden">
      {/* Background ambient mesh glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/15 dark:bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-amber-500/15 dark:bg-amber-900/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Card Container */}
      <div className="relative max-w-5xl mx-auto rounded-[32px] sm:rounded-[40px] bg-[#FAF7F2] dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 shadow-premium dark:shadow-dark-card p-6 sm:p-10 lg:p-12 overflow-hidden transition-colors">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#0f172a_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Bold Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-stone-200/90 dark:border-slate-700 shadow-sm text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-brand-purple font-bold">Ahmad Digital Printers</span>
              <span className="text-stone-300 dark:slate-600">|</span>
              <span className="text-slate-600 dark:text-slate-400">Main Chowk Sopore</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            >
              Master-crafted <br />
              <span className="gradient-text-vibrant">commercial print</span> <br />
              for Kashmir’s businesses.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg font-normal leading-relaxed"
            >
              From royal Kashmiri wedding invitations with gold foil stamping and high-tensile outdoor flex hoardings to custom fruit packaging and precision corporate stationery. Located near Old J&amp;K Bank Building, Sopore.
            </motion.p>

            {/* Direct Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-1 w-full sm:w-auto"
            >
              <a
                href="https://wa.me/919797704198?text=Assalam%20o%20Alaikum%20Ahmad%20Digital%20Printers%2C%20I%20want%20to%20request%20a%20quote%20and%20sample%20proof."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 hover:opacity-95 shadow-md hover:shadow-glow-purple transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Request WhatsApp Proof &amp; Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="tel:9797704198"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700 border border-stone-200 dark:border-slate-700 shadow-sm transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Call 9797704198</span>
              </a>
            </motion.div>

            {/* Micro badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500 dark:text-slate-400 pt-1"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Same-day flex delivery
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Direct proof check on WhatsApp
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Verified local workshop
              </span>
            </motion.div>
          </div>

          {/* Right Column: Interactive UI Mockup */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
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

              {/* Ink Meters */}
              <div className="py-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                  <span className="flex items-center gap-1 font-mono">
                    <Activity className="w-3.5 h-3.5 text-violet-400" /> Job: #ADP-8924
                  </span>
                  <span className="font-mono text-emerald-400">8,400 sheets/hr</span>
                </div>

                <div className="bg-slate-900/90 rounded-2xl p-2.5 border border-slate-800/80 space-y-2">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex justify-between">
                    <span>CMYK Calibrations</span>
                    <span className="text-slate-500">99.4% Accurate</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 pt-0.5">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-full bg-slate-800 h-10 rounded-lg overflow-hidden flex items-end p-0.5">
                        <div className="w-full bg-cyan-400 h-[88%] rounded-sm" />
                      </div>
                      <span className="text-[9px] font-mono text-cyan-400 font-bold">C 88%</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-full bg-slate-800 h-10 rounded-lg overflow-hidden flex items-end p-0.5">
                        <div className="w-full bg-pink-500 h-[94%] rounded-sm" />
                      </div>
                      <span className="text-[9px] font-mono text-pink-400 font-bold">M 94%</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-full bg-slate-800 h-10 rounded-lg overflow-hidden flex items-end p-0.5">
                        <div className="w-full bg-amber-400 h-[76%] rounded-sm" />
                      </div>
                      <span className="text-[9px] font-mono text-amber-400 font-bold">Y 76%</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-full bg-slate-800 h-10 rounded-lg overflow-hidden flex items-end p-0.5">
                        <div className="w-full bg-slate-300 h-[91%] rounded-sm" />
                      </div>
                      <span className="text-[9px] font-mono text-slate-300 font-bold">K 91%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Card */}
              <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl p-3 shadow border border-stone-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 flex items-center justify-center font-bold text-[9px]">
                    AD
                  </div>
                  <div className="text-[10px] font-semibold">
                    Sopore Main Chowk Press Floor
                  </div>
                  <span className="ml-auto text-[8px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                    Active Run
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1.5 leading-snug">
                  "Nikah Royal Box (Gold Leaf Foil on Velvet Board) ready for final binding."
                </p>
                <div className="mt-2 flex items-center justify-between text-[9px] text-slate-400 border-t border-stone-100 dark:border-slate-800 pt-1.5">
                  <span>Client: Dar Family, Sopore</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Dispatch in 3 hrs</span>
                </div>
              </div>
            </motion.div>

            {/* Satellite Trust Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -top-4 -right-2 sm:-right-4 z-20 bg-white dark:bg-slate-800 rounded-2xl p-2 sm:p-2.5 shadow-xl border border-stone-200/80 dark:border-slate-700 flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-900 dark:text-white">
                  <span>5.0</span>
                  <span className="text-amber-400 text-[9px]">★★★★★</span>
                </div>
                <span className="text-[9px] text-slate-500 dark:text-slate-400">520+ Reviews in Sopore</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Brand bar */}
        <div className="mt-8 pt-6 border-t border-stone-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="font-semibold uppercase tracking-wider">Industrial Print Tech:</span>
          <span>Konica Minolta Digital</span>
          <span>&bull;</span>
          <span>Heidelberg Speedmaster</span>
          <span>&bull;</span>
          <span>Roland 1440 Eco-Solvent</span>
          <span>&bull;</span>
          <span>Polar Hydraulic Guillotine</span>
        </div>
      </div>
    </section>
  );
};
