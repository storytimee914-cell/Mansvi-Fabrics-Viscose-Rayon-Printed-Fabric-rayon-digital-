import { Truck, ShieldCheck, Palette, BadgePercent, Clock, Factory, Globe, FlaskConical } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function TrustBar() {
  const { t } = useLanguage();
  
  const items = [
    { icon: <Clock size={24} />, title: t('trust.legacy'), desc: 'Since 1984' },
    { icon: <Factory size={24} />, title: t('trust.direct'), desc: 'No Middlemen' },
    { icon: <Globe size={24} />, title: t('trust.export'), desc: 'Worldwide' },
    { icon: <FlaskConical size={24} />, title: t('trust.custom'), desc: 'Design Lab' },
  ];

  return (
    <div className="bg-white border-b border-brand-ink/5 py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 group"
          >
            <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
              {item.icon}
            </div>
            <div>
              <h4 className="font-serif font-bold text-brand-ink text-sm group-hover:text-brand-primary transition-colors">{item.title}</h4>
              <p className="text-[10px] uppercase tracking-widest text-brand-ink/40">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
