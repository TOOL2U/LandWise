'use client';

import { motion } from 'framer-motion';
import { MapPin, Mountain, TrendingUp, Droplets, CheckCircle, TreePine } from 'lucide-react';
import Card from '@/components/ui/Card';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
}

export default function OurServices() {
  const services: Service[] = [
    {
      id: 'drone-surveying',
      name: 'Drone Surveying',
      description: 'High-resolution aerial mapping of land for planning, visualization, and documentation.',
      icon: MapPin,
    },
    {
      id: '3d-terrain',
      name: '3D Terrain Modeling',
      description: 'Accurate terrain visualization showing slopes, elevation, and land features.',
      icon: Mountain,
    },
    {
      id: 'slope-analysis',
      name: 'Slope & Contour Analysis',
      description: 'Understand elevation changes, slope percentages, and usable building areas.',
      icon: TrendingUp,
    },
    {
      id: 'drainage-analysis',
      name: 'Drainage & Water Flow Analysis',
      description: 'Identify natural water paths and potential flood or erosion risks before building.',
      icon: Droplets,
    },
    {
      id: 'buildability',
      name: 'Buildability Assessment',
      description: 'Identify suitable building zones, access routes, and construction constraints.',
      icon: CheckCircle,
    },
    {
      id: 'land-preparation',
      name: 'Land Preparation & Clearing Coordination',
      description: 'Professional planning and coordination to prepare land safely for development.',
      icon: TreePine,
    },
  ];

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-sand/20 rounded-full blur-3xl" />
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest mb-4">
            Our Services
          </h2>
          <p className="text-lg text-slate-grey leading-relaxed">
            Professional land surveying, analysis, and preparation services to support every stage of your project.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col bg-white border border-sand/30 hover:border-forest/20 hover:shadow-md transition-all duration-300 rounded-xl p-6">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-forest/10 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-forest" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-forest mb-3">
                      {service.name}
                    </h3>
                    <p className="text-slate-grey leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
