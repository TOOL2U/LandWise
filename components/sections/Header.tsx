'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Globe } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Responsive sizing */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/assets/logo chatgpt.png"
                alt="LandWise Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-semibold text-forest tracking-tight">LANDWISE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="#packages" className="text-sm lg:text-base text-charcoal hover:text-forest transition-colors font-medium">
              {t.nav.packages}
            </Link>
            <Link href="#deliverables" className="text-sm lg:text-base text-charcoal hover:text-forest transition-colors font-medium">
              {t.nav.deliverables}
            </Link>
            <Link href="#contact" className="text-sm lg:text-base text-charcoal hover:text-forest transition-colors font-medium">
              {t.nav.contact}
            </Link>
           

            <Button variant="primary" size="md" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.nav.getQuote}
            </Button>
             
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-forest font-medium text-white hover:text-forest transition-colors border border-sand rounded-lg hover:border-forest"
              aria-label="Switch language"
            >
              <Globe size={16} />
              <span>{language === 'en' ? 'ไทย' : 'EN'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-forest hover:bg-forest/5 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation - Smooth, clean dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-sand/30 pt-4">
            <Link 
              href="#packages" 
              className="text-base text-charcoal hover:text-forest transition-colors font-medium py-3 px-2 hover:bg-sand/20 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.packages}
            </Link>
            <Link 
              href="#deliverables" 
              className="text-base text-charcoal hover:text-forest transition-colors font-medium py-3 px-2 hover:bg-sand/20 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.deliverables}
            </Link>
            <Link 
              href="#contact" 
              className="text-base text-charcoal hover:text-forest transition-colors font-medium py-3 px-2 hover:bg-sand/20 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.contact}
            </Link>
            
            {/* Language Switcher Mobile */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center gap-2 px-4 py-3 text-base font-medium text-charcoal hover:text-forest transition-colors border border-sand rounded-lg hover:border-forest hover:bg-sand/20"
            >
              <Globe size={18} />
              <span>{language === 'en' ? 'ภาษาไทย' : 'English'}</span>
            </button>

            <Button 
              variant="primary" 
              size="md" 
              className="w-full mt-2"
              onClick={() => {
                setIsMenuOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t.nav.getQuote}
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
