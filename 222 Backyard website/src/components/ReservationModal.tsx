import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '10:00 AM',
    guests: '2 Guests',
    seating: 'Courtyard Garden',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Trigger celebratory confetti
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#e58a36', '#f3b069', '#ffffff'],
    });

    setTimeout(() => {
      // Allow user to read confirmation, then close or reset
    }, 3000);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleReset}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-lg bg-[#180e08] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/90 overflow-hidden"
          >
            {/* Soft Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/15 blur-3xl rounded-full pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleReset}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  Table Reserved!
                </h3>
                <p className="text-stone-300 text-sm max-w-xs mb-6">
                  Thank you, <span className="text-[#f3b069] font-medium">{formData.name || 'Friend'}</span>.
                  We've reserved a cozy spot for you on <span className="text-white font-medium">{formData.date || 'your selected date'}</span> at <span className="text-white font-medium">{formData.time}</span>.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-stone-950 bg-[#e58a36] hover:bg-[#f39c12] transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] text-[#f3b069] mb-2 font-semibold">
                    <Sparkles className="w-3 h-3 text-[#e58a36]" />
                    <span>L'Aura Experience</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Reserve Your Table
                  </h3>
                  <p className="text-stone-400 text-xs sm:text-sm mt-1">
                    Book a quiet nook for coffee, work, or shared moments with friends.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Julian Hayes"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="julian@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-[#e58a36]" />
                        <span>Date</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#e58a36]" />
                        <span>Preferred Time</span>
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f120c] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500/50"
                      >
                        <option value="08:00 AM">08:00 AM (Early Roast)</option>
                        <option value="10:00 AM">10:00 AM (Morning Brew)</option>
                        <option value="01:00 PM">01:00 PM (Afternoon Reset)</option>
                        <option value="04:00 PM">04:00 PM (Golden Hour)</option>
                        <option value="07:00 PM">07:00 PM (Evening Unwind)</option>
                      </select>
                    </div>
                  </div>

                  {/* Guests & Seating Preference */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1 flex items-center gap-1.5">
                        <Users className="w-3 h-3 text-[#e58a36]" />
                        <span>Party Size</span>
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f120c] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500/50"
                      >
                        <option value="1 Guest">1 Guest (Solo Study)</option>
                        <option value="2 Guests">2 Guests (Cozy Table)</option>
                        <option value="3-4 Guests">3-4 Guests (Lounge)</option>
                        <option value="5+ Guests">5+ Guests (Large Booth)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1">
                        Seating Area
                      </label>
                      <select
                        value={formData.seating}
                        onChange={(e) => setFormData({ ...formData, seating: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f120c] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500/50"
                      >
                        <option value="Courtyard Garden">Courtyard Garden (Open-Air)</option>
                        <option value="Indoor Lounge">Indoor Cedar Lounge</option>
                        <option value="Barista Bar">Barista Bar Counter</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-stone-950 bg-gradient-to-r from-[#e58a36] to-[#f3b069] hover:brightness-110 shadow-lg shadow-amber-950/50 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Confirm Reservation
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
