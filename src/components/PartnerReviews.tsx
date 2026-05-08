import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function PartnerReviews() {
  const { t } = useLanguage();
  const logos = [
    "1To9qPOfXWOQs0xarzQlXI7l4L9qp3ROx",
    "1L08H0PKFtbVEXk0wiJBD6J41jcinSyBI",
    "1rHT9nf04G0CeEzzQ7vfUPYdQ7WFD8wZt",
    "1ZCAdobzp4ugKF2EsD9RYG4d-iULKfKev"
  ].map(id => `https://lh3.googleusercontent.com/d/${id}`);

  const reviews = [
    {
      author: "Aditya Sharma",
      company: "FabIndia Export Hub",
      text: "Exceptional quality of Viscose Rayon. We've been sourcing bulk fabric for our boutique collections for 2 years now. Highly recommended for bulk projects.",
      rating: 5
    },
    {
      author: "Rajesh Mehra",
      company: "Global Textile House",
      text: "The digital prints are sharp and vibrant. Mansvi Fabrics has the best infrastructure in Balotra for custom designs. Truly professional team.",
      rating: 5
    },
    {
      author: "Priya V.",
      company: "The Kurti Studio",
      text: "Prompt delivery and excellent color fastness. Their cotton blends are perfect for high-end resort wear. A trusted partner in our growth.",
      rating: 5
    }
  ];

  return (
    <section className="bg-brand-primary/[0.02] py-12 px-6 border-b border-brand-ink/5 text-left">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-12">
          {/* Trusted By Logos - Horizontal Row */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-ink/40 mb-8 text-center lg:text-left">
              {t('reviews.label')}
            </p>
            <div className="flex flex-nowrap items-center justify-center lg:justify-start gap-8 md:gap-20 overflow-x-auto no-scrollbar">
              {logos.map((logo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-center h-14 md:h-20"
                >
                  <img 
                    src={logo} 
                    alt="Partner Logo" 
                    className="h-full w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Realistic Reviews */}
          <div>
            <div className="grid md:grid-cols-3 gap-4">
              {reviews.map((review, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="bg-white p-5 rounded-xl border border-brand-ink/5 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-[#4285F4] rounded-full flex items-center justify-center">
                        <span className="text-[6px] font-bold text-white">G</span>
                      </div>
                      <span className="text-[8px] text-brand-ink/30 font-medium">{t('verified')}</span>
                    </div>
                  </div>
                  {/* ... rest of review card ... */}
                  <p className="text-xs text-brand-ink/70 italic mb-4 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all">
                    "{review.text}"
                  </p>
                  <div className="border-t border-brand-ink/5 pt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center text-[10px] font-bold text-brand-primary">
                        {review.author[0]}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-brand-ink leading-none mb-1">{review.author}</p>
                        <p className="text-[9px] text-brand-ink/40 font-medium uppercase tracking-wider leading-none">{review.company}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 flex items-center justify-center lg:justify-end gap-2 text-brand-ink/40">
              <div className="flex -space-x-1">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-4 h-4 rounded-full border border-white bg-gray-200" />
                ))}
              </div>
              <span className="text-[10px] font-medium tracking-tight">{t('reviews.stat')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
