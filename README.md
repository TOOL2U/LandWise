# LandWise - Land Intelligence Platform

A production-ready landing page for LandWise, providing professional land assessment and visualization services on Ko Pha Ngan, Thailand.

## Features

- **Responsive Design**: Mobile-first, optimized for all devices
- **Modern Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Performance**: Lighthouse-optimized with image optimization
- **Clean Code**: Well-structured components, semantic HTML
- **Easy Configuration**: WhatsApp contact via environment variables

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure WhatsApp contact in `.env.local`:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=66123456789
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hi, I'm interested in LandWise services for my land on Ko Pha Ngan.
```

3. Add your images to `/public/assets/`:
   - `01_hero.png` - Hero section background
   - `03_package1_visual.png` - Land Snapshot package
   - `04_package2_visual.png` - Land Visibility Report package
   - `05_package3_visual.png` - Land Ready Package
   - `06_deliverables_section.png` - Deliverables reference
   - `07_footer.png` - Footer reference

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/app
  layout.tsx          # Root layout with metadata
  page.tsx            # Main landing page
  globals.css         # Global styles and Tailwind
/components
  /sections           # Page sections
    Header.tsx        # Navigation header
    Hero.tsx          # Hero section with CTA
    Packages.tsx      # Service packages (3 cards)
    Deliverables.tsx  # What clients receive
    Contact.tsx       # Contact form + WhatsApp
    Footer.tsx        # Site footer
  /ui                 # Reusable UI components
    Button.tsx        # Button component
    Card.tsx          # Card component
/lib
  constants.ts        # WhatsApp and app constants
/public
  /assets            # Images and static assets
```

## Design System

### Colors
- **Deep Forest Green**: `#2F4F4F` - Primary brand color
- **Warm Sand/Stone**: `#E6DFD5` - Background accents
- **Charcoal**: `#1E1E1E` - Text
- **Accent Sky Blue**: `#6FA8DC` - Highlights
- **Clay**: `#C97C5D` - CTA buttons

### Typography
- Font: Inter (Google Fonts)
- Responsive sizing with Tailwind utilities
- Custom heading classes in `globals.css`

## Sections

1. **Header** - Fixed navigation with mobile menu
2. **Hero** - Main headline, CTAs, trust signals
3. **Packages** - 3 service packages with pricing
4. **Deliverables** - What clients receive (6 items)
5. **Contact** - Form + WhatsApp quick contact
6. **Footer** - Brand info, links, location

## Configuration

### WhatsApp Integration

Update the WhatsApp number in `.env.local`:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=66123456789
```

The contact form automatically formats messages and opens WhatsApp.

### Content Updates

All content is in the section components. Update text directly in:
- `/components/sections/Hero.tsx` - Headlines and CTAs
- `/components/sections/Packages.tsx` - Package details and pricing
- `/components/sections/Deliverables.tsx` - Deliverable items
- `/components/sections/Contact.tsx` - Form and contact info

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build and deploy the `.next` folder according to your platform's Next.js hosting guide.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome)

## License

Private - All rights reserved to LandWise

## Support

For technical questions, contact the development team.
