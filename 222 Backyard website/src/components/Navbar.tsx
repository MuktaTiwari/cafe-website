import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, ShoppingBag, Menu, X, Calendar } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenReservation: () => void;
  onOpenCart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenReservation, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Best Sellers', href: '#bestsellers' },
    { label: 'Journey', href: '#journey' },
    { label: 'Our Craft', href: '#craft' },
    { label: 'Menu', href: '#menu' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 sm:py-6 pointer-events-none">
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto w-full max-w-5xl rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 flex items-center justify-between border ${
          scrolled
            ? 'bg-[#160c07]/90 backdrop-blur-xl border-amber-500/20 shadow-2xl shadow-black/60'
            : 'bg-[#160c07]/75 backdrop-blur-md border-white/10 shadow-lg shadow-black/40'
        }`}
      >
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e58a36] to-[#b86b28] flex items-center justify-center text-stone-950 shadow-md group-hover:scale-105 transition-transform">
            <Coffee className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif text-lg font-bold tracking-tight text-white leading-none">
              L'Aura
            </span>
            <span className="text-[10px] tracking-widest text-[#e58a36] uppercase font-semibold">
              Café & Roastery
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium text-stone-300 hover:text-white hover:bg-white/5 transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Order Bag / Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="View Order Bag"
            className="relative p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#e58a36] text-[10px] font-bold text-stone-950 flex items-center justify-center shadow-md"
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* Reserve Table CTA */}
          <button
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-stone-950 bg-gradient-to-r from-[#e58a36] to-[#f3b069] hover:brightness-110 shadow-md shadow-amber-950/40 active:scale-95 transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Table</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-20 left-4 right-4 bg-[#160c07]/95 backdrop-blur-2xl border border-amber-500/20 rounded-2xl p-5 shadow-2xl md:hidden flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1 pb-3 border-b border-white/10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-stone-200 hover:text-[#e58a36] hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-stone-950 bg-gradient-to-r from-[#e58a36] to-[#f3b069] flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
