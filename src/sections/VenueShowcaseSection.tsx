import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VenueShowcaseSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=110%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      // Left panel slides in
      scrollTl.fromTo(
        leftPanelRef.current,
        { x: '-55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Headline words stagger
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        scrollTl.fromTo(
          words,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.05
        );
      }

      // Body text
      scrollTl.fromTo(
        bodyRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Accent rule
      scrollTl.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none' },
        0.12
      );

      // CTA
      scrollTl.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.14
      );

      // Image card slides in from right
      scrollTl.fromTo(
        imageCardRef.current,
        { x: '55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Caption
      scrollTl.fromTo(
        captionRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30-70%) - Hold positions

      // EXIT (70-100%)
      scrollTl.fromTo(
        leftPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0.3, ease: 'power2.in' },
        0.6
      );

      scrollTl.fromTo(
        imageCardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0.35, ease: 'power2.in' },
        0.6
      );

      scrollTl.fromTo(
        ruleRef.current,
        { scaleX: 1 },
        { scaleX: 0, transformOrigin: 'right', ease: 'power2.in' },
        0.6
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
      className="section-pinned bg-luxury-black z-20"
    >
      {/* Grain Overlay */}
      <div className="absolute inset-0 grain-overlay" />

      {/* Left Panel */}
      <div
        ref={leftPanelRef}
        className="absolute left-0 top-0 w-full lg:w-[55vw] h-full flex flex-col justify-center px-8 lg:px-[8vw] py-20"
      >
        <h2
          ref={headlineRef}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(34px,3.6vw,52px)] text-luxury-cream leading-[1.0] mb-6"
        >
          <span className="word inline-block">A</span>{' '}
          <span className="word inline-block">venue</span>{' '}
          <span className="word inline-block">designed</span>{' '}
          <span className="word inline-block">for</span>{' '}
          <span className="word inline-block">once-in-a-lifetime</span>{' '}
          <span className="word inline-block">moments.</span>
        </h2>

        <p
          ref={bodyRef}
          className="font-body text-base md:text-lg text-luxury-gray max-w-md mb-8"
        >
          From intimate gatherings to grand receptions, our spaces adapt to your
          vision—flawless service, timeless décor, and cuisine that delights.
        </p>

        {/* Accent Rule */}
        <div ref={ruleRef} className="accent-rule w-[120px] mb-6" />

        {/* CTA Link */}
        <button
          ref={ctaRef}
          onClick={() => scrollToSection('#gallery')}
          className="flex items-center gap-2 text-luxury-bronze font-medium hover:gap-4 transition-all duration-300"
        >
          Explore spaces
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Right Image Card */}
      <div
        ref={imageCardRef}
        className="hidden lg:block absolute left-[58vw] top-[14vh] w-[36vw] h-[72vh] image-card"
      >
        <img
          src="/venue-table.jpg"
          alt="Luxury banquet table setting"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Caption */}
      <p
        ref={captionRef}
        className="hidden lg:block absolute left-[58vw] top-[88vh] font-mono text-xs uppercase tracking-widest text-luxury-gray"
      >
        Ruchi Resort • Hisar
      </p>

      {/* Mobile Image */}
      <div className="lg:hidden absolute bottom-20 left-8 right-8 h-[40vh] image-card">
        <img
          src="/venue-table.jpg"
          alt="Luxury banquet table setting"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default VenueShowcaseSection;
