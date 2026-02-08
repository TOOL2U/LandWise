import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getPackageById } from '@/lib/packages';
import { isEarlyAccessAvailable, createBooking } from '@/lib/bookings';

// Initialize Stripe only if API key is configured
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-12-15.clover',
  })
  : null;

export async function POST(req: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        {
          error: 'Payment system not configured',
          message: 'Stripe API keys are missing. Please configure environment variables to enable booking.',
        },
        { status: 503 }
      );
    }

    const body = await req.json();
    const {
      packageId,
      customerName,
      customerEmail,
      customerPhone,
      landLocation,
      landCoordinates,
      projectDetails,
      bookingDate,
      documentUrls,
    } = body;

    // Validate required fields
    if (!packageId || !customerName || !customerEmail || !bookingDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get package details
    const pkg = getPackageById(packageId);
    if (!pkg) {
      return NextResponse.json(
        { error: 'Invalid package' },
        { status: 400 }
      );
    }

    // Check early access availability
    const earlyAccess = await isEarlyAccessAvailable();
    const price = earlyAccess ? pkg.earlyAccessPrice : pkg.standardPrice;

    // Create booking in database (pending status)
    const bookingId = await createBooking({
      packageId: pkg.id,
      packageName: pkg.name,
      customerName,
      customerEmail,
      customerPhone: customerPhone || '',
      landLocation: landLocation || '',
      landCoordinates,
      projectDetails: projectDetails || '',
      bookingDate,
      pricePaid: price,
      isEarlyAccess: earlyAccess,
      paymentStatus: 'pending',
      documentUrls: documentUrls || [],
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'thb',
            product_data: {
              name: pkg.name,
              description: pkg.tagline,
              images: [`${process.env.NEXT_PUBLIC_BASE_URL}${pkg.image}`],
            },
            unit_amount: price * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/cancelled`,
      customer_email: customerEmail,
      metadata: {
        bookingId,
        packageId: pkg.id,
        bookingDate,
        isEarlyAccess: earlyAccess.toString(),
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
      bookingId,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
