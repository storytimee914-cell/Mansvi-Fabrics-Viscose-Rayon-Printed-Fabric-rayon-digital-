import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TestimonialsColumn, Testimonial } from './ui/testimonials-columns-1';

export default function PartnerReviews() {
  const { t, language } = useLanguage();
  const logos = [
    "1To9qPOfXWOQs0xarzQlXI7l4L9qp3ROx",
    "1L08H0PKFtbVEXk0wiJBD6J41jcinSyBI",
    "1rHT9nf04G0CeEzzQ7vfUPYdQ7WFD8wZt",
    "1ZCAdobzp4ugKF2EsD9RYG4d-iULKfKev"
  ].map(id => `https://lh3.googleusercontent.com/d/${id}`);

  const testimonials: Testimonial[] = language === 'hi' ? [
    {
      text: "मनस्वी फैब्रिक्स ने हमारे बुटीक परिधान निर्माण में क्रांति ला दी है, थोक ऑर्डर और कस्टम स्ट्राइक-ऑफ की मंजूरी को कुशल बनाया है। सीधे मिल की दरें हमारे मुनाफे को मजबूत रखती हैं।",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      name: "Briana Patton",
      role: "फैशन संचालन निदेशक",
      rating: 5
    },
    {
      text: "मनस्वी से प्रीमियम विस्कोस रेयॉन की खरीदारी बहुत सहज रही। उनकी स्थिर गुणवत्ता और लंबे समय तक चलने वाले रंगों ने हमारे मौसमी समर कलेक्शन को बेहद सफल बना दिया।",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      name: "Bilal Ahmed",
      role: "कपड़ा सोर्सिंग प्रबंधक",
      rating: 5
    },
    {
      text: "उनका कस्टम प्रिंट स्टूडियो असाधारण है, जो हमें पैटर्न विकास में मार्गदर्शन करता है और थोक लॉट में शून्य शेड भिन्नता के साथ हाई-डेफिनिशन प्रिंट वितरित करता है।",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      name: "Saman Malik",
      role: "गुणवत्ता नियंत्रण प्रमुख",
      rating: 5
    },
    {
      text: "उनके उच्च-ट्विस्ट रेयॉन और मलमल के कपड़े का ड्रेप उत्कृष्ट है। विश्वसनीय मिल आपूर्ति की तलाश करने वाले किसी भी वैश्विक फैशन ब्रांड के लिए मनस्वी फैब्रिक्स की अत्यधिक सिफारिश की जाती है।",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      name: "Omar Raza",
      role: "मुख्य कार्यकारी अधिकारी (CEO)",
      rating: 5
    },
    {
      text: "त्वरित रसद और सख्त गुणवत्ता जांच प्रोटोकॉल। उनका 14 किलोग्राम लीवा-अनुमोदित विस्कोस असाधारण रूप से नरम है और इसने हमारे लक्जरी एथनिक परिधान उत्पादन को बदल दिया है।",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      name: "Zainab Hussain",
      role: "उत्पादन प्रमुख",
      rating: 5
    },
    {
      text: "मनस्वी के साथ अनुकूलित ब्लॉक प्रिंट और प्रोसियोन रिएक्टिव डाई का उपयोग हमारी अपेक्षाओं से बढ़कर रहा, जिससे हमारे परिधानों की दक्षता और कपड़े की उपज अधिकतम हुई।",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
      name: "Aliza Khan",
      role: "फैशन मर्चेंडाइज़र",
      rating: 5
    },
    {
      text: "हमारे कपड़ों को उनके तरल-ड्रेप वाले प्रीमियम कफ्तान रेयॉन प्रिंटों में अपग्रेड करने के बाद हमारी ऑनलाइन बीचवियर बिक्री में काफी सुधार हुआ। बेहतरीन ग्राहक प्रतिक्रिया मिली।",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
      name: "Farhan Siddiqui",
      role: "रिटेल ब्रांड संस्थापक",
      rating: 5
    },
    {
      text: "उन्होंने हमारे डिजिटल आर्ट फ़ाइल से बिल्कुल मेल खाते हुए प्रीमियम-गुणवत्ता वाले कस्टम प्रिंटेड पलाज़ो कपड़े वितरित किए। उत्कृष्ट गहरे रिएक्टिव रंगों का निखार।",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      name: "Sana Sheikh",
      role: "क्रिएटिव डायरेक्टर",
      rating: 5
    },
    {
      text: "उत्कृष्ट थोक मूल्य और लगातार थ्रेड-काउंट घनत्व। हमारे कस्टम प्रिंटेड रेयॉन स्लब शर्ट हमारे सबसे बेस्टसेलर प्रोडक्ट बन गए हैं।",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
      name: "Hassan Ali",
      role: "संस्थापक, रेयॉन कम्फर्ट्स",
      rating: 5
    }
  ] : [
    {
      text: "Mansvi Fabrics revolutionized our boutique apparel manufacturing, streamlining bulk fabric orders and custom strike-off approvals. Direct-from-mill pricing keeps our margins healthy.",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      name: "Briana Patton",
      role: "Fashion Operations Director",
      rating: 5
    },
    {
      text: "Sourcing premium Viscose Rayon from Mansvi was incredibly smooth. Their stable quality and long-lasting dye colors made our seasonal summer collections a major success.",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      name: "Bilal Ahmed",
      role: "Textile Sourcing Manager",
      rating: 5
    },
    {
      text: "Their custom print studio is exceptional, guiding us through pattern development and delivering high-definition prints with zero shade variation across bulk lots.",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      name: "Saman Malik",
      role: "Quality Assurance Head",
      rating: 5
    },
    {
      text: "Their high-twist rayon and muslin fabric drape is outstanding. Highly recommend Mansvi Fabrics for any global fashion line looking for reliable direct mill supply.",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      name: "Omar Raza",
      role: "CEO, Festive Wear Brand",
      rating: 5
    },
    {
      text: "Prompt logistics and strict quality check protocols. Their 14kg Liva-approved Viscose is exceptionally soft and has transformed our luxury ethnic line production.",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      name: "Zainab Hussain",
      role: "Production Lead",
      rating: 5
    },
    {
      text: "Implementing customized block prints and Procion reactive dye with Mansvi exceeded our expectations, maximizing efficiency and fabric yield for our garments.",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
      name: "Aliza Khan",
      role: "Fashion Merchandiser",
      rating: 5
    },
    {
      text: "Our online beachwear sales significantly improved after we upgraded our fabrics to their fluid-drape premium Kaftan rayon prints. Excellent customer feedback.",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
      name: "Farhan Siddiqui",
      role: "Retail Brand Founder",
      rating: 5
    },
    {
      text: "They delivered premium-quality custom printed Palazzo fabrics exactly matching our digital art file. Outstanding deep reactive dye saturation.",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      name: "Sana Sheikh",
      role: "Creative Director",
      rating: 5
    },
    {
      text: "Excellent wholesale volume prices and consistent thread-count density. Our custom printed Rayon Slub shirts have become our absolute bestseller.",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
      name: "Hassan Ali",
      role: "Founder, Rayon Comforts",
      rating: 5
    }
  ];

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section className="bg-brand-primary/[0.01] py-16 px-6 border-b border-brand-ink/5 text-left relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-14">
          {/* Trusted By Logos - Horizontal Row */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-ink/40 mb-8 text-center lg:text-left">
              {t('reviews.label') || (language === 'hi' ? "प्रमुख परिधान ब्रांडों और उत्कृष्ट फैशन हाउसों द्वारा विश्वसनीय" : "TRUSTED BY PREMIUM DESIGN HOUSES & APPAREL BRANDS")}
            </p>
            <div className="flex flex-nowrap items-center justify-center lg:justify-start gap-8 md:gap-20 overflow-x-auto no-scrollbar">
              {logos.map((logo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-center h-14 md:h-20"
                >
                  <img 
                    src={logo} 
                    alt="Partner Logo" 
                    className="h-full w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Realistic Reviews - Interactive Columns */}
          <div className="relative">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Header section on side for wide screen, top on mobile */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
                  <span className="w-2 h-2 rounded-full bg-blue-500 flex items-center justify-center text-[5px] font-bold text-white font-sans">G</span>
                  Google Business Reviews
                </div>
                
                <h2 className="text-3xl md:text-4xl font-serif font-medium text-brand-ink leading-tight mb-4">
                  {language === 'hi' ? 'हमारे भागीदारों की राय' : 'What Our Partners Say'}
                </h2>
                
                <p className="text-xs md:text-sm text-brand-ink/60 leading-relaxed mb-6 max-w-md">
                  {language === 'hi' 
                    ? 'दुनिया भर के प्रमुख परिधान ब्रांड, डिज़ाइनर और बुटीक हमारे गुणवत्तापूर्ण कपड़ों और समय पर डिलीवरी पर भरोसा करते हैं।' 
                    : 'Leading garment brands, boutique designers, and e-commerce labels worldwide depend on our mill-direct quality fabrics.'}
                </p>

                <div className="flex items-center gap-3 bg-white border border-brand-ink/5 p-4 rounded-xl shadow-sm">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-3xl font-bold font-serif text-brand-ink leading-none">4.9</span>
                    <span className="text-[9px] text-brand-ink/40 font-medium uppercase tracking-wider mt-0.5">{t('reviews.stat')}</span>
                  </div>
                  <div className="w-px h-8 bg-brand-ink/10" />
                  <div>
                    <div className="flex gap-0.5 mb-1">
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <Star key={i} size={11} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-brand-ink/50 font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="text-green-500">✓</span> 100% {t('verified')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Scrolling reviews animation */}
              <div className="lg:col-span-8 overflow-hidden max-h-[580px] relative">
                {/* Fade overlays */}
                <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-brand-bg to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-brand-bg to-transparent z-10 pointer-events-none" />

                <div 
                  className="flex justify-center gap-6"
                  style={{
                    maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)'
                  }}
                >
                  <TestimonialsColumn testimonials={firstColumn} duration={22} className="w-full max-w-xs" />
                  <TestimonialsColumn testimonials={secondColumn} duration={26} className="hidden md:block w-full max-w-xs animate-scroll-delay" />
                  <TestimonialsColumn testimonials={thirdColumn} duration={24} className="hidden xl:block w-full max-w-xs animate-scroll-normal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

