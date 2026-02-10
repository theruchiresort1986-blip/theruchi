import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type Category = 'all' | 'rooms' | 'banquet' | 'lawn' | 'night';

interface GalleryImage {
  src: string;
  category: Category;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  { src: '/hero-couple.jpg', category: 'banquet', alt: 'Wedding Celebration' },
  { src: '/venue-table.jpg', category: 'banquet', alt: 'Banquet Table Setting' },
  { src: '/mosaic-dance.jpg', category: 'banquet', alt: 'Couple Dancing' },
  { src: '/mosaic-dining.jpg', category: 'banquet', alt: 'Dining Scene' },
  { src: '/banquet-hall.jpg', category: 'banquet', alt: 'Banquet Hall Interior' },
  { src: '/lawn-aerial.jpg', category: 'lawn', alt: 'Lawn Aerial View' },
  { src: '/event-wedding.jpg', category: 'lawn', alt: 'Wedding Setup' },
  { src: '/rooms-interior.jpg', category: 'rooms', alt: 'Luxury Room' },
  { src: '/night-exterior.jpg', category: 'night', alt: 'Night Exterior' },
  { src: '/mosaic-food.jpg', category: 'banquet', alt: 'Gourmet Food' },
  { src: '/mosaic-rings.jpg', category: 'banquet', alt: 'Wedding Rings' },
  { src: '/event-engagement.jpg', category: 'lawn', alt: 'Engagement Ceremony' },
];

const categories: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Rooms', value: 'rooms' },
  { label: 'Banquet', value: 'banquet' },
  { label: 'Lawn', value: 'lawn' },
  { label: 'Night View', value: 'night' },
];

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredImages =
    activeCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

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

      // Grid animation
      gsap.fromTo(
        gridRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top bottom',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + filteredImages.length) % filteredImages.length
    );
  };

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative bg-luxury-black z-[80] py-20 lg:py-32"
    >
      {/* Grain Overlay */}
      <div className="absolute inset-0 grain-overlay" />

      <div className="relative px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-8 lg:mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(34px,3.6vw,52px)] text-luxury-cream mb-4">
            Gallery
          </h2>
          <p className="font-body text-base md:text-lg text-luxury-gray max-w-xl mx-auto">
            A glimpse into celebrations at Ruchi Resort.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 lg:gap-4 mb-8 lg:mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 lg:px-6 py-2 rounded-full font-body text-sm transition-all duration-300 ${activeCategory === cat.value
                  ? 'bg-luxury-bronze text-white'
                  : 'bg-luxury-charcoal text-luxury-gray hover:text-luxury-cream'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 max-w-7xl mx-auto"
        >
          {filteredImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square rounded-[10px] overflow-hidden cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-luxury-black/0 group-hover:bg-luxury-black/40 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-body text-sm text-white">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[200] bg-luxury-black/98 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-luxury-cream hover:text-luxury-bronze transition-colors"
          >
            <X size={32} />
          </button>

          {/* Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-4 lg:left-8 text-luxury-cream hover:text-luxury-bronze transition-colors"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 lg:right-8 text-luxury-cream hover:text-luxury-bronze transition-colors"
          >
            <ChevronRight size={40} />
          </button>

          {/* Image */}
          <div className="max-w-[90vw] max-h-[80vh]">
            <img
              src={filteredImages[currentImageIndex].src}
              alt={filteredImages[currentImageIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-[10px]"
            />
            <p className="text-center font-body text-sm text-luxury-gray mt-4">
              {filteredImages[currentImageIndex].alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
