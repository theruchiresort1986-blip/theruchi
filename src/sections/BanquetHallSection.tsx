import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Monitor, UtensilsCrossed } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BanquetHallSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
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
      // Image from left
      scrollTl.fromTo(
        imageCardRef.current,
        { x: '-55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Headline from right
      scrollTl.fromTo(
        headlineRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Body
      scrollTl.fromTo(
        bodyRef.current,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Specs
      scrollTl.fromTo(
        specsRef.current,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // CTA
      scrollTl.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.14
      );

      // SETTLE (30-70%) - Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        imageCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0.35, ease: 'power2.in' },
        0.6
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0.25, ease: 'power2.in' },
        0.6
      );

      scrollTl.fromTo(
        [bodyRef.current, specsRef.current],
        { opacity: 1 },
        { opacity: 0.2, ease: 'power2.in' },
        0.6
      );

      scrollTl.fromTo(
        ctaRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
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
      id="banquet"
      className="section-pinned bg-luxury-black z-40"
    >
      {/* Grain Overlay */}
      <div className="absolute inset-0 grain-overlay" />

      {/* Left Image Card */}
      <div
        ref={imageCardRef}
        className="absolute left-[6vw] top-[16vh] w-full lg:w-[40vw] h-[40vh] lg:h-[68vh] image-card"
      >
        <img
          src="/banquet-hall.jpg"
          alt="Banquet Hall Interior"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="absolute left-[6vw] lg:left-[54vw] top-[60vh] lg:top-[22vh] w-[88vw] lg:w-[38vw]">
        <h2
          ref={headlineRef}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(34px,3.6vw,52px)] text-luxury-cream mb-6"
        >
          Banquet Hall
        </h2>

        <p
          ref={bodyRef}
          className="font-body text-base md:text-lg text-luxury-gray mb-8"
        >
          An intimate, climate-controlled space with elegant lighting, premium
          finishes, and a layout that adapts to receptions, birthdays, and
          corporate evenings.
        </p>

        {/* Specs */}
        <div
          ref={specsRef}
          className="flex flex-wrap gap-4 mb-8"
        >
          <div className="flex items-center gap-2 text-luxury-cream">
            <Users size={18} className="text-luxury-bronze" />
            <span className="font-body text-sm">Up to 150 guests</span>
          </div>
          <div className="flex items-center gap-2 text-luxury-cream">
            <Monitor size={18} className="text-luxury-bronze" />
            <span className="font-body text-sm">AV-ready</span>
          </div>
          <div className="flex items-center gap-2 text-luxury-cream">
            <UtensilsCrossed size={18} className="text-luxury-bronze" />
            <span className="font-body text-sm">In-house catering</span>
          </div>
        </div>

        {/* CTA */}
        <button
          ref={ctaRef}
          onClick={() => scrollToSection('#contact')}
          className="btn-primary"
        >
          Check Availability
        </button>
      </div>
    </section>
  );
};

export default BanquetHallSection;
