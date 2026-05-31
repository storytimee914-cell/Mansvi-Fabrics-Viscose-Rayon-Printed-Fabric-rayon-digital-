import { motion } from 'motion/react';
import { Leaf, Award, Users, ChevronRight, Factory, Globe, FlaskConical } from 'lucide-react';
import MandalaDoodle from './MandalaDoodle';
import { useLanguage } from '../context/LanguageContext';
import ElectricBorder from './ui/ElectricBorder';

export default function Story() {
  const { t } = useLanguage();
  
  const values = [
    {
      icon: <Factory className="text-brand-gold" />,
      title: t('why.f1.title'),
      desc: t('why.f1.desc')
    },
    {
      icon: <Globe className="text-brand-gold" />,
      title: t('why.f2.title'),
      desc: t('why.f2.desc')
    },
    {
      icon: <FlaskConical className="text-brand-gold" />,
      title: t('why.f3.title'),
      desc: t('why.f3.desc')
    },
    {
      icon: <Leaf className="text-brand-gold" />,
      title: t('why.f4.title'),
      desc: t('why.f4.desc')
    }
  ];

  return (
    <section id="story" className="relative py-24 px-6 bg-white overflow-hidden">
      {/* Corner Mandala Decor */}
      <MandalaDoodle 
        className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 grayscale opacity-70" 
        size={900} 
        opacity={0.07} 
        rotationDuration={0} 
        imageUrl="https://lh3.googleusercontent.com/d/17QLsFc2ZOQRYXCaVQrkLBgb3SnsoKZJt"
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block px-4 py-1.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-full text-[10px] font-bold uppercase tracking-[0.3em]">
                {t('story.label')}
              </span>
              <span className="w-1 h-1 rounded-full bg-brand-primary/30" />
              <span className="inline-block px-4 py-1.5 bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary rounded-full text-[10px] font-bold uppercase tracking-[0.3em]">
                {t('why.label')}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-ink mb-8 leading-tight">
              {t('story.title')}
            </h2>
            <div className="space-y-6 text-brand-ink/70 leading-relaxed text-sm text-justify">
              <p>{t('story.p1')}</p>
              <p>{t('story.p3')}</p>
              <div className="pt-4 space-y-2">
                <p className="font-bold text-brand-ink">{t('story.owners')}</p>
                <p className="font-bold text-brand-ink">{t('story.director')}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-12 mb-10">
              {values.map((value, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <div className="scale-75">
                      {value.icon}
                    </div>
                  </div>
                  <h4 className="font-serif font-bold text-brand-ink text-[11px] leading-tight">{value.title}</h4>
                  <p className="text-[9px] text-brand-ink/60 leading-tight uppercase tracking-wider">{value.desc}</p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-widest border-b-2 border-brand-primary pb-1 hover:gap-4 transition-all"
            >
              {t('story.cta')}
              <ChevronRight size={14} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative group">
              <img
                src="https://lh3.googleusercontent.com/d/1qOwuW_z_syvSL-F8K8g1j-WDXhpuZFnA"
                alt="Mansvi Fabrics Heritage"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-secondary/5 rounded-full blur-3xl -z-10" />
            
            <div className="absolute -bottom-6 -right-6 hidden md:block z-20">
              <ElectricBorder
                color="#C5A880"
                speed={1.2}
                chaos={0.15}
                borderRadius={16}
                className="bg-brand-primary text-white p-8 shadow-xl"
              >
                <p className="text-4xl font-serif font-bold mb-1">40+</p>
                <p className="text-xs uppercase tracking-widest opacity-80">Years of Expertise</p>
              </ElectricBorder>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
