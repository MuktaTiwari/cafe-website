import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { CoffeeProduct } from '../data/cafeData';
import confetti from 'canvas-confetti';

export interface CartItem {
  product: CoffeeProduct;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [checkedOut, setCheckedOut] = useState(false);

  const subtotal = items.reduce((sum, item) => {
    const priceNum = parseFloat(item.product.price.replace('$', '')) || 0;
    return sum + priceNum * item.quantity;
  }, 0);

  const handleCheckout = () => {
    setCheckedOut(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e58a36', '#f3b069', '#ffffff'],
    });

    setTimeout(() => {
      onClearCart();
      setCheckedOut(false);
      onClose();
    }, 3500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative z-10 w-full max-w-md bg-[#160c07] border-l border-amber-500/20 h-full p-6 flex flex-col justify-between shadow-2xl shadow-black overflow-y-auto"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-[#e58a36] flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white">Your Order Bag</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              {checkedOut ? (
                <div className="py-16 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-white mb-2">Order Sent to Bar!</h4>
                  <p className="text-stone-300 text-xs sm:text-sm max-w-xs leading-relaxed">
                    Our baristas have started crafting your drinks with care. You can pick them up in 8–10 minutes.
                  </p>
                </div>
              ) : items.length === 0 ? (
                <div className="py-16 text-center flex flex-col items-center text-stone-400">
                  <ShoppingBag className="w-12 h-12 stroke-[1.2] mb-3 text-stone-500" />
                  <p className="font-serif text-base text-white mb-1">Your bag is empty</p>
                  <p className="text-xs text-stone-400 max-w-xs">
                    Explore our signature best sellers and add your favorite brew to get started.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5"
                    >
                      <div className="w-14 h-14 rounded-xl bg-[#24140d] p-1 flex items-center justify-center shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain filter drop-shadow"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h5 className="font-serif text-sm font-bold text-white truncate">
                          {product.name}
                        </h5>
                        <span className="text-xs font-semibold text-[#e58a36]">
                          {product.price}
                        </span>
                      </div>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-lg border border-white/10">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="text-stone-400 hover:text-white p-0.5 cursor-pointer"
                        >
                          {quantity === 1 ? <Trash2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                        </button>
                        <span className="text-xs font-bold text-white min-w-4 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="text-stone-400 hover:text-white p-0.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Checkout Action */}
            {!checkedOut && items.length > 0 && (
              <div className="pt-6 border-t border-white/10 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-stone-400 uppercase tracking-wider">Subtotal</span>
                  <span className="font-serif text-xl font-bold text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-stone-950 bg-gradient-to-r from-[#e58a36] to-[#f3b069] hover:brightness-110 shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span>Place Instant Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
