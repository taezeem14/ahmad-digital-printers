import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Calculator,
  Sparkles,
  MessageCircle,
  Phone,
  Sliders,
  Layers,
  Clock,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';

interface ProductOption {
  id: string;
  name: string;
  unit: string;
  basePrice: number;
  minQty: number;
  maxQty: number;
  step: number;
  defaultQty: number;
  materials: { name: string; multiplier: number }[];
  finishes: { name: string; addPerUnit: number }[];
  turnaroundNormal: string;
  turnaroundExpress: string;
}

const PRODUCTS: ProductOption[] = [
  {
    id: 'flex',
    name: 'Outdoor Flex & Hoardings',
    unit: 'sq.ft',
    basePrice: 12,
    minQty: 10,
    maxQty: 2000,
    step: 10,
    defaultQty: 100,
    materials: [
      { name: 'Normal Frontlit Flex (260 GSM)', multiplier: 1.0 },
      { name: 'Star Heavy Frontlit Flex (340 GSM)', multiplier: 1.35 },
      { name: 'Translucent Backlit Glow Flex (440 GSM)', multiplier: 1.8 },
      { name: 'Eco-Solvent Matte Vinyl (3M)', multiplier: 2.2 },
    ],
    finishes: [
      { name: 'Standard Trim & Corner Eyelets', addPerUnit: 0 },
      { name: 'Double Welded Edge Seam + Brass Eyelets', addPerUnit: 2 },
      { name: 'Reinforced Metal Pipe Pockets', addPerUnit: 4 },
    ],
    turnaroundNormal: '24 Hours',
    turnaroundExpress: 'Same Day (3 - 5 Hours)',
  },
  {
    id: 'wedding-cards',
    name: 'Luxury Kashmiri Wedding Cards',
    unit: 'cards',
    basePrice: 35,
    minQty: 100,
    maxQty: 3000,
    step: 50,
    defaultQty: 300,
    materials: [
      { name: '350 GSM Royal Ivory Board', multiplier: 1.0 },
      { name: '400 GSM Imported Velvet Touch Board', multiplier: 1.4 },
      { name: 'Hardbound Rigid Box with Magnetic Snap', multiplier: 2.6 },
      { name: 'Handmade Kashmiri Saffron-Texture Parchment', multiplier: 1.8 },
    ],
    finishes: [
      { name: 'Standard Multi-Color Print', addPerUnit: 0 },
      { name: 'Metallic Gold / Copper Foil Stamping', addPerUnit: 12 },
      { name: 'Embossed Arabic Calligraphy + Gold Foil', addPerUnit: 20 },
      { name: 'Laser Die-Cut Filigree Sleeve + Foil', addPerUnit: 28 },
    ],
    turnaroundNormal: '4 - 6 Days',
    turnaroundExpress: '48 Hours Express',
  },
  {
    id: 'business-cards',
    name: 'Corporate Business Cards',
    unit: 'cards',
    basePrice: 1.2,
    minQty: 200,
    maxQty: 5000,
    step: 100,
    defaultQty: 1000,
    materials: [
      { name: '350 GSM Standard Art Board', multiplier: 1.0 },
      { name: '400 GSM Velvet Soft-Touch Board', multiplier: 1.35 },
      { name: 'Executive Textured Linen Stock', multiplier: 1.6 },
      { name: 'Triple-Ply Sandwich Core (Black/Gold Center)', multiplier: 2.2 },
    ],
    finishes: [
      { name: 'Gloss / Matte Lamination', addPerUnit: 0 },
      { name: 'Raised Spot UV on Monogram', addPerUnit: 0.8 },
      { name: 'Gold Foil Edge Gilding + Spot UV', addPerUnit: 1.8 },
      { name: 'Rounded Corners & Custom Die Cut', addPerUnit: 0.4 },
    ],
    turnaroundNormal: '24 - 48 Hours',
    turnaroundExpress: 'Same Day Ready',
  },
  {
    id: 'packaging-boxes',
    name: 'Apple Cartons & Product Boxes',
    unit: 'boxes',
    basePrice: 18,
    minQty: 100,
    maxQty: 10000,
    step: 100,
    defaultQty: 500,
    materials: [
      { name: '3-Ply Heavy Duty Flute Corrugated', multiplier: 1.0 },
      { name: '5-Ply Export Quality Heavy Apple Carton', multiplier: 1.6 },
      { name: 'Duplex Board 350 GSM Retail Box', multiplier: 1.2 },
      { name: 'Rigid Saffron & Dry Fruit Gift Box', multiplier: 3.2 },
    ],
    finishes: [
      { name: 'Standard 2-Color Flexo Print', addPerUnit: 0 },
      { name: 'Full-Color CMYK Litho-Laminated Gloss', addPerUnit: 6 },
      { name: 'Water-Resistant Aqueous Gloss Barrier', addPerUnit: 8 },
      { name: 'Gold Foil Stamped Window Die-Cut', addPerUnit: 14 },
    ],
    turnaroundNormal: '5 - 7 Days',
    turnaroundExpress: '3 Days Priority',
  },
  {
    id: 'stickers',
    name: 'Vinyl Die-Cut Stickers & Labels',
    unit: 'labels',
    basePrice: 2.5,
    minQty: 100,
    maxQty: 10000,
    step: 100,
    defaultQty: 500,
    materials: [
      { name: 'Standard Waterproof White Vinyl', multiplier: 1.0 },
      { name: 'Ultra-Clear Transparent Film', multiplier: 1.3 },
      { name: 'Metallic Chrome / Brushed Gold Vinyl', multiplier: 1.7 },
      { name: 'Heavy-Duty Freezer Grade Adhesive (Fruit/Cold)', multiplier: 1.4 },
    ],
    finishes: [
      { name: 'Square / Rectangular Kiss-Cut', addPerUnit: 0 },
      { name: 'Custom Contour Shape Die-Cut', addPerUnit: 0.5 },
      { name: 'Scratch-Proof Matte Over-Lamination', addPerUnit: 0.8 },
    ],
    turnaroundNormal: '24 Hours',
    turnaroundExpress: 'Same Day',
  },
  {
    id: 'bill-books',
    name: 'NCR Carbonless Bill & Receipt Books',
    unit: 'books (50 sets each)',
    basePrice: 130,
    minQty: 5,
    maxQty: 200,
    step: 5,
    defaultQty: 20,
    materials: [
      { name: 'Duplicate (1+1 White/Pink) Deshmukh NCR', multiplier: 1.0 },
      { name: 'Triplicate (1+2 White/Pink/Yellow) Deshmukh NCR', multiplier: 1.35 },
      { name: 'Quadruplicate (1+3 Four Colors) Deshmukh NCR', multiplier: 1.65 },
    ],
    finishes: [
      { name: 'Sequential Red Crash Numbering + Spine Binding', addPerUnit: 0 },
      { name: 'Hard Board Leatherette Cover + Embossed Title', addPerUnit: 25 },
    ],
    turnaroundNormal: '2 - 3 Days',
    turnaroundExpress: '24 Hours',
  },
];

