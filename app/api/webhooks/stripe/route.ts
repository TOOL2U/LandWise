import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { updateBookingPaymentStatus } from '@/lib/bookings';

// Initialize Stripe only if API key is configured
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
    })
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe || !webhookSecret) {
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 503 }
      );
    }

    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const bookingId = session.metadata?.bookingId;
        
        if (bookingId) {
          await updateBookingPaymentStatus(
            bookingId,
            'paid',
            session.payment_intent as string
          );
          
          // TODO: Send confirmation email here
          console.log(`Payment successful for booking ${bookingId}`);
        }
        break;
      }

      case 'checkout.session.expired':
      case 'payment_intent.payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const bookingId = session.metadata?.bookingId;
        
        if (bookingId) {
          await updateBookingPaymentStatus(bookingId, 'failed');
          console.log(`Payment failed for booking ${bookingId}`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
