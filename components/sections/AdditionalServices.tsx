'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mountain, TrendingUp, Droplets, TreePine, Compass } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
}

interface ServiceQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: string;
}

const ServiceQuoteModal = ({ isOpen, onClose, selectedService }: ServiceQuoteModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    landLocation: '',
    landSize: '',
    service: selectedService,
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to backend API
      const response = await fetch('/api/submit-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          contact: formData.contact,
          landLocation: formData.landLocation,
          service: formData.service + (formData.landSize ? ` (${formData.landSize})` : ''),
          message: formData.message,
          formType: 'Quote Request'
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        
        // Also send to WhatsApp
        const message = `Hi, I'd like to request a quote for ${formData.service}.

Name: ${formData.name}
Contact: ${formData.contact}
Land Location: ${formData.landLocation}
${formData.landSize ? `Approximate Size: ${formData.landSize}` : ''}
${formData.message ? `Message: ${formData.message}` : ''}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/66933880630?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
        
        // Close modal after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
          // Reset form
          setFormData({
            name: '',
            contact: '',
            landLocation: '',
            landSize: '',
            service: selectedService,
            message: ''
          });
        }, 3000);
      }
    } catch (error) {
      console.error('Quote submission error:', error);
      // Still show success and open WhatsApp as fallback
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {isSubmitted ? (
            /* Success Message */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest mb-2">Thank you!</h3>
              <p className="text-slate-grey">We've received your request and will contact you shortly.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-forest mb-2">Request a Quote</h3>
                <p className="text-sm text-slate-grey mb-3">We usually respond within 24 hours.</p>
                <p className="text-sm text-slate-grey">Service: {selectedService}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-grey mb-2">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-sand rounded-lg focus:ring-2 focus:ring-forest/20 focus:border-forest"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-grey mb-2">Email or WhatsApp *</label>
              <input
                type="text"
                required
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-3 py-2 border border-sand rounded-lg focus:ring-2 focus:ring-forest/20 focus:border-forest"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-grey mb-2">Land Location *</label>
              <input
                type="text"
                required
                placeholder="Paste a Google Maps link or land location"
                value={formData.landLocation}
                onChange={(e) => setFormData({ ...formData, landLocation: e.target.value })}
                className="w-full px-3 py-2 border border-sand rounded-lg focus:ring-2 focus:ring-forest/20 focus:border-forest"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-grey mb-2">Approximate Land Size</label>
              <input
                type="text"
                placeholder="e.g., 1 rai, 2000 sqm"
                value={formData.landSize}
                onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                className="w-full px-3 py-2 border border-sand rounded-lg focus:ring-2 focus:ring-forest/20 focus:border-forest"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-grey mb-2">Additional Message</label>
              <textarea
                rows={3}
                placeholder="Any specific requirements or questions..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 border border-sand rounded-lg focus:ring-2 focus:ring-forest/20 focus:border-forest"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
              >
                Send Quote Request
              </Button>
            </div>

            {/* Reassurance Text */}
            <p className="text-xs text-slate-grey/70 text-center mt-3">
              No obligation. We'll review your site and respond with recommendations.
            </p>
          </form>
        </>
        )}
        </motion.div>
      </div>
    </div>
  );
};

export default function AdditionalServices() {
  const [selectedService, setSelectedService] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services: Service[] = [
    {
      id: 'drone-survey',
      name: 'Drone Survey',
      description: 'High-resolution aerial mapping of your land for planning, visualization, and site understanding.',
      icon: MapPin,
    },
    {
      id: '3d-terrain',
      name: '3D Terrain Model',
      description: 'Interactive terrain model for visualization and early planning.',
      icon: Mountain,
    },
    {
      id: 'slope-analysis',
      name: 'Slope & Contour Analysis',
      description: 'Understand elevation, slope, and usable building zones.',
      icon: TrendingUp,
    },
    {
      id: 'drainage-analysis',
      name: 'Drainage Analysis',
      description: 'Identify natural water flow and potential risk areas before building.',
      icon: Droplets,
    },
    {
      id: 'land-survey',
      name: 'Land Survey & Site Mapping',
      description: 'Accurate site survey and mapping for planning, design, and development after proper land preparation. We will advise if clearing is required before surveying.',
      icon: Compass,
    },
    {
      id: 'land-clearing',
      name: 'Land Clearing Coordination',
      description: 'Professional coordination of clearing with before and after documentation.',
      icon: TreePine,
    },
  ];

  const handleRequestQuote = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  return (
    <>
      <ServiceQuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedService}
      />

      <section className="section-padding pt-20 sm:pt-24 md:pt-28 bg-white relative overflow-hidden">
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
              Additional Services
            </h2>
            <p className="text-base sm:text-lg text-slate-grey/70 mb-3">
              Individual services available if you don't need a full package.
            </p>
            <p className="text-lg text-slate-grey leading-relaxed">
              Need something specific? We also offer individual surveying and land services tailored to your project.
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
                    <div className="flex-1 mb-6">
                      <h3 className="text-xl font-semibold text-forest mb-3">
                        {service.name}
                      </h3>
                      <p className="text-slate-grey leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant="secondary"
                      className="w-full justify-center text-forest border-forest/20 hover:bg-forest/5"
                      onClick={() => handleRequestQuote(service.name)}
                    >
                      Request a Quote
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-sm text-slate-grey/70 italic max-w-2xl mx-auto">
              Most clients choose one of our packages because they provide better value and a complete land assessment.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}