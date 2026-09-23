import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Star, Sparkles, Check } from 'lucide-react';
import { BEST_SELLERS } from '../data/cafeData';
import type { CoffeeProduct } from '../data/cafeData';

interface BestSellerProps {
  onAddToCart: (product: CoffeeProduct) => void;
  addedProductId?: string | null;
}

export const BestSeller: React.FC<BestSellerProps> = ({ onAddToCart, addedProductId }) => {
  return (
    <section id="bestsellers" className="section relative py-20 lg:py-28 bg-[#0e0805]">
      {/* Background soft ambient radial light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-[#f3b069] mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e58a36]" />
            <span className="font-semibold tracking-wide uppercase">Handcrafted Favorites</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4"
          >
            Our Best Sellers
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
            className="text-stone-300 text-sm sm:text-base leading-relaxed"
          >
            Curated by master baristas, loved by thousands. Discover the distinctive cups
            that define our craft and signature taste.
          </motion.p>
        </div>

        {/* 3 Clean Signature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {BEST_SELLERS.map((item, index) => {
            const isAdded = addedProductId === item.id;

            return (
              <motion.div
                key={item.id}
                className="card group relative bg-[#180e08]/90 rounded-3xl p-6 border border-white/10 hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-amber-950/30 hover:-translate-y-1.5"
              >
                {/* Floating Product Image */}
                <div className="relative w-full h-64 mb-6 rounded-2xl overflow-hidden bg-gradient-to-b from-[#24140d] to-[#140b07] flex items-center justify-center p-4">
                  {/* Subtle inner radial glow */}
                  <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                  {/* Badge Tag */}
                  {item.tag && (
                    <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-[#180e08]/80 backdrop-blur-md border border-amber-500/30 text-[11px] font-semibold text-[#f3b069]">
                      {item.tag}
                    </div>
                  )}

                  {/* Calories / Nutrition Tag */}
                  {item.calories && (
                    <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-white/5 backdrop-blur-md text-[10px] text-stone-400">
                      {item.calories}
                    </div>
                  )}

                  {/* Cup Image with subtle continuous levitation */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3 + index * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative z-10 w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <div className="flex items-center text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400" />
                    </div>
                    <span className="text-xs font-bold text-white">{item.rating}</span>
                    <span className="text-xs text-stone-400">({item.reviewsCount})</span>
                  </div>

                  {/* Product Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#f3b069] transition-colors">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Tasting Notes */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.tastingNotes.map((note) => (
                      <span
                        key={note}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] text-stone-300"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Price & Add to Cart Button */}
                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-stone-400">Price</span>
                      <span className="font-serif text-xl sm:text-2xl font-bold text-white">
                        {item.price}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(item)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-md ${
                        isAdded
                          ? 'bg-emerald-500 text-white'
                          : 'bg-[#e58a36] hover:bg-[#f39c12] text-stone-950 active:scale-95'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
