'use client';

import Image from 'next/image';
import { Check, TrendingUp } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const packages = [
  {
    id: 'snapshot',
    name: 'LAND SNAPSHOT',
    tagline: 'See your land clearly.',
    image: '/assets/package 1.png',
    price: '15,000–25,000 THB',
    features: [
      'Drone 2D map',
      '3D terrain model',
      'Photorealistic concept images',
      'Short cinematic video',
    ],
    popular: false,
  },
  {
    id: 'visibility',
    name: 'LAND VISIBILITY REPORT',
    tagline: 'Decide with confidence.',
    image: '/assets/package 2.png',
    price: '30,000–60,000 THB',
    features: [
      'Everything in Package 1',
      'Visibility analysis (views, sun, access)',
      'Buildability assessment',
      'Legal/zoning summary',
      'Risk flags + recommendations',
      'Branded PDF report',
    ],
    popular: true,
  },
  {
    id: 'ready',
    name: 'LAND READY PACKAGE',
    tagline: 'Plan it, clear it.',
    image: '/assets/package 3.png',
    price: 'Project-based',
    features: [
      'Everything in Package 2',
      'Land clearing (robot mower)',
      'Full land survey (outsourced if required)',
      'Before/after visuals',
      'Updated 3D model after clearing',
    ],
    popular: false,
  },
];

export default function Packages() {
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
          <p className="text-sky font-semibold mb-2 tracking-wide uppercase text-sm">Our Services</p>
          <h2 className="heading-lg text-forest mb-4">
            Tailored Land Assessment
          </h2>
          <h3 className="heading-md text-charcoal/70">
            and Development Packages
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
                  Most Popular
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
                  See Package
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
