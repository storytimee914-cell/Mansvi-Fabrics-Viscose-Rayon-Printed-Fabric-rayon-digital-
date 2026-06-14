import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { WHATSAPP_NUMBER } from '../constants';
import { useLanguage } from '../context/LanguageContext';

export default function WhatsAppWidget() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after a small delay on page load
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    // Auto-hide tooltip after 8 seconds if not clicked
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 11000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      language === 'hi' 
        ? "नमस्ते, मुझे मानस्वी फैब्रिक्स के उत्पादों के बारे में जानकारी चाहिए।" 
        : "Hello! I am interested in fabrics from Mansvi Fabrics."
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none select-none">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="pointer-events-auto relative bg-[#060505] text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs flex items-center gap-3 border border-white/10"
          >
            <div className="flex flex-col text-left">
              <span className="font-bold text-[10px] text-brand-gold uppercase tracking-wider">
                {language === 'hi' ? 'सहायता चाहिए?' : 'Need Help?'}
              </span>
              <span className="text-white/80 font-light">
                {language === 'hi' ? 'अभी हमसे व्हाट्सएप पर बात करें' : 'Chat with us on WhatsApp'}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="p-1 hover:bg-white/10 rounded-full transition-colors self-start -mt-1 -mr-1 cursor-pointer"
            >
              <X size={12} className="text-white/50" />
            </button>
            <div className="absolute bottom-[-6px] right-5 w-3 h-3 bg-[#060505] rotate-45 border-r border-b border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        id="floating-whatsapp-widget"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleWhatsAppClick}
        className="pointer-events-auto relative w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer transition-all focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
        title="Chat on WhatsApp"
      >
        {/* Pulsing online badge indicator */}
        <span className="absolute top-0 right-0 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#128C7E] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#128C7E] border-2 border-white flex items-center justify-center text-[8px] font-bold">●</span>
        </span>

        <MessageCircle size={28} className="fill-white" />
      </motion.button>
    </div>
  );
}
