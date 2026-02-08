import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: '',
  });

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const fieldsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(
        leftRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form fields stagger
      fieldsRef.current.forEach((field, index) => {
        if (!field) return;
        gsap.fromTo(
          field,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            delay: index * 0.05,
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you! We will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      message: '',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-luxury-charcoal z-[90] py-20 lg:py-32"
    >
      {/* Grain Overlay */}
      <div className="absolute inset-0 grain-overlay" />

      <div className="relative px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Info */}
          <div ref={leftRef}>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(34px,3.6vw,52px)] text-luxury-cream mb-4">
              Let's Plan Your Celebration.
            </h2>
            <p className="font-body text-base md:text-lg text-luxury-gray mb-8">
              Tell us your date, guest count, and vision. We'll reply within 24
              hours.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-luxury-bronze/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-luxury-bronze" />
                </div>
                <div>
                  <h4 className="font-display text-lg text-luxury-cream mb-1">
                    Address
                  </h4>
                  <p className="font-body text-sm text-luxury-gray">
                    Near Camp Chowk, Railway Road,
                    <br />
                    Hisar, Haryana – 125001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-luxury-bronze/20 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-luxury-bronze" />
                </div>
                <div>
                  <h4 className="font-display text-lg text-luxury-cream mb-1">
                    Phone
                  </h4>
                  <a
                    href="tel:+919999999999"
                    className="font-body text-sm text-luxury-gray hover:text-luxury-bronze transition-colors"
                  >
                    +91-99999-99999
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-luxury-bronze/20 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-luxury-bronze" />
                </div>
                <div>
                  <h4 className="font-display text-lg text-luxury-cream mb-1">
                    Email
                  </h4>
                  <a
                    href="mailto:hello@ruchiresorts.in"
                    className="font-body text-sm text-luxury-gray hover:text-luxury-bronze transition-colors"
                  >
                    hello@ruchiresorts.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-luxury-bronze/20 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-luxury-bronze" />
                </div>
                <div>
                  <h4 className="font-display text-lg text-luxury-cream mb-1">
                    Working Hours
                  </h4>
                  <p className="font-body text-sm text-luxury-gray">
                    Open 24/7 for Events
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-[10px] overflow-hidden h-[200px] lg:h-[250px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3491.8377660470526!2d75.7214493150847!3d29.149446982191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391232d8011d0c07%3A0x1c3e0b2d6e5a9b8!2sHisar%2C%20Haryana!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ruchi Resorts Location"
              />
            </div>
          </div>

          {/* Right Column - Form */}
          <div ref={formRef} className="glass-card rounded-[10px] p-6 lg:p-8">
            <h3 className="font-display text-2xl text-luxury-cream mb-6">
              Send Enquiry
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div
                ref={(el) => { fieldsRef.current[0] = el; }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block font-body text-sm text-luxury-gray mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-luxury-black/50 border border-luxury-cream/10 text-luxury-cream font-body text-sm focus:outline-none focus:border-luxury-bronze transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-body text-sm text-luxury-gray mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-luxury-black/50 border border-luxury-cream/10 text-luxury-cream font-body text-sm focus:outline-none focus:border-luxury-bronze transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div
                ref={(el) => { fieldsRef.current[1] = el; }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block font-body text-sm text-luxury-gray mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-luxury-black/50 border border-luxury-cream/10 text-luxury-cream font-body text-sm focus:outline-none focus:border-luxury-bronze transition-colors"
                    placeholder="+91-XXXXX-XXXXX"
                  />
                </div>
                <div>
                  <label className="block font-body text-sm text-luxury-gray mb-2">
                    Event Type
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-luxury-black/50 border border-luxury-cream/10 text-luxury-cream font-body text-sm focus:outline-none focus:border-luxury-bronze transition-colors"
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="reception">Reception</option>
                    <option value="engagement">Engagement</option>
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div ref={(el) => { fieldsRef.current[2] = el; }}>
                <label className="block font-body text-sm text-luxury-gray mb-2">
                  Event Date
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-luxury-black/50 border border-luxury-cream/10 text-luxury-cream font-body text-sm focus:outline-none focus:border-luxury-bronze transition-colors"
                />
              </div>

              <div ref={(el) => { fieldsRef.current[3] = el; }}>
                <label className="block font-body text-sm text-luxury-gray mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-luxury-black/50 border border-luxury-cream/10 text-luxury-cream font-body text-sm focus:outline-none focus:border-luxury-bronze transition-colors resize-none"
                  placeholder="Tell us about your event..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
