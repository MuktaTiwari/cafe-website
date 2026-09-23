import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, Compass, Flame, Droplets, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface JourneySlide {
  number: string;
  badge: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  metrics: string;
  image: string;
  glowColor: string;
}

const JOURNEY_SLIDES: JourneySlide[] = [
  {
    number: '01',
    badge: 'Volcanic Origin',
    icon: Compass,
    title: 'High Altitude Harvest',
    subtitle: '1,950m Shade Grown',
    description:
      'Harvested by hand in the misty volcanic peaks of Huila, Colombia. Slow mountain maturation creates dense beans bursting with natural sugars and subtle berry notes.',
    metrics: 'Altitude: 1,950m • Varietal: Pink Bourbon',
    image: '/assets/bg-coffee-beans.jpg',
    glowColor: 'from-amber-600/30 to-orange-500/10',
  },
  {
    number: '02',
    badge: 'Precision Craft',
    icon: Flame,
    title: 'The Golden Roast Curve',
    subtitle: 'Micro-Lot Drum Roasted',
    description:
      'Carefully monitored second-by-second using our custom convection drum roaster at 204°C. We balance delicate floral acidity with creamy butterscotch sweetness.',
    metrics: 'Roast Profile: Medium-Light • Batch: 12kg',
    image: '/assets/cup-caramel-macchiato.jpg',
    glowColor: 'from-amber-500/30 to-yellow-600/10',
  },
  {
    number: '03',
    badge: 'Cold Chemistry',
    icon: Droplets,
    title: '18-Hour Nitrogen Infusion',
    subtitle: 'Cascara Cold Steeped',
    description:
      'Coarsely ground beans steeped for 18 hours in mineral spring water, then pressurized with micro-nitrogen bubbles for a velvety cascade and natural creaminess.',
    metrics: 'Steep Time: 18 Hours • Temp: 3.5°C',
    image: '/assets/signature-drink.png',
    glowColor: 'from-orange-600/30 to-rose-600/10',
  },
  {
    number: '04',
    badge: 'The Culmination',
    icon: Heart,
    title: 'The Velvet Splash Pour',
    subtitle: 'Artisan Sensory Experience',
    description:
      'Extracted under 9 bars of pressure directly over warm porcelain. Every cup is a celebration of craftsmanship, aroma, and tranquility designed to brighten your day.',
    metrics: 'Extraction: 28s • Crema: Silky Amber',
    image: '/assets/cup-splash-centerpiece.jpg',
    glowColor: 'from-amber-600/40 to-amber-400/20',
  },
];

export const PinnedShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;

    if (!container || !track) return;

    // Use gsap.context for scoped selector matching & clean tear-down
    const ctx = gsap.context(() => {
      // Calculate total horizontal distance to scroll
      const totalWidth = track.scrollWidth - window.innerWidth;

      // Pinned Horizontal Scrub Animation (After Effects feel)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true, // Lock screen in place
          scrub: 1, // Smooth scrub linked directly to scroll
          start: 'top top',
          end: () => `+=${track.scrollWidth}`, // Scroll distance equals content width
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) {
              gsap.to(progress, {
                width: `${self.progress * 100}%`,
                duration: 0.1,
                ease: 'none',
              });
            }
          },
        },
      });

      // Move the track horizontally
      tl.to(track, {
        x: -totalWidth,
        ease: 'none',
      });

      // Individual slide parallax and scale effect inside the pinned scroll
      const slideCards = track.querySelectorAll('.pinned-slide-card');
      slideCards.forEach((card) => {
        gsap.fromTo(
          card.querySelector('.slide-img'),
          { scale: 0.9, rotation: -4 },
          {
            scale: 1.05,
            rotation: 2,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl, // Hook directly to horizontal parent timeline
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="journey"
      ref={containerRef}
      className="relative w-full h-screen bg-[#0a0503] overflow-hidden text-white flex flex-col justify-between"
    >
      {/* Top Banner inside Pinned Section */}
      <div className="relative z-20 pt-8 sm:pt-10 px-6 sm:px-12 max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-none">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[11px] text-[#f3b069] mb-1 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#e58a36]" />
            <span>Interactive Scroll Journey</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
            The Bean-to-Cup Metamorphosis
          </h2>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-stone-400 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
          <span>Scroll down to travel through the craft</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#e58a36]" />
        </div>
      </div>

      {/* Horizontal Scrolling Track (Pins while user scrolls down) */}
      <div
        ref={trackRef}
        className="relative z-10 flex items-center h-[72vh] sm:h-[75vh] w-max px-6 sm:px-12 gap-8 sm:gap-14"
      >
        {JOURNEY_SLIDES.map((slide, idx) => {
          const IconComponent = slide.icon;

          return (
            <div
              key={slide.number}
              className="pinned-slide-card relative w-[85vw] sm:w-[580px] lg:w-[680px] h-full bg-[#160c07]/90 rounded-3xl p-6 sm:p-10 border border-amber-500/20 shadow-2xl shadow-black/80 flex flex-col justify-between overflow-hidden group shrink-0"
            >
              {/* Dynamic Atmospheric Glow */}
              <div
                className={`absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br ${slide.glowColor} blur-3xl pointer-events-none`}
              />

              {/* Slide Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-[#e58a36] flex items-center justify-center">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#f3b069] uppercase tracking-wider">
                    {slide.badge}
                  </span>
                </div>

                <span className="font-serif text-3xl sm:text-4xl font-bold text-white/20 group-hover:text-[#e58a36]/50 transition-colors">
                  {slide.number}
                </span>
              </div>

              {/* Center Content: Split Image & Story */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center my-auto">
                <div className="flex flex-col text-left">
                  <span className="text-xs text-[#e58a36] font-semibold mb-1">
                    {slide.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
                    {slide.title}
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {slide.description}
                  </p>
                  <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[11px] text-stone-400 font-mono">
                    {slide.metrics}
                  </div>
                </div>

                {/* Parallax Image Container */}
                <div className="relative h-44 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-[#25150e] to-[#120a06] flex items-center justify-center p-4 border border-white/5">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="slide-img w-full h-full object-contain filter drop-shadow-2xl will-change-transform"
                  />
                </div>
              </div>

              {/* Slide Footer */}
              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
                <span>Phase {idx + 1} of 4</span>
                <span className="text-[#f3b069] font-medium">Keep scrolling ↓</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Pinned Progress Bar */}
      <div className="relative z-20 pb-6 px-6 sm:px-12 max-w-7xl mx-auto w-full">
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-[#e58a36] via-[#f3b069] to-[#ffffff] w-0 rounded-full transition-all"
          />
        </div>
      </div>
    </div>
  );
};
