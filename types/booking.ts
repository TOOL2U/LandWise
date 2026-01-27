export type PackageType = 'snapshot' | 'visibility' | 'ready';

export interface Package {
  id: PackageType;
  name: string;
  tagline: string;
  image: string;
  standardPrice: number;
  earlyAccessPrice: number;
  features: string[];
  popular?: boolean;
}

export interface Booking {
  id: string;
  packageId: PackageType;
  packageName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  landLocation: string;
  projectDetails: string;
  bookingDate: string;
  pricePaid: number;
  isEarlyAccess: boolean;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  stripePaymentId?: string;
  stripeSessionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingSlot {
  date: string;
  isAvailable: boolean;
  bookingId?: string;
}

export const EARLY_ACCESS_LIMIT = 10;
export const MAX_BOOKINGS_PER_DAY = 1;
export const MAX_BOOKINGS_PER_WEEK = 4;
export const LAUNCH_DATE = '2026-03-01';
