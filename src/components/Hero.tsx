import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Lottie from 'lottie-react';
import { useLanguage } from '../context/LanguageContext';
import { ContainerScroll } from './ui/container-scroll-animation';
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from 'motion/react';
import dyeingImage from '../assets/images/textile_dyeing_process_1780859391398.png';

export default function Hero() {
  const { t, language } = useLanguage();
  const [animationData, setAnimationData] = useState<any>(null);
  const [activeMode, setActiveMode] = useState<'loom' | 'dyeing'>('dyeing');
  
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  const gear1Rotation = useTransform(scrollYProgress, [0, 1], [0, 360 * 3.5]);
  const gear2Rotation = useTransform(scrollYProgress, [0, 1], [0, -360 * 5.2]);
  const yarnY = useTransform(scrollYProgress, [0, 1], [0, 450]);

  const [meters, setMeters] = useState(152.0);
  const [tension, setTension] = useState(42.5);

  // Stats for Dyeing Mode
  const [dyeTemp, setDyeTemp] = useState(94.2);
  const [phLevel, setPhLevel] = useState(7.4);
  const [dyeUsed, setDyeUsed] = useState(84);

  // Scroll transforms for Dyeing Mode
  const dyeProgressY = useTransform(scrollYProgress, [0, 1], ["-10%", "100%"]);
  const dyeWidth = useTransform(scrollYProgress, [0, 0.5, 1], ["5%", "60%", "100%"]);
  const steamOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.1, 0.6, 0.4, 0.1]);
  const steamY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const bladeRotation = useTransform(scrollYProgress, [0, 1], [0, 360 * 6.5]);

  // Dynamic top-level transforms for liquid dye waves
  const dyeYellowY = useTransform(scrollYProgress, [0, 1], ["110%", "-20%"]);
  const dyeMagentaY = useTransform(scrollYProgress, [0, 1], ["-30%", "120%"]);
  const dyeMagentaScaleX = useTransform(scrollYProgress, [0, 1], ["10%", "140%"]);

  // Bubble shared transforms
  const bubbleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 0.3]);
  const bubbleOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.8, 0.9, 0]);

  // Bubble specific individual Y transforms
  const bubbleY0 = useTransform(scrollYProgress, [0, 1], [300, -100 - (0 * 35)]);
  const bubbleY1 = useTransform(scrollYProgress, [0, 1], [300, -100 - (1 * 35)]);
  const bubbleY2 = useTransform(scrollYProgress, [0, 1], [300, -100 - (2 * 35)]);
  const bubbleY3 = useTransform(scrollYProgress, [0, 1], [300, -100 - (3 * 35)]);
  const bubbleY4 = useTransform(scrollYProgress, [0, 1], [300, -100 - (4 * 35)]);
  const bubbleY5 = useTransform(scrollYProgress, [0, 1], [300, -100 - (5 * 35)]);
  const bubbleY6 = useTransform(scrollYProgress, [0, 1], [300, -100 - (6 * 35)]);
  const bubbleY7 = useTransform(scrollYProgress, [0, 1], [300, -100 - (7 * 35)]);
  const bubbleY8 = useTransform(scrollYProgress, [0, 1], [300, -100 - (8 * 35)]);
  const bubbleY9 = useTransform(scrollYProgress, [0, 1], [300, -100 - (9 * 35)]);
  const bubbleY10 = useTransform(scrollYProgress, [0, 1], [300, -100 - (10 * 35)]);
  const bubbleY11 = useTransform(scrollYProgress, [0, 1], [300, -100 - (11 * 35)]);

  const bubbleYTransforms = [
    bubbleY0, bubbleY1, bubbleY2, bubbleY3, bubbleY4, bubbleY5, 
    bubbleY6, bubbleY7, bubbleY8, bubbleY9, bubbleY10, bubbleY11
  ];

  // Interactive Live Dyeing Machine Working State
  const [machineRunning, setMachineRunning] = useState(true);
  const [autoMeters, setAutoMeters] = useState(0);
  const [injectedColor, setInjectedColor] = useState<string | null>(null);
  const [steamPurging, setSteamPurging] = useState(false);
  const [boosterSpeed, setBoosterSpeed] = useState(1); // Speed intensity multiplier (1x, 2x, 5x)
  const [activeSplashes, setActiveSplashes] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  // Automatic running engine when enabled
  useEffect(() => {
    if (!machineRunning) return;
    const interval = setInterval(() => {
      // Simulate continuous fabric dyeing movement
      setAutoMeters(m => parseFloat((m + 0.08 * boosterSpeed).toFixed(2)));
      
      // Acidity fluctuate dynamically
      setPhLevel(ph => {
        const offset = (Math.random() - 0.5) * 0.04;
        const next = ph + offset;
        return parseFloat(Math.min(8.0, Math.max(6.8, next)).toFixed(2));
      });

      // Dye tank volume consumes gradually
      setDyeUsed(du => (du >= 500 ? 84 : du + 1));
    }, 200);

    return () => clearInterval(interval);
  }, [machineRunning, boosterSpeed]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Loom mode values
    setMeters(parseFloat((152.0 + latest * 6.8 + autoMeters).toFixed(1)));
    setTension(parseFloat((42.5 + Math.sin(latest * Math.PI * 12) * 2.1).toFixed(1)));

    // Dyeing mode values
    setDyeTemp(parseFloat((94.2 + latest * 8.4 + (boosterSpeed - 1) * 2.5).toFixed(1)));
    setPhLevel(parseFloat((7.4 + Math.sin(latest * Math.PI * 3) * 0.25).toFixed(2)));
  });

  // Dynamic values combining scroll progress and auto-running state
  const currentMeters = parseFloat((152.0 + scrollYProgress.get() * 6.8 + autoMeters).toFixed(1));

  // Handler to inject a custom color splash
  const triggerDyeInjection = (color: string, e?: React.MouseEvent) => {
    if (!machineRunning) return;
    setInjectedColor(color);
    
    // Create ripples
    const id = Date.now() + Math.random();
    const x = e ? e.nativeEvent.offsetX : Math.floor(Math.random() * 300) + 100;
    const y = e ? e.nativeEvent.offsetY : Math.floor(Math.random() * 200) + 80;
    
    setActiveSplashes(prev => [...prev, { id, x, y, color }]);

    // Remove ripple and reset color overlay
    setTimeout(() => {
      setActiveSplashes(prev => prev.filter(s => s.id !== id));
    }, 1500);

    setTimeout(() => {
      setInjectedColor(null);
    }, 2000);
  };

  // Handler for steam purge
  const triggerSteamPurge = () => {
    setSteamPurging(true);
    setTimeout(() => setSteamPurging(false), 2500);
  };

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
    <section ref={heroRef} className="relative w-full bg-brand-bg pt-2 md:pt-10 overflow-hidden text-center" id="hero" style={{ position: 'relative' }}>
      {/* Decorative background grid pattern to enhance premium high-contrast feel */}
      <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-brand-primary/[0.03] to-transparent pointer-events-none" />
      
      {/* Container Scroll Animation wrapper */}
      <ContainerScroll titleComponent={titleComponent}>
        {activeMode === 'dyeing' ? (
          <div className="w-full h-full relative group overflow-hidden select-none bg-brand-ink">
            {/* Main Textile Dyeing Machine Image */}
            <img
              src={dyeingImage}
              alt="Artisanal Textile Fluid Dyeing Masterclass"
              className={`w-full h-full object-cover object-center select-none rounded-xl transition-all duration-[2000ms] ${
                machineRunning ? 'scale-102 brightness-110 saturate-125' : 'scale-100 brightness-75 saturate-75 grayscale-25'
              }`}
              referrerPolicy="no-referrer"
              draggable={false}
            />
            
            {/* Ambient overlay to ground the photo in luxury aesthetic and improve readability of HUD */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/55 rounded-xl transition-opacity duration-1000 ${machineRunning ? 'opacity-90' : 'opacity-95'}`} />

            {/* == INTERACTIVE LIQUID DYE OVERLAYS == */}
            <AnimatePresence>
              {injectedColor && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.55 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none z-10 mix-blend-color duration-300"
                  style={{
                    backgroundColor: 
                      injectedColor === 'cyan' ? '#22d3ee' :
                      injectedColor === 'magenta' ? '#ec4899' : '#f59e0b'
                  }}
                />
              )}
            </AnimatePresence>

            {/* == REAL-TIME CLICK RIPPLE GENERATOR == */}
            <div 
              className="absolute inset-0 z-20 cursor-crosshair" 
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Pick a color from active injectors or circle back
                const colorOptions = ['magenta', 'cyan', 'gold'];
                const selectedColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
                
                triggerDyeInjection(selectedColor, {
                  nativeEvent: { offsetX: x, offsetY: y }
                } as any);
              }}
            />

            {/* Render any spawned fluid ripples */}
            {activeSplashes.map(splash => (
              <motion.div
                key={splash.id}
                initial={{ scale: 0, opacity: 0.9 }}
                animate={{ scale: 12, opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                style={{
                  left: splash.x,
                  top: splash.y,
                  borderColor: 
                    splash.color === 'cyan' ? '#22d3ee' :
                    splash.color === 'magenta' ? '#ec4899' : '#f59e0b'
                }}
                className="absolute -ml-4 -mt-4 w-8 h-8 rounded-full border-2 pointer-events-none z-20 blur-[1px]"
              />
            ))}

            {/* == STEAM PURGING ACCUMULATOR OVERLAY == */}
            <AnimatePresence>
              {steamPurging && (
                <motion.div
                  initial={{ y: 220, opacity: 0, scale: 0.7 }}
                  animate={{ y: [-50, -200], opacity: [0.95, 0.5, 0], scale: [1, 1.6] }}
                  transition={{ duration: 2.5, ease: "easeOut" }}
                  className="absolute inset-x-0 bottom-0 pointer-events-none flex flex-col justify-center items-center z-25 filter blur-3xl select-none"
                >
                  <div className="bg-white/35 w-[110%] h-48 rounded-full" />
                  <div className="bg-white/15 w-[80%] h-36 rounded-full -mt-16" />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* == ARTISANAL FLUID DYEING SCROLL-BOUND ANIMATIONS == */}
            {machineRunning && (
              <div className="absolute inset-0 pointer-events-none opacity-45 mix-blend-color-dodge overflow-hidden">
                {/* Cyan dye sweep */}
                <motion.div 
                  style={{ y: dyeProgressY, scaleX: dyeWidth }}
                  className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent via-cyan-500/85 to-transparent blur-xl"
                />
                {/* Yellow dye wave */}
                <motion.div 
                  style={{ y: dyeYellowY, scaleX: dyeWidth }}
                  className="absolute left-0 right-0 h-48 bg-gradient-to-b from-transparent via-amber-400/80 to-transparent blur-2xl"
                />
                {/* Magenta dye infusion stream */}
                <motion.div 
                  style={{ 
                    y: dyeMagentaY, 
                    rotate: 15,
                    scaleX: dyeMagentaScaleX
                  }}
                  className="absolute -left-1/4 -right-1/4 h-36 bg-gradient-to-b from-transparent via-pink-500/90 to-transparent blur-xl"
                />
                {/* Royal Violet stream deep in the vat */}
                <motion.div 
                  style={{ y: dyeProgressY }}
                  className="absolute left-1/4 right-1/4 h-64 bg-gradient-to-b from-transparent via-purple-600/70 to-transparent blur-3xl"
                />
              </div>
            )}

            {/* 2. Overlapping Fluid Bubble Stream (Rising particles scaled with scroll/run state) */}
            {machineRunning && (
              <div className="absolute inset-x-0 bottom-0 h-72 pointer-events-none overflow-hidden select-none opacity-50 z-10">
                {[...Array(12)].map((_, i) => {
                  const colors = ['bg-pink-500', 'bg-cyan-400', 'bg-amber-400', 'bg-purple-500', 'bg-brand-gold'];
                  const colorClass = colors[i % colors.length];
                  const size = 6 + (i * 3) % 14;
                  
                  return (
                    <motion.div
                      key={i}
                      style={{
                        y: bubbleYTransforms[i],
                        scale: bubbleScale,
                        opacity: bubbleOpacity,
                        width: size,
                        height: size,
                        left: `${10 + i * 7.5}%`,
                      }}
                      className={`absolute bottom-0 rounded-full border border-white/20 blur-[0.5px] ${colorClass}`}
                    />
                  );
                })}
              </div>
            )}

            {/* 3. Steam Floating Waves (Rising Warmth) */}
            {machineRunning && (
              <motion.div 
                style={{ y: steamY, opacity: steamOpacity }}
                className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-around items-center"
              >
                <div className="w-[120%] h-48 bg-white/5 rounded-full filter blur-3xl mix-blend-screen transform -rotate-12" />
                <div className="w-[110%] h-36 bg-brand-gold/5 rounded-full filter blur-3xl mix-blend-screen transform rotate-6" />
              </motion.div>
            )}

            {/* 4. Active Color Mixing Valves & Spinner Blenders (Top Right) */}
            <div className="absolute top-6 right-6 hidden sm:flex items-center gap-2 pointer-events-none opacity-85 z-20 bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-white/10 select-none">
              {/* Blender spinner */}
              <motion.div 
                style={{ rotate: bladeRotation }}
                animate={machineRunning ? { rotate: [0, 360] } : {}}
                transition={machineRunning ? { ease: "linear", duration: 4 / boosterSpeed, repeat: Infinity } : {}}
                className="w-10 h-10 rounded-full border border-brand-gold/60 flex items-center justify-center relative"
              >
                <div className="w-5 h-5 rounded-full border border-brand-gold/30 border-dashed" />
                <div className="absolute top-0 bottom-0 left-1/2 -ml-[1px] w-[2px] bg-brand-gold/80" />
                <div className="absolute left-0 right-0 top-1/2 -mt-[1px] h-[2px] bg-brand-gold/80" />
              </motion.div>
              
              <div className="flex flex-col text-[8px] font-mono tracking-wider text-brand-cream/90 text-left">
                <span className="font-bold text-brand-gold uppercase">JET BLENDER</span>
                <span>SPEED: {machineRunning ? parseFloat((140 + scrollYProgress.get() * 92 + (boosterSpeed - 1) * 350).toFixed(0)) : 0} RPM</span>
              </div>
            </div>

            {/* 5. Liquid Dyeing Chamber Telemetry Console (Top Left) */}
            <div className="absolute top-2 left-2 sm:top-6 sm:left-6 bg-black/75 backdrop-blur-md px-2.5 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border border-white/15 flex flex-col gap-1 items-start pointer-events-none text-left z-20 shadow-md select-none scale-85 sm:scale-100 origin-top-left max-w-[130px] sm:max-w-none">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  {machineRunning ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </>
                  ) : (
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  )}
                </span>
                <span className={`text-[8px] sm:text-[9px] font-mono font-bold tracking-[0.2em] ${machineRunning ? 'text-cyan-400' : 'text-red-400'}`}>
                  {machineRunning ? "LIQUID INFUSION ACTIVE" : "SYSTEM STANDBY"}
                </span>
              </div>
              
              <div className="mt-1.5 space-y-0.5 font-mono text-[9px] sm:text-[10px] text-brand-cream/80">
                <p>Vat Temp: <span className="text-brand-gold font-bold">{machineRunning ? dyeTemp : '31.5'} °C</span></p>
                <p>Liquid acidity: <span className="text-brand-gold font-bold">{machineRunning ? phLevel : '7.00'} pH</span></p>
                <p>Volume Dyed: <span className="text-brand-gold font-semibold">{dyeUsed} L</span></p>
                <p>Cycle Speed: <span className="text-brand-gold font-semibold">{boosterSpeed}x Flow</span></p>
                <p>Fabric Dyed: <span className="text-brand-gold font-bold">{currentMeters} m</span></p>
                
                {/* Active RGB saturation bar based on scroll / active injection */}
                <div className="pt-1 select-none flex flex-col gap-0.5 w-[90px] sm:w-[110px]">
                  <div className="flex items-center justify-between text-[7px] sm:text-[8px] text-brand-cream/60 font-medium">
                    <span>SATURATION</span>
                    <span>{machineRunning ? Math.min(100, Math.floor(65 + scrollYProgress.get() * 20 + boosterSpeed * 3)) : 0}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-400"
                      style={{ width: machineRunning ? `${Math.min(100, Math.floor(65 + scrollYProgress.get() * 20 + boosterSpeed * 3))}%` : '0%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Responsive Control Board Overlay inside Image Card */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-4 left-4 right-4 z-30 bg-black/85 backdrop-blur-md p-3 rounded-xl border border-white/15 text-left select-none shadow-2xl scale-95 sm:scale-100 origin-bottom"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-1.5 mb-1.5">
                <div className="text-left">
                  <span className="text-[8px] font-mono font-bold tracking-[0.25em] text-brand-gold uppercase block">
                    🕹️ {language === 'hi' ? 'वास्तविक समय उत्पादन बोर्ड' : 'REAL-TIME PRODUCTION INTERACTION BOARD'}
                  </span>
                  <h3 className="text-[10px] sm:text-xs font-serif font-semibold text-brand-cream mt-0.5">
                    {language === 'hi' ? 'रंगाई वाट मशीन नियंत्रक' : 'Balotra Artisanal Dyeing Console'}
                  </h3>
                </div>
                
                {/* Status Indicator Grid */}
                <div className="flex items-center gap-2 bg-white/5 border border-white/15 px-2 py-0.5 rounded-lg font-mono text-[8px] sm:text-[9px]">
                  <div className="flex items-center gap-1">
                    <span className="relative flex h-1.5 w-1.5">
                      {machineRunning ? (
                        <>
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </>
                      ) : (
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-400"></span>
                      )}
                    </span>
                    <span className="text-brand-cream font-bold">
                      {machineRunning ? 'ACTIVE' : 'STOPPED'}
                    </span>
                  </div>
                  <span className="text-white/20">|</span>
                  <div className="text-brand-cream/85">
                    {`TEMP: ${machineRunning ? dyeTemp : '31.5'}°C`}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {/* Switch & Purge */}
                <div className="bg-white/[0.02] border border-white/5 p-2 rounded-lg flex flex-col justify-between">
                  <div>
                    <h4 className="text-[7.5px] sm:text-[8px] font-mono tracking-wider font-bold text-brand-gold uppercase">
                      ⚡ {language === 'hi' ? 'मुख्य बिजली' : 'Power & Steam'}
                    </h4>
                  </div>
                  <div className="flex flex-col gap-1 mt-1">
                    <button
                      onClick={() => setMachineRunning(!machineRunning)}
                      className={`w-full py-1 px-1.5 text-[8.5px] font-bold uppercase tracking-widest rounded-md cursor-pointer transition-all ${
                        machineRunning 
                          ? 'bg-emerald-600 text-white font-extrabold border border-emerald-500' 
                          : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                      }`}
                    >
                      {machineRunning ? '🔴 STOP' : '🟢 RUN'}
                    </button>
                    <button
                      disabled={!machineRunning || steamPurging}
                      onClick={triggerSteamPurge}
                      className="w-full py-0.5 px-1.5 text-[7.5px] font-bold uppercase tracking-wider bg-white text-black hover:bg-brand-cream rounded-md disabled:opacity-40 transition-all text-center cursor-pointer"
                    >
                      {steamPurging ? 'PURGING...' : 'STEAM OUT'}
                    </button>
                  </div>
                </div>

                {/* Injector Valves */}
                <div className="bg-white/[0.02] border border-white/5 p-2 rounded-lg flex flex-col justify-between">
                  <div>
                    <h4 className="text-[7.5px] sm:text-[8px] font-mono tracking-wider font-bold text-brand-gold uppercase">
                      🎯 {language === 'hi' ? 'नोजल इंजेक्टर' : 'Dye Injectors'}
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-1 mt-1">
                    <button
                      disabled={!machineRunning}
                      onClick={(e) => triggerDyeInjection('cyan', e)}
                      className="py-1 text-[7.5px] sm:text-[8px] font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-md active:scale-95 transition-all text-center disabled:opacity-40 cursor-pointer"
                    >
                      CYAN
                    </button>
                    <button
                      disabled={!machineRunning}
                      onClick={(e) => triggerDyeInjection('magenta', e)}
                      className="py-1 text-[7.5px] sm:text-[8px] font-bold text-white bg-pink-600 hover:bg-pink-500 rounded-md active:scale-95 transition-all text-center disabled:opacity-40 cursor-pointer"
                    >
                      MAG
                    </button>
                    <button
                      disabled={!machineRunning}
                      onClick={(e) => triggerDyeInjection('gold', e)}
                      className="py-1 text-[7.5px] sm:text-[8px] font-bold text-black bg-amber-400 hover:bg-amber-300 rounded-md active:scale-95 transition-all text-center disabled:opacity-40 cursor-pointer"
                    >
                      GOLD
                    </button>
                  </div>
                </div>

                {/* Acidity Controller */}
                <div className="bg-white/[0.02] border border-white/5 p-2 rounded-lg flex flex-col justify-between">
                  <div>
                    <h4 className="text-[7.5px] sm:text-[8px] font-mono tracking-wider font-bold text-brand-gold uppercase">
                      ⚙️ {language === 'hi' ? 'संचलन गति' : 'Flow Rate'}
                    </h4>
                  </div>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 4].map((speed) => (
                      <button
                        key={speed}
                        disabled={!machineRunning}
                        onClick={() => setBoosterSpeed(speed)}
                        className={`flex-1 py-1 text-[8px] font-mono font-bold rounded-md cursor-pointer border transition-all ${
                          boosterSpeed === speed 
                            ? 'bg-brand-primary text-white border-brand-primary' 
                            : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full relative group overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/d/1LFyLsBPi4LX_GVIeNZRz-ENUUNbaSraC"
              alt="Mansvi Fabrics Loom/Textile Yarn Spindles"
              className="w-full h-full object-cover object-center select-none rounded-xl"
              referrerPolicy="no-referrer"
              draggable={false}
            />
            
            {/* Ambient overlay to ground the photo in luxury aesthetic and improve readability of HUD */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/50 rounded-xl" />
            
            {/* == TEXTILE LOOM MACHINE WORKING SCROLL-BOUND ANIMATIONS == */}
            
            {/* 1. Fine Warp (Vertical) Yarns with scrolling droplets */}
            <div className="absolute inset-0 flex justify-around px-12 pointer-events-none opacity-25">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="h-full w-[1px] bg-brand-gold/30 relative overflow-hidden">
                  <motion.div 
                    style={{ y: yarnY }}
                    className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent via-brand-gold to-transparent"
                  />
                </div>
              ))}
            </div>

            {/* 2. Interactive Meshing Loom Transmission Gears (Top Right) */}
            <div className="absolute top-6 right-6 hidden sm:flex items-center gap-1.5 pointer-events-none opacity-85 z-20 bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              {/* Gear 1 (Main host) */}
              <motion.div 
                style={{ rotate: gear1Rotation }}
                className="w-12 h-12 rounded-full border border-brand-gold/50 flex items-center justify-center relative"
              >
                <div className="w-8 h-8 rounded-full border border-brand-gold/30 border-dashed" />
                <div className="w-3 h-3 rounded-full border border-brand-gold/60 bg-brand-gold/25" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <div 
                    key={angle} 
                    className="absolute w-2 h-2.5 bg-brand-gold/50 rounded-sm"
                    style={{
                      transform: `rotate(${angle}deg) translateY(-22px)`,
                    }}
                  />
                ))}
              </motion.div>

              {/* Gear 2 (Secondary meshed) */}
              <motion.div 
                style={{ rotate: gear2Rotation }}
                className="w-8 h-8 rounded-full border border-brand-cream/40 flex items-center justify-center relative -ml-1 mt-4"
              >
                <div className="w-2 h-2 rounded-full border border-brand-cream/50 bg-brand-cream/15" />
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <div 
                    key={angle} 
                    className="absolute w-1.5 h-2 bg-brand-cream/40 rounded-sm"
                    style={{
                      transform: `rotate(${angle}deg) translateY(-15px)`,
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* 4. Real-time Digital Loom Controller Panel (Top Left) */}
            <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 flex flex-col gap-1 items-start pointer-events-none text-left z-20 shadow-md">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-emerald-400">AUTOMATIC WEAVING ACTIVE</span>
              </div>
              
              <div className="mt-1.5 space-y-0.5 font-mono text-[10px] text-brand-cream/80">
                <p>Loom speed: <span className="text-brand-gold font-bold">680 RPM</span></p>
                <p>Warp tension: <span className="text-brand-gold font-bold">{tension} N/m</span></p>
                <p>Fabric woven: <span className="text-brand-gold font-semibold">{meters} m</span></p>
                <p className="text-[8px] text-brand-cream/40 mt-1 uppercase tracking-wider">Mod: Viscose 14KG</p>
              </div>
            </div>

            {/* Interactive Responsive Control Board Overlay inside Image Card */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-4 left-4 right-4 z-30 bg-black/85 backdrop-blur-md p-3 rounded-xl border border-white/15 text-left select-none shadow-2xl scale-95 sm:scale-100 origin-bottom"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-1.5 mb-1.5 font-mono text-[8px] sm:text-[9px]">
                <div className="text-left">
                  <span className="text-[8px] font-mono font-bold tracking-[0.25em] text-brand-gold uppercase block">
                    🕹️ {language === 'hi' ? 'वास्तविक समय उत्पादन बोर्ड' : 'REAL-TIME PRODUCTION INTERACTION BOARD'}
                  </span>
                  <h3 className="text-[10px] sm:text-xs font-serif font-semibold text-brand-cream mt-0.5">
                    {language === 'hi' ? 'स्वचालित करघा रोटर चालक' : 'Automatic Power-Loom Control Deck'}
                  </h3>
                </div>
                
                {/* Status Indicator Grid */}
                <div className="flex items-center gap-2 bg-white/5 border border-white/15 px-2 py-0.5 rounded-lg">
                  <div className="flex items-center gap-1">
                    <span className="relative flex h-1.5 w-1.5">
                      {machineRunning ? (
                        <>
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </>
                      ) : (
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-400"></span>
                      )}
                    </span>
                    <span className="text-brand-cream font-bold">
                      {machineRunning ? 'ACTIVE' : 'STOPPED'}
                    </span>
                  </div>
                  <span className="text-white/20">|</span>
                  <div className="text-brand-cream/85">
                    {`TENSION: ${tension} N/m`}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Switch Motor */}
                <div className="bg-white/[0.02] border border-white/5 p-2 rounded-lg flex flex-col justify-between">
                  <div>
                    <h4 className="text-[7.5px] sm:text-[8px] font-mono tracking-wider font-bold text-brand-gold uppercase">
                      🧶 {language === 'hi' ? 'करघा संचालित रोटर' : 'Weaving Rotor Motor'}
                    </h4>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <button
                      onClick={() => setMachineRunning(!machineRunning)}
                      className={`flex-1 py-1 px-3 text-[8.5px] font-bold uppercase tracking-widest rounded-md cursor-pointer transition-all border ${
                        machineRunning 
                          ? 'bg-emerald-600 text-white border-emerald-400' 
                          : 'bg-zinc-850 text-zinc-400 border-zinc-700'
                      }`}
                    >
                      {machineRunning ? '🔴 STOP MOTOR' : '🟢 RUN MOTOR'}
                    </button>
                  </div>
                </div>

                {/* Yarn Statistics */}
                <div className="bg-white/[0.02] border border-white/5 p-2 rounded-lg flex flex-col justify-between">
                  <div>
                    <h4 className="text-[7.5px] sm:text-[8px] font-mono tracking-wider font-bold text-brand-gold uppercase">
                      📐 {language === 'hi' ? 'करघा उत्पादन विवरण' : 'Power-Loom Yarn Metrics'}
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-brand-cream/80 font-mono text-[9px] mt-1">
                    <div>
                      <p className="text-white/40 text-[7px] uppercase">Woven Output</p>
                      <p className="text-brand-gold font-bold text-[10px]">{meters} meters</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-[7px] uppercase">Fiber Grade</p>
                      <p className="text-brand-cream font-semibold text-[10px]">Organic Viscose</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </ContainerScroll>

      {/* Experience Mode Selector Pill placed beautifully below the image card */}
      <div className="flex items-center justify-center gap-1.5 p-1.5 bg-white/90 backdrop-blur-md rounded-full border border-brand-primary/15 max-w-[340px] w-full mx-auto -mt-6 sm:-mt-10 mb-16 transition-all shadow-xl shadow-brand-primary/5 relative z-35">
        <button
          onClick={() => setActiveMode('dyeing')}
          className={`flex-1 px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeMode === 'dyeing'
              ? 'bg-brand-primary text-white shadow-md scale-102 font-extrabold'
              : 'text-brand-ink/65 hover:text-brand-primary hover:bg-brand-primary/5 font-semibold'
          }`}
        >
          🎨 {language === 'hi' ? 'रंगाई वाट' : 'Artisanal Dyeing'}
        </button>
        <button
          onClick={() => setActiveMode('loom')}
          className={`flex-1 px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeMode === 'loom'
              ? 'bg-brand-primary text-white shadow-md scale-102 font-extrabold'
              : 'text-brand-ink/65 hover:text-brand-primary hover:bg-brand-primary/5 font-semibold'
          }`}
        >
          ⚙️ {language === 'hi' ? 'बुनाई लूम' : 'Weaving Loom'}
        </button>
      </div>
    </section>
  );
}

