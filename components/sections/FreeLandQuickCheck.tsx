'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle, Clock, Shield, Send, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import MapLocationPicker from '@/components/ui/MapLocationPicker';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWhatsAppLink } from '@/lib/constants';

export default function FreeLandQuickCheck() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    landSize: '',
  });
  const [location, setLocation] = useState<{ lat: number; lng: number; address?: string; mapsLink?: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!location?.lat || !location?.lng) {
      setErrorMessage('Please select a location on the map');
      setSubmitStatus('error');
      return;
    }
    
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
          contact: formData.phone,
          landLocation: location.address || `${location.lat}, ${location.lng}`,
          latitude: location.lat,
          longitude: location.lng,
          mapsLink: location.mapsLink,
          service: 'Free Land Quick Check',
          message: `Land Size: ${formData.landSize || 'Not specified'}`,
          formType: 'Free Land Quick Check'
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          phone: '',
          landSize: '',
        });
        setLocation(null);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
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

  const handleWhatsApp = () => {
    const message = `Hi, I'd like a Free Land Quick Check!\n\nName: ${formData.name}\nPhone: ${formData.phone}\nLocation: ${location?.mapsLink || 'Not set'}\nLand Size: ${formData.landSize || 'Not specified'}`;
    window.open(getWhatsAppLink(message), '_blank');
  };

  return (
    <section className="py-24 sm:py-28 md:py-32 bg-cream" id="free-quick-check">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-forest/10 text-forest px-4 py-2 rounded-full mb-4">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Free Professional Review</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-charcoal mb-4">
            Free Land Quick Check
          </h2>

          {/* Problem Statement */}
          <p className="text-2xl text-charcoal/80 mb-6 max-w-3xl mx-auto">
            Not sure if your land is suitable for building?
          </p>

          {/* Value Proposition */}
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Send us your land location and we'll review it and give you an initial professional opinion — completely free.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
        >
          <div className="flex items-start gap-3 bg-white p-4 rounded-lg">
            <CheckCircle className="w-5 h-5 text-forest flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-charcoal mb-1">Quick professional review</h3>
              <p className="text-sm text-charcoal/60">Expert analysis within 24 hours</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white p-4 rounded-lg">
            <CheckCircle className="w-5 h-5 text-forest flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-charcoal mb-1">Identify obvious risks or opportunities</h3>
              <p className="text-sm text-charcoal/60">Spot issues before you buy</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white p-4 rounded-lg">
            <CheckCircle className="w-5 h-5 text-forest flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-charcoal mb-1">Know whether a full analysis is worthwhile</h3>
              <p className="text-sm text-charcoal/60">Make informed decisions</p>
            </div>
          </div>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            
            {/* Icon Row Above Form */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8 pb-6 border-b border-charcoal/10">
              <div className="flex items-center gap-2 text-sm text-charcoal/70">
                <CheckCircle className="w-4 h-4 text-forest" />
                <span>Quick response</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-charcoal/70">
                <CheckCircle className="w-4 h-4 text-forest" />
                <span>Local expertise</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-charcoal/70">
                <CheckCircle className="w-4 h-4 text-forest" />
                <span>Free consultation</span>
              </div>
            </div>
            
            {/* Form Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-charcoal mb-2">
                Request Your Free Land Quick Check
              </h3>
              <div className="flex items-center justify-center gap-2 text-charcoal/60">
                <Clock className="w-4 h-4" />
                <p className="text-sm">We usually respond within 24 hours</p>
              </div>
            </div>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-forest/10 border border-forest/20 text-forest p-6 rounded-lg mb-6 text-center space-y-4"
              >
                <CheckCircle className="w-12 h-12 mx-auto" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Thank you! We received your request.</h4>
                  <p className="text-sm mb-4">We'll review your land and contact you within 24 hours.</p>
                </div>
                <Button
                  onClick={handleWhatsApp}
                  className="w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Us on WhatsApp
                </Button>
              </motion.div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6"
              >
                <p className="text-sm">{errorMessage}</p>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                  Your Name <span className="text-clay">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-clay focus:border-clay text-base"
                  placeholder="John Doe"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                  Phone or WhatsApp <span className="text-clay">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-clay focus:border-clay text-base"
                  placeholder="+66 XX XXX XXXX"
                />
              </div>

              {/* Location Picker */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Land Location <span className="text-clay">*</span>
                </label>
                <MapLocationPicker
                  value={location || undefined}
                  onChange={(loc) => setLocation(loc)}
                  placeholder="Select location on map"
                  required
                />
                <p className="text-xs text-charcoal/50 mt-1.5">
                  Click to select your land location on the map or paste a Google Maps link
                </p>
              </div>

              {/* Land Size - Optional */}
              <div>
                <label htmlFor="landSize" className="block text-sm font-medium text-charcoal mb-2">
                  Approximate Land Size <span className="text-charcoal/40">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="landSize"
                  name="landSize"
                  value={formData.landSize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-clay focus:border-clay text-base"
                  placeholder="e.g., 2 rai or 800 sqm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-clay text-white py-4 px-6 rounded-lg font-semibold hover:bg-clay/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Get Free Land Check
                  </>
                )}
              </button>

              {/* Trust Line Under Submit Button */}
              <p className="text-center text-sm text-charcoal/50 pt-1">
                ✓ No obligation · ✓ Quick professional review · ✓ 24-hour response
              </p>
            </form>
          </div>

          {/* Trust Line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-sm text-charcoal/60 mt-6"
          >
            Used by land buyers and developers across Koh Phangan.
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
}
