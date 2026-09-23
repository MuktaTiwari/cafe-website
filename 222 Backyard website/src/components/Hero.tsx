import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { Sparkles, ArrowRight, Calendar, Star, Coffee, RotateCcw, ChevronDown } from 'lucide-react';

interface HeroProps {
  onOpenReservation: () => void;
  replayKey?: number;
  onReplay?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, replayKey = 0, onReplay }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  // ============================================================================
  // Scroll-Linked Multiplane Parallax & Depth Transforms
  // ============================================================================
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Background Parallax: deep roasted coffee beans texture moves down slowly
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Atmospheric Sky Glow: expands and warms as user scrolls into the roastery
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.45]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.2, 0.45, 0.1]);

  // Left Column (Typography & CTAs): drifts up and fades with depth separation
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-28%']);
  const textX = useTransform(scrollYProgress, [0, 1], ['0px', '-40px']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // Right Column (Cheering Cups Trio): drifts down with 3D scale and subtle dynamic rotation
  const cupY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const cupScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const cupRotate = useTransform(scrollYProgress, [0, 1], [0, 4]);

  // Floating Tasting Notes Badge: parallax counter-drift
  const badgeX = useTransform(scrollYProgress, [0, 1], ['0px', '-55px']);
  const badgeY = useTransform(scrollYProgress, [0, 1], ['0px', '45px']);

  // Multiplane Floating Accent Particles (Different scroll velocity depths)
  const particle1Y = useTransform(scrollYProgress, [0, 1], ['0px', '-180px']);
  const particle2Y = useTransform(scrollYProgress, [0, 1], ['0px', '140px']);
  const particle3Y = useTransform(scrollYProgress, [0, 1], ['0px', '-90px']);

  // Scroll Indicator fades out immediately on first scroll
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const scrollIndicatorY = useTransform(scrollYProgress, [0, 0.18], ['0px', '15px']);

  // ============================================================================
  // GSAP Entrance Animation: Sky Fall & Cheering Cups Collision ("Cheers!")
  // ============================================================================
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // 1. Sky glow ambient light fading in
      tl.from('.hero-sky-glow', {
        opacity: 0,
        scale: 0.5,
        duration: 1.2,
      });

      // 2. Badge dropping from the clouds
      tl.from('.hero-badge', {
        y: -400,
        opacity: 0,
        scale: 0.7,
        duration: 0.9,
        ease: 'bounce.out',
      }, '-=0.9');

      // 3. Headline words tumbling sequentially out of the sky
      tl.from('.hero-word', {
        y: -750,
        opacity: 0,
        scale: 1.8,
        rotation: (i) => (i % 2 === 0 ? -16 : 16),
        duration: 1.0,
        stagger: 0.08,
        ease: 'bounce.out',
      }, '-=0.6');

      // 4. The 3 Cups Plunging from the Sky from 3 Angles
      // (A) Center cup drops from the zenith
      tl.from('.cheer-cup-center', {
        y: -1000,
        opacity: 0,
        scale: 0.5,
        rotation: -10,
        duration: 1.15,
        ease: 'power2.in',
      }, '-=0.7');

      // (B) Left cup drops from top-left, angling inward towards center
      tl.from('.cheer-cup-left', {
        y: -950,
        x: -240,
        opacity: 0,
        rotation: -45,
        scale: 0.55,
        duration: 1.15,
        ease: 'power2.in',
      }, '<');

      // (C) Right cup drops from top-right, angling inward towards center
      tl.from('.cheer-cup-right', {
        y: -950,
        x: 240,
        opacity: 0,
        rotation: 45,
        scale: 0.55,
        duration: 1.15,
        ease: 'power2.in',
      }, '<');

      // 5. The "CLINK!" Collision Moment: Cups Meet & Cheers Flash
      tl.to('.cheer-clink-spark', {
        opacity: 1,
        scale: 2.2,
        duration: 0.12,
        ease: 'power1.out',
      }, '-=0.1');

      tl.to('.cheer-clink-spark', {
        opacity: 0,
        scale: 3.2,
        duration: 0.35,
        ease: 'power2.inOut',
      });

      // Elastic recoil as cups bump into each other (toasting/cheering recoil)
      tl.fromTo('.cheer-cup-left',
        { x: -18 },
        { x: 0, rotation: -16, duration: 0.75, ease: 'elastic.out(1.2, 0.4)' },
        '-=0.45'
      );

      tl.fromTo('.cheer-cup-right',
        { x: 18 },
        { x: 0, rotation: 16, duration: 0.75, ease: 'elastic.out(1.2, 0.4)' },
        '<'
      );

      tl.fromTo('.cheer-cup-center',
        { scale: 1.14, y: 8 },
        { scale: 1.0, y: 0, duration: 0.75, ease: 'elastic.out(1.2, 0.4)' },
        '<'
      );

      // 6. Subtitle floating down into position
      tl.from('.hero-subtitle', {
        y: -150,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.5');

      // 7. Action buttons popping in
      tl.from('.hero-cta-btn', {
        y: -100,
        opacity: 0,
        scale: 0.85,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.8)',
      }, '-=0.4');

      // 8. Trust metrics & floating badge sliding down
      tl.from('.hero-trust-metric, .hero-float-badge', {
        y: -60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      }, '-=0.3');
      // Note: All 3 cups settle once into their resting positions and do not move continuously.
    }, heroRef);

    return () => ctx.revert();
  }, [replayKey]);

  const titleWords = ['Where', 'Every', 'Cup', 'Begins', 'With', 'Sunshine'];

  const handleScrollToBestSellers = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('bestsellers');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen pt-28 pb-20 lg:pt-36 lg:pb-28 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#180e08] via-[#0e0805] to-[#0e0805]"
    >
      {/* 1. Parallax Coffee Beans Background Texture with Dynamic Scale */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 pointer-events-none opacity-15 will-change-transform"
      >
        <img
          src="/assets/bg-coffee-beans.jpg"
          alt="Coffee Beans Pattern"
          className="w-full h-full object-cover object-center filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#180e08]/90 via-[#0e0805]/80 to-[#0e0805]" />
      </motion.div>

      {/* 2. Scroll-Reactive Ambient Sky Glow */}
      <motion.div
        style={{ scale: glowScale, opacity: glowOpacity }}
        className="hero-sky-glow absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-b from-amber-500/25 via-amber-700/15 to-transparent blur-[150px] rounded-full pointer-events-none will-change-transform"
      />

      {/* 3. Multiplane Floating Accent Depth Particles (Scroll reactive) */}
      <motion.div
        style={{ y: particle1Y }}
        className="absolute top-28 left-[10%] w-3 h-3 rounded-full bg-amber-500/30 blur-[1px] pointer-events-none hidden sm:block will-change-transform"
      />
      <motion.div
        style={{ y: particle2Y }}
        className="absolute top-1/2 right-[8%] w-4 h-4 rounded-full bg-amber-400/20 blur-[2px] pointer-events-none hidden sm:block will-change-transform"
      />
      <motion.div
        style={{ y: particle3Y }}
        className="absolute bottom-32 left-[18%] w-2.5 h-2.5 rounded-full bg-amber-600/25 blur-[1px] pointer-events-none hidden sm:block will-change-transform"
      />

      {/* 4. Main Two-Column Grid */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Column: Typography & CTAs with Scroll-Linked Drift & Fade */}
          <motion.div
            style={{ y: textY, x: textX, opacity: textOpacity }}
            className="flex flex-col items-start text-left will-change-transform"
          >
            {/* Pill Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs text-[#f3b069] mb-5 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#e58a36]" />
              <span className="font-semibold tracking-wide uppercase">Artisan Roastery & Espresso Bar</span>
            </div>

            {/* Headline with GSAP Sky Fall Words */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 tracking-tight leading-[1.1] flex flex-wrap gap-x-3.5 gap-y-1">
              {titleWords.map((word, i) => (
                <span
                  key={i}
                  className={`hero-word inline-block transform will-change-transform ${word === 'Sunshine' || word === 'Cup'
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#e58a36] via-[#f3b069] to-[#f9d29f] italic font-normal'
                    : ''
                    }`}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-stone-300 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-xl font-normal">
              Slow down and savor micro-batch roasted beans, handcrafted caramel macchiatos,
              and serene courtyard atmosphere. Mindfully brewed to brighten your day.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#bestsellers"
                onClick={handleScrollToBestSellers}
                className="hero-cta-btn inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-stone-950 bg-gradient-to-r from-[#e58a36] to-[#f3b069] shadow-xl shadow-amber-950/50 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <span>Explore Best Sellers</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenReservation}
                className="hero-cta-btn inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-white/5 border border-white/15 hover:bg-white/10 hover:border-amber-500/40 active:scale-95 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#e58a36]" />
                <span>Reserve Table</span>
              </button>

              {/* Replay GSAP Sky Fall Button */}
              {onReplay && (
                <button
                  onClick={onReplay}
                  title="Replay Sky Fall & Cheering Cups Animation"
                  className="hero-cta-btn inline-flex items-center gap-1.5 px-3.5 py-3.5 rounded-full text-xs font-medium text-stone-400 bg-white/5 hover:text-white hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cheers Again</span>
                </button>
              )}
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 w-full max-w-md">
              <div className="hero-trust-metric flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold text-white">100%</span>
                <span className="text-[11px] sm:text-xs text-stone-400">Arabica Single Origin</span>
              </div>
              <div className="hero-trust-metric flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#e58a36]">Daily</span>
                <span className="text-[11px] sm:text-xs text-stone-400">Micro-Batch Roasting</span>
              </div>
              <div className="hero-trust-metric flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-serif text-xl sm:text-2xl font-bold text-white">4.9</span>
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                </div>
                <span className="text-[11px] sm:text-xs text-stone-400">1,200+ Reviews</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3 Cheering Cups Collision ("Cheers!") Stage */}
          <motion.div
            style={{ y: cupY, scale: cupScale, rotate: cupRotate }}
            className="relative flex items-center justify-center will-change-transform"
          >
            {/* Ambient backlight */}
            <div className="absolute w-80 sm:w-[460px] h-80 sm:h-[460px] rounded-full bg-gradient-to-tr from-amber-600/30 via-amber-500/15 to-transparent blur-3xl pointer-events-none" />

            {/* 3 Cups Cheering Stage Container */}
            <div className="relative z-10 w-full max-w-lg h-[460px] sm:h-[520px] flex items-center justify-center">

              {/* Clink / Collision Flash Spark Burst */}
              <div className="cheer-clink-spark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-radial from-amber-300 via-amber-500/50 to-transparent blur-lg pointer-events-none opacity-0 z-30" />

              {/* 1. Left Cup (Takeaway Cup with lid, swoops in from top-left, tilts right) */}
              <div className="cheer-cup-left absolute -left-1 sm:left-4 bottom-6 sm:bottom-10 w-44 sm:w-56 z-10 will-change-transform pointer-events-none select-none">
                <img
                  src="/assets/hero-cup-left.png"
                  alt="Left Cheering Coffee Cup"
                  className="w-full h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
                />
              </div>

              {/* 2. Center Cup (Coffee Splash Crown, plunges from zenith in front) */}
              <div className="cheer-cup-center relative z-20 w-52 sm:w-72 bottom-0 will-change-transform pointer-events-none select-none">
                <img
                  src="/assets/hero-cup-center.png"
                  alt="Center Splashing Coffee Cup"
                  className="w-full h-auto object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
                />
              </div>

              {/* 3. Right Cup (Takeaway Cup with lid, swoops in from top-right, tilts left) */}
              <div className="cheer-cup-right absolute -right-1 sm:right-4 bottom-8 sm:bottom-12 w-44 sm:w-56 z-10 will-change-transform pointer-events-none select-none">
                <img
                  src="/assets/hero-cup-right.png"
                  alt="Right Cheering Coffee Cup"
                  className="w-full h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
                />
              </div>

              {/* Floating Tasting Notes Badge with Scroll Parallax Counter-Drift */}
              <motion.div
                style={{ x: badgeX, y: badgeY }}
                className="hero-float-badge absolute -bottom-4 -left-2 sm:-left-6 z-30 bg-[#1f120c]/90 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-3.5 sm:p-4 shadow-2xl flex items-center gap-3 max-w-xs will-change-transform"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#e58a36] flex items-center justify-center shrink-0">
                  <Coffee className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-semibold text-[#f3b069] uppercase tracking-wider">
                    Signature Cheer
                  </p>
                  <p className="text-xs font-medium text-white line-clamp-1">
                    3 Cups Clink • Velvet Espresso & Cream
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 5. Interactive Scroll Down Callout Pill (Smooth Lenis Scroll Action) */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity, y: scrollIndicatorY }}
        className="relative z-20 mt-10 sm:mt-14 flex flex-col items-center pointer-events-auto"
      >
        <a
          href="#bestsellers"
          onClick={handleScrollToBestSellers}
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/30 transition-all text-xs font-medium text-stone-400 hover:text-white cursor-pointer shadow-lg"
        >
          {/* Animated pulsing scroll dot */}
          <div className="w-2 h-2 rounded-full bg-[#e58a36] animate-pulse" />
          <span>Scroll to explore</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#e58a36] group-hover:translate-y-0.5 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
};
