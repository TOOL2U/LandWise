# LANDWISE – BACKEND SETUP GUIDE

## 🎯 Overview

This document provides step-by-step instructions for setting up the basic backend workflow for LandWise. This system enables:
- Lead capture from website forms
- Email notifications
- Auto-reply emails
- Lead tracking (ready for Google Sheets integration)

---

## 📋 Setup Checklist

### 1. Email Service (Resend) - **REQUIRED FOR LAUNCH**

#### Step 1: Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your domain (or use their test domain for development)

#### Step 2: Get API Key
1. Navigate to **API Keys** in Resend dashboard
2. Create a new API key
3. Copy the key (starts with `re_...`)

#### Step 3: Add to Environment Variables
Add to your `.env.local` file:
```bash
RESEND_API_KEY=re_your_actual_api_key_here
LANDWISE_EMAIL=info@landwise.co.th
RESEND_FROM_EMAIL=LandWise <noreply@yourdomain.com>
```

**Note**: Replace `info@landwise.co.th` with your actual business email.

---

### 2. Environment Configuration

Create a `.env.local` file in the project root with these variables:

```bash
# Email Configuration (CRITICAL)
RESEND_API_KEY=re_your_resend_api_key
LANDWISE_EMAIL=info@landwise.co.th
RESEND_FROM_EMAIL=LandWise <noreply@yourdomain.com>

# WhatsApp
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hi, I'm interested in LandWise services

# Optional: Firebase (if using booking system)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Optional: Stripe (if using payment system)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_your_key
STRIPE_SECRET_KEY=sk_your_key
```

---

### 3. Testing the Forms

#### Test Contact Form
1. Go to `http://localhost:3001/#contact`
2. Fill out the form with test data
3. Submit and verify:
   - ✅ Success message appears
   - ✅ Email notification received
   - ✅ Auto-reply email received
   - ✅ WhatsApp opens with pre-filled message

#### Test Quote Request
1. Go to Additional Services section
2. Click "Request a Quote" on any service
3. Fill out the modal form
4. Verify same as above

---

### 4. Google Sheets Integration (PHASE 2 - After Launch)

**Status**: Code prepared, ready to implement

The system is designed to save all form submissions to a Google Sheet. To enable:

#### Step 1: Create Google Cloud Project
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project
3. Enable Google Sheets API

#### Step 2: Create Service Account
1. Go to IAM & Admin → Service Accounts
2. Create service account
3. Download JSON key file
4. Add key to environment variables

#### Step 3: Create Tracking Sheet
Create a Google Sheet with these columns:

| Date | Name | Email/Phone | Service | Land Location | Status | Notes |
|------|------|-------------|---------|---------------|--------|-------|

#### Step 4: Add Google Sheets Code
Uncomment the Google Sheets integration code in:
`/app/api/submit-inquiry/route.ts`

---

## 📊 Lead Tracking Sheet Template

### Suggested Columns:

1. **Date** - Auto-filled timestamp
2. **Name** - From form
3. **Email/Phone** - Contact info
4. **Service Requested** - Package or service name
5. **Land Location** - Where the land is
6. **Status** - Dropdown: `New`, `Contacted`, `Survey Scheduled`, `Completed`, `Closed`
7. **Notes** - Manual notes by operator
8. **Form Type** - Contact Form, Quote Request, Package Inquiry
9. **Message** - Additional details from user

### Status Workflow:

```
New → Contacted → Survey Scheduled → Completed → Closed
```

---

## 🔧 How Forms Work

### Flow Diagram:

```
User fills form
    ↓
Submit to /api/submit-inquiry
    ↓
├─→ Send email notification (to LandWise)
├─→ Send auto-reply email (to customer)
├─→ Log to Google Sheets (when enabled)
└─→ Open WhatsApp (backup/additional channel)
```

### Email Templates:

**Notification Email (to LandWise):**
```
Subject: New Quote Request – LandWise

New inquiry received from LandWise website:

Form Type: Quote Request
Date: Feb 8, 2026 14:30 ICT

Name: John Smith
Contact: john@example.com
Service Requested: Drone Survey
Land Location: Thong Nai Pan, Ko Pha Ngan

Message:
I'd like to get a quote for surveying my 2 rai plot.
```

**Auto-Reply Email (to Customer):**
```
Subject: We've received your request – LandWise

Hi John,

Thanks for contacting LandWise. We've received your request 
and will review your land details shortly.

We usually respond within 24 hours.

Best regards,
LandWise Team
Land Intelligence Services
Ko Pha Ngan, Thailand
```

---

## ✅ Testing Checklist

Before launch, test:

- [ ] Contact form submits successfully
- [ ] Quote request modal submits successfully
- [ ] Notification emails arrive at business inbox
- [ ] Auto-reply emails arrive at customer email
- [ ] WhatsApp opens with correct message
- [ ] Success message displays after submission
- [ ] Error message displays if submission fails
- [ ] Form data persists if submission fails
- [ ] Mobile form submission works
- [ ] Forms load quickly on slow connection

---

## 🚨 Troubleshooting

### No emails received?
- Check RESEND_API_KEY is correct
- Verify domain in Resend dashboard
- Check spam folder
- Look at server logs for errors

### Form won't submit?
- Check browser console for errors
- Verify API route is accessible
- Check network tab in dev tools

### WhatsApp not opening?
- Verify phone number format: `66933880630`
- Check NEXT_PUBLIC_WHATSAPP_MESSAGE is set
- Test on mobile device

---

## 📱 Mobile Testing

**Critical**: Test all forms on:
- iOS Safari
- Android Chrome
- Small screens (320px width)
- Slow 3G connection

---

## 🔐 Security Notes

- Never commit `.env.local` to git
- Keep API keys secure
- Use environment variables for all sensitive data
- Enable CORS only for your domain in production

---

## 📈 Phase 2 Enhancements (Post-Launch)

After initial launch, consider adding:

1. **Google Sheets Auto-Sync** - Uncomment code in API route
2. **Calendar Integration** - Google Calendar API for survey scheduling
3. **SMS Notifications** - Twilio for instant alerts
4. **Dashboard** - Simple admin panel for lead management
5. **Analytics** - Track form conversion rates

---

## 🆘 Support

For implementation questions:
1. Check this guide first
2. Review code comments in `/app/api/submit-inquiry/route.ts`
3. Check Next.js documentation
4. Check Resend documentation

---

## ✨ Success Metrics

Track these KPIs:
- Form submission rate
- Email delivery rate
- Response time to leads
- Conversion from inquiry to booking

---

**Last Updated**: February 8, 2026
**Version**: 1.0
**Status**: Ready for Launch Testing
