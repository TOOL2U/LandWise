# Quick Reference - LandWise Landing Page

## Common Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
```

## File Locations

### Content Updates
- **Hero text**: `components/sections/Hero.tsx`
- **Package details**: `components/sections/Packages.tsx`
- **Contact info**: `components/sections/Contact.tsx`
- **Footer**: `components/sections/Footer.tsx`

### Styling
- **Colors**: `tailwind.config.ts`
- **Global styles**: `app/globals.css`
- **Component styles**: Tailwind classes in component files

### Configuration
- **WhatsApp**: `.env.local`
- **SEO/Metadata**: `app/layout.tsx`
- **Next.js config**: `next.config.js`

## Quick Edits

### Change Package Price
```typescript
// components/sections/Packages.tsx
{
  name: 'LAND SNAPSHOT',
  price: '15,000–25,000 THB',  // ← Change here
  // ...
}
```

### Change Hero Headline
```typescript
// components/sections/Hero.tsx
<h1 className="heading-xl text-forest mb-6">
  Land Intelligence for Confident Decisions  // ← Change here
</h1>
```

### Change Brand Colors
```typescript
// tailwind.config.ts
colors: {
  'forest': '#2F4F4F',   // ← Change colors here
  'sand': '#E6DFD5',
  'charcoal': '#1E1E1E',
  'sky': '#6FA8DC',
  'clay': '#C97C5D',
}
```

### Update WhatsApp Number
```env
# .env.local
NEXT_PUBLIC_WHATSAPP_NUMBER=66123456789  # ← Your number
```

## Component Structure

```
Header (Fixed Nav)
  └─ Logo + Nav Links + CTA

Hero
  └─ Headline + Subhead + 2 CTAs + Trust Signals

Packages
  └─ 3 Package Cards
      └─ Image + Title + Features + Price + CTA

Deliverables
  └─ 6 Icon Cards
      └─ Icon + Title + Description

Contact
  └─ Form + Quick WhatsApp + Trust Signals

Footer
  └─ Brand + Links + Location
```

## Responsive Breakpoints

```
sm:  640px   (Tablets)
md:  768px   (Small laptops)
lg:  1024px  (Desktops)
xl:  1280px  (Large screens)
```

## Color Usage Guide

- **forest** - Headers, navigation, primary text
- **sand** - Backgrounds, subtle accents
- **charcoal** - Body text
- **sky** - Badges, icons, highlights
- **clay** - Primary CTA buttons

## Image Requirements

| File | Size | Usage |
|------|------|-------|
| `01_hero.png` | 1920x1080+ | Hero background |
| `03_package1_visual.png` | 600x400 | Package 1 card |
| `04_package2_visual.png` | 600x400 | Package 2 card |
| `05_package3_visual.png` | 600x400 | Package 3 card |

## Environment Variables

```env
# Required
NEXT_PUBLIC_WHATSAPP_NUMBER=66123456789

# Optional (has defaults)
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hi, I'm interested in...
```

## Testing Checklist

- [ ] All images load correctly
- [ ] WhatsApp links open properly
- [ ] Mobile menu works
- [ ] Smooth scroll to sections
- [ ] Contact form submits to WhatsApp
- [ ] All CTAs functional
- [ ] Responsive on mobile
- [ ] No console errors

## Deploy to Vercel

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial LandWise landing page"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repo
5. Add environment variables
6. Click "Deploy"

## Support

Check these files for more info:
- `README.md` - Full documentation
- `SETUP_GUIDE.md` - Complete setup guide
- `/public/assets/README.md` - Image guide
