import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wind, Droplets, ConciergeBell } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const RoomsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
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

      // Headline + body
      scrollTl.fromTo(
        [headlineRef.current, bodyRef.current],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // Amenities with stagger
      if (amenitiesRef.current) {
        const items = amenitiesRef.current.querySelectorAll('.amenity-item');
        scrollTl.fromTo(
          items,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.12
        );
      }

      // CTA
      scrollTl.fromTo(
        ctaRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.16
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
        [headlineRef.current, bodyRef.current],
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0.25, ease: 'power2.in' },
        0.6
      );

      if (amenitiesRef.current) {
        scrollTl.fromTo(
          amenitiesRef.current,
          { opacity: 1 },
          { opacity: 0.2, ease: 'power2.in' },
          0.6
        );
      }

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
      id="rooms"
      className="section-pinned bg-luxury-black z-[60]"
    >
      {/* Grain Overlay */}
      <div className="absolute inset-0 grain-overlay" />

      {/* Left Image Card */}
      <div
        ref={imageCardRef}
        className="absolute left-[6vw] top-[16vh] w-full lg:w-[40vw] h-[40vh] lg:h-[68vh] image-card"
      >
        <img
          src="/rooms-interior.jpg"
          alt="Luxury Room Interior"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="absolute left-[6vw] lg:left-[54vw] top-[60vh] lg:top-[24vh] w-[88vw] lg:w-[38vw]">
        <h2
          ref={headlineRef}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(34px,3.6vw,52px)] text-luxury-cream mb-6"
        >
          Rooms & Stay
        </h2>

        <p
          ref={bodyRef}
          className="font-body text-base md:text-lg text-luxury-gray mb-8"
        >
          Clean, comfortable rooms designed for wedding families and outstation
          guests. Rest, refresh, and return to the celebration without leaving
          the venue.
        </p>

        {/* Amenities */}
        <div
          ref={amenitiesRef}
          className="flex flex-wrap gap-4 mb-8"
        >
          <div className="amenity-item flex items-center gap-2 text-luxury-cream">
            <Wind size={18} className="text-luxury-bronze" />
            <span className="font-body text-sm">AC Rooms</span>
          </div>
          <div className="amenity-item flex items-center gap-2 text-luxury-cream">
            <Droplets size={18} className="text-luxury-bronze" />
            <span className="font-body text-sm">Hot water</span>
          </div>
          <div className="amenity-item flex items-center gap-2 text-luxury-cream">
            <ConciergeBell size={18} className="text-luxury-bronze" />
            <span className="font-body text-sm">Room service</span>
          </div>
        </div>

        {/* CTA */}
        <button
          ref={ctaRef}
          onClick={() => scrollToSection('#contact')}
          className="btn-primary"
        >
          Ask About Stay Packages
        </button>
      </div>
    </section>
  );
};

export default RoomsSection;
