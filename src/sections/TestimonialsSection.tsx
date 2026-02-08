import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Priya & Rohan',
    role: 'Wedding Celebration',
    image: '/testimonial-1.jpg',
    quote:
      'Everything felt effortless. The team handled the décor, food, and flow beautifully. Our guests are still talking about how perfect everything was.',
    rating: 5,
  },
  {
    name: 'The Sharma Family',
    role: 'Grand Reception',
    image: '/testimonial-2.jpg',
    quote:
      'Our guests still talk about the lawn setup. Truly memorable experience. The attention to detail and hospitality was exceptional.',
    rating: 5,
  },
  {
    name: 'Aman Verma',
    role: 'Corporate Event',
    image: '/testimonial-1.jpg',
    quote:
      'Professional, warm, and detail-oriented. Highly recommended for any corporate event. The AV setup and catering were top-notch.',
    rating: 5,
  },
];

const TestimonialsSection = () => {
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
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation with stagger
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 30, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-luxury-black z-[85] py-20 lg:py-32"
    >
      {/* Grain Overlay */}
      <div className="absolute inset-0 grain-overlay" />

      <div className="relative px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(34px,3.6vw,52px)] text-luxury-cream mb-4">
            What Families Say
          </h2>
          <p className="font-body text-base md:text-lg text-luxury-gray max-w-xl mx-auto">
            Real celebrations. Real feedback.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="glass-card rounded-[10px] p-6 lg:p-8 relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-luxury-bronze/30" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-luxury-bronze text-luxury-bronze"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="font-body text-sm lg:text-base text-luxury-cream mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-display text-lg text-luxury-cream">
                    {testimonial.name}
                  </h4>
                  <p className="font-body text-xs text-luxury-gray">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
