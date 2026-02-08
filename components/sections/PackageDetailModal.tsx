'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Clock, Users, Award, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Package } from '@/types/booking';
import { useLanguage } from '@/contexts/LanguageContext';

interface PackageDetailModalProps {
  package: Package;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
  isEarlyAccess: boolean;
}

export default function PackageDetailModal({ 
  package: pkg, 
  isOpen, 
  onClose, 
  onBookNow,
  isEarlyAccess 
}: PackageDetailModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const translatedPackage = t.packages[pkg.id] as any;
  const price = isEarlyAccess ? pkg.earlyAccessPrice : pkg.standardPrice;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl pb-20 md:pb-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-sand/30 px-6 py-4 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-forest">
                    {translatedPackage.name}
                  </h2>
                  <p className="text-sm text-slate-grey/70 mt-1">
                    {translatedPackage.tagline}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 md:p-2 rounded-full hover:bg-sand/30 transition-colors"
                >
                  <X className="w-6 h-6 md:w-5 md:h-5 text-slate-grey" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-10">
              
              {/* Section 1 - What You Receive */}
              {translatedPackage.deliverables && (
                <section className="bg-sand/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-forest mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5 text-terracotta" />
                    {translatedPackage.deliverables.title}
                  </h3>
                  <div className="grid gap-4">
                    {translatedPackage.deliverables.items.map((item: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-terracotta" strokeWidth={3} />
                        </div>
                        <p className="text-slate-grey leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Section 2 - What This Helps You Do (for visibility package) */}
              {translatedPackage.whatThisHelpsYouDo && (
                <section className="bg-forest/5 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-forest mb-6 flex items-center gap-2">
                    <Check className="w-5 h-5 text-terracotta" />
                    {translatedPackage.whatThisHelpsYouDo.title}
                  </h3>
                  <div className="grid gap-4">
                    {translatedPackage.whatThisHelpsYouDo.items.map((item: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-terracotta" strokeWidth={3} />
                        </div>
                        <p className="text-slate-grey leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Section 3 - How It Works */}
              {translatedPackage.howItWorks && (
                <section>
                  <h3 className="text-xl font-bold text-forest mb-8 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-terracotta" />
                    {translatedPackage.howItWorks.title}
                  </h3>
                  <div className="grid gap-6">
                    {translatedPackage.howItWorks.steps.map((step: any, index: number) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-terracotta text-white flex items-center justify-center font-bold text-sm">
                          {step.step}
                        </div>
                        <div className="pt-1">
                          <p className="text-slate-grey font-medium">{step.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="grid md:grid-cols-2 gap-10">
                {/* Section 4 - Who This Is For */}
                {translatedPackage.whoThisIsFor && (
                  <section>
                    <h3 className="text-xl font-bold text-forest mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-terracotta" />
                      {translatedPackage.whoThisIsFor.title}
                    </h3>
                    <div className="space-y-2">
                      {translatedPackage.whoThisIsFor.audience.map((item: string, index: number) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-terracotta flex-shrink-0" />
                          <p className="text-slate-grey">{item}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Section 5 - Why Choose LandWise OR Why Choose This Package */}
                {translatedPackage.whyChooseUs && (
                  <section>
                    <h3 className="text-xl font-bold text-forest mb-4">
                      {translatedPackage.whyChooseUs.title}
                    </h3>
                    <div className="space-y-2">
                      {translatedPackage.whyChooseUs.reasons.map((reason: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-forest flex-shrink-0" />
                          <p className="text-slate-grey">{reason}</p>
                        </div>
                      ))}
                      {translatedPackage.whyChooseUs.trustLine && (
                        <div className="pt-2 mt-3 border-t border-sand/30">
                          <p className="text-forest/80 text-sm font-medium italic">
                            {translatedPackage.whyChooseUs.trustLine}
                          </p>
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {/* Alternative: Why Choose This Package (for visibility) */}
                {translatedPackage.whyChooseThis && (
                  <section className="md:col-span-2">
                    <h3 className="text-xl font-bold text-forest mb-4">
                      {translatedPackage.whyChooseThis.title}
                    </h3>
                    <div className="bg-sand/20 rounded-lg p-4 space-y-3">
                      <p className="text-slate-grey leading-relaxed">
                        {translatedPackage.whyChooseThis.description}
                      </p>
                      {translatedPackage.whyChooseThis.additionalTrust && (
                        <p className="text-slate-grey leading-relaxed font-medium">
                          {translatedPackage.whyChooseThis.additionalTrust}
                        </p>
                      )}
                      {translatedPackage.whyChooseThis.trustLine && (
                        <p className="text-forest/80 text-sm font-medium italic">
                          {translatedPackage.whyChooseThis.trustLine}
                        </p>
                      )}
                    </div>
                  </section>
                )}
              </div>

              {/* Section 6 - Delivery Time */}
              {translatedPackage.deliveryTime && (
                <section className="bg-forest/5 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-forest mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-terracotta" />
                    {translatedPackage.deliveryTime.title}
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4 text-center">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-slate-grey font-medium">
                        {translatedPackage.deliveryTime.survey}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-slate-grey font-medium">
                        {translatedPackage.deliveryTime.processing}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-slate-grey font-medium">
                        {translatedPackage.deliveryTime.delivery}
                      </p>
                    </div>
                  </div>
                  {translatedPackage.deliveryTime.disclaimer && (
                    <p className="text-xs text-slate-grey/60 text-center mt-3 italic">
                      {translatedPackage.deliveryTime.disclaimer}
                    </p>
                  )}
                </section>
              )}

              {/* Section 7 - Final CTA */}
              <section className={`${pkg.id === 'ready' ? 'bg-gradient-to-r from-terracotta/10 via-forest/10 to-terracotta/10' : 'bg-gradient-to-r from-forest/10 to-terracotta/10'} rounded-xl p-6`}>
                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-3">
                      <span className={`text-3xl font-bold ${pkg.id === 'ready' ? 'text-terracotta' : 'text-forest'}`}>
                        {price.toLocaleString()}
                      </span>
                      <span className="text-lg text-slate-grey">THB</span>
                      {isEarlyAccess && (
                        <div className="px-3 py-1 bg-terracotta text-white text-xs font-bold rounded-full">
                          Save {(pkg.standardPrice - pkg.earlyAccessPrice).toLocaleString()} THB
                        </div>
                      )}
                    </div>
                    {isEarlyAccess && (
                      <p className="text-sm text-slate-grey/60">
                        Standard Price: <span className="line-through">{pkg.standardPrice.toLocaleString()} THB</span>
                      </p>
                    )}
                  </div>
                  
                  <Button
                    variant="primary"
                    className={`px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${pkg.id === 'ready' ? 'bg-gradient-to-r from-terracotta to-terracotta/90 hover:from-terracotta/90 hover:to-terracotta' : ''}`}
                    onClick={onBookNow}
                  >
                    {translatedPackage.ctaText || `Start My ${translatedPackage.name.includes('SNAPSHOT') ? 'Land Snapshot' : translatedPackage.name.includes('VISIBILITY') ? 'Land Report' : 'Package'}`}
                  </Button>

                  {translatedPackage.reassurance && (
                    <p className="text-sm text-slate-grey/70 italic mt-3">
                      {translatedPackage.reassurance}
                    </p>
                  )}
                </div>
              </section>
            </div>

            {/* Sticky Mobile CTA */}
            <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-sand/20 p-4 z-20">
              <Button
                variant="primary"
                className="w-full justify-center py-4 text-lg font-semibold shadow-lg"
                onClick={onBookNow}
              >
                {translatedPackage.ctaText || `Start My ${translatedPackage.name.includes('SNAPSHOT') ? 'Land Snapshot' : translatedPackage.name.includes('VISIBILITY') ? 'Land Report' : 'Package'}`}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}