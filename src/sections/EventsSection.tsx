import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    title: 'Weddings & Receptions',
    image: '/event-wedding.jpg',
  },
  {
    title: 'Engagements & Ring Ceremonies',
    image: '/event-engagement.jpg',
  },
  {
    title: 'Birthday Celebrations',
    image: '/event-birthday.jpg',
  },
  {
    title: 'Anniversary Dinners',
    image: '/event-anniversary.jpg',
  },
  {
    title: 'Corporate Events',
    image: '/event-corporate.jpg',
  },
  {
    title: 'Private Parties',
    image: '/event-private.jpg',
  },
];

const EventsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top bottom',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation with stagger
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            delay: index * 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Parallax on image
        const img = card.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { y: -12 },
            {
              y: 12,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });
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
      id="events"
      className="relative bg-luxury-black z-[70] py-20 lg:py-32"
    >
      {/* Grain Overlay */}
      <div className="absolute inset-0 grain-overlay" />

      <div className="relative px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(34px,3.6vw,52px)] text-luxury-cream mb-4">
            Events We Host
          </h2>
          <p className="font-body text-base md:text-lg text-luxury-gray max-w-xl mx-auto">
            From traditions to corporate evenings—hosted with care.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <div
              key={event.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative h-[200px] lg:h-[280px] rounded-[10px] overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                <h3 className="font-display text-xl lg:text-2xl text-luxury-cream group-hover:text-luxury-bronze transition-colors duration-300">
                  {event.title}
                </h3>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 border-2 border-luxury-bronze/0 group-hover:border-luxury-bronze/50 rounded-[10px] transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => scrollToSection('#contact')}
            className="btn-primary"
          >
            Request a Custom Package
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
