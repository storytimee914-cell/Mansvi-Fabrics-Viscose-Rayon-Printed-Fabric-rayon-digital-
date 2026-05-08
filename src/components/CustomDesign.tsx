import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { Upload, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { WHATSAPP_NUMBER } from '../constants';
import { useLanguage } from '../context/LanguageContext';

interface CustomDesignForm {
  name: string;
  email: string;
  fabricType: string;
  description: string;
  file: FileList;
}

export default function CustomDesign() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, reset } = useForm<CustomDesignForm>();

  const onSubmit = (data: CustomDesignForm) => {
    const message = encodeURIComponent(
      `Hello Mansvi Fabrics,\n\nI have a Custom Design Inquiry:\n` +
      `*Name:* ${data.name}\n` +
      `*Email:* ${data.email}\n` +
      `*Fabric Base:* ${data.fabricType}\n` +
      `*Description:* ${data.description}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 5000);
  };

  return (
    <section id="custom" className="py-12 px-6 bg-white text-left">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/5"
          >
            <span className="text-brand-secondary font-bold uppercase tracking-widest text-[10px] mb-2 block">Bespoke Services</span>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-ink mb-4">{t('custom.title')}</h2>
            <p className="text-brand-ink/70 text-base leading-relaxed mb-6 font-light">
              {t('custom.subtitle')}
            </p>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {[
                t('custom.step1'),
                t('custom.step2'),
                t('custom.step3')
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-brand-ink/80 text-sm">
                  <CheckCircle2 className="text-brand-primary shrink-0" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-3/5 w-full bg-brand-primary/5 p-6 md:p-8 rounded-[1.5rem] shadow-sm border border-brand-primary/10"
          >
            {isSubmitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-serif text-brand-ink mb-1">Inquiry Received!</h3>
                <p className="text-sm text-brand-ink/60">We'll contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase underline tracking-widest text-brand-ink/60">Name</label>
                    <input
                      {...register('name', { required: true })}
                      className="w-full bg-white border border-brand-ink/10 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase underline tracking-widest text-brand-ink/60">Email</label>
                    <input
                      {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                      className="w-full bg-white border border-brand-ink/10 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                      placeholder="Email Address"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase underline tracking-widest text-brand-ink/60">Fabric Base</label>
                    <select
                      {...register('fabricType', { required: true })}
                      className="w-full bg-white border border-brand-ink/10 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all appearance-none"
                    >
                      <option value="">Select Fabric Type</option>
                      <option value="viscose">Viscose Rayon</option>
                      <option value="cotton">Cotton</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase underline tracking-widest text-brand-ink/60">Upload Artwork</label>
                    <div className="relative group">
                      <input type="file" {...register('file')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <div className="w-full border-2 border-dashed border-brand-ink/10 rounded-lg p-2 flex items-center justify-center gap-2 group-hover:border-brand-primary transition-colors">
                        <Upload size={16} className="text-brand-ink/40 group-hover:text-brand-primary" />
                        <span className="text-[10px] text-brand-ink/60">Upload design file</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase underline tracking-widest text-brand-ink/60">Design Requirements</label>
                  <textarea
                    {...register('description', { required: true })}
                    rows={2}
                    className="w-full bg-white border border-brand-ink/10 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all resize-none"
                    placeholder="Briefly describe your vision..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-primary text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-ink transition-all shadow-md shadow-brand-primary/20"
                >
                  <Send size={14} />
                  {t('custom.cta')}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
