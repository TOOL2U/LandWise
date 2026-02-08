# Google Maps API Setup Guide

## Error: ApiNotActivatedMapError

This error means the Google Maps JavaScript API needs to be enabled in your Google Cloud Console.

## Step-by-Step Fix (5 minutes)

### 1. Enable Required APIs

Visit each link and click **"Enable"**:

1. **Maps JavaScript API** (Required for map display)
   - https://console.cloud.google.com/apis/library/maps-backend.googleapis.com

2. **Places API** (Required for location search)
   - https://console.cloud.google.com/apis/library/places-backend.googleapis.com

3. **Geocoding API** (Optional but recommended)
   - https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com

### 2. Configure API Key Restrictions

1. Go to: https://console.cloud.google.com/apis/credentials

2. Click on your API key: `AIzaSyCFZgYVUYakicbYmMSes7PqFrlxHJ4KK-A`

3. Under **"API restrictions"**:
   - Select "Restrict key"
   - Check the boxes for:
     - ✅ Maps JavaScript API
     - ✅ Places API
     - ✅ Geocoding API

4. Under **"Website restrictions"** (Important for security):
   - Add your domains:
     - `http://localhost:3000/*` (for development)
     - `https://yourdomain.com/*` (for production)

5. Click **"Save"**

### 3. Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### 4. Test the Map Picker

1. Go to: http://localhost:3000
2. Scroll to "Free Land Quick Check" form
3. Click "Select on Map" button
4. You should now see an interactive map!

## API Costs & Limits

### Free Tier (Google Cloud)
- **$200 free credit** per month
- **28,000 map loads** per month free
- **100,000 geocoding requests** per month free

### Your Usage Estimate
With 3 forms using the map picker:
- Average website: ~1,000 visitors/month
- If 30% use map: ~300 map loads/month
- **Cost: $0** (well within free tier)

### Monitor Usage
- Dashboard: https://console.cloud.google.com/apis/dashboard
- Set up billing alerts to stay informed

## Fallback Behavior

**Good news**: The site works even without the API enabled!

If the Maps API isn't available, users will see:
- ⚠️ "Unable to load Google Maps"
- 📝 Text input to paste a Google Maps link instead
- ✅ Forms still submit successfully

## Troubleshooting

### Still seeing the error after enabling APIs?

1. **Wait 2-3 minutes** - API activation can take time
2. **Clear browser cache** - Ctrl+Shift+Delete (Chrome)
3. **Hard refresh** - Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
4. **Check API key** - Make sure it's correctly set in `.env.local`

### API key not working?

Verify your `.env.local` file:
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyCFZgYVUYakicbYmMSes7PqFrlxHJ4KK-A
```

**Important**: The variable name must be exactly `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### Need a new API key?

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click "Create Credentials" → "API Key"
3. Copy the new key to `.env.local`
4. Configure restrictions (see Step 2 above)

## Security Best Practices

### ⚠️ Before deploying to production:

1. **Remove localhost** from API key restrictions
2. **Add production domain** (e.g., `landwise.com`)
3. **Enable billing alerts** to avoid surprise charges
4. **Set usage quotas** to prevent abuse

### Example Production Restrictions:
```
Website restrictions:
- https://landwise.com/*
- https://www.landwise.com/*

API restrictions:
- Maps JavaScript API
- Places API
- Geocoding API
```

## Support

### Official Documentation
- Maps JavaScript API: https://developers.google.com/maps/documentation/javascript
- Places API: https://developers.google.com/maps/documentation/places/web-service
- Error Messages: https://developers.google.com/maps/documentation/javascript/error-messages

### Your Current Setup
- **API Key**: `AIzaSyCFZgYVUYakicbYmMSes7PqFrlxHJ4KK-A`
- **Project**: Check at https://console.cloud.google.com/
- **Free Tier**: Active (unless you've exceeded $200/month)

---

**Next Step**: Click the API enable links above and you'll be up and running in 5 minutes! 🚀
