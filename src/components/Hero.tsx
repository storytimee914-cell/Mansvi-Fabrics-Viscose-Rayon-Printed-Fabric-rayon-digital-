import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import DotField from './DotField';

export default function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section 
      ref={heroRef} 
      className="relative w-full min-h-[100dvh] flex items-center justify-center bg-brand-ink bg-[radial-gradient(ellipse_at_top,rgba(206,17,38,0.12)_0%,rgba(26,26,26,1)_70%)] overflow-hidden text-center" 
      id="hero"
    >
      {/* Subtle Premium Dark Overlay with absolute backdrop blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px] z-10 pointer-events-none" />

      {/* Interactive DotField Background layering perfectly on top of gradient and overlay for crisp visibility */}
      <div className="absolute inset-0 w-full h-full z-20 pointer-events-none select-none">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          cursorRadius={500}
          cursorForce={0.1}
          bulgeOnly
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(206, 17, 38, 0.4)"
          gradientTo="rgba(139, 0, 0, 0.4)"
          glowColor="#120F17"
        />
      </div>

      {/* Background Decorative Grid - styled very lightly for dark theme contrast */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-10" />

      {/* Hero Centered Content Container */}
      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center justify-center min-h-[100dvh] max-w-5xl pt-32 pb-24">
        
        {/* Sparkles Brand Tag */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-6 select-none justify-center"
        >
          <span className="text-xs md:text-sm font-sans font-bold uppercase tracking-[0.2em] text-white bg-white/10 px-4 py-1.5 rounded-full border border-white/20 shadow-sm backdrop-blur-md">
            {t('hero.label')}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight tracking-tight"
        >
          {t('hero.title.line1')}{' '}
          <span className="italic font-light text-brand-primary block sm:inline brightness-125 saturate-150">
            {t('hero.title.line2')}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-white/85 max-w-2xl mt-6 font-sans font-light leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Main Action CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full sm:w-auto"
        >
          <a
            href="#products"
            className="group w-full sm:w-auto bg-brand-primary text-white px-8 py-3.5 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-white hover:text-brand-ink transition-all duration-300 shadow-md text-sm md:text-base text-center cursor-pointer"
          >
            {t('hero.cta.view')}
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
          </a>
          <a
            href="#bulk"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-medium border border-white/20 transition-all duration-300 text-sm md:text-base text-center shadow-sm cursor-pointer backdrop-blur-sm"
          >
            {t('hero.cta.wholesale')}
          </a>
        </motion.div>

        {/* Cinematic Video Showcase below call-to-actions */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative aspect-video w-full max-w-4xl mt-14 md:mt-20 rounded-2xl md:rounded-3xl overflow-hidden bg-black shadow-[0_30px_70px_rgba(0,0,0,0.85),0_0_50px_rgba(206,17,38,0.15)] border-4 border-brand-primary/10 group"
        >
          <video
            ref={videoRef}
            src="/assets/intro.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover scale-[1.01]"
          />
          {/* Elegant vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none z-10" />
        </motion.div>

      </div>

      {/* Decorative Wave Accent at the Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none select-none h-12">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-full text-white fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,90.35,27.3,160.74,46.53,245.47,56.46,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}

