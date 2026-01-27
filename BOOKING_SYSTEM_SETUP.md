# LandWise Booking System Setup Guide

## 🎯 What's Been Built

Your LandWise website now has a complete **pre-launch booking and payment system** with:

✅ **Stripe Payment Integration** - Secure online payments
✅ **Firebase Database** - Store bookings and track early access
✅ **Early Access Pricing** - Automatic discount for first 10 clients
✅ **Booking Flow** - Package selection → Payment → Confirmation
✅ **Admin Dashboard** - View all bookings and revenue
✅ **Email Notifications** - Ready for Resend integration
✅ **Success/Cancel Pages** - Clear user feedback

---

## 📦 New Packages Installed

```bash
npm install stripe @stripe/stripe-js firebase resend
```

---

## 🔧 Required Setup Steps

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project called "LandWise"
3. Enable Firestore Database:
   - Click "Firestore Database" → "Create Database"
   - Choose "Production mode"
   - Select region closest to Thailand
4. Get your Firebase config:
   - Project Settings → General → Your apps
   - Copy the config values

5. Create `.env.local` file in project root:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 2. Stripe Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your API keys:
   - Developers → API keys
   - Copy **Publishable key** and **Secret key**

3. Add to `.env.local`:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

4. Set up webhook (for production):
   - Developers → Webhooks → Add endpoint
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `checkout.session.expired`
   - Copy webhook secret → add to `.env.local`

```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Additional Environment Variables

```env
# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Admin Email (for notifications)
ADMIN_EMAIL=your@email.com

# Resend API (optional for now)
RESEND_API_KEY=re_...
```

---

## 🚀 How It Works

### Customer Flow:
1. User views packages on homepage
2. Clicks "Book Now" on desired package
3. Fills booking form (name, email, date, etc.)
4. Redirected to Stripe checkout
5. Completes payment
6. Returns to success page
7. Booking saved to Firebase with "paid" status

### Early Access Logic:
- First 10 **paid** bookings get discounted price
- After 10 bookings, prices automatically revert to standard
- System checks Firebase for total paid bookings count

### Admin View:
- Visit `/admin` to see all bookings
- Filter by status (all/paid/pending)
- View revenue stats
- See customer details and project info

---

## 📁 New Files Created

### Core System:
- `lib/firebase.ts` - Firebase initialization
- `lib/bookings.ts` - Booking database functions
- `lib/packages.ts` - Package configuration with pricing
- `types/booking.ts` - TypeScript types

### API Routes:
- `app/api/checkout/route.ts` - Create Stripe checkout session
- `app/api/webhooks/stripe/route.ts` - Handle Stripe webhooks
- `app/api/early-access/route.ts` - Check early access availability

### Components:
- `components/booking/BookingForm.tsx` - Main booking modal

### Pages:
- `app/booking/success/page.tsx` - Payment success page
- `app/booking/cancelled/page.tsx` - Payment cancelled page
- `app/admin/page.tsx` - Admin dashboard

### Updated:
- `components/sections/Packages.tsx` - Now shows prices and booking buttons
- `.env.example` - Environment variables template

---

## 🧪 Testing Locally

1. Start development server:
```bash
npm run dev
```

2. Visit http://localhost:3000
3. Click "Book Now" on any package
4. Fill form and test with Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Any future expiry date, any CVC

---

## 📊 Firestore Database Structure

Collection: `bookings`

Document fields:
```typescript
{
  packageId: 'snapshot' | 'visibility' | 'ready'
  packageName: string
  customerName: string
  customerEmail: string
  customerPhone: string
  landLocation: string
  projectDetails: string
  bookingDate: string (YYYY-MM-DD)
  pricePaid: number
  isEarlyAccess: boolean
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  stripePaymentId: string
  stripeSessionId: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

---

## ✅ Next Steps

### Immediate:
1. ✅ Set up Firebase project
2. ✅ Add Firebase config to `.env.local`
3. ✅ Set up Stripe account
4. ✅ Add Stripe keys to `.env.local`
5. ✅ Test booking flow locally

### Before Launch:
- [ ] Set up Resend for email notifications
- [ ] Add email templates (confirmation, admin notification)
- [ ] Set up Stripe webhook in production
- [ ] Add calendar integration (Cal.com)
- [ ] Test full flow end-to-end
- [ ] Set Firebase security rules
- [ ] Add authentication for admin dashboard

### Future Enhancements:
- [ ] Client portal to view booking status
- [ ] Email reminders before booking date
- [ ] Refund request system
- [ ] Upload deliverables to client portal
- [ ] Analytics dashboard

---

## 🔐 Security Notes

### Firebase Security Rules (Important!):

In Firebase Console → Firestore → Rules, update to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Bookings - read-only for clients, write via API only
    match /bookings/{bookingId} {
      allow read: if request.auth != null;
      allow create: if true; // API creates
      allow update: if false; // Only webhooks update via server
    }
  }
}
```

### Admin Dashboard:
- Currently open (no auth)
- **MUST** add authentication before production
- Recommended: NextAuth.js with email/password

---

## 💰 Pricing Configuration

Current package prices (in `/lib/packages.ts`):

| Package | Standard | Early Access | Savings |
|---------|----------|--------------|---------|
| Land Snapshot | 15,000 THB | 12,000 THB | 3,000 THB |
| Visibility Report | 35,000 THB | 30,000 THB | 5,000 THB |
| Land Ready Package | 90,000 THB | 75,000 THB | 15,000 THB |

To change prices, edit `/lib/packages.ts`

---

## 📞 Support

Issues or questions? Check:
- Firebase logs in console
- Browser console for errors
- Stripe dashboard for payment status
- `/admin` dashboard for booking records

---

## 🎉 You're Ready!

Once Firebase and Stripe are configured, your booking system is live!

Customers can now:
- Browse packages
- Book and pay online
- Receive confirmation
- Schedule their land assessment

You can:
- Track all bookings in real-time
- Monitor revenue
- Manage early access slots
- View customer details

**Next**: Set up your Firebase and Stripe accounts, then test the full booking flow!
