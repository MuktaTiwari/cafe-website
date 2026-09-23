import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BestSeller } from './components/BestSeller';
import { PinnedShowcase } from './components/PinnedShowcase';
import { StorySection } from './components/StorySection';
import { MenuSection } from './components/MenuSection';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { CartDrawer } from './components/CartDrawer';
import type { CartItem } from './components/CartDrawer';
import type { CoffeeProduct } from './data/cafeData';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

// ============================================================================
// 1. GSAP ScrollTrigger Plugin Registration
// ============================================================================
// Ensure GSAP registers the ScrollTrigger plugin before any trigger is initialized.
gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [heroReplayKey, setHeroReplayKey] = useState(0);

  const mainContainerRef = useRef<HTMLDivElement>(null);

  // ============================================================================
  // 2. Smooth Scroll Setup with Lenis + ScrollTrigger Syncing
  // ============================================================================
  useEffect(() => {
    // Initialize Lenis for momentum-based buttery smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    // Synchronize Lenis scroll position with GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Bind Lenis updates to GSAP's internal animation ticker loop
    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // ==========================================================================
    // 3. Scroll-Triggered Section Fade-In, Slide-Up, and Card Staggering
    // ==========================================================================
    const ctx = gsap.context(() => {
      // Find all sections marked with .section
      const sections = gsap.utils.toArray<HTMLElement>('.section');

      sections.forEach((section) => {
        // (A) Animate the section container as it enters the viewport
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%', // Animation begins when section top hits 80% of viewport
              end: 'top 30%', // Animation end threshold
              toggleActions: 'play none none reverse', // Reverse smoothly when scrolling back up
            },
          }
        );

        // (B) Stagger child .card elements inside each .section
        const cards = section.querySelectorAll<HTMLElement>('.card');
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.2, // 0.2s delay between each card
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 30%',
                toggleActions: 'play none none reverse', // Reverse when scrolling up
              },
            }
          );
        }
      });
    }, mainContainerRef);

    // ==========================================================================
    // 4. Window Resize Handling (Refresh all trigger calculation coordinates)
    // ==========================================================================
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    // Initial recalculation after mount
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    // ==========================================================================
    // 5. Cleanup on Component Unmount
    // ==========================================================================
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      ctx.revert(); // Reverts and cleans up all GSAP animations within context
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Handler for adding items to the cart
  const handleAddToCart = (product: CoffeeProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    setAddedProductId(product.id);
    setToastMessage(`Added "${product.name}" to your order bag`);

    setTimeout(() => {
      setAddedProductId(null);
    }, 1800);

    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Handler for adjusting item quantity
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      ref={mainContainerRef}
      className="min-h-screen bg-[#0e0805] text-[#fbf6ee] font-sans selection:bg-[#e58a36] selection:text-stone-950 overflow-x-hidden"
    >
      {/* Floating Pill Glass Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Hero Section with GSAP Celestial Sky Fall & Centerpiece Levitation */}
      <Hero
        onOpenReservation={() => setIsReservationOpen(true)}
        replayKey={heroReplayKey}
        onReplay={() => setHeroReplayKey((k) => k + 1)}
      />

      {/* Signature Best Sellers (ScrollTrigger: .section with staggered .card elements) */}
      <BestSeller
        onAddToCart={handleAddToCart}
        addedProductId={addedProductId}
      />

      {/* Pinned Section Showcase (pin: true, scrub: true horizontal After Effects-style journey) */}
      <PinnedShowcase />

      {/* Roastery Craft & Philosophy (ScrollTrigger: .section with staggered .card elements) */}
      <StorySection />

      {/* Curated Seasonal Menu (ScrollTrigger: .section with staggered .card elements) */}
      <MenuSection
        onAddToCart={handleAddToCart}
        addedProductId={addedProductId}
      />

      {/* Testimonials Prototype Recreation (ScrollTrigger: .section with staggered .card elements) */}
      <Testimonials />

      {/* Minimalist 4-Column Footer */}
      <Footer />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={() => setCartItems([])}
      />

      {/* Toast Notification when adding items */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50 bg-[#1f120c]/95 backdrop-blur-xl border border-amber-500/40 px-4 py-3 rounded-2xl shadow-2xl shadow-black/80 flex items-center gap-3 text-xs sm:text-sm font-medium text-white"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span>{toastMessage}</span>
            <button
              onClick={() => {
                setToastMessage(null);
                setIsCartOpen(true);
              }}
              className="ml-2 text-xs font-bold text-[#e58a36] hover:underline cursor-pointer"
            >
              View Bag
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
