import { motion } from 'motion/react';
import { ShieldCheck, Palette, Settings, DollarSign, Factory, Globe, FlaskConical, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhyChooseUs() {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <Factory className="w-8 h-8" />,
      title: t('why.f1.title'),
      desc: t('why.f1.desc')
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('why.f2.title'),
      desc: t('why.f2.desc')
    },
    {
      icon: <FlaskConical className="w-8 h-8" />,
      title: t('why.f3.title'),
      desc: t('why.f3.desc')
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: t('why.f4.title'),
      desc: t('why.f4.desc')
    }
  ];

  return (
    <section className="py-16 px-6 bg-brand-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-brand-secondary font-bold uppercase tracking-widest text-[10px] mb-2 block">{t('why.label')}</span>
          <h2 className="text-3xl md:text-4xl font-serif text-brand-ink mb-4">{t('why.title')}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-brand-ink/5 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary mb-4 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                <div className="scale-75">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-base font-serif text-brand-ink mb-2 group-hover:text-brand-primary transition-colors font-bold">{feature.title}</h3>
              <p className="text-brand-ink/60 text-[10px] leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
