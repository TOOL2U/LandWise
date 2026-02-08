'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Package } from '@/types/booking';
import { motion, Variants } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Calendar, DollarSign, MapPin, Upload, X, FileText } from 'lucide-react';
import { uploadBookingDocuments } from '@/lib/storage';

// Only load Stripe if the publishable key is configured
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

interface BookingFormProps {
  selectedPackage: Package;
  isEarlyAccess: boolean;
  onClose: () => void;
}

export default function BookingForm({ selectedPackage, isEarlyAccess, onClose }: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    landLocation: '',
    projectDetails: '',
    bookingDate: '',
  });
  const [landCoordinates, setLandCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const price = isEarlyAccess ? selectedPackage.earlyAccessPrice : selectedPackage.standardPrice;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleOpenMap = () => {
    // Open Google Maps in a new window for user to select location
    const searchQuery = formData.landLocation || 'Thailand';
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
    window.open(mapsUrl, '_blank');
  };

  const handleSetCoordinates = () => {
    // Prompt user to paste coordinates from Google Maps
    const coordsInput = prompt('Paste coordinates from Google Maps (format: lat, lng)\nExample: 9.7456, 99.9543');
    if (coordsInput) {
      const [lat, lng] = coordsInput.split(',').map(s => parseFloat(s.trim()));
      if (!isNaN(lat) && !isNaN(lng)) {
        setLandCoordinates({ lat, lng });
      } else {
        alert('Invalid coordinates format. Please use: latitude, longitude');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let documentUrls: string[] = [];

      // Upload files first if any are selected
      if (selectedFiles.length > 0) {
        setUploadingFiles(true);
        try {
          // Generate temporary booking ID for file uploads
          const tempBookingId = `temp_${Date.now()}`;
          documentUrls = await uploadBookingDocuments(selectedFiles, tempBookingId);
        } catch (uploadError) {
          console.error('File upload error:', uploadError);
          alert('Failed to upload some files. You can continue with booking, but please contact us to send documents separately.');
        } finally {
          setUploadingFiles(false);
        }
      }

      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId: selectedPackage.id,
          ...formData,
          landCoordinates,
          documentUrls,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show user-friendly error message
        if (response.status === 503) {
          alert('Booking system is not yet configured. Please contact us directly via WhatsApp for bookings.');
        } else {
          alert(data.error || 'Failed to create checkout session');
        }
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout URL
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Minimum date is March 1, 2026
  const minDate = '2026-03-01';

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const formItemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };


  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Backdrop */}
      <motion.div
        variants={backdropVariants}
        className="absolute inset-0 bg-forest/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        variants={modalVariants}
        className="relative bg-off-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-white/20 scrollbar-hide"
      >
        <div className="p-8 sm:p-10">

          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                className="text-terracotta font-bold text-xs tracking-widest uppercase mb-2"
              >
                Secure Booking
              </motion.p>
              <h2 className="text-3xl font-bold text-forest font-montserrat mb-1">
                {selectedPackage.name}
              </h2>
              <p className="text-slate-grey/70 text-lg">{selectedPackage.tagline}</p>
            </div>
            <button
              onClick={onClose}
              className="group p-2 rounded-full hover:bg-forest/5 transition-colors"
              aria-label="Close"
            >
              <div className="relative w-6 h-6">
                <span className="absolute top-1/2 left-0 w-full h-0.5 bg-forest/40 group-hover:bg-forest transform -translate-y-1/2 rotate-45 transition-colors" />
                <span className="absolute top-1/2 left-0 w-full h-0.5 bg-forest/40 group-hover:bg-forest transform -translate-y-1/2 -rotate-45 transition-colors" />
              </div>
            </button>
          </div>

          {/* Price Summary */}
          <div className="bg-white border border-sand/50 rounded-xl p-6 mb-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <DollarSign className="text-forest w-24 h-24 transform rotate-12" />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-grey/60 uppercase tracking-widest mb-1">Total Investment</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-bold text-forest font-montserrat">
                    {price.toLocaleString()}
                  </p>
                  <span className="text-sm font-semibold text-slate-grey/50">THB</span>
                </div>
                {isEarlyAccess && (
                  <div className="flex items-center gap-2 mt-2 text-terracotta text-sm font-bold bg-terracotta/5 px-3 py-1 rounded-full w-fit">
                    <span>✨ Early Access Pricing Applied</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              className="space-y-6"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              initial="hidden"
              animate="visible"
            >
              {/* Personal Info Group */}
              <div className="grid sm:grid-cols-2 gap-6">
                <motion.div variants={formItemVariants}>
                  <label className="block text-sm font-bold text-forest mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white rounded-lg border border-sand focus:border-forest focus:ring-2 focus:ring-forest/10 focus:outline-none transition-all placeholder:text-slate-grey/30 text-slate-grey"
                    placeholder="John Smith"
                  />
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <label className="block text-sm font-bold text-forest mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white rounded-lg border border-sand focus:border-forest focus:ring-2 focus:ring-forest/10 focus:outline-none transition-all placeholder:text-slate-grey/30 text-slate-grey"
                    placeholder="john@company.com"
                  />
                </motion.div>
              </div>

              <motion.div variants={formItemVariants} className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-forest mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white rounded-lg border border-sand focus:border-forest focus:ring-2 focus:ring-forest/10 focus:outline-none transition-all placeholder:text-slate-grey/30 text-slate-grey"
                    placeholder="+66 81 234 5678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-forest mb-2">
                    <MapPin className="inline mr-2 text-terracotta" size={18} />
                    Land Location
                  </label>
                  <input
                    type="text"
                    name="landLocation"
                    value={formData.landLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white rounded-lg border border-sand focus:border-forest focus:ring-2 focus:ring-forest/10 focus:outline-none transition-all placeholder:text-slate-grey/30 text-slate-grey"
                    placeholder="e.g. Surat Thani, Ko Pha Ngan"
                  />
                </div>
              </motion.div>

              {/* Map Pin Section */}
              <motion.div variants={formItemVariants}>
                <div className="bg-sand/20 border border-sand rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-forest mb-1">Pin Your Land Location</p>
                      <p className="text-xs text-slate-grey/70 mb-3">
                        Open Google Maps to find and pin your exact land location
                      </p>
                      {landCoordinates && (
                        <div className="flex items-center gap-2 text-xs bg-white px-3 py-2 rounded border border-sand">
                          <MapPin size={14} className="text-terracotta" />
                          <span className="font-mono text-slate-grey">
                            {landCoordinates.lat.toFixed(6)}, {landCoordinates.lng.toFixed(6)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleOpenMap}
                        className="px-4 py-2 bg-white border border-forest text-forest rounded-lg text-sm font-semibold hover:bg-forest hover:text-white transition-all"
                      >
                        Open Map
                      </button>
                      <button
                        type="button"
                        onClick={handleSetCoordinates}
                        className="px-4 py-2 bg-terracotta text-white rounded-lg text-sm font-semibold hover:bg-terracotta/90 transition-all"
                      >
                        Set Pin
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={formItemVariants}>
                <label className="block text-sm font-bold text-forest mb-2">
                  Project Details / Notes
                </label>
                <textarea
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white rounded-lg border border-sand focus:border-forest focus:ring-2 focus:ring-forest/10 focus:outline-none transition-all placeholder:text-slate-grey/30 text-slate-grey resize-none"
                  placeholder="Briefly describe your requirements or any questions..."
                />
              </motion.div>

              {/* File Upload Section */}
              <motion.div variants={formItemVariants}>
                <label className="block text-sm font-bold text-forest mb-2">
                  <Upload className="inline mr-2 text-terracotta" size={18} />
                  Upload Documents (Optional)
                </label>
                <p className="text-xs text-slate-grey/70 mb-3">
                  Upload Chanote, land office documents, or any relevant files (PDF, JPG, PNG)
                </p>

                <div className="space-y-3">
                  {/* File Input */}
                  <label className="flex items-center justify-center w-full px-4 py-6 bg-white border-2 border-dashed border-sand rounded-lg cursor-pointer hover:border-forest hover:bg-sand/10 transition-all">
                    <div className="text-center">
                      <Upload className="mx-auto mb-2 text-terracotta" size={24} />
                      <span className="text-sm font-semibold text-forest">Click to upload files</span>
                      <p className="text-xs text-slate-grey/60 mt-1">PDF, JPG, PNG up to 10MB each</p>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>

                  {/* Selected Files List */}
                  {selectedFiles.length > 0 && (
                    <div className="space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white border border-sand rounded-lg px-3 py-2"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <FileText size={16} className="text-terracotta flex-shrink-0" />
                            <span className="text-sm text-slate-grey truncate">{file.name}</span>
                            <span className="text-xs text-slate-grey/50 flex-shrink-0">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="p-1 hover:bg-sand/50 rounded transition-colors"
                          >
                            <X size={16} className="text-slate-grey/70" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div variants={formItemVariants}>
                <label className="block text-sm font-bold text-forest mb-2">
                  <Calendar className="inline mr-2 text-terracotta" size={18} />
                  Preferred Start Date *
                </label>
                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleChange}
                  min={minDate}
                  required
                  className="w-full px-4 py-3 bg-white rounded-lg border border-sand focus:border-forest focus:ring-2 focus:ring-forest/10 focus:outline-none transition-all text-slate-grey uppercase tracking-wide cursor-pointer"
                />
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-grey/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />
                  <span>Limited availability: Max 3 projects per month</span>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={formItemVariants} className="pt-6">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center text-lg py-4 shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
                  disabled={loading || uploadingFiles}
                >
                  {uploadingFiles ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading Documents...
                    </span>
                  ) : loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Securely...
                    </span>
                  ) : (
                    `Confirm Booking • ${price.toLocaleString()} THB`
                  )}
                </Button>
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-grey/50">
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    256-bit SSL Secure
                  </span>
                  <span>Powered by Stripe</span>
                </div>
              </motion.div>
            </motion.div>
          </form>

          {/* Refund Policy */}
          <div className="mt-8 pt-6 border-t border-sand/30 text-xs text-slate-grey/60 text-center leading-relaxed">
            <p>
              <span className="font-bold text-forest">Guarantee:</span> Full refund available if cancelled 7+ days before scheduled date.
              Flexible rescheduling available for weather-related constraints.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
