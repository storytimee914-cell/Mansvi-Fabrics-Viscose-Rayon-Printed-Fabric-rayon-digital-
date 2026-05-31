import { useState, useEffect } from 'react';
import { Menu, X, Phone, ShoppingBag, Search, User, Heart, LogOut, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { signInWithGoogle, logOut } from '../lib/firebase';
import { useLanguage } from '../context/LanguageContext';

const logoImg = "https://lh3.googleusercontent.com/d/10TYY5GeFr4lgktnMLn7BO8lcU60gM2XL";

export default function Navbar() {
  const { user } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.products'), href: '#products' },
    { name: t('nav.bulk'), href: '#bulk' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-1',
        isScrolled ? 'bg-[#c61919]/95 backdrop-blur-md shadow-md py-1' : 'bg-[#c61919]'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-3 shrink-0">
          <img 
            src={logoImg} 
            alt="Mansvi Fabrics Logo" 
            className="w-12 h-12 rounded-lg shadow-md border border-white/20 object-contain bg-[#f3ede4]"
            referrerPolicy="no-referrer"
          />
          <span className={cn(
            "font-serif text-lg font-semibold tracking-tight hidden sm:block text-white"
          )}>
            Mansvi Fabrics
          </span>
        </a>

        {/* Desktop Search & Nav */}
        <div className="hidden lg:flex flex-1 items-center justify-center max-w-xl px-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={t('nav.searchPlaceholder') || "Search fabrics, prints..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full border rounded-full py-2 pl-10 pr-4 text-sm outline-none transition-all",
                "bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:ring-2 focus:ring-white/20 focus:border-white"
              )}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={16} />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-[11px] font-bold uppercase tracking-[0.15em] transition-colors",
                "text-white/80 hover:text-white"
              )}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Utility Icons */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all text-[11px] font-bold uppercase tracking-wider"
            >
              <Languages size={16} className="text-white/80" />
              <span>{language === 'en' ? 'English' : 'हिन्दी'}</span>
            </button>

            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl overflow-hidden py-1 z-50 text-brand-ink"
                >
                  <button 
                    onClick={() => { setLanguage('en'); setIsLangMenuOpen(false); }}
                    className={cn(
                      "w-full px-4 py-2 text-left text-xs font-bold uppercase tracking-wider hover:bg-brand-primary/5 transition-colors",
                      language === 'en' && "text-brand-primary bg-brand-primary/10"
                    )}
                  >
                    English
                  </button>
                  <button 
                    onClick={() => { setLanguage('hi'); setIsLangMenuOpen(false); }}
                    className={cn(
                      "w-full px-4 py-2 text-left text-xs font-bold uppercase tracking-wider hover:bg-brand-primary/5 transition-colors font-hindi",
                      language === 'hi' && "text-brand-primary bg-brand-primary/10"
                    )}
                  >
                    हिन्दी
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button 
              onClick={() => user ? setIsUserMenuOpen(!isUserMenuOpen) : signInWithGoogle()}
              className={cn(
                "transition-colors hidden sm:flex items-center justify-center overflow-hidden w-9 h-9 rounded-full border border-transparent",
                "text-white/80 hover:text-white",
                user && "border-white/10"
              )}
            >
              {user ? (
                <img 
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                  alt={user.displayName || 'User'} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User size={20} />
              )}
            </button>

            {/* User Dropdown */}
            <AnimatePresence>
              {isUserMenuOpen && user && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-brand-ink/5 overflow-hidden py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-brand-ink/5 mb-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">{t('nav.account')}</p>
                    <p className="text-sm font-medium text-brand-ink truncate">{user.displayName}</p>
                  </div>
                  <button 
                    onClick={() => {
                      logOut();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-brand-bg transition-colors font-medium font-serif"
                  >
                    <LogOut size={16} /> {t('nav.signOut')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className={cn(
            "transition-colors hidden sm:block",
            "text-white/80 hover:text-white"
          )} title={t('nav.wishlist')}>
            <Heart size={20} />
          </button>
          <a
            href="#bulk"
            className={cn(
              "relative transition-colors",
              "text-white/80 hover:text-white"
            )}
            title={t('nav.bulk')}
          >
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white/20">
              0
            </span>
          </a>
          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-cream border-t border-brand-ink/10 p-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-2">
                <button 
                  onClick={() => setLanguage('en')}
                  className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-brand-ink/10",
                    language === 'en' ? "bg-brand-primary text-white border-brand-primary" : "text-brand-ink/60"
                  )}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLanguage('hi')}
                  className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-brand-ink/10",
                    language === 'hi' ? "bg-brand-primary text-white border-brand-primary" : "text-brand-ink/60"
                  )}
                >
                  हिन्दी
                </button>
              </div>
            </div>
            <div className="relative w-full mb-4">
              <input
                type="text"
                placeholder={t('nav.searchPlaceholder') || "Search fabrics..."}
                className="w-full bg-white border border-brand-ink/10 rounded-full py-3 pl-10 pr-4 text-sm outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-ink/40" size={18} />
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-serif text-brand-ink hover:text-brand-olive transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex gap-4 pt-4 border-t border-brand-ink/5">
              <button 
                onClick={() => user ? setIsUserMenuOpen(!isUserMenuOpen) : signInWithGoogle()}
                className="flex-1 flex items-center justify-center gap-2 py-3 border border-brand-ink/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-brand-ink"
              >
                <User size={16} /> {user ? user.displayName?.split(' ')[0] : t('nav.account')}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-brand-ink/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-brand-ink">
                <Heart size={16} /> {t('nav.wishlist')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
