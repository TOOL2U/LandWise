'use client';

import Image from 'next/image';
import { Check, TrendingUp } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Packages() {
  const { t } = useLanguage();

  const packages = [
    {
      id: 'snapshot',
      name: t.packages.snapshot.name,
      tagline: t.packages.snapshot.tagline,
      image: '/assets/package 1.png',
      price: t.packages.snapshot.price,
      features: t.packages.snapshot.features,
      popular: false,
    },
    {
      id: 'visibility',
      name: t.packages.visibility.name,
      tagline: t.packages.visibility.tagline,
      image: '/assets/package 2.png',
      price: t.packages.visibility.price,
      features: t.packages.visibility.features,
      popular: true,
    },
    {
      id: 'ready',
      name: t.packages.ready.name,
      tagline: t.packages.ready.tagline,
      image: '/assets/package 3.png',
      price: t.packages.ready.price,
      features: t.packages.ready.features,
      popular: false,
    },
  ];
  return (
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
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} hover className="flex flex-col">
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="bg-sky text-white px-4 py-2 text-sm font-semibold text-center">
                  <TrendingUp className="inline mr-1" size={16} />
                  {t.packages.mostPopular}
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 w-full bg-sand/30">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-sm font-bold text-forest tracking-wider mb-2">
                  {pkg.name}
                </h3>
                <p className="heading-sm text-charcoal mb-4">
                  {pkg.tagline}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-6 flex-1">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-charcoal/80">
                      <Check size={18} className="text-sky flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="border-t border-sand pt-4 mb-4">
                  <p className="text-2xl font-bold text-forest">{pkg.price}</p>
                </div>

                {/* CTA */}
                <Button 
                  variant={pkg.popular ? 'primary' : 'secondary'} 
                  className="w-full"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t.packages.seePackage}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
