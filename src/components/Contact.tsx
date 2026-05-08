import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER, EMAIL, PHONE } from '../constants';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-24 px-6 bg-white text-left">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-secondary font-bold uppercase tracking-widest text-[10px] mb-4 block">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-ink mb-8 leading-tight">
              {t('contact.title')}
            </h2>
            <p className="text-brand-ink/70 text-base mb-10 leading-relaxed font-light">
              {t('contact.subtitle')}
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 mb-1">{t('contact.loc.phone')}</p>
                  <a href={`tel:${PHONE.replace(/\s+/g, '')}`} className="text-xl font-serif text-brand-ink hover:text-brand-primary transition-colors">{PHONE}</a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 mb-1">{t('contact.loc.email')}</p>
                  <a href={`mailto:${EMAIL}`} className="text-xl font-serif text-brand-ink hover:text-brand-primary transition-colors">{EMAIL}</a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 mb-1">{t('contact.loc.title')}</p>
                  <p className="text-xl font-serif text-brand-ink">{t('contact.loc.addr')}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center lg:text-left">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-[#25D366]/20"
              >
                <MessageCircle size={24} />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="h-full min-h-[450px] rounded-[2rem] overflow-hidden shadow-2xl border border-brand-ink/5">
              {/* Placeholder for Map */}
              <div className="w-full h-full bg-brand-cream relative">
                <img
                  src="https://lh3.googleusercontent.com/d/1zy8I6bmODOm7UyI55eZMPTXxeBpdqBoe"
                  alt="Our Production Facility"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-olive text-white rounded-full flex items-center justify-center">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-brand-ink">Mansvi Fabrics HQ</h4>
                      <p className="text-xs text-brand-ink/60 uppercase tracking-widest">Balotra, Rajasthan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
