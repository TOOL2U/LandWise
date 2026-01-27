'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function BookingSuccess() {
  const searchParams = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  
  useEffect(() => {
    const bookingId = searchParams.get('booking_id');
    // TODO: Fetch booking details from Firebase
    // For now, just show success message
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand/20 px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 sm:p-12 text-center">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
        
        <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
          Booking Confirmed!
        </h1>
        
        <p className="text-lg text-charcoal/70 mb-8">
          Thank you for choosing LandWise. Your payment was successful and your booking has been confirmed.
        </p>

        <div className="bg-forest/5 border border-forest/20 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-semibold text-forest mb-3">What happens next?</h3>
          <ul className="space-y-2 text-charcoal/80">
            <li>✅ Confirmation email sent to your inbox</li>
            <li>📅 We'll contact you 48 hours before your scheduled date</li>
            <li>🎥 Bring any specific requirements or questions</li>
            <li>📱 You can reach us anytime via WhatsApp</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary"
            onClick={() => window.location.href = '/'}
          >
            Back to Home
          </Button>
          <Button 
            variant="secondary"
            onClick={() => window.open('https://wa.me/66933880630', '_blank')}
          >
            Contact Us on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
