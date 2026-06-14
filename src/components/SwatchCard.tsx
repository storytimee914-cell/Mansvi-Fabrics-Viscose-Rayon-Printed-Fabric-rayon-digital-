import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const SWATCH_IMAGES = [
  {
    url: 'https://lh3.googleusercontent.com/d/1cdqxZtdcqdy4q9TdlQU7RGCY4NIjn4rj',
    title: 'Texture Swatch A'
  },
  {
    url: 'https://lh3.googleusercontent.com/d/19JSv508cUTmn2tEpF5H4ldhGCGG8-Ows',
    title: 'Texture Swatch C'
  },
  {
    url: 'https://lh3.googleusercontent.com/d/18Igcic-aTpe26ZwfqS3xhmXK4F2yI6hB',
    title: 'Texture Swatch B'
  },
  {
    url: 'https://lh3.googleusercontent.com/d/1qoiYVFO2uye5tQtR9KH3B25bz6-6Ez8S',
    title: 'Texture Swatch D'
  }
];

export default function SwatchCard() {
  const { t } = useLanguage();
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      slidesToScroll: 1
    },
    [Autoplay({ delay: 2000, stopOnInteraction: false })]
  );

  return (
    <section className="py-20 bg-white overflow-hidden" id="swatches">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-brand-ink mb-4"
          >
            {t('swatch.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-ink/60 max-w-2xl mx-auto"
          >
            {t('swatch.subtitle')}
          </motion.p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {SWATCH_IMAGES.map((swatch, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-square rounded-2xl overflow-hidden shadow-md border border-gray-100"
                >
                  <img 
                    src={swatch.url} 
                    alt={swatch.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
