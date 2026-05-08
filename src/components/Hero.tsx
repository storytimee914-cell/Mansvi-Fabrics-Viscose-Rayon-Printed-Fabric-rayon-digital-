import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import MandalaDoodle from './MandalaDoodle';
import { useLanguage } from '../context/LanguageContext';

const HERO_IMAGES = [
  'https://lh3.googleusercontent.com/u/0/d/1OA5ZsiW3Gvg43YbgEP-Kk9ndNBRMcJBd',
  'https://lh3.googleusercontent.com/u/0/d/1mq-XEkZayHYxeIQpAm6kGnYlo5ZT4H19'
];

export default function Hero() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col bg-brand-bg pt-20 overflow-hidden text-left">
      {/* Decorative Brand Accents */}
      <MandalaDoodle className="absolute -top-20 -left-20" size={600} opacity={0.07} rotationDuration={120} />
      <MandalaDoodle className="absolute top-1/3 -right-32" size={500} opacity={0.07} rotationDuration={180} />
      <MandalaDoodle className="absolute -bottom-40 left-1/4" size={800} opacity={0.07} rotationDuration={240} />

      {/* Full Frame Image Section */}
      <div className="w-full flex-1 flex items-center justify-center p-6 md:p-10 relative overflow-hidden min-h-[400px]">
        <div className="relative w-full h-[50vh] md:h-[60vh] max-w-6xl mx-auto flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentIndex}
              src={HERO_IMAGES[currentIndex]}
              alt="Premium Fabric Heritage"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="w-full h-full object-contain absolute inset-0"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
        </div>
        
        {/* Progress Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {HERO_IMAGES.map((_, i) => (
            <div 
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                currentIndex === i ? 'w-8 bg-brand-primary' : 'w-2 bg-brand-ink/10'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <span className="inline-block px-4 py-1.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
            {t('hero.label')}
          </span>
          <h1 className="text-4xl md:text-7xl font-serif text-brand-ink leading-[1.1] mb-8 tracking-tight">
            {t('hero.title.line1')}<br />
            <span className="italic font-light text-brand-secondary">{t('hero.title.line2')}</span>
          </h1>
          <p className="text-base md:text-lg text-brand-ink/70 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#products"
              className="group bg-brand-primary text-white px-10 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-brand-ink transition-all shadow-xl shadow-brand-primary/20"
            >
              {t('hero.cta.view')}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#bulk"
              className="text-brand-ink px-10 py-4 rounded-full font-medium border border-brand-ink/10 hover:bg-brand-ink hover:text-white transition-all"
            >
              {t('hero.cta.wholesale')}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-brand-ink/50 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">{t('scroll')}</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
}
