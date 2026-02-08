import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-luxury-black z-[95] py-12 lg:py-16 border-t border-luxury-cream/10">
      {/* Grain Overlay */}
      <div className="absolute inset-0 grain-overlay" />

      <div className="relative px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <h3 className="font-display text-2xl text-luxury-cream mb-4">
                Ruchi Resorts
              </h3>
              <p className="font-body text-sm text-luxury-gray mb-4">
                Where celebrations feel like cinema. Luxury banquet hall and
                lawn venue in Hisar, Haryana.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-luxury-charcoal flex items-center justify-center text-luxury-gray hover:text-luxury-bronze hover:bg-luxury-bronze/20 transition-all duration-300"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-luxury-charcoal flex items-center justify-center text-luxury-gray hover:text-luxury-bronze hover:bg-luxury-bronze/20 transition-all duration-300"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg text-luxury-cream mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {[
                  { label: 'Banquet Hall', href: '#banquet' },
                  { label: 'Open Lawn', href: '#lawn' },
                  { label: 'Rooms & Stay', href: '#rooms' },
                  { label: 'Events', href: '#events' },
                  { label: 'Gallery', href: '#gallery' },
                ].map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="font-body text-sm text-luxury-gray hover:text-luxury-bronze transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Events */}
            <div>
              <h4 className="font-display text-lg text-luxury-cream mb-4">
                Events We Host
              </h4>
              <ul className="space-y-2">
                {[
                  'Weddings & Receptions',
                  'Engagements',
                  'Birthday Parties',
                  'Anniversary Celebrations',
                  'Corporate Events',
                ].map((event) => (
                  <li key={event}>
                    <span className="font-body text-sm text-luxury-gray">
                      {event}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-lg text-luxury-cream mb-4">
                Contact Us
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-luxury-bronze mt-1 flex-shrink-0" />
                  <span className="font-body text-sm text-luxury-gray">
                    Near Camp Chowk,
                    <br />
                    Railway Road, Hisar,
                    <br />
                    Haryana – 125001
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-luxury-bronze flex-shrink-0" />
                  <a
                    href="tel:+919999999999"
                    className="font-body text-sm text-luxury-gray hover:text-luxury-bronze transition-colors"
                  >
                    +91-99999-99999
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-luxury-bronze flex-shrink-0" />
                  <a
                    href="mailto:hello@ruchiresorts.in"
                    className="font-body text-sm text-luxury-gray hover:text-luxury-bronze transition-colors"
                  >
                    hello@ruchiresorts.in
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-luxury-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-luxury-gray text-center md:text-left">
              © {new Date().getFullYear()} Ruchi Resorts. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button className="font-body text-xs text-luxury-gray hover:text-luxury-bronze transition-colors">
                Privacy Policy
              </button>
              <button className="font-body text-xs text-luxury-gray hover:text-luxury-bronze transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
