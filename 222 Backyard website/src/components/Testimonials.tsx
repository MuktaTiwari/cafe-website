import React from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles, Heart } from 'lucide-react';
import { TESTIMONIALS, CALLOUT_TAGS } from '../data/cafeData';

export const Testimonials: React.FC = () => {
  return (
    <section
      id="reviews"
      className="section relative py-24 lg:py-32 bg-gradient-to-b from-[#0e0805] via-[#160c07] to-[#0e0805] overflow-hidden"
    >
      {/* Background Coffee Beans Subtle Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <img
          src="/assets/bg-coffee-beans.jpg"
          alt="Coffee Beans Texture"
          className="w-full h-full object-cover filter blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0805] via-transparent to-[#0e0805]" />
      </div>

      {/* Atmospheric Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-amber-600/15 via-amber-900/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-[#f3b069] mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e58a36]" />
            <span className="font-semibold tracking-wide uppercase">Community Love</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4"
          >
            Words From Our Regulars
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
            className="text-stone-300 text-sm sm:text-base leading-relaxed"
          >
            See why coffee lovers and creators call our roastery their second home.
          </motion.p>
        </div>

        {/* Desktop Layout (Grid with Centerpiece) / Mobile Adaptive */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Visual Centerpiece with Floating Tags */}
          <div className="relative z-20 flex flex-col items-center justify-center my-6 lg:my-10">
            {/* Centerpiece Image Container */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-64 sm:w-80 lg:w-96 rounded-3xl overflow-hidden shadow-2xl shadow-black/80 border border-amber-500/20 group"
            >
              <motion.img
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                src="/assets/cup-splash-centerpiece.jpg"
                alt="Splashing Coffee Cup"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Like Badge */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#180e08]/80 backdrop-blur-md border border-amber-500/30 flex items-center justify-center text-[#e58a36] shadow-lg">
                <Heart className="w-4 h-4 fill-[#e58a36]" />
              </div>
            </motion.div>

            {/* Floating Orange Callout Tags Scattered Around */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-w-lg mx-auto">
              {CALLOUT_TAGS.map((tag, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.15 }}
                  style={{ rotate: tag.rotation }}
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${tag.bg} text-stone-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-950/40 hover:scale-105 transition-transform select-none cursor-default`}
                >
                  {tag.text}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Testimonial Cards Grid (Surrounding the Centerpiece) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {TESTIMONIALS.map((rev) => (
              <div
                key={rev.id}
                className="card bg-[#180e08]/85 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-all shadow-xl shadow-black/40 flex flex-col justify-between group"
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Speech Quote */}
                  <p className="text-stone-300 text-sm leading-relaxed mb-6 italic">
                    "{rev.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-bold text-white group-hover:text-[#f3b069] transition-colors">
                      {rev.author}
                    </h4>
                    <p className="text-[11px] text-stone-400">
                      {rev.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
