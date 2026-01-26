#!/bin/bash

# Image Replacement Helper Script
# This script helps you add images to your LandWise project

echo "🎨 LandWise Image Setup Helper"
echo "=============================="
echo ""

ASSETS_DIR="public/assets"

# Check if assets directory exists
if [ ! -d "$ASSETS_DIR" ]; then
    echo "❌ Error: Assets directory not found!"
    echo "   Expected: $ASSETS_DIR"
    exit 1
fi

echo "Current images in $ASSETS_DIR:"
echo ""
ls -lh "$ASSETS_DIR"
echo ""

echo "📝 Required Images:"
echo ""
echo "1. 01_hero.png (or .jpg)"
echo "   - Hero section background"
echo "   - Recommended: 1920x1080px or larger"
echo "   - Should show Ko Pha Ngan landscape/beach/hills"
echo ""
echo "2. 03_package1_visual.png"
echo "   - Land Snapshot package"
echo "   - Recommended: 600x400px"
echo "   - Could show: drone map, 2D terrain view"
echo ""
echo "3. 04_package2_visual.png"
echo "   - Land Visibility Report package"
echo "   - Recommended: 600x400px"
echo "   - Could show: PDF report mockup, analysis charts"
echo ""
echo "4. 05_package3_visual.png"
echo "   - Land Ready Package"
echo "   - Recommended: 600x400px"
echo "   - Could show: before/after, robot mower, survey"
echo ""

echo "🔧 To add images:"
echo ""
echo "1. Copy your images to: $ASSETS_DIR/"
echo "2. Name them exactly as shown above"
echo "3. Supported formats: .png, .jpg, .jpeg, .webp"
echo ""

echo "💡 Pro Tips:"
echo ""
echo "- Optimize images first (use TinyPNG.com)"
echo "- Keep files under 500KB each for fast loading"
echo "- Use .png for images with transparency"
echo "- Use .jpg for photos/complex images"
echo ""

# Check which images are present
echo "📊 Image Status:"
echo ""

check_image() {
    local name=$1
    local found=false
    
    for ext in png jpg jpeg webp svg; do
        if [ -f "$ASSETS_DIR/${name}.$ext" ]; then
            size=$(du -h "$ASSETS_DIR/${name}.$ext" | cut -f1)
            echo "✅ ${name}.$ext - $size"
            found=true
            break
        fi
    done
    
    if [ "$found" = false ]; then
        echo "⚠️  ${name} - MISSING (using placeholder)"
    fi
}

check_image "01_hero"
check_image "03_package1_visual"
check_image "04_package2_visual"
check_image "05_package3_visual"

echo ""
echo "🚀 Next Steps:"
echo ""
echo "1. Add missing images to $ASSETS_DIR/"
echo "2. If you renamed files, update components:"
echo "   - components/sections/Hero.tsx (line 11)"
echo "   - components/sections/Packages.tsx (lines 8-52)"
echo ""
echo "3. Restart dev server if needed:"
echo "   npm run dev"
echo ""
echo "4. Check http://localhost:3000 to see your changes"
echo ""
echo "✨ Done! Your site will look amazing with real images."
