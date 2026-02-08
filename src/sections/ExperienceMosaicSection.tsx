import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ExperienceMosaicSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const topLeftCardRef = useRef<HTMLDivElement>(null);
  const topRightCardRef = useRef<HTMLDivElement>(null);
  const bottomLeftCardRef = useRef<HTMLDivElement>(null);
  const bottomRightCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

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
        },
      });

      // ENTRANCE (0-30%)
      // Cards fly in from corners
      scrollTl.fromTo(
        topLeftCardRef.current,
        { x: '-40vw', y: '-20vh', opacity: 0 },
        { x: 0, y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        topRightCardRef.current,
        { x: '40vw', y: '-20vh', opacity: 0 },
        { x: 0, y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        bottomLeftCardRef.current,
        { x: '-40vw', y: '20vh', opacity: 0 },
        { x: 0, y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        bottomRightCardRef.current,
        { x: '40vw', y: '20vh', opacity: 0 },
        { x: 0, y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Headline
      scrollTl.fromTo(
        headlineRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // CTA pill
      scrollTl.fromTo(
        ctaRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0.12
      );

      // SETTLE (30-70%) - Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        topLeftCardRef.current,
        { x: 0, y: 0, opacity: 1 },
        { x: '-10vw', y: '-10vh', opacity: 0.3, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        topRightCardRef.current,
        { x: 0, y: 0, opacity: 1 },
        { x: '10vw', y: '-10vh', opacity: 0.3, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bottomLeftCardRef.current,
        { x: 0, y: 0, opacity: 1 },
        { x: '-10vw', y: '10vh', opacity: 0.3, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bottomRightCardRef.current,
        { x: 0, y: 0, opacity: 1 },
        { x: '10vw', y: '10vh', opacity: 0.3, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0.25, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ctaRef.current,
        { scale: 1, opacity: 1 },
        { scale: 0.92, opacity: 0, ease: 'power2.in' },
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
      className="section-pinned bg-luxury-black z-30"
    >
      {/* Grain Overlay */}
      <div className="absolute inset-0 grain-overlay" />

      {/* Top Left Card */}
      <div
        ref={topLeftCardRef}
        className="absolute left-[6vw] top-[10vh] w-[28vw] h-[34vh] image-card hidden lg:block"
      >
        <img
          src="/mosaic-dance.jpg"
          alt="Couple dancing"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top Right Card */}
      <div
        ref={topRightCardRef}
        className="absolute right-[6vw] top-[10vh] w-[34vw] h-[34vh] image-card hidden lg:block"
      >
        <img
          src="/mosaic-dining.jpg"
          alt="Dining scene"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Left Card */}
      <div
        ref={bottomLeftCardRef}
        className="absolute left-[6vw] bottom-[10vh] w-[34vw] h-[34vh] image-card hidden lg:block"
      >
        <img
          src="/mosaic-food.jpg"
          alt="Gourmet food"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Right Card */}
      <div
        ref={bottomRightCardRef}
        className="absolute right-[6vw] bottom-[10vh] w-[28vw] h-[34vh] image-card hidden lg:block"
      >
        <img
          src="/mosaic-rings.jpg"
          alt="Wedding rings"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Mobile Grid */}
      <div className="lg:hidden absolute inset-x-4 top-24 bottom-24 grid grid-cols-2 gap-3">
        <div className="image-card">
          <img
            src="/mosaic-dance.jpg"
            alt="Couple dancing"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="image-card">
          <img
            src="/mosaic-dining.jpg"
            alt="Dining scene"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="image-card">
          <img
            src="/mosaic-food.jpg"
            alt="Gourmet food"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="image-card">
          <img
            src="/mosaic-rings.jpg"
            alt="Wedding rings"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Center Headline */}
      <div
        ref={headlineRef}
        className="absolute left-1/2 top-[14vh] -translate-x-1/2 text-center w-[min(46vw,640px)] hidden lg:block"
      >
        <h2 className="font-display text-3xl md:text-4xl lg:text-[clamp(34px,3.6vw,52px)] text-luxury-cream mb-4">
          Every detail, thoughtfully curated.
        </h2>
        <p className="font-body text-base text-luxury-gray">
          Lighting, florals, table settings, and flavors—crafted to match your
          story.
        </p>
      </div>

      {/* Center CTA */}
      <button
        ref={ctaRef}
        onClick={() => scrollToSection('#gallery')}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-3 rounded-full bg-luxury-black/60 backdrop-blur-md border border-luxury-cream/20 text-luxury-cream font-medium hover:bg-luxury-bronze/20 hover:border-luxury-bronze transition-all duration-300"
      >
        See the Gallery
      </button>
    </section>
  );
};

export default ExperienceMosaicSection;
