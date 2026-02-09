import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from 'sonner';
import Lenis from 'lenis';

import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import VenueShowcaseSection from './sections/VenueShowcaseSection';
import ExperienceMosaicSection from './sections/ExperienceMosaicSection';
import BanquetHallSection from './sections/BanquetHallSection';
import LawnSection from './sections/LawnSection';
import RoomsSection from './sections/RoomsSection';
import EventsSection from './sections/EventsSection';
import GallerySection from './sections/GallerySection';
import TestimonialsSection from './sections/TestimonialsSection';
import ContactSection from './sections/ContactSection';

import 'lenis/dist/lenis.css';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Smooth scroll initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Global scroll snap for pinned sections
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      // Build pinned ranges with centers
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center:
          (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Global snap configuration
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.04 && value <= r.end + 0.04
            );
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // Cleanup all ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-luxury-black min-h-screen">
      {/* Toast notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#141419',
            color: '#F4F1EC',
            border: '1px solid rgba(244, 241, 236, 0.1)',
          },
        }}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative">
        {/* Pinned Sections */}
        <HeroSection />
        <VenueShowcaseSection />
        <ExperienceMosaicSection />
        <BanquetHallSection />
        <LawnSection />
        <RoomsSection />

        {/* Flowing Sections */}
        <EventsSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
