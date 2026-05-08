import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../constants';
import { cn } from '../lib/utils';
import { ZoomIn, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Products() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'viscose' | 'cotton' | 'printed' | 'kaftan' | 'palazzo'>('all');
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);

  const filteredProducts = filter === 'all' 
    ? PRODUCTS.filter(p => p.category !== 'kaftan' && p.category !== 'palazzo')
    : PRODUCTS.filter(p => p.category === filter);

  const categories = [
    { id: 'all', name: t('cat.all') },
    { id: 'viscose', name: t('cat.viscose') },
    { id: 'cotton', name: t('cat.cotton') },
    { id: 'printed', name: t('cat.printed') },
    { id: 'kaftan', name: t('cat.kaftan') },
    { id: 'palazzo', name: t('cat.palazzo') },
  ];

  return (
    <section id="products" className="py-24 px-6 bg-brand-bg text-left">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-secondary font-bold uppercase tracking-widest text-[10px] mb-4 block">{t('products.label')}</span>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-ink mb-6">{t('products.title')}</h2>
          <p className="text-brand-ink/60 max-w-2xl mx-auto text-lg font-light">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={cn(
                'px-6 py-2 rounded-full text-sm font-medium transition-all border',
                filter === cat.id 
                  ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                  : 'bg-brand-cream border-brand-ink/10 text-brand-ink/60 hover:border-brand-primary hover:text-brand-primary'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brand-primary/10 transition-all border border-white/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#060505]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-ink hover:bg-brand-secondary hover:text-white transition-colors"
                    >
                      <ZoomIn size={20} />
                    </button>
                  </div>
                  {product.printType && (
                    <span className="absolute top-4 left-4 bg-brand-secondary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                      {product.printType} {t('product.print')}
                    </span>
                  )}
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif text-brand-ink font-bold mb-3 group-hover:text-brand-primary transition-colors">
                    {t(`prod.${product.id}.name`) !== `prod.${product.id}.name` ? t(`prod.${product.id}.name`) : product.name}
                  </h3>
                  <p className="text-brand-ink/60 text-sm mb-6 line-clamp-2 leading-relaxed font-light">
                    {t(`prod.${product.id}.desc`) !== `prod.${product.id}.desc` ? t(`prod.${product.id}.desc`) : product.description}
                  </p>
                  
                  {/* Color Swatches */}
                  <div className="flex gap-2 mb-6">
                    {['#A3C1DA', '#D81B60', '#BF360C', '#81C784'].map((color, i) => (
                      <div 
                        key={i} 
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm ring-1 ring-white/10"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.usage.map((u, i) => (
                      <span key={i} className="text-[10px] bg-brand-primary/5 text-brand-primary px-2 py-1 rounded-md font-medium uppercase tracking-wider">
                        {t(`usage.${u.toLowerCase().replace(/\s+/g, '')}`) !== `usage.${u.toLowerCase().replace(/\s+/g, '')}` ? t(`usage.${u.toLowerCase().replace(/\s+/g, '')}`) : u}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Product Modal */}
      <AnimatePresence mode="wait">
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-brand-ink/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <div className="md:w-1/2 aspect-square md:aspect-auto">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 text-brand-ink/40 hover:text-brand-ink transition-colors"
                >
                  <X size={24} />
                </button>
                <span className="text-brand-secondary font-bold uppercase tracking-widest text-[10px] mb-4 block">
                  {t(`cat.${selectedProduct.category}`)} {t('product.print')}
                </span>
                <h2 className="text-4xl font-serif text-brand-ink mb-6">
                  {t(`prod.${selectedProduct.id}.name`) !== `prod.${selectedProduct.id}.name` ? t(`prod.${selectedProduct.id}.name`) : selectedProduct.name}
                </h2>
                <p className="text-brand-ink/70 text-lg mb-8 leading-relaxed font-light">
                  {t(`prod.${selectedProduct.id}.desc`) !== `prod.${selectedProduct.id}.desc` ? t(`prod.${selectedProduct.id}.desc`) : selectedProduct.description}
                </p>
                
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-[1px] flex-1 bg-brand-ink/10" />
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-ink/40 whitespace-nowrap">{t('product.colors')}</h4>
                    <div className="h-[1px] flex-1 bg-brand-ink/10" />
                  </div>
                  <div className="flex justify-center gap-4">
                    {[
                      { color: '#A3C1DA', name: 'Sky' },
                      { color: '#D81B60', name: 'Berry' },
                      { color: '#BF360C', name: 'Rust' },
                      { color: '#81C784', name: 'Sage' }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div 
                          className="w-12 h-12 rounded-full border-2 border-white shadow-md ring-1 ring-brand-ink/5"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-[8px] font-bold uppercase tracking-widest text-brand-ink/30">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-brand-ink/40 mb-4">{t('product.usage')}</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProduct.usage.map((u, i) => (
                      <span key={i} className="bg-brand-cream text-brand-primary px-4 py-2 rounded-xl text-sm font-medium">
                        {t(`usage.${u.toLowerCase().replace(/\s+/g, '')}`) !== `usage.${u.toLowerCase().replace(/\s+/g, '')}` ? t(`usage.${u.toLowerCase().replace(/\s+/g, '')}`) : u}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <a
                    href="#bulk"
                    onClick={() => setSelectedProduct(null)}
                    className="w-full bg-brand-primary text-white py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-brand-ink transition-all shadow-lg shadow-brand-primary/20"
                  >
                    {t('product.cta')}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
