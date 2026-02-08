#!/bin/bash

# 🚀 LANDWISE - POST DNS VERIFICATION SETUP SCRIPT
# Run this script AFTER landwise.com is verified in Resend dashboard

echo "🔍 Checking if landwise.com is verified in Resend..."
echo ""
echo "⚠️  IMPORTANT: Before running this script:"
echo "   1. Check Resend dashboard at https://resend.com/domains"
echo "   2. Ensure landwise.com shows '✓ Verified'"
echo "   3. All DNS records should be green"
echo ""
read -p "Is landwise.com verified? (yes/no): " answer

if [ "$answer" != "yes" ]; then
    echo "❌ Please verify your domain first, then run this script again."
    echo "📚 Check DNS_VERIFICATION_CHECKLIST.md for details"
    exit 1
fi

echo ""
echo "✅ Great! Updating configuration..."
echo ""

# Update .env.local
echo "📝 Updating .env.local..."
sed -i '' 's/RESEND_FROM_EMAIL=onboarding@resend.dev/RESEND_FROM_EMAIL=hello@landwise.com/g' .env.local

if [ $? -eq 0 ]; then
    echo "✅ .env.local updated successfully"
else
    echo "❌ Failed to update .env.local"
    echo "ℹ️  Manually change: RESEND_FROM_EMAIL=hello@landwise.com"
fi

echo ""
echo "🔄 Restarting development server..."
echo ""

# Kill existing dev server
pkill -f "next dev"
sleep 2

# Start new dev server in background
npm run dev &

echo ""
echo "⏳ Waiting for server to start..."
sleep 5

echo ""
echo "✅ SETUP COMPLETE!"
echo ""
echo "🧪 Next steps:"
echo "   1. Open http://localhost:3000"
echo "   2. Submit a test form with a real email address"
echo "   3. Check terminal for:"
echo "      • ✅ Notification email sent: { data: { id: '...' } }"
echo "      • ✅ Auto-reply sent: { data: { id: '...' } }"
echo "   4. Check both inboxes for emails"
echo ""
echo "📧 If emails arrive successfully, you're ready to deploy!"
echo ""
