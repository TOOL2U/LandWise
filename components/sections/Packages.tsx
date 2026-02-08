'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Check, TrendingUp } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';
import { PACKAGES } from '@/lib/packages';
import { Package } from '@/types/booking';
import BookingForm from '@/components/booking/BookingForm';


export default function Packages() {
  const { t } = useLanguage();
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isEarlyAccess, setIsEarlyAccess] = useState(true);

  // Check early access availability on mount
  useEffect(() => {
    async function checkEarlyAccess() {
      try {
        const response = await fetch('/api/early-access');
        if (response.ok) {
          const data = await response.json();
          setIsEarlyAccess(data.available);
        } else {
          // Default to true if API fails (not configured yet)
          setIsEarlyAccess(true);
        }
      } catch (error) {
        console.error('Failed to check early access:', error);
        // Default to true if fetch fails
        setIsEarlyAccess(true);
      }
    }
    checkEarlyAccess();
  }, []);

  const handleBookNow = (pkg: Package) => {
    setSelectedPackage(pkg);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 50, damping: 20 }
    }
  };

  return (
    <>
      {/* Booking Modal */}
      {selectedPackage && (
        <BookingForm
          selectedPackage={selectedPackage}
          isEarlyAccess={isEarlyAccess}
          onClose={() => setSelectedPackage(null)}
        />
      )}

      <section id="packages" className="section-padding relative bg-sand/30 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-forest/5 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-terracotta/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <p className="text-terracotta font-bold mb-3 tracking-widest uppercase text-xs sm:text-sm">
              {t.packages.sectionTitle}
            </p>
            <h2 className="heading-lg text-forest mb-6">
              {t.packages.heading}
            </h2>
            <p className="text-slate-grey text-lg leading-relaxed">
              {t.packages.subheading}
            </p>

            {/* Early Access Banner */}
            {isEarlyAccess && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                className="mt-8 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-terracotta/30 rounded-full px-6 py-2 shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
                <p className="text-terracotta font-bold text-sm">
                  Limited Early Access Pricing Available
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Package Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3 gap-8 lg:gap-10"
          >
            {PACKAGES.map((pkg) => {
              const price = isEarlyAccess ? pkg.earlyAccessPrice : pkg.standardPrice;
              const translatedName = t.packages[pkg.id].name;
              const translatedTagline = t.packages[pkg.id].tagline;
              const translatedFeatures = t.packages[pkg.id].features;

              return (
                <motion.div
                  key={pkg.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="h-full"
                >
                  <Card className="flex flex-col h-full bg-white border-none shadow-lg hover:shadow-2xl hover:shadow-forest/10 transition-all duration-300 rounded-2xl overflow-hidden group relative">

                    {/* Early Access Badge */}
                    {isEarlyAccess && (
                      <div className="absolute top-4 right-4 z-20">
                        <span className="bg-terracotta text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                          Save {(pkg.standardPrice - pkg.earlyAccessPrice).toLocaleString()} THB
                        </span>
                      </div>
                    )}

                    {/* Image Area */}
                    <div className="relative h-56 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-forest/10 group-hover:bg-forest/0 transition-colors duration-500 z-10" />
                      <Image
                        src={pkg.image}
                        alt={translatedName}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Content Area */}
                    <div className="p-8 flex-1 flex flex-col relative">

                      {/* Title & Tagline */}
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-forest tracking-tight mb-2 group-hover:text-terracotta transition-colors">
                          {translatedName}
                        </h3>
                        <p className="text-sm font-medium text-slate-grey/70 uppercase tracking-wide">
                          {translatedTagline}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="w-12 h-1 bg-sand/50 mb-6 group-hover:w-full group-hover:bg-terracotta/20 transition-all duration-500" />

                      {/* Features List */}
                      <ul className="space-y-4 mb-8 flex-1">
                        {translatedFeatures.map((feature: string, index: number) => (
                          <li key={index} className="flex items-start gap-3 text-sm text-slate-grey/90 leading-relaxed">
                            <div className="mt-0.5 min-w-[18px] h-[18px] rounded-full bg-forest/10 flex items-center justify-center group-hover:bg-terracotta/10 transition-colors">
                              <Check size={10} className="text-forest group-hover:text-terracotta transition-colors" strokeWidth={3} />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Pricing Section */}
                      <div className="mt-auto">
                        <div className="flex items-baseline gap-2 mb-6">
                          <span className="text-3xl lg:text-4xl font-bold text-forest font-montserrat tracking-tight">
                            {price.toLocaleString()}
                          </span>
                          <span className="text-sm font-medium text-slate-grey/60">THB</span>
                        </div>

                        {/* CTA Button */}
                        <Button
                          variant="primary"
                          className="w-full justify-center shadow-lg group-hover:shadow-xl group-hover:bg-forest group-hover:text-white transition-all duration-300 transform group-hover:scale-[1.02]"
                          onClick={() => handleBookNow(pkg)}
                        >
                          Select Package
                        </Button>

                        {isEarlyAccess && (
                          <p className="text-xs text-center text-slate-grey/50 mt-3 font-medium">
                            Standard Price: <span className="line-through">{pkg.standardPrice.toLocaleString()} THB</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Trust Indicator */}
          <div className="mt-16 text-center">
            <p className="text-slate-grey/60 text-sm max-w-xl mx-auto flex items-center justify-center gap-2">
              <Check className="text-forest w-4 h-4" />
              <span>All packages include initial consultation and site visit planning.</span>
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