export const PrintCalculator: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS[0].id);
  const selectedProduct = useMemo(
    () => PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0],
    [selectedProductId]
  );

  const [quantity, setQuantity] = useState<number>(selectedProduct.defaultQty);
  const [selectedMaterialIdx, setSelectedMaterialIdx] = useState<number>(0);
  const [selectedFinishIdx, setSelectedFinishIdx] = useState<number>(0);
  const [isExpress, setIsExpress] = useState<boolean>(false);

  const handleProductChange = (id: string) => {
    setSelectedProductId(id);
    const prod = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
    setQuantity(prod.defaultQty);
    setSelectedMaterialIdx(0);
    setSelectedFinishIdx(0);
  };

  const volumeDiscount = useMemo(() => {
    const ratio = (quantity - selectedProduct.minQty) / (selectedProduct.maxQty - selectedProduct.minQty);
    if (ratio > 0.6) return 0.25;
    if (ratio > 0.3) return 0.15;
    if (ratio > 0.1) return 0.08;
    return 0;
  }, [quantity, selectedProduct]);

  const material = selectedProduct.materials[selectedMaterialIdx] || selectedProduct.materials[0];
  const finish = selectedProduct.finishes[selectedFinishIdx] || selectedProduct.finishes[0];

  const rawUnitPrice = selectedProduct.basePrice * material.multiplier + finish.addPerUnit;
  const discountedUnitPrice = rawUnitPrice * (1 - volumeDiscount);
  const subtotal = discountedUnitPrice * quantity;
  const expressFee = isExpress ? Math.max(250, subtotal * 0.18) : 0;
  const grandTotal = Math.round(subtotal + expressFee);
  const finalUnitPrice = (grandTotal / quantity).toFixed(2);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#8B5CF6', '#F97316', '#10B981'],
      });
    } catch {
      // ignore
    }
  };

  const whatsappMessage = encodeURIComponent(
    `*Inquiry from Ahmad Digital Printers Website*\n\n` +
    `*Product:* ${selectedProduct.name}\n` +
    `*Quantity:* ${quantity} ${selectedProduct.unit}\n` +
    `*Material:* ${material.name}\n` +
    `*Finish:* ${finish.name}\n` +
    `*Urgency:* ${isExpress ? 'Express Priority' : 'Standard Turnaround'}\n` +
    `*Estimated Total:* ₹${grandTotal.toLocaleString()} (~₹${finalUnitPrice}/${selectedProduct.unit.split(' ')[0]})\n\n` +
    `Please confirm file specs, design assistance, and pickup at Main Chowk Sopore.`
  );

  return (
    <section id="calculator" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-800 text-xs font-bold mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>Transparent Local Pricing</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Instant <span className="gradient-text-vibrant">Print Cost Estimator</span>
        </h2>
        <p className="mt-3 text-base text-slate-600">
          Configure specs, check bulk volume discounts, and send your print job details directly to our Main Chowk Sopore workshop on WhatsApp in one click.
        </p>
      </div>

      <div className="rounded-[32px] bg-white border border-stone-200/90 shadow-premium p-6 sm:p-10">
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            1. Select Print Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {PRODUCTS.map((prod) => {
              const active = prod.id === selectedProductId;
              return (
                <button
                  key={prod.id}
                  onClick={() => handleProductChange(prod.id)}
                  className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    active
                      ? 'border-violet-600 bg-violet-50/70 text-violet-950 ring-2 ring-violet-500/20 shadow-sm'
                      : 'border-stone-200 hover:border-stone-300 bg-stone-50/50 text-slate-700'
                  }`}
                >
                  <span className="font-bold text-xs leading-snug">{prod.name}</span>
                  <span className="text-[10px] text-slate-500 mt-2">from ₹{prod.basePrice}/{prod.unit.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-violet-600" />
                  <span>2. Quantity:</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold text-slate-900">
                    {quantity.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{selectedProduct.unit}</span>
                  {volumeDiscount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-0.5">
                      <TrendingDown className="w-3 h-3" /> {(volumeDiscount * 100).toFixed(0)}% Off
                    </span>
                  )}
                </div>
              </div>

              <input
                type="range"
                min={selectedProduct.minQty}
                max={selectedProduct.maxQty}
                step={selectedProduct.step}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
              />

              <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
                <span>Min: {selectedProduct.minQty} {selectedProduct.unit}</span>
                <span>Max: {selectedProduct.maxQty.toLocaleString()} {selectedProduct.unit}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-violet-600" />
                <span>3. Material / Paper Stock</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProduct.materials.map((mat, idx) => {
                  const active = selectedMaterialIdx === idx;
                  return (
                    <button
                      key={mat.name}
                      onClick={() => setSelectedMaterialIdx(idx)}
                      className={`p-3 rounded-xl text-left border text-xs transition-all ${
                        active
                          ? 'border-violet-600 bg-violet-50 text-slate-900 font-bold ring-1 ring-violet-500'
                          : 'border-stone-200 hover:border-stone-300 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{mat.name}</span>
                        {mat.multiplier > 1 && (
                          <span className="text-[10px] text-amber-600 font-semibold">Premium</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>4. Finish &amp; Special Effects</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProduct.finishes.map((fin, idx) => {
                  const active = selectedFinishIdx === idx;
                  return (
                    <button
                      key={fin.name}
                      onClick={() => setSelectedFinishIdx(idx)}
                      className={`p-3 rounded-xl text-left border text-xs transition-all ${
                        active
                          ? 'border-amber-500 bg-amber-50/70 text-slate-900 font-bold ring-1 ring-amber-500'
                          : 'border-stone-200 hover:border-stone-300 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{fin.name}</span>
                        {fin.addPerUnit > 0 && (
                          <span className="text-[10px] text-slate-500">+₹{fin.addPerUnit}/unit</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Need it Super Fast?</h4>
                  <p className="text-[11px] text-slate-600">
                    {isExpress ? selectedProduct.turnaroundExpress : selectedProduct.turnaroundNormal} (Sopore pickup)
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isExpress}
                  onChange={(e) => setIsExpress(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Live Estimate
                </span>
                <span className="text-[11px] text-slate-400">Main Chowk Sopore</span>
              </div>

              <div className="py-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs text-slate-400">Total Estimated Cost</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                      ₹{grandTotal.toLocaleString()}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold">
                      (~₹{finalUnitPrice} / {selectedProduct.unit.split(' ')[0]})
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-800/80 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Product:</span>
                    <span className="font-semibold text-white">{selectedProduct.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Volume:</span>
                    <span className="font-semibold text-white">{quantity.toLocaleString()} {selectedProduct.unit}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Stock:</span>
                    <span className="font-semibold text-white truncate max-w-[180px]">{material.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Finish:</span>
                    <span className="font-semibold text-white truncate max-w-[180px]">{finish.name}</span>
                  </div>
                  {volumeDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Volume Discount:</span>
                      <span>-{(volumeDiscount * 100).toFixed(0)}% Applied</span>
                    </div>
                  )}
                  {isExpress && (
                    <div className="flex justify-between text-amber-400 font-semibold">
                      <span>Express Priority:</span>
                      <span>+₹{Math.round(expressFee).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800">
                    <span>Estimated Ready Time:</span>
                    <span className="text-emerald-400 font-bold">
                      {isExpress ? selectedProduct.turnaroundExpress : selectedProduct.turnaroundNormal}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 space-y-3">
              <a
                href={`https://wa.me/919797704198?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={triggerConfetti}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-950/40 transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Confirm Quote on WhatsApp</span>
              </a>

              <a
                href="tel:9797704198"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Or Call Press Directly: 9797704198</span>
              </a>

              <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Exact final rate confirmed upon artwork inspection at Main Chowk Sopore
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};