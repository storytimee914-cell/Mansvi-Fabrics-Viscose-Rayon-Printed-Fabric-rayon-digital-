import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Bestsellers() {
  const { t } = useLanguage();
  const bestsellers = PRODUCTS.slice(0, 4);

  const handleQuickView = (productId: string) => {
    const event = new CustomEvent('open-product-quickview', {
      detail: { productId }
    });
    window.dispatchEvent(event);
  };

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-xl text-left">
            <span className="text-brand-secondary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">{t('reviews.label')}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-ink leading-tight">
              {t('bestsellers.title')}
            </h2>
            <p className="mt-4 text-brand-ink/60 font-light max-w-md">{t('bestsellers.subtitle')}</p>
          </div>
          <a href="#products" className="flex items-center gap-2 text-brand-primary font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all">
            {t('hero.cta.view')} <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleQuickView(product.id)}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-xl group-hover:shadow-brand-primary/10 transition-all">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-ink/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickView(product.id);
                    }}
                    className="w-full bg-white text-brand-ink py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-secondary hover:text-white transition-colors cursor-pointer"
                  >
                    <ShoppingBag size={14} /> Quick View
                  </button>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-secondary text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-md shadow-lg">
                    Bestseller
                  </span>
                </div>
              </div>
              <h4 className="font-serif text-lg text-brand-ink font-bold mb-1 group-hover:text-brand-primary transition-colors">{product.name}</h4>
              <p className="text-[10px] uppercase tracking-widest text-brand-ink/40">{product.category} Fabric</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
