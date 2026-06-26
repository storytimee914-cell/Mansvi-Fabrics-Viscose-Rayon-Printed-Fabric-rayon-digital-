import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface IntroScreenProps {
  onComplete: () => void;
  key?: string;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTriggeredTransition = useRef(false);

  useEffect(() => {
    // Safety Fallback Auto-transition: In case video fails to load or play, 
    // we transition to the main site after 10.5 seconds (9.0s video length + 1.5s wait)
    const fallbackTimer = setTimeout(() => {
      if (!hasTriggeredTransition.current) {
        hasTriggeredTransition.current = true;
        onComplete();
      }
    }, 10500);

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, [onComplete]);

  // Keep track of native HTML5 video progress
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.duration) {
      const pct = (video.currentTime / video.duration) * 100;
      setProgress(pct);
    }
  };

  const handleVideoEnded = () => {
    if (!hasTriggeredTransition.current) {
      hasTriggeredTransition.current = true;
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] bg-[#0c0a0f] flex flex-col items-center justify-center overflow-hidden font-sans select-none"
    >
      {/* Dynamic Background Ambiance */}
      <div className="absolute inset-0 bg-radial-gradient from-purple-950/15 via-transparent to-transparent pointer-events-none" />

      {/* Cinematic Showcase Wrapper */}
      <div className="relative w-full max-w-4xl aspect-video md:rounded-2xl overflow-hidden bg-black shadow-[0_0_80px_rgba(0,0,0,0.85)] border border-white/5 mx-4 flex items-center justify-center">
        
        {/* Native Premium HTML5 Video Background - Zero UI Controls */}
        <video
          ref={videoRef}
          src="/assets/intro.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* Interactive Skip Option & Informational Tip */}
      <div className="mt-4 text-xs text-white/45 flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-2">
          <span>Entering the world of fine fabrics...</span>
          <button 
            onClick={() => {
              if (!hasTriggeredTransition.current) {
                hasTriggeredTransition.current = true;
                onComplete();
              }
            }}
            className="text-brand-primary hover:underline font-medium cursor-pointer"
          >
            Skip Intro
          </button>
        </div>
      </div>

      {/* Footer Controls & Elegant Cinematic Loader */}
      <div className="mt-8 flex flex-col items-center max-w-md w-full px-6 text-center z-10">
        
        {/* Brand Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-3"
        >
          Experience Mansvi Fabrics
        </motion.div>

        {/* Dynamic Horizontal Progress Bar */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative mb-6">
          <motion.div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand-primary to-purple-400 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
