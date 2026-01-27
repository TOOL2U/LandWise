'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Package } from '@/types/booking';
import Button from '@/components/ui/Button';
import { Calendar, DollarSign } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface BookingFormProps {
  selectedPackage: Package;
  isEarlyAccess: boolean;
  onClose: () => void;
}

export default function BookingForm({ selectedPackage, isEarlyAccess, onClose }: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    landLocation: '',
    projectDetails: '',
    bookingDate: '',
  });

  const price = isEarlyAccess ? selectedPackage.earlyAccessPrice : selectedPackage.standardPrice;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId: selectedPackage.id,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-forest mb-2">Book {selectedPackage.name}</h2>
              <p className="text-charcoal/70">{selectedPackage.tagline}</p>
            </div>
            <button
              onClick={onClose}
              className="text-charcoal/50 hover:text-charcoal text-3xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Price Display */}
          <div className="bg-forest/5 border border-forest/20 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal/70 mb-1">Total Price</p>
                <p className="text-3xl font-bold text-forest">
                  {price.toLocaleString()} THB
                </p>
                {isEarlyAccess && (
                  <p className="text-sm text-sky font-semibold mt-1">
                    ⭐ Early Access Pricing - First 10 Clients Only
                  </p>
                )}
              </div>
              <DollarSign className="text-forest" size={48} />
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-forest mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-sand focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                placeholder="John Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-forest mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-sand focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-forest mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-sand focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                placeholder="+66 123 456 789"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-forest mb-2">
                Land Location
              </label>
              <input
                type="text"
                name="landLocation"
                value={formData.landLocation}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-sand focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                placeholder="e.g., Thong Nai Pan, Ko Pha Ngan"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-forest mb-2">
                Project Details
              </label>
              <textarea
                name="projectDetails"
                value={formData.projectDetails}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-sand focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-forest mb-2">
                <Calendar className="inline mr-2" size={18} />
                Preferred Booking Date * (March 2026 onwards)
              </label>
              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                min={minDate}
                required
                className="w-full px-4 py-3 rounded-lg border border-sand focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
              />
              <p className="text-xs text-charcoal/60 mt-1">
                Limited capacity: 1 project per day, max 4 per week
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Processing...' : `Pay ${price.toLocaleString()} THB & Book Now`}
              </Button>
              <p className="text-xs text-center text-charcoal/60 mt-3">
                You will be redirected to Stripe for secure payment
              </p>
            </div>
          </form>

          {/* Refund Policy */}
          <div className="mt-6 p-4 bg-sand/20 rounded-lg text-sm text-charcoal/70">
            <p className="font-semibold text-charcoal mb-2">Refund Policy:</p>
            <p>Full refund if cancelled 7+ days before scheduled date. No refund within 7 days (reschedule allowed).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
