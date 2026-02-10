'use client';

import { useState } from 'react';
import { MessageCircle, Send, Clock, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import Button from '@/components/ui/Button';
import MapLocationPicker from '@/components/ui/MapLocationPicker';
import { getWhatsAppLink } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  });
  const [location, setLocation] = useState<{ lat: number; lng: number; address?: string; mapsLink?: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skipLocation, setSkipLocation] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Location is optional — only validate if the user hasn't skipped it
    // (no location validation block needed)
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Submit to backend API
      const response = await fetch('/api/submit-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          contact: formData.contact,
          landLocation: location ? (location.address || `${location.lat}, ${location.lng}`) : 'Not provided',
          latitude: location?.lat || null,
          longitude: location?.lng || null,
          mapsLink: location?.mapsLink || null,
          message: formData.message,
          formType: 'Contact Form'
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({ name: '', contact: '', message: '' });
        setLocation(null);
        setSkipLocation(false);
        
        // Also open WhatsApp as backup/additional channel
        setTimeout(() => {
          const locationStr = location ? (location.mapsLink || location.address || 'Not provided') : 'Not provided';
          const whatsappMessage = `Hi, I'm ${formData.name}.\n\nContact: ${formData.contact}\nLand Location: ${locationStr}\n\nMessage: ${formData.message}`;
          window.open(getWhatsAppLink(whatsappMessage), '_blank');
        }, 1000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Submission failed. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
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
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest mb-8">
              Ready to Understand Your Land?
            </h2>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto bg-forest hover:bg-forest/90 shadow-xl hover:shadow-2xl transition-all duration-300"
                  onClick={() => document.getElementById('free-quick-check')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Free Land Quick Check
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-forest text-forest hover:bg-forest/10 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Packages
                </Button>
              </motion.div>
            </div>
            
            <p className="text-slate-grey text-base leading-relaxed">
              Or reach out directly using the form below
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
                        autoComplete="name"
                        className="w-full px-4 py-3 bg-white rounded-lg border border-sand focus:border-forest focus:ring-2 focus:ring-forest/10 focus:outline-none transition-all placeholder:text-slate-grey/30 text-slate-grey"
                        placeholder="John Smith"
                      />
                    </motion.div>

                    <motion.div variants={formFieldVariants}>
                      <label htmlFor="contact" className="block text-sm font-bold text-forest mb-2">
                        {t.contact.form.email} *
                      </label>
                      <input
                        type="email"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        className="w-full px-4 py-3 bg-white rounded-lg border border-sand focus:border-forest focus:ring-2 focus:ring-forest/10 focus:outline-none transition-all placeholder:text-slate-grey/30 text-slate-grey"
                        placeholder="you@example.com"
                      />
                    </motion.div>

                    <motion.div variants={formFieldVariants}>
                      <label className="block text-sm font-bold text-forest mb-2">
                        {t.contact.form.landLocation}
                        <span className="text-slate-grey/50 font-normal text-xs ml-1">(optional)</span>
                      </label>
                      {!skipLocation ? (
                        <>
                          <MapLocationPicker
                            value={location || undefined}
                            onChange={(loc) => setLocation(loc)}
                            placeholder="Select land location on map"
                          />
                          <button
                            type="button"
                            onClick={() => { setSkipLocation(true); setLocation(null); }}
                            className="mt-2 text-xs text-slate-grey/60 hover:text-forest underline underline-offset-2 transition-colors"
                          >
                            I don't have a location yet — skip this step
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center gap-2 p-3 bg-sand/20 border border-sand/40 rounded-lg text-sm text-slate-grey">
                          <span>No location selected</span>
                          <button
                            type="button"
                            onClick={() => setSkipLocation(false)}
                            className="ml-auto text-xs text-forest font-semibold hover:underline"
                          >
                            + Add location
                          </button>
                        </div>
                      )}
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
                        disabled={isSubmitting}
                        className="w-full group shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 group-hover:translate-x-1 transition-transform" size={20} />
                            {t.contact.form.submit}
                          </>
                        )}
                      </Button>
                    </motion.div>

                    {/* Success Message */}
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
                      >
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">Thank you. We've received your request and will contact you shortly.</p>
                      </motion.div>
                    )}

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800"
                      >
                        <span className="text-lg">⚠️</span>
                        <div className="text-sm">
                          <p className="font-semibold mb-1">Submission Error</p>
                          <p>{errorMessage}</p>
                          <p className="mt-2 text-xs">You can also contact us directly via WhatsApp using the button below.</p>
                        </div>
                      </motion.div>
                    )}
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
