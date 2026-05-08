/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useLanguage } from './context/LanguageContext';
import { cn } from './lib/utils';

export default function App() {
  const { language } = useLanguage();
  
  return (
    <div className={cn("min-h-screen", language === 'hi' && "font-hindi")}>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Story />
        <Bestsellers />
        <Products />
        <SwatchCard />
        <FabricGallery />
        <BulkOrder />
        <CustomDesign />
        <PartnerReviews />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
