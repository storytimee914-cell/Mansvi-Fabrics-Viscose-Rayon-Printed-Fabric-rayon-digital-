import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { MessageCircle, Package, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { WHATSAPP_NUMBER } from '../constants';
import MandalaDoodle from './MandalaDoodle';
import { useLanguage } from '../context/LanguageContext';

interface BulkOrderForm {
  name: string;
  firmName?: string;
  phone: string;
  fabricType: string;
  quantity: string;
  message: string;
}

export default function BulkOrder() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, reset } = useForm<BulkOrderForm>();

  const onSubmit = (data: BulkOrderForm) => {
    const message = encodeURIComponent(
      `Hello Mansvi Fabrics,\n\nI have a Bulk Order Inquiry:\n` +
      `*Name:* ${data.name}\n` +
      `*Firm:* ${data.firmName || 'N/A'}\n` +
      `*Phone:* ${data.phone}\n` +
      `*Fabric:* ${data.fabricType}\n` +
      `*Quantity:* ${data.quantity}\n` +
      `*Requirements:* ${data.message}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 5000);
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I am interested in Bulk Fabrics.`, '_blank');
  };

  return (
    <section id="bulk" className="relative py-24 px-6 bg-brand-primary text-white overflow-hidden text-left">
      {/* Background Mandala */}
      <MandalaDoodle 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grayscale invert brightness-200" 
        size={1200} 
        opacity={0.07} 
        rotationDuration={0} 
        imageUrl="https://lh3.googleusercontent.com/d/1yJC49rjqrFk0-3Wtjo2WaT_Tdx21IGHg"
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-white font-bold uppercase tracking-widest text-[10px] mb-4 block">Bulk Solutions</span>
            <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">
              {t('bulk.title')}
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-10 font-light">
              {t('bulk.subtitle')}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                <Package className="text-white mb-4" />
                <h4 className="font-serif text-lg mb-2">Global Shipping</h4>
                <p className="text-xs text-white/60">Reliable logistics for international and domestic bulk shipments.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                <MessageCircle className="text-white mb-4" />
                <h4 className="font-serif text-lg mb-2">Direct Support</h4>
                <p className="text-xs text-white/60">Dedicated account managers for seamless order processing.</p>
              </div>
            </div>

            <button
              onClick={handleWhatsApp}
              className="group bg-[#25D366] text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-[#25D366]/20"
            >
              <MessageCircle size={24} />
              Order via WhatsApp
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl text-brand-ink"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-xl font-serif mb-2">Inquiry Sent!</h3>
                <p className="text-brand-ink/60 text-sm">We'll get back to you with a quote shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h3 className="text-xl font-serif mb-6 text-brand-primary">Bulk Inquiry Form</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/60">{t('bulk.input.name')}</label>
                    <input
                      {...register('name', { required: true })}
                      className="w-full bg-brand-cream/30 border border-brand-ink/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/60">Phone Number</label>
                    <input
                      {...register('phone', { required: true })}
                      className="w-full bg-brand-cream/30 border border-brand-ink/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/60">{t('bulk.input.meters')}</label>
                    <input
                      {...register('quantity', { required: true })}
                      className="w-full bg-brand-cream/30 border border-brand-ink/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                      placeholder="e.g. 1000m"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/60">Fabric Type</label>
                    <select
                      {...register('fabricType', { required: true })}
                      className="w-full bg-brand-cream/30 border border-brand-ink/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all appearance-none"
                    >
                      <option value="">Select Fabric</option>
                      <option value="viscose">Viscose Rayon</option>
                      <option value="cotton">Cotton</option>
                      <option value="printed">Printed Rayon</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/60">Additional Requirements</label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    className="w-full bg-brand-cream/30 border border-brand-ink/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all resize-none"
                    placeholder="Any specific print or color requirements?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-primary text-white py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-ink transition-all shadow-lg shadow-brand-primary/20"
                >
                  <Send size={16} />
                  {t('bulk.cta')}
                </button>
                <p className="text-[10px] text-center text-brand-ink/40 italic">
                  {t('bulk.min')}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
