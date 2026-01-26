'use client';

import { useState } from 'react';
import { MessageCircle, Send, Clock } from 'lucide-react';
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

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="heading-lg text-forest mb-4">
              {t.contact.heading}
            </h2>
            <p className="text-xl text-charcoal/70">
              {t.contact.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-sand/20 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-forest mb-2">
                    {t.contact.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-sand focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="contact" className="block text-sm font-semibold text-forest mb-2">
                    {t.contact.form.email}
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-sand focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all"
                    placeholder="+66 123 456 789"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-forest mb-2">
                    {t.contact.form.landLocation}
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-sand focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all"
                    placeholder="e.g., Thong Nai Pan, Ko Pha Ngan"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-forest mb-2">
                    {t.contact.form.projectDetails}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-sand focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all resize-none"
                    placeholder="What are you planning to do with your land?"
                  />
                </div>

                <Button type="submit" variant="primary" className="w-full" size="lg">
                  <Send className="mr-2" size={20} />
                  {t.contact.form.submit}
                </Button>
              </form>
            </div>

            {/* Quick Contact */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="heading-sm text-forest mb-6">
                  Prefer to chat directly?
                </h3>
                <p className="text-charcoal/70 mb-6">
                  Message us on WhatsApp for instant communication. We're here to answer your questions and discuss your land assessment needs.
                </p>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full mb-8"
                  onClick={() => window.open(getWhatsAppLink(), '_blank')}
                >
                  <MessageCircle className="mr-2" size={20} />
                  WhatsApp Us
                </Button>

                {/* Response Time */}
                <div className="bg-sky/10 rounded-xl p-6 border-l-4 border-sky">
                  <div className="flex items-start gap-3">
                    <Clock className="text-sky flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-forest mb-1">Fast Response</h4>
                      <p className="text-sm text-charcoal/70">
                        We'll respond within 24 hours with a detailed quote and timeline for your project.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Elements */}
              <div className="mt-8 space-y-4 text-sm text-charcoal/60">
                <p>✓ Free initial consultation</p>
                <p>✓ No obligation quotes</p>
                <p>✓ Local Ko Pha Ngan experts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
