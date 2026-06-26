import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Shared
    'scroll': 'Scroll',
    'verified': 'Verified',
    'gallery.title': 'Fabric Gallery',
    'gallery.subtitle': 'Explore our diverse collection of textures, prints, and weaves. A glimpse into the artistry of Mansvi Fabrics.',
    'gallery.swipe': 'Swipe to explore',

    // Navbar
    'nav.products': 'Products',
    'nav.bulk': 'Bulk Order',
    'nav.contact': 'Contact Us',
    'nav.account': 'Account',
    'nav.signOut': 'Sign Out',
    'nav.wishlist': 'Wishlist',
    'nav.searchPlaceholder': 'Search for fabrics, prints, or types...',

    // Hero
    'hero.label': 'The Art of Indian Textiles',
    'hero.title.line1': 'Quality isn’t our standard.',
    'hero.title.line2': 'It’s our starting point.',
    'hero.subtitle': 'From the heart of Balotra\'s textile mills, we bring you the finest Viscose Rayon and Cotton fabrics, refined into form for global fashion.',
    'hero.cta.view': 'View Collections',
    'hero.cta.wholesale': 'Wholesale Inquiry',

    // Trust Bar
    'trust.legacy': '40 Years Excellence',
    'trust.direct': 'Mill Direct Pricing',
    'trust.export': 'Export Quality Check',
    'trust.custom': 'Custom R&D Studio',

    // Story
    'story.label': 'Customer Trust',
    'story.title': 'Mansvi Fabrics (Unit of Malani Group)',
    'story.p1': 'The company has developed itself as a preferred fabric provider of high-quality viscose fabric and high-definition printed fabrics. This company is promoted by highly successful promoters with relevant industry background of four decades. Our promoters have long-standing relationships with various stakeholders like suppliers and other companies operating within the Textile cluster of Balotra, India.',
    'story.p3': 'Our core business focus is towards manufacturing the high quality Viscose Rayon fabrics, Digital-Printed Rayon, Digital-Printed Cotton Fabric, Digital-Printed Muslin Fabric and many more.',
    'story.owners': 'DIRECTOR - NITIN MALANI',
    'story.director': 'MANAGING DIRECTOR - PARTH MALANI',
    'story.cta': 'Learn More About Us',

    // Bestsellers
    'bestsellers.title': 'Signature Collections',
    'bestsellers.subtitle': 'Our most loved constructions, trusted by leading designers worldwide.',
    'fabric.liva': 'LIVA Approved Viscose',
    'fabric.liva.desc': 'Highly breathable and eco-friendly fabric with superior drape and ultra-soft feel.',
    'fabric.digital': 'HD Digital Prints',
    'fabric.digital.desc': 'Vibrant, sharp designs on premium 14kg rayon bases using Japanese technology.',
    'fabric.muslin': 'Fine Muslin Prints',
    'fabric.muslin.desc': 'Lightweight, sheer and soft fabric with intricate designs for luxury ethnic wear.',

    // Swatch Card
    'swatch.title': 'Swatch Cards',
    'swatch.subtitle': 'A closer look at our high-definition print textures and fabric weaves.',
    'swatch.count': 'Viscose Rayon 14KG',
    'swatch.quality': 'Dyeing Quality: Procion Print',
    'swatch.width': 'Fabric Width: 44-58 Inches',
    'swatch.moq': 'MOQ: 1000 Meters per Print',

    // Bulk Order
    'bulk.title': 'Start Your Bulk Project',
    'bulk.subtitle': 'Get mill-direct rates for your next collection. We specialize in high-volume export orders.',
    'bulk.input.name': 'Your Name',
    'bulk.input.email': 'Work Email',
    'bulk.input.meters': 'Required Meters',
    'bulk.cta': 'Inquire for Bulk Rates',
    'bulk.min': 'Min. order starts at 500 meters per print/color',

    // Custom Design
    'custom.title': 'Custom Print Studio',
    'custom.subtitle': 'Have a unique design? Our in-house artists translate your vision into high-definition textile prints.',
    'custom.step1': 'Upload Artwork',
    'custom.step2': 'Strike-off Approval',
    'custom.step3': 'Production',
    'custom.cta': 'Start Custom Order',

    // Trusted By
    'reviews.label': '',
    'reviews.stat': '4.9/5 from 200+ global clients',

    // Why Choose Us
    'why.label': 'Our Advantage',
    'why.title': 'Why Choose Mansvi Fabrics?',
    'why.f1.title': 'Factory Direct Pricing',
    'why.f1.desc': 'Eliminate middlemen and get the best value for premium grade textiles directly from Balotra.',
    'why.f2.title': 'Global Standards',
    'why.f2.desc': 'Our fabrics meet international color fastness and shrinkage standards for global export.',
    'why.f3.title': 'Design Innovation',
    'why.f3.desc': 'In-house design studio producing 100+ new patterns every month tracking global trends.',
    'why.f4.title': 'Sustainable Growth',
    'why.f4.desc': 'Committed to eco-friendly dyes and zero liquid discharge processing units.',

    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Ready to start your next collection? Contact our sales team for samples and catalogs.',
    'contact.label.name': 'Your Name',
    'contact.label.email': 'Email Address',
    'contact.label.phone': 'Phone Number',
    'contact.label.msg': 'Your Message/Requirement',
    'contact.cta': 'Send Inquiry',
    'contact.loc.title': 'Factory Location',
    'contact.loc.addr': 'Malani Group Premises, Textile Cluster, Balotra, Rajasthan 344022',
    'contact.loc.phone': 'Call Us',
    'contact.loc.email': 'Email',
    // Products
    'products.label': 'Our Collection',
    'products.title': 'Premium Fabric Categories',
    'products.subtitle': 'Discover our diverse range of high-quality fabrics, from sustainable rayon to vibrant digital prints.',
    'cat.all': 'All Fabrics',
    'cat.viscose': 'Viscose Rayon',
    'cat.cotton': 'Cotton',
    'cat.printed': 'Printed Rayon',
    'cat.kaftan': 'Kaftan',
    'cat.palazzo': 'Palazzo',
    'product.print': 'Print',
    'product.colors': 'Colour References',
    'product.viewSwatches': 'Open Swatch Cards',
    'product.moreColors': 'More Colour Options',
    'product.usage': 'Recommended Usage',
    'product.cta': 'Inquire for Bulk Order',
    'usage.kurtis': 'Kurtis',
    'usage.palazzo': 'Palazzo',
    'usage.kaftan': 'Kaftan',
    'usage.resortwear': 'Resort Wear',
    'usage.ethnicwear': 'Ethnic Wear',
    'usage.westernwear': 'Western Wear',
    'usage.dupatta': 'Dupatta',
    // Footer
    'footer.tagline': 'Leading the textile industry with premium viscose rayon, cotton, and custom printed fabrics.',
    'footer.links.title': 'Quick Links',
    'footer.cats.title': 'Fabric Categories',
    'footer.news.title': 'Newsletter',
    'footer.news.sub': 'Subscribe to get updates on new collections and industry trends.',
    'footer.copy': 'All rights reserved.',
  },
  hi: {
    // Shared
    'scroll': 'नीचे चलें',
    'verified': 'सत्यापित',
    'gallery.title': 'फैब्रिक गैलरी',
    'gallery.subtitle': 'बनावट, प्रिंट और बुनाई के हमारे विविध कलेक्शन का अन्वेषण करें। मनस्वी फैब्रिक्स की कलात्मकता की एक झलक।',
    'gallery.swipe': 'अन्वेषण के लिए स्वाइप करें',

    // Navbar
    'nav.products': 'उत्पाद',
    'nav.bulk': 'थोक ऑर्डर',
    'nav.contact': 'संपर्क करें',
    'nav.account': 'खाता',
    'nav.signOut': 'साइन आउट',
    'nav.wishlist': 'विशलिस्ट',
    'nav.searchPlaceholder': 'कपड़े, प्रिंट या प्रकार के लिए खोजें...',

    // Hero
    'hero.label': 'भारतीय वस्त्रों की कला',
    'hero.title.line1': 'गुणवत्ता हमारा मानक नहीं है,',
    'hero.title.line2': 'यह हमारा शुरुआती बिंदु है।',
    'hero.subtitle': 'बालोतरा के टेक्सटाइल मिलों के केंद्र से, हम आपके लिए बेहतरीन विस्कोस रेयॉन और सूती कपड़े लाते हैं, जो वैश्विक फैशन के लिए तैयार किए गए हैं।',
    'hero.cta.view': 'कलेक्शन देखें',
    'hero.cta.wholesale': 'थोक पूछताछ',

    // Trust Bar
    'trust.legacy': '40 वर्षों की उत्कृष्टता',
    'trust.direct': 'मिल डायरेक्ट प्राइसिंग',
    'trust.export': 'निर्यात गुणवत्ता जांच',
    'trust.custom': 'कस्टम आरएंडडी स्टूडियो',

    // Story
    'story.label': 'ग्राहक का भरोसा',
    'story.title': 'मनस्वी फैब्रिक्स (मलानी ग्रुप की इकाई)',
    'story.p1': 'कंपनी ने खुद को उच्च गुणवत्ता वाले विस्कोस फैब्रिक और हाई-डेफिनिशन प्रिंटेड फैब्रिक के पसंदीदा प्रदाता के रूप में विकसित किया है। यह कंपनी चार दशकों के प्रासंगिक उद्योग पृष्ठभूमि वाले अत्यधिक सफल प्रमोटरों द्वारा संचालित है। हमारे प्रमोटरों के बालोतरा, भारत के टेक्सटाइल क्लस्टर के भीतर आपूर्तिकर्ताओं और अन्य कंपनियों जैसे विभिन्न हितधारकों के साथ लंबे समय से संबंध हैं।',
    'story.p3': 'हमारा मुख्य व्यवसाय फोकस उच्च गुणवत्ता वाले विस्कोस रेयॉन फैब्रिक्स, डिजिटल-प्रिंटेड रेयॉन, डिजिटल-प्रिंटेड कॉटन फैब्रिक, डिजिटल-प्रिंटेड मसलिन फैब्रिक और कई अन्य के निर्माण की ओर है।',
    'story.owners': 'निदेशक - नितिन मलानी',
    'story.director': 'प्रबंध निदेशक - पार्थ मलानी',
    'story.cta': 'हमारे बारे में और जानें',

    // Bestsellers
    'bestsellers.title': 'सिग्नेचर कलेक्शन',
    'bestsellers.subtitle': 'हमारे सबसे पसंदीदा निर्माण, दुनिया भर के अग्रणी डिजाइनरों द्वारा भरोसेमंद।',
    'fabric.liva': 'LIVA प्रमाणित विस्कोस',
    'fabric.liva.desc': 'बेहतर ड्रेप और अल्ट्रा-सॉफ्ट अहसास के साथ अत्यधिक सांस लेने योग्य और पर्यावरण के अनुकूल कपड़ा।',
    'fabric.digital': 'HD डिजिटल प्रिंट',
    'fabric.digital.desc': 'जापानी तकनीक का उपयोग करके प्रीमियम 14kg रेयॉन बेस पर जीवंत, सटीक डिजाइन।',
    'fabric.muslin': 'फाइन मसलिन प्रिंट',
    'fabric.muslin.desc': 'लक्जरी एथनिक वियर के लिए जटिल डिजाइनों के साथ हल्का, पारभासी और मुलायम कपड़ा।',

    // Swatch Card
    'swatch.title': 'स्वाच कार्ड्स',
    'swatch.subtitle': 'हमारे हाई-डेफिनिशन प्रिंट टेक्सचर और फैब्रिक बुनाई पर एक करीब से नज़र।',
    'swatch.count': 'विस्कोस रेयॉन 14KG',
    'swatch.quality': 'रंगाई गुणवत्ता: प्रोसियोन प्रिंट',
    'swatch.width': 'कपड़े की चौड़ाई: 44-58 इंच',
    'swatch.moq': 'MOQ: 1000 मीटर प्रति प्रिंट',

    // Bulk Order
    'bulk.title': 'अपना बल्क प्रोजेक्ट शुरू करें',
    'bulk.subtitle': 'अपने अगले कलेक्शन के लिए मिल-डायरेक्ट दरें प्राप्त करें। हम उच्च मात्रा वाले निर्यात ऑर्डरों में विशेषज्ञ हैं।',
    'bulk.input.name': 'आपका नाम',
    'bulk.input.email': 'कार्य ईमेल',
    'bulk.input.meters': 'आवश्यक मीटर',
    'bulk.cta': 'थोक दरों के लिए पूछताछ करें',
    'bulk.min': 'न्यूनतम ऑर्डर प्रति प्रिंट/रंग 500 मीटर से शुरू होता है',

    // Custom Design
    'custom.title': 'कस्टम प्रिंट स्टूडियो',
    'custom.subtitle': 'क्या आपके पास कोई अनूठा डिजाइन है? हमारे इन-हाउस कलाकार आपके दृष्टिकोण को हाई-डेफिनिशन टेक्सटाइल प्रिंट में बदलते हैं।',
    'custom.step1': 'आर्टवर्क अपलोड करें',
    'custom.step2': 'स्ट्राइक-ऑफ अप्रूवल',
    'custom.step3': 'उत्पादन',
    'custom.cta': 'कस्टम ऑर्डर शुरू करें',

    // Trusted By
    'reviews.label': '',
    'reviews.stat': '200+ वैश्विक ग्राहकों से 4.9/5',

    // Why Choose Us
    'why.label': 'हमारा फायदा',
    'why.title': 'मनस्वी फैब्रिक्स क्यों चुनें?',
    'why.f1.title': 'फैक्ट्री डायरेक्ट प्राइसिंग',
    'why.f1.desc': 'बिचौलियों को खत्म करें और सीधे बालोतरा से प्रीमियम ग्रेड टेक्सटाइल का सर्वोत्तम मूल्य प्राप्त करें।',
    'why.f2.title': 'वैश्विक मानक',
    'why.f2.desc': 'हमारे कपड़े वैश्विक निर्यात के लिए अंतरराष्ट्रीय रंग स्थिरता और सिकुड़न मानकों को पूरा करते हैं।',
    'why.f3.title': 'डिजाइन नवाचार',
    'why.f3.desc': 'इन-हाउस डिजाइन स्टूडियो हर महीने वैश्विक रुझानों को ट्रैक करते हुए 100+ नए पैटर्न तैयार करता है।',
    'why.f4.title': 'सतत विकास',
    'why.f4.desc': 'पर्यावरण के अनुकूल रंगों और जीरो लिक्विड डिस्चार्ज प्रोसेसिंग इकाइयों के लिए प्रतिबद्ध।',

    // Contact
    'contact.title': 'संपर्क करें',
    'contact.subtitle': 'अपना अगला कलेक्शन शुरू करने के लिए तैयार हैं? सैंपल और कैटलॉग के लिए हमारी सेल्स टीम से संपर्क करें।',
    'contact.label.name': 'आपका नाम',
    'contact.label.email': 'ईमेल पता',
    'contact.label.phone': 'फोन नंबर',
    'contact.label.msg': 'आपका संदेश/आवश्यकता',
    'contact.cta': 'पूछताछ भेजें',
    'contact.loc.title': 'फैक्ट्री का पता',
    'contact.loc.addr': 'मलानी ग्रुप परिसर, टेक्सटाइल क्लस्टर, बालोतरा, राजस्थान 344022',
    'contact.loc.phone': 'हमें कॉल करें',
    'contact.loc.email': 'ईमेल',
    // Products
    'products.label': 'हमारा कलेक्शन',
    'products.title': 'प्रीमियम फैब्रिक श्रेणियां',
    'products.subtitle': 'उच्च गुणवत्ता वाले कपड़ों की हमारी विविध रेंज खोजें, टिकाऊ रेयॉन से लेकर जीवंत डिजिटल प्रिंट तक।',
    'cat.all': 'सभी कपड़े',
    'cat.viscose': 'विस्कोस रेयॉन',
    'cat.cotton': 'कॉटन',
    'cat.printed': 'प्रिंटेड रेयॉन',
    'cat.kaftan': 'कफ्तान',
    'cat.palazzo': 'पलाज़ो',
    'product.print': 'प्रिंट',
    'product.colors': 'रंग संदर्भ',
    'product.viewSwatches': 'स्वाच कार्ड्स सीधे खोलें',
    'product.moreColors': 'अधिक रंग विकल्प',
    'product.usage': 'अनुशंसित उपयोग',
    'product.cta': 'थोक ऑर्डर के लिए पूछताछ करें',
    'usage.kurtis': 'कुर्तियां',
    'usage.palazzo': 'पलाज़ो',
    'usage.kaftan': 'कफ्तान',
    'usage.resortwear': 'रिसॉर्ट वियर',
    'usage.ethnicwear': 'एथनिक वियर',
    'usage.westernwear': 'वेस्टर्न वियर',
    'usage.dupatta': 'दुपट्टा',
    // Footer
    'footer.tagline': 'प्रीमियम विस्कोस रेयॉन, कॉटन और कस्टम प्रिंटेड फैब्रिक्स के साथ टेक्सटाइल उद्योग का नेतृत्व कर रहे हैं।',
    'footer.links.title': 'त्वरित लिंक',
    'footer.cats.title': 'फैब्रिक श्रेणियां',
    'footer.news.title': 'न्यूज़लेटर',
    'footer.news.sub': 'नए कलेक्शन और उद्योग के रुझानों पर अपडेट पाने के लिए सब्सक्राइब करें।',
    'footer.copy': 'सर्वाधिकार सुरक्षित।',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
