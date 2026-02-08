import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Sun, Layout } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const LawnSection = () => {
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
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      // Image from right
      scrollTl.fromTo(
        imageCardRef.current,
        { x: '55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Headline from left
      scrollTl.fromTo(
        headlineRef.current,
        { x: '-40vw', opacity: 0 },
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
        { x: '18vw', opacity: 0.35, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0.25, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [bodyRef.current, specsRef.current],
        { opacity: 1 },
        { opacity: 0.2, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ctaRef.current,
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
      className="section-pinned bg-luxury-black z-50"
    >
      {/* Grain Overlay */}
      <div className="absolute inset-0 grain-overlay" />

      {/* Left Content */}
      <div className="absolute left-[6vw] lg:left-[8vw] top-[10vh] lg:top-[22vh] w-[88vw] lg:w-[38vw]">
        <h2
          ref={headlineRef}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(34px,3.6vw,52px)] text-luxury-cream mb-6"
        >
          Open Lawn
        </h2>

        <p
          ref={bodyRef}
          className="font-body text-base md:text-lg text-luxury-gray mb-8"
        >
          A wide, green canvas under the sky—perfect for weddings, engagements,
          and grand celebrations. We handle tents, lighting, and flow so you can
          focus on the moment.
        </p>

        {/* Specs */}
        <div
          ref={specsRef}
          className="flex flex-wrap gap-4 mb-8"
        >
          <div className="flex items-center gap-2 text-luxury-cream">
            <Users size={18} className="text-luxury-bronze" />
            <span className="font-body text-sm">Up to 400 guests</span>
          </div>
          <div className="flex items-center gap-2 text-luxury-cream">
            <Sun size={18} className="text-luxury-bronze" />
            <span className="font-body text-sm">Outdoor lighting</span>
          </div>
          <div className="flex items-center gap-2 text-luxury-cream">
            <Layout size={18} className="text-luxury-bronze" />
            <span className="font-body text-sm">Flexible layouts</span>
          </div>
        </div>

        {/* CTA */}
        <button
          ref={ctaRef}
          onClick={() => scrollToSection('#contact')}
          className="btn-primary"
        >
          Plan an Outdoor Event
        </button>
      </div>

      {/* Right Image Card */}
      <div
        ref={imageCardRef}
        className="absolute left-[6vw] lg:left-[52vw] top-[55vh] lg:top-[16vh] w-[88vw] lg:w-[42vw] h-[35vh] lg:h-[68vh] image-card"
      >
        <img
          src="/lawn-aerial.jpg"
          alt="Open Lawn Aerial View"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default LawnSection;
