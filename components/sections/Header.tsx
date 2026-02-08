'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set scrolled state for styling
      setScrolled(currentScrollY > 50);

      // Auto-hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItemVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  const mobileMenuVariants: Variants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const mobileItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-forest/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-lg'
          : 'bg-white/95 backdrop-blur-sm shadow-sm'
          }`}
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <nav className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-4'
          }`}>
          <div className="flex items-center justify-between">
            {/* Logo - Text only with brand font */}
            <Link href="/" className="group">
              <motion.span
                className={`font-bold text-forest tracking-tight font-montserrat transition-all duration-300 ${scrolled
                  ? 'text-2xl sm:text-3xl md:text-4xl'
                  : 'text-3xl sm:text-4xl md:text-5xl'
                  }`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                LandWise
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {[
                { href: '#packages', label: t.nav.packages },
                { href: '#deliverables', label: t.nav.deliverables },
                { href: '#contact', label: t.nav.contact }
              ].map((item, i) => (
                <motion.div
                  key={item.href}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                >
                  <Link
                    href={item.href}
                    className="relative text-sm lg:text-base text-slate-grey hover:text-terracotta transition-colors font-semibold group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-terracotta transition-all duration-300 group-hover:w-full group-hover:left-0" />
                  </Link>
                </motion.div>
              ))}

              {/* CTA Button with gradient */}
              <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="primary"
                    size="md"
                    className="bg-gradient-to-r from-forest to-terracotta hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <span className="relative z-10">{t.nav.getQuote}</span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Language Switcher */}
              <motion.div
                custom={4}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <motion.button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-forest font-semibold text-white rounded-lg hover:bg-terracotta transition-all duration-300 shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Switch language"
                >
                  <motion.div
                    animate={{ rotate: language === 'en' ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Globe size={16} />
                  </motion.div>
                  <span>{language === 'en' ? 'ไทย' : 'EN'}</span>
                </motion.button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-forest hover:bg-forest/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Navigation - Animated dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden overflow-hidden"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={mobileMenuVariants}
              >
                <div className="mt-4 pb-4 flex flex-col gap-2 border-t border-sand/30 pt-4">
                  {[
                    { href: '#packages', label: t.nav.packages },
                    { href: '#deliverables', label: t.nav.deliverables },
                    { href: '#contact', label: t.nav.contact }
                  ].map((item) => (
                    <motion.div key={item.href} variants={mobileItemVariants}>
                      <Link
                        href={item.href}
                        className="block text-base text-slate-grey hover:text-terracotta transition-colors font-semibold py-3 px-4 hover:bg-sand/20 rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Language Switcher Mobile */}
                  <motion.div variants={mobileItemVariants}>
                    <button
                      onClick={() => {
                        toggleLanguage();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-slate-grey hover:text-terracotta transition-colors border border-sand rounded-lg hover:border-terracotta hover:bg-sand/20"
                    >
                      <Globe size={18} />
                      <span>{language === 'en' ? 'ภาษาไทย' : 'English'}</span>
                    </button>
                  </motion.div>

                  <motion.div variants={mobileItemVariants}>
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full mt-2 bg-gradient-to-r from-forest to-terracotta shadow-lg"
                      onClick={() => {
                        setIsMenuOpen(false);
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {t.nav.getQuote}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  );
}
