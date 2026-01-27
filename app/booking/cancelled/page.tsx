'use client';

import { XCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function BookingCancelled() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sand/20 px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 sm:p-12 text-center">
        <XCircle size={64} className="text-orange-500 mx-auto mb-6" />
        
        <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
          Booking Cancelled
        </h1>
        
        <p className="text-lg text-charcoal/70 mb-8">
          Your booking was not completed. No charges have been made to your account.
        </p>

        <div className="bg-sky/5 border border-sky/20 rounded-lg p-6 mb-8">
          <p className="text-charcoal/80">
            If you experienced any issues or have questions, please don't hesitate to contact us.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary"
            onClick={() => window.location.href = '/#packages'}
          >
            Try Again
          </Button>
          <Button 
            variant="secondary"
            onClick={() => window.open('https://wa.me/66933880630', '_blank')}
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
