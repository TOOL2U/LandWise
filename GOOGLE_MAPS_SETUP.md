# Google Maps Setup Instructions

## Current Status
⚠️ Google Maps API key is not configured or invalid.

## Impact
- Map location picker won't work
- Users will see "Or Paste Link" fallback option
- Forms still function - users can paste Google Maps links

## How to Fix

### Step 1: Get Google Maps API Key

1. Go to: https://console.cloud.google.com/google/maps-apis
2. Create a new project or select existing
3. Enable these APIs:
   - **Maps JavaScript API**
   - **Places API** (for location search)
4. Go to Credentials → Create Credentials → API Key
5. Copy your API key

### Step 2: Configure Environment

Create `.env.local` file in project root:

```bash
# Required for map picker
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...your_actual_key_here

# Already configured
NEXT_PUBLIC_WHATSAPP_NUMBER=66933880630
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional - for email notifications
# RESEND_API_KEY=re_...
# LANDWISE_EMAIL=your@email.com
```

### Step 3: Restart Server

```bash
npm run dev
```

## API Key Restrictions (Production)

For security, restrict your API key:

1. **Application restrictions:**
   - HTTP referrers (websites)
   - Add: `yourdomain.com/*` and `*.yourdomain.com/*`

2. **API restrictions:**
   - Restrict key to: Maps JavaScript API, Places API

3. **Set usage quotas:**
   - Monitor in Google Cloud Console
   - Set alerts for quota limits

## Free Tier Limits

Google Maps offers generous free tier:
- **28,000 map loads/month** free
- **$200 credit/month**
- Billing account required (won't charge unless you exceed free tier)

## Cost Estimates

Typical usage for LandWise:
- 100 form submissions/day = 3,000/month
- Well within free tier
- Cost if exceeded: ~$7 per 1,000 additional loads

## Testing Without API Key

The forms will still work:
1. "Or Paste Link" button is always available
2. Users can paste Google Maps URLs directly
3. Coordinates are extracted automatically
4. No functionality is blocked

## Troubleshooting

### Error: InvalidKeyMapError
- API key is missing or invalid
- Check `.env.local` has correct key
- Restart dev server after adding key

### Error: RefererNotAllowedMapError
- API key is restricted to different domain
- Add your domain to restrictions
- Use unrestricted key for development

### Map doesn't load
- Check browser console for specific error
- Verify both APIs are enabled
- Check billing account is set up

## Support

Google Maps API Documentation:
- Setup: https://developers.google.com/maps/documentation/javascript/get-api-key
- Errors: https://developers.google.com/maps/documentation/javascript/error-messages
- Pricing: https://mapsplatform.google.com/pricing/

## Alternative (Temporary)

If you can't get API key right now:
1. Forms work with "Paste Link" option
2. Users paste: `https://maps.app.goo.gl/...`
3. System extracts coordinates automatically
4. No degradation in data quality

This is a valid approach for initial launch or testing.

---

**Quick Start:** Copy `.env.local.example` to `.env.local` and add your API key.
