'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Map, Box, Image as ImageIcon, Video, FileText, MapPin, Scan, Radar, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Deliverables() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const deliverables = [
    {
      icon: Map,
      title: t.deliverables.items[0].title,
      description: t.deliverables.items[0].description,
    },
    {
      icon: Box,
      title: t.deliverables.items[1].title,
      description: t.deliverables.items[1].description,
    },
    {
      icon: ImageIcon,
      title: t.deliverables.items[2].title,
      description: t.deliverables.items[2].description,
    },
    {
      icon: Video,
      title: t.deliverables.items[3].title,
      description: t.deliverables.items[3].description,
    },
    {
      icon: FileText,
      title: t.deliverables.items[4].title,
      description: t.deliverables.items[4].description,
    },
    {
      icon: MapPin,
      title: t.deliverables.items[5].title,
      description: t.deliverables.items[5].description,
    },
  ];

  return (
    <section id="deliverables" ref={containerRef} className="section-padding py-16 sm:py-20 md:py-24 relative bg-off-white overflow-hidden">

      {/* --- Technical Grid Background --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grid Lines */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        {/* Radial Fade for Grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-off-white via-transparent to-off-white" />
      </div>

      {/* --- Orbiting Radar Elements --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-10 pointer-events-none z-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border-[1px] border-dashed border-forest rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[10%] w-[80%] h-[80%] border-[1px] border-forest rounded-full opacity-50"
        />
      </div>


      <div className="container-custom relative z-10">

        {/* --- Section Header --- */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 rounded-full border border-forest/10 mb-3">
              <span className="text-xs font-medium tracking-wider text-forest/60 uppercase">
                Example Deliverables
              </span>
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 rounded-full border border-forest/10 mb-6">
              <Scan className="w-4 h-4 text-forest" />
              <span className="text-xs font-bold tracking-widest text-forest uppercase">
                {t.deliverables.sectionTitle}
              </span>
            </div>

            <h2 className="heading-lg text-charcoal mb-6 relative inline-block font-montserrat">
              <span className="relative z-10">{t.deliverables.heading}</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-sky relative z-10">
                {t.deliverables.subheading}
              </span>
              {/* Underline decoration */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute bottom-1 left-0 h-3 bg-sky/10 -z-0"
              />
            </h2>
          </motion.div>
        </div>


        {/* --- Deliverables Grid --- */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {deliverables.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Glassmorphism Card */}
              <div className="h-full bg-white/60 backdrop-blur-md border border-white/50 shadow-sm hover:shadow-xl hover:shadow-sky/10 hover:border-sky/30 rounded-2xl p-8 transition-all duration-300 overflow-hidden">

                {/* Background Hover Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky/5 rounded-full blur-3xl group-hover:bg-sky/10 transition-colors duration-500 -mr-10 -mt-10" />

                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-white to-slate-100 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="text-forest group-hover:text-sky transition-colors duration-300" size={28} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-forest transition-colors">
                  {item.title}
                </h3>
                <p className="text-charcoal/70 leading-relaxed text-sm">
                  {item.description}
                </p>

                {/* Tech Decor */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-sky rounded-full" />
                    <div className="w-1 h-1 bg-sky/50 rounded-full" />
                    <div className="w-1 h-1 bg-sky/20 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Trust Note --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm text-sm text-charcoal/60">
            <ShieldCheck className="w-5 h-5 text-sky" />
            <span>Professionally branded reports ready for presentation.</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
