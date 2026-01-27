import { NextResponse } from 'next/server';
import { isEarlyAccessAvailable } from '@/lib/bookings';

export async function GET() {
  try {
    // Check if Firebase is configured
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      // Firebase not configured yet, return true (early access available)
      return NextResponse.json({ available: true });
    }

    const available = await isEarlyAccessAvailable();
    return NextResponse.json({ available });
  } catch (error) {
    console.error('Error checking early access:', error);
    // Default to available if there's an error
    return NextResponse.json({ available: true });
  }
}
