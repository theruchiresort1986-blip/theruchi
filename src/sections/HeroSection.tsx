import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background entrance
      tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.1 }
      );

      // Micro label
      tl.fromTo(
        labelRef.current,
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.6'
      );

      // Headline (word by word)
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.06 },
          '-=0.4'
        );
      }

      // Subline
      tl.fromTo(
        sublineRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.5'
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // Scroll hint
      tl.fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([bgRef.current, contentRef.current], {
              opacity: 1,
              y: 0,
              scale: 1,
            });
          },
        },
      });

      // Background exit (70-100%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-6vh', ease: 'power2.in' },
        0.7
      );

      // Content exit
      scrollTl.fromTo(
        contentRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Scroll hint fade out early
      scrollTl.fromTo(
        scrollHintRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-luxury-black z-10"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/hero-couple.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 vignette-overlay" />

      {/* Grain Overlay */}
      <div className="absolute inset-0 grain-overlay" />

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
      >
        {/* Micro Label */}
        <p
          ref={labelRef}
          className="micro-label mb-6 text-center"
        >
          Banquet Hall & Lawn • Hisar
        </p>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-luxury-cream text-center max-w-4xl leading-[0.95] mb-6"
          style={{ textShadow: '0 10px 30px rgba(0,0,0,0.35)' }}
        >
          <span className="word inline-block">Where</span>{' '}
          <span className="word inline-block">Celebrations</span>{' '}
          <span className="word inline-block">Feel</span>{' '}
          <span className="word inline-block">Like</span>{' '}
          <span className="word inline-block">Cinema.</span>
        </h1>

        {/* Subline */}
        <p
          ref={sublineRef}
          className="font-body text-base md:text-lg text-luxury-gray text-center max-w-xl mb-10"
        >
          Elegant spaces, warm hospitality, and memories that last a lifetime.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollToSection('#contact')}
            className="btn-primary"
          >
            Book a Tour
          </button>
          <button
            onClick={() => scrollToSection('#contact')}
            className="btn-outline"
          >
            Get a Quote
          </button>
        </div>
      </div>

      {/* Scroll Hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-luxury-gray">
          Scroll to explore
        </span>
        <ChevronDown className="w-5 h-5 text-luxury-bronze animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
