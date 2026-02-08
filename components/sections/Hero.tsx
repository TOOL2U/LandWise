'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { getWhatsAppLink } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';


export default function Hero() {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]); // Parallax effect

  return (
    <section className="relative min-h-screen flex items-center justify-start pt-16 sm:pt-20 overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, filter: "blur(10px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 1.5,
            ease: "easeOut"
          }}
        >
          <Image
            src="/assets/hero_v2.png"
            alt="LandWise Hero"
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />
        </motion.div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent sm:via-white/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 py-12 sm:px-8 sm:py-20 md:pl-16 lg:pl-60">
        <div className="max-w-full sm:max-w-2xl">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-forest mb-6 leading-[1.1]">
              {t.hero.title}<br />
              <span className="text-terracotta">{t.hero.subtitle}</span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <p className="text-lg sm:text-xl md:text-2xl text-charcoal/80 mb-8 leading-relaxed max-w-md sm:max-w-xl font-light">
              {t.hero.description}
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-forest to-terracotta shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10">{t.hero.cta}</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
