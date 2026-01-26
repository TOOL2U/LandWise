'use client';

import Image from 'next/image';
import { MessageCircle, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { getWhatsAppLink } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-start pt-16 sm:pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/01_hero.png"
          alt="Ko Pha Ngan landscape"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Mobile-optimized gradient - stronger on mobile for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/60 to-white/20 sm:from-white/90 sm:via-white/40 sm:to-transparent"></div>
      </div>

      {/* Content - Mobile First */}
      <div className="relative z-10 w-full px-6 py-12 sm:px-8 sm:py-20 md:pl-16 mt-60 lg:pl-60">
        <div className="max-w-full sm:max-w-2xl">
          {/* Headline - Responsive sizing */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mt-60 font-normal tracking-tight text-charcoal mb-6 leading-tight">
            {t.hero.title}<br />
            {t.hero.subtitle}
          </h1>
          
          {/* Subheadline - Perfect mobile sizing */}
          <p className="text-base sm:text-lg md:text-xl text-charcoal/80 mb-8 leading-relaxed max-w-md sm:max-w-xl">
            {t.hero.description}
          </p>

          {/* CTA Button - Full width on mobile */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="primary" 
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.hero.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
