'use client';

import Image from 'next/image';
import { Map, Box, Image as ImageIcon, Video, FileText, MapPin } from 'lucide-react';

const deliverables = [
  {
    icon: Map,
    title: '2D Map',
    description: 'High-resolution orthomosaic map of your entire property',
  },
  {
    icon: Box,
    title: '3D Terrain',
    description: 'Interactive 3D model showing elevation and topography',
  },
  {
    icon: ImageIcon,
    title: 'Concept Visuals',
    description: 'Photorealistic rendered images of development potential',
  },
  {
    icon: Video,
    title: 'Video Fly-through',
    description: 'Cinematic aerial footage showcasing your land',
  },
  {
    icon: FileText,
    title: 'PDF Report',
    description: 'Comprehensive analysis report (Package 2+)',
  },
  {
    icon: MapPin,
    title: 'Survey',
    description: 'Professional land survey (Package 3)',
  },
];

export default function Deliverables() {
  return (
    <section id="deliverables" className="section-padding relative bg-gradient-to-br from-sand/20 to-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/assets/image3.png"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg text-forest mb-4">
            What You Receive
          </h2>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            Professional deliverables designed to help you make informed decisions about your land.
          </p>
        </div>

        {/* Deliverables Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {deliverables.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-sky/10 rounded-lg flex items-center justify-center mb-4">
                <item.icon className="text-sky" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-forest mb-2">
                {item.title}
              </h3>
              <p className="text-charcoal/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-sky max-w-3xl mx-auto">
          <p className="text-sm text-charcoal/70">
            <span className="font-semibold text-forest">Note:</span> Survey delivered by licensed partner when required. All reports are professionally branded and presentation-ready.
          </p>
        </div>
      </div>
    </section>
  );
}
