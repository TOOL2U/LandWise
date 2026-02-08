'use client';

import { useState } from 'react';
import { Package } from '@/types/booking';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import MapLocationPicker from '@/components/ui/MapLocationPicker';
import { X, Send, MessageCircle, CheckCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/constants';

interface BookingFormSimpleProps {
  selectedPackage: Package;
  isEarlyAccess: boolean;
  onClose: () => void;
}

export default function BookingFormSimple({ selectedPackage, isEarlyAccess, onClose }: BookingFormSimpleProps) {
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    landSize: '',
  });
  const [location, setLocation] = useState<{ lat: number; lng: number; address?: string; mapsLink?: string } | null>(null);

  const price = isEarlyAccess ? selectedPackage.earlyAccessPrice : selectedPackage.standardPrice;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!location?.lat || !location?.lng) {
      setErrorMessage('Please select a location on the map');
      setSubmitStatus('error');
      return;
    }
    
    setLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Submit to inquiry API first
      const inquiryResponse = await fetch('/api/submit-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.customerName,
          contact: formData.customerPhone,
          landLocation: location.address || `${location.lat}, ${location.lng}`,
          latitude: location.lat,
          longitude: location.lng,
          mapsLink: location.mapsLink,
          service: `${selectedPackage.name} - ${isEarlyAccess ? 'Early Access' : 'Standard'} - THB ${price.toLocaleString()}`,
          message: `Land Size: ${formData.landSize || 'Not specified'}`,
          formType: 'Package Booking Request'
        })
      });

      if (inquiryResponse.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          customerName: '',
          customerPhone: '',
          landSize: '',
        });
        setLocation(null);
      } else {
        const data = await inquiryResponse.json();
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
      console.error('Booking form error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'd like to book: ${selectedPackage.name}\n\nName: ${formData.customerName}\nPhone: ${formData.customerPhone}\nLocation: ${location?.mapsLink || 'Not set'}\nLand Size: ${formData.landSize || 'Not specified'}\nPrice: THB ${price.toLocaleString()}`;
    window.open(getWhatsAppLink(message), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-charcoal/10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-charcoal">{selectedPackage.name}</h3>
              {isEarlyAccess && (
                <span className="bg-clay text-white text-xs font-bold px-2 py-1 rounded-full">
                  Early Access
                </span>
              )}
            </div>
            <p className="text-charcoal/60">{selectedPackage.tagline}</p>
            <p className="text-2xl font-bold text-clay mt-2">
              THB {price.toLocaleString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors ml-4"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-4"
            >
              <CheckCircle className="w-16 h-16 text-forest mx-auto" />
              <h4 className="text-2xl font-bold text-charcoal">Thank you! We received your request.</h4>
              <p className="text-charcoal/70 max-w-md mx-auto">
                We'll contact you shortly to confirm your booking and arrange payment.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button onClick={handleWhatsApp} className="sm:w-auto">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Us on WhatsApp
                </Button>
                <Button onClick={onClose} variant="outline" className="sm:w-auto">
                  Close
                </Button>
              </div>
            </motion.div>
          ) : (
            <>
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
                  <p className="text-sm">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="bg-forest/5 border border-forest/20 p-4 rounded-lg mb-6">
                  <p className="text-sm text-charcoal/70 text-center">
                    Complete this quick form and we'll contact you to confirm your booking
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="customerName" className="block text-sm font-medium text-charcoal mb-2">
                    Your Name <span className="text-clay">*</span>
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-clay focus:border-clay text-base"
                    placeholder="John Doe"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="customerPhone" className="block text-sm font-medium text-charcoal mb-2">
                    Phone or WhatsApp <span className="text-clay">*</span>
                  </label>
                  <input
                    type="tel"
                    id="customerPhone"
                    name="customerPhone"
                    value={formData.customerPhone}
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
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Request Booking
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-center text-xs text-charcoal/50 pt-2">
                  We'll contact you to confirm availability and arrange payment
                </p>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
