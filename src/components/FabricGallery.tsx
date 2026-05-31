import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useLanguage } from '../context/LanguageContext';

const GALLERY_IMAGES = [
  {
    url: 'https://lh3.googleusercontent.com/d/1CKgiNMtsMcN7_pbDXvb8wraFJq0Pj_26',
    title: 'Digital Textile Prints'
  },
  {
    url: 'https://lh3.googleusercontent.com/d/1BwMpMxMnw0G1Em8w-5Ab0o5juxF8lRiS',
    title: 'Rayon Collection'
  },
  {
    url: 'https://lh3.googleusercontent.com/d/1H5cSSBYgpEiWY_RZNtHi2rue0ol8nnBf',
    title: 'Ethnic Designs'
  },
  {
    url: 'https://lh3.googleusercontent.com/d/17R39W99-boZHyxCzcvwWZr-Y7jfqbooZ',
    title: 'Premium Prints'
  },
  {
    url: 'https://lh3.googleusercontent.com/d/1zuGL-yP9q0Yq6FnThQk6Ihj2uJA9RDVB',
    title: 'Sustainable Fabrics'
  },
  {
    url: 'https://lh3.googleusercontent.com/d/10MWyfg3jA5OFIktFoUXePQfw30iA1tUc',
    title: 'Textured Weaves'
  },
  {
    url: 'https://lh3.googleusercontent.com/d/1ryHW_z-dKPSwH_MZ_TzN3WU7CugZbkfD',
    title: 'Modern Patterns'
  },
  {
    url: 'https://lh3.googleusercontent.com/d/18S6381CK0CTbmUokoNJazZs0mtyNQtTl',
    title: 'Artistic Textiles'
  }
];

const FabricGallery = () => {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      slidesToScroll: 1
    },
    [Autoplay({ delay: 2000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif"
          >
            {t('gallery.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto font-light"
          >
            {t('gallery.subtitle')}
          </motion.p>
        </div>

        <div className="relative group">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {GALLERY_IMAGES.map((item, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%]">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative aspect-[4/5] rounded-2xl overflow-hidden group/item cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500"
                  >
                    <img 
                      src={item.url} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <p className="text-white font-medium text-lg translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500">
                        {item.title}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-gray-800 hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10 hidden sm:flex"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-gray-800 hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10 hidden sm:flex"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="flex flex-col items-center gap-6 mt-10">
          <div className="flex gap-2">
            {GALLERY_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  selectedIndex === index 
                    ? "bg-brand-primary w-8" 
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-3 text-sm font-medium text-gray-500 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100 sm:hidden"
          >
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronRight size={16} className="text-brand-primary" />
            </motion.div>
            {t('gallery.swipe')}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FabricGallery;
