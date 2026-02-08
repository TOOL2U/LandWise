'use client';

import { useState } from 'react';
import { MessageCircle, Send, Clock, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import Button from '@/components/ui/Button';
import { getWhatsAppLink } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    location: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create WhatsApp message with form data
    const whatsappMessage = `Hi, I'm ${formData.name}.\n\nContact: ${formData.contact}\nLand Location: ${formData.location}\n\nMessage: ${formData.message}`;

    window.open(getWhatsAppLink(whatsappMessage), '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const formFieldVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-off-white via-white to-sand/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #1F3D2B 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <p className="text-terracotta font-bold mb-3 tracking-widest uppercase text-xs sm:text-sm">
              GET IN TOUCH
            </p>
            <h2 className="heading-lg text-forest mb-6">
              {t.contact.heading}
            </h2>
            <p className="text-slate-grey text-lg leading-relaxed">
              {t.contact.description}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl border border-sand/50">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    className="space-y-6"
                    variants={{
                      visible: { transition: { staggerChildren: 0.08 } }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.div variants={formFieldVariants}>
                      <label htmlFor="name" className="block text-sm font-bold text-forest mb-2">
                        {t.contact.form.name} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white rounded-lg border border-sand focus:border-forest focus:ring-2 focus:ring-forest/10 focus:outline-none transition-all placeholder:text-slate-grey/30 text-slate-grey"
                        placeholder="John Smith"
                      />
                    </motion.div>

                    <motion.div variants={formFieldVariants}>
                      <label htmlFor="contact" className="block text-sm font-bold text-forest mb-2">
                        {t.contact.form.email} *
                      </label>
                      <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white rounded-lg border border-sand focus:border-forest focus:ring-2 focus:ring-forest/10 focus:outline-none transition-all placeholder:text-slate-grey/30 text-slate-grey"
                        placeholder="john@example.com or +66 81 234 5678"
                      />
                    </motion.div>

                    <motion.div variants={formFieldVariants}>
                      <label htmlFor="location" className="block text-sm font-bold text-forest mb-2">
                        {t.contact.form.landLocation} *
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white rounded-lg border border-sand focus:border-forest focus:ring-2 focus:ring-forest/10 focus:outline-none transition-all placeholder:text-slate-grey/30 text-slate-grey"
                        placeholder="e.g., Thong Nai Pan, Ko Pha Ngan"
                      />
                    </motion.div>

                    <motion.div variants={formFieldVariants}>
                      <label htmlFor="message" className="block text-sm font-bold text-forest mb-2">
                        {t.contact.form.projectDetails}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-white rounded-lg border border-sand focus:border-forest focus:ring-2 focus:ring-forest/10 focus:outline-none transition-all placeholder:text-slate-grey/30 text-slate-grey resize-none"
                        placeholder="Tell us about your land and what you're planning..."
                      />
                    </motion.div>

                    <motion.div variants={formFieldVariants}>
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full group shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                        size="lg"
                      >
                        <Send className="mr-2 group-hover:translate-x-1 transition-transform" size={20} />
                        {t.contact.form.submit}
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            {/* Quick Contact & Info */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              {/* WhatsApp CTA */}
              <div className="bg-gradient-to-br from-forest to-forest/90 rounded-2xl p-8 shadow-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold font-montserrat mb-3 text-white/90">
                    Prefer Instant Chat?
                  </h3>
                  <p className="text-white/90 mb-6 text-sm leading-relaxed">
                    Message us on WhatsApp for immediate responses. We're here to answer questions and discuss your project.
                  </p>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full bg-white text-forest border-white hover:bg-white/90 shadow-lg group"
                      onClick={() => window.open(getWhatsAppLink(), '_blank')}
                    >
                      <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                      WhatsApp Us Now
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </Button>
                  </motion.div>

                  {/* Pulse indicator */}
                  <div className="flex items-center gap-2 mt-4 text-sm">
                    <div className="relative">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping" />
                    </div>
                    <span className="text-white/80">Usually responds within minutes</span>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-sand/50 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-terracotta/10 rounded-lg">
                    <Clock className="text-terracotta" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-forest mb-1">Fast Response</h4>
                    <p className="text-sm text-slate-grey/70 leading-relaxed">
                      We'll respond within 24 hours with a detailed quote and timeline for your project.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Elements */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-sand/50 shadow-lg">
                <h4 className="font-bold text-forest mb-4">Why Choose Us?</h4>
                <div className="space-y-3">
                  {[
                    'Free initial consultation',
                    'No obligation quotes',
                    'Local Ko Pha Ngan experts',
                    'Professional drone mapping'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 text-sm text-slate-grey"
                    >
                      <div className="flex-shrink-0 w-5 h-5 bg-terracotta/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="text-terracotta" size={14} />
                      </div>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
