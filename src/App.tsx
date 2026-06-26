/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import PartnerReviews from './components/PartnerReviews';
import Story from './components/Story';
import Bestsellers from './components/Bestsellers';
import Products from './components/Products';
import FabricGallery from './components/FabricGallery';
import SwatchCard from './components/SwatchCard';
import CustomDesign from './components/CustomDesign';
import BulkOrder from './components/BulkOrder';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import IntroScreen from './components/IntroScreen';
import { useLanguage } from './context/LanguageContext';
import { cn } from './lib/utils';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const { language } = useLanguage();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Session-based storage to only show once per visit for best usability
    const hasSeenIntro = sessionStorage.getItem('mansvi_intro_seen');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('mansvi_intro_seen', 'true');
    setShowIntro(false);
  };
  
  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroScreen key="intro-screen" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <div className={cn("min-h-screen relative", language === 'hi' && "font-hindi")}>
        <Navbar />
        <main className="relative">
          <Hero />
          <TrustBar />
          <Bestsellers />
          <Products />
          <SwatchCard />
          <FabricGallery />
          <BulkOrder />
          <CustomDesign />
          <Story />
          <PartnerReviews />
          <Contact />
        </main>
        <Footer />
        <WhatsAppWidget />
      </div>
    </>
  );
}
