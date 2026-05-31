import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Lottie from 'lottie-react';
import { useLanguage } from '../context/LanguageContext';
import { ContainerScroll } from './ui/container-scroll-animation';

export default function Hero() {
  const { t } = useLanguage();
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    // Gracefully check and load Lottie animation if available locally
    fetch('http://localhost:8000/animation.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => {
        console.log('Lottie helper offline indicator - gracefully fallback.', err);
      });
  }, []);

  const titleComponent = (
    <div className="flex flex-col items-center justify-center px-4 relative z-20">
      {/* Sparkles pill tag */}
      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-full text-[10px] font-bold uppercase tracking-[0.25em] mb-6 shadow-sm">
        <Sparkles size={11} className="text-brand-gold animate-pulse" />
        {t('hero.label')}
      </span>

      {/* Title block with elegant typography and custom colors */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-brand-ink leading-tight tracking-tight max-w-4xl mx-auto">
        {t('hero.title.line1')}<br />
        <span className="italic font-light text-brand-secondary text-2xl sm:text-4xl md:text-5xl lg:text-6xl block mt-1">
          {t('hero.title.line2')}
        </span>
      </h1>

      {/* Short high-end description text */}
      <p className="text-xs sm:text-sm md:text-base text-brand-ink/70 max-w-2xl mx-auto mt-6 font-light leading-relaxed">
        {t('hero.subtitle')}
      </p>

      {/* Floating interactive Lottie animation if loaded */}
      {animationData && (
        <div className="pointer-events-none mx-auto max-w-xs mt-4 -mb-4 opacity-40">
          <Lottie animationData={animationData} loop={true} style={{ height: 100 }} />
        </div>
      )}

      {/* Call to Actions */}
      <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 mt-8 select-none">
        <a
          href="#products"
          className="group bg-brand-primary text-white px-6 sm:px-8 py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-brand-ink transition-all shadow-lg shadow-brand-primary/10 text-xs sm:text-sm"
        >
          {t('hero.cta.view')}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </a>
        <a
          href="#bulk"
          className="bg-white text-brand-ink px-6 sm:px-8 py-3 rounded-full font-medium border border-brand-ink/10 hover:bg-brand-ink hover:text-white transition-all hover:border-brand-ink text-xs sm:text-sm text-center shadow-sm"
        >
          {t('hero.cta.wholesale')}
        </a>
      </div>
    </div>
  );

  return (
    <section className="relative w-full bg-brand-bg pt-2 md:pt-10 overflow-hidden text-center" id="hero">
      {/* Decorative background grid pattern to enhance premium high-contrast feel */}
      <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-brand-primary/[0.03] to-transparent pointer-events-none" />
      
      {/* Container Scroll Animation wrapper */}
      <ContainerScroll titleComponent={titleComponent}>
        <div className="w-full h-full relative group">
          <img
            src="https://lh3.googleusercontent.com/d/1LFyLsBPi4LX_GVIeNZRz-ENUUNbaSraC"
            alt="Mansvi Fabrics Loom/Textile Yarn Spindles"
            className="w-full h-full object-cover object-center select-none rounded-xl"
            referrerPolicy="no-referrer"
            draggable={false}
          />
          {/* Ambient overlay to ground the photo in luxury aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 rounded-xl" />
          
          {/* Subtle logo/branding details on top of photo card */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between pointer-events-none">
            <span className="text-[9px] font-mono font-bold tracking-[0.3em] text-brand-cream/80 uppercase">
              Mansvi Fabrics Craftsmanship
            </span>
            <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-brand-gold uppercase">
              Est. 1984
            </span>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
