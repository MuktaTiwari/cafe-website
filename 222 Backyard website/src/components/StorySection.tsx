import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, Flame, Heart, Compass } from 'lucide-react';

export const StorySection: React.FC = () => {
  const craftPillars = [
    {
      icon: Award,
      title: 'Direct-Trade Single Origins',
      description: 'We partner directly with family farms in Ethiopia, Colombia, and Guatemala, ensuring fair compensation and world-class beans.',
    },
    {
      icon: Flame,
      title: 'Micro-Batch Slow Roasting',
      description: 'Each lot is roasted in small batches to meticulously unlock caramel sweetness, floral aromatics, and rich body.',
    },
    {
      icon: Heart,
      title: 'Mindful Atmosphere',
      description: 'An open, sunlit space designed with warm cedar, live greenery, and acoustic warmth to give you a true sensory pause.',
    },
  ];

  return (
    <section id="craft" className="section relative py-20 lg:py-28 bg-gradient-to-b from-[#0e0805] via-[#140b07] to-[#0e0805] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-amber-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Signature Showcase Image */}
          <div className="card relative flex items-center justify-center">
            {/* Soft backdrop glow */}
            <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-amber-600/20 to-orange-400/10 blur-3xl pointer-events-none" />

            {/* Signature Card Showcase */}
            <div className="relative w-full max-w-md bg-[#180e08]/80 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl shadow-black/60">
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#25150e] to-[#120a06] flex items-center justify-center p-6">
                <motion.img
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  src="/assets/signature-drink.png"
                  alt="Signature Iced Coffee"
                  className="w-full h-full object-contain filter drop-shadow-2xl"
                />
              </div>

              {/* Detail Badge Overlay */}
              <div className="absolute bottom-4 -right-4 sm:-right-6 bg-[#21130c]/90 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-4 shadow-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#e58a36] flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#f3b069] uppercase tracking-wider">
                    Master Process
                  </p>
                  <p className="text-xs font-bold text-white">
                    18-Hour Slow Cold Brew
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Craft Story & Pillars */}
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-[#f3b069] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#e58a36]" />
              <span className="font-semibold tracking-wide uppercase">The Roastery Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
              The Art of Mindful Brewing & Pure Passion
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8">
              We believe a great cup of coffee is never accidental. From the volcanic soil
              where our cherries are harvested to the calibrated water temperature and extraction pressure,
              every detail is calibrated for balance, aroma, and harmony.
            </p>

            {/* 3 Pillars */}
            <div className="flex flex-col gap-6 w-full">
              {craftPillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="card flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-amber-500/20 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-[#e58a36] flex items-center justify-center shrink-0 mt-0.5">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-white mb-1">
                        {pillar.title}
                      </h4>
                      <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
