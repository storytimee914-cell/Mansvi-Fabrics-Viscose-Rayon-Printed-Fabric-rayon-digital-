import { motion } from 'motion/react';

interface MandalaDoodleProps {
  className?: string;
  size?: number;
  rotationDuration?: number;
  opacity?: number;
  imageUrl?: string;
}

export default function MandalaDoodle({ 
  className = "", 
  size = 400, 
  rotationDuration = 60,
  opacity = 0.07,
  imageUrl = "https://lh3.googleusercontent.com/d/1YaAsk0ou7-t_UP_RDWBmfth0ac6oNMmH"
}: MandalaDoodleProps) {
  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size, opacity }}
      animate={rotationDuration > 0 ? { rotate: 360 } : {}}
      transition={rotationDuration > 0 ? { 
        duration: rotationDuration, 
        repeat: Infinity, 
        ease: "linear" 
      } : {}}
    >
      <img 
        src={imageUrl} 
        alt=""
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
}
