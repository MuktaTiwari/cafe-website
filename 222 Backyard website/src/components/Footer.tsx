import React, { useState } from 'react';
import { Coffee, ArrowRight, MapPin, Clock, Phone, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="relative bg-[#0a0503] border-t border-white/10 pt-16 pb-12 text-stone-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Col 1: Brand Ethos */}
          <div className="flex flex-col items-start text-left">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e58a36] to-[#b86b28] flex items-center justify-center text-stone-950 shadow-md">
                <Coffee className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-tight text-white leading-none">
                  L'Aura
                </span>
                <span className="text-[10px] tracking-widest text-[#e58a36] uppercase font-semibold">
                  Café & Roastery
                </span>
              </div>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-6">
              An artisan roastery dedicated to micro-batch specialty beans, botanical courtyard peace,
              and genuine human connection.
            </p>

            <div className="flex items-center gap-3 text-stone-400">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#e58a36] hover:text-stone-950 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#e58a36] hover:text-stone-950 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#twitter"
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#e58a36] hover:text-stone-950 flex items-center justify-center transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col text-left">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#hero" className="hover:text-[#f3b069] transition-colors">
                  Home & Introduction
                </a>
              </li>
              <li>
                <a href="#bestsellers" className="hover:text-[#f3b069] transition-colors">
                  Signature Best Sellers
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:text-[#f3b069] transition-colors">
                  Our Roastery Craft
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#f3b069] transition-colors">
                  Seasonal Menu
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#f3b069] transition-colors">
                  Customer Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Location */}
          <div className="flex flex-col text-left">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Visit Us
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#e58a36] shrink-0 mt-0.5" />
                <span>222 Backyard Garden Way, Downtown Arts District</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#e58a36] shrink-0 mt-0.5" />
                <div>
                  <p className="text-stone-300 font-medium">Mon - Fri: 7:00 AM - 9:00 PM</p>
                  <p>Sat - Sun: 8:00 AM - 10:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#e58a36] shrink-0" />
                <span>+1 (555) 222-BREW</span>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="flex flex-col text-left">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              The Daily Roast
            </h4>
            <p className="text-xs text-stone-400 mb-4 leading-relaxed">
              Subscribe for seasonal micro-lot releases, brew recipes, and exclusive tasting invitations.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                <Check className="w-4 h-4" />
                <span>Welcome to the circle!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-amber-500/50"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-stone-950 bg-gradient-to-r from-[#e58a36] to-[#f3b069] hover:brightness-110 transition-all cursor-pointer shadow-md"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} L'Aura Café & Roastery. Handcrafted with care.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-stone-300 transition-colors">Terms of Service</a>
            <a href="#allergens" className="hover:text-stone-300 transition-colors">Allergen Guide</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
