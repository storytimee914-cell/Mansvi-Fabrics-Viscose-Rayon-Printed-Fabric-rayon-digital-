import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const logoImg = "https://lh3.googleusercontent.com/d/10TYY5GeFr4lgktnMLn7BO8lcU60gM2XL";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-brand-ink text-white py-20 px-6 overflow-hidden text-left">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img 
                src={logoImg} 
                alt="Mansvi Fabrics Logo" 
                className="w-24 h-24 rounded-xl border border-white/20 shadow-xl object-contain bg-[#f3ede4]"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-white/50 text-xs leading-relaxed mb-8 font-light">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-base mb-6 text-brand-primary">{t('footer.links.title')}</h4>
            <ul className="space-y-4 text-white/50 text-xs uppercase tracking-widest font-medium">
              <li><a href="#" className="hover:text-brand-primary transition-colors">Home</a></li>
              <li><a href="#story" className="hover:text-brand-primary transition-colors">{t('nav.products')}</a></li>
              <li><a href="#bulk" className="hover:text-brand-primary transition-colors">{t('nav.bulk')}</a></li>
              <li><a href="#contact" className="hover:text-brand-primary transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base mb-6 text-brand-primary">{t('footer.cats.title')}</h4>
            <ul className="space-y-4 text-white/50 text-xs uppercase tracking-widest font-medium">
              <li><a href="#products" className="hover:text-brand-primary transition-colors">Viscose Rayon</a></li>
              <li><a href="#products" className="hover:text-brand-primary transition-colors">Cotton Fabrics</a></li>
              <li><a href="#products" className="hover:text-brand-primary transition-colors">Digital Prints</a></li>
              <li><a href="#products" className="hover:text-brand-primary transition-colors">Procion Prints</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base mb-6 text-brand-primary">{t('footer.news.title')}</h4>
            <p className="text-white/50 text-xs mb-6 font-light">{t('footer.news.sub')}</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder={t('contact.label.email')}
                className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs outline-none focus:border-brand-primary transition-all w-full"
              />
              <button className="bg-brand-primary text-white px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-primary transition-all">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-[10px] uppercase tracking-widest">
          <p>© {currentYear} Mansvi Fabrics. {t('footer.copy')}</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
