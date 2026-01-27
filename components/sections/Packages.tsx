'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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

      <section id="packages" className="section-padding relative bg-sand/20">
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "url('/assets/207_Clay Lime Plaster pbr texture-seamless-1.jpg')",
            backgroundSize: '600px 600px',
            backgroundRepeat: 'repeat'
          }}
        />
      </div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sky font-semibold mb-2 tracking-wide uppercase text-sm">{t.packages.sectionTitle}</p>
          <h2 className="heading-lg text-forest mb-4">
            {t.packages.heading}
          </h2>
          <h3 className="heading-md text-charcoal/70">
            {t.packages.subheading}
          </h3>
          
          {/* Early Access Banner */}
          {isEarlyAccess && (
            <div className="mt-6 inline-block bg-sky/10 border border-sky rounded-lg px-6 py-3">
              <p className="text-sky font-semibold">
                ⭐ Early Access Pricing - First 10 Clients Only
              </p>
            </div>
          )}
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg) => {
            const price = isEarlyAccess ? pkg.earlyAccessPrice : pkg.standardPrice;
            const translatedName = t.packages[pkg.id].name;
            const translatedTagline = t.packages[pkg.id].tagline;
            const translatedFeatures = t.packages[pkg.id].features;

            return (
              <Card key={pkg.id} hover className="flex flex-col">
                {/* Early Access Badge */}
                {isEarlyAccess && (
                  <div className="bg-sky text-white px-4 py-2 text-sm font-semibold text-center">
                    <TrendingUp className="inline mr-1" size={16} />
                    Early Access
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 w-full bg-sand/30">
                  <Image
                    src={pkg.image}
                    alt={translatedName}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-sm font-bold text-forest tracking-wider mb-2">
                    {translatedName}
                  </h3>
                  <p className="heading-sm text-charcoal mb-4">
                    {translatedTagline}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6 flex-1">
                    {translatedFeatures.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-charcoal/80">
                        <Check size={18} className="text-sky flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="border-t border-sand pt-4 mb-4">
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-forest">
                        {price.toLocaleString()} THB
                      </p>
                      {isEarlyAccess && (
                        <p className="text-sm text-charcoal/50 line-through">
                          {pkg.standardPrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                    {isEarlyAccess && (
                      <p className="text-xs text-sky font-semibold mt-1">
                        Save {(pkg.standardPrice - pkg.earlyAccessPrice).toLocaleString()} THB
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <Button 
                    variant="primary"
                    className="w-full"
                    onClick={() => handleBookNow(pkg)}
                  >
                    Book Now
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
}
