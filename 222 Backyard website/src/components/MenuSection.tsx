import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, Check, Star } from 'lucide-react';
import { MENU_ITEMS } from '../data/cafeData';
import type { CoffeeProduct } from '../data/cafeData';

interface MenuSectionProps {
  onAddToCart: (product: CoffeeProduct) => void;
  addedProductId?: string | null;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart, addedProductId }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Offerings' },
    { id: 'espresso', label: 'Espresso Bar' },
    { id: 'cold', label: 'Cold Brew & Frappé' },
    { id: 'specialty', label: 'Specialty Drinks' },
    { id: 'bakery', label: 'Artisan Bakery' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="section relative py-20 lg:py-28 bg-[#0e0805]">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-[#f3b069] mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e58a36]" />
            <span className="font-semibold tracking-wide uppercase">Curated Offerings</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4"
          >
            Explore Our Seasonal Menu
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
            className="text-stone-300 text-sm sm:text-base leading-relaxed"
          >
            Every brew is prepared fresh to order using precision grinds and filtered spring water.
          </motion.p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#e58a36] text-stone-950 font-bold shadow-lg shadow-amber-950/40'
                  : 'bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => {
              const isAdded = addedProductId === item.id;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="card bg-[#180e08]/75 rounded-2xl p-5 border border-white/10 hover:border-amber-500/30 transition-all flex flex-col justify-between group shadow-lg shadow-black/30"
                >
                  <div className="flex gap-4 items-start mb-4">
                    {/* Small Product Thumbnail */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#24140d] p-1.5 shrink-0 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain filter drop-shadow group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Information */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-[#f3b069] transition-colors leading-snug">
                          {item.name}
                        </h4>
                        <span className="font-serif text-base font-bold text-[#e58a36] shrink-0">
                          {item.price}
                        </span>
                      </div>

                      <p className="text-stone-300 text-xs leading-relaxed line-clamp-2 mb-2">
                        {item.description}
                      </p>

                      {/* Flavor notes */}
                      <div className="flex flex-wrap gap-1">
                        {item.tastingNotes.slice(0, 2).map((note) => (
                          <span
                            key={note}
                            className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-stone-400"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-stone-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-white">{item.rating}</span>
                      <span>({item.reviewsCount})</span>
                    </div>

                    <button
                      onClick={() => onAddToCart(item)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/10 text-stone-200 hover:bg-[#e58a36] hover:text-stone-950'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3 stroke-[2.5]" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
