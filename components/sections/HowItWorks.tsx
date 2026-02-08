'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Scan, BarChart3, FileCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  const steps = [
    {
      number: 1,
      icon: MapPin,
      title: t.howItWorks.steps[0].title,
      description: t.howItWorks.steps[0].description,
    },
    {
      number: 2,
      icon: Scan,
      title: t.howItWorks.steps[1].title,
      description: t.howItWorks.steps[1].description,
    },
    {
      number: 3,
      icon: BarChart3,
      title: t.howItWorks.steps[2].title,
      description: t.howItWorks.steps[2].description,
    },
    {
      number: 4,
      icon: FileCheck,
      title: t.howItWorks.steps[3].title,
      description: t.howItWorks.steps[3].description,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <section id="how-it-works" ref={containerRef} className="py-20 md:py-32 relative bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          style={{ opacity, scale }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-forest mb-4">
            {t.howItWorks.title}
          </h2>
          <p className="text-lg md:text-xl text-forest/70 max-w-3xl mx-auto">
            {t.howItWorks.subtitle}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            
            return (
              <motion.div
                key={step.number}
                variants={stepVariants}
                className="relative text-center group"
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.1
                }}
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-clay/30 to-transparent -translate-y-1/2 z-0" />
                )}

                <div className="relative mb-6 inline-block">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-clay to-clay/80 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {step.number}
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-forest rounded-full flex items-center justify-center shadow-md"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <IconComponent className="w-4 h-4 text-white" />
                  </motion.div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-forest group-hover:text-clay transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-forest/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-forest/60 text-sm md:text-base font-medium">
            {t.howItWorks.timeline}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
