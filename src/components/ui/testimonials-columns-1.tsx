"use client";
import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
  rating?: number;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role, rating = 5 }, i) => (
                <div 
                  className="p-6 rounded-2xl border border-brand-ink/5 bg-white shadow-sm hover:shadow-md transition-all duration-300 max-w-xs w-full text-left flex flex-col justify-between" 
                  key={`${index}-${i}`}
                >
                  <div>
                    {/* Google badge & star rating */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-0.5">
                        {[...Array(rating)].map((_, idx) => (
                          <Star key={idx} size={11} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="flex items-center gap-1 bg-brand-primary/[0.04] px-1.5 py-0.5 rounded-full border border-brand-primary/10">
                        <span className="w-2 h-2 rounded-full bg-blue-500 flex items-center justify-center text-[5px] font-bold text-white font-sans ring-1 ring-blue-200">G</span>
                        <span className="text-[7px] text-brand-ink/40 font-semibold uppercase tracking-wider">Google</span>
                      </div>
                    </div>
                    <div className="text-xs text-brand-ink/75 italic leading-relaxed">
                      {text}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-brand-ink/[0.04]">
                    <img
                      width={32}
                      height={32}
                      src={image}
                      alt={name}
                      className="h-8 w-8 rounded-full object-cover border border-brand-primary/10"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col min-w-0">
                      <div className="font-serif font-bold text-brand-ink text-[11px] leading-tight truncate">{name}</div>
                      <div className="text-[9px] text-brand-ink/40 font-medium uppercase tracking-wider leading-none mt-0.5 truncate">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
