# ✅ DNS VERIFICATION - COMPLETE SETUP GUIDE

## 📊 Current Status

**System Configuration:** ✅ Ready  
**Email Notifications:** ✅ Working (to shaun@siamoon.com)  
**Auto-Replies:** ⏳ Pending (awaiting DNS verification)  
**Domain Status:** ⏳ landwise.com added to Resend, DNS records pending  

---

## 🎯 What You Need To Do RIGHT NOW

### **Step 1: Add DNS Records to Your Domain Registrar**

Go to your domain registrar's DNS settings (Cloudflare, Namecheap, GoDaddy, etc.) and add these records:

#### **📌 Critical Records (Required):**

1. **DKIM Verification**
   - Type: `TXT`
   - Name: `resend._domainkey`
   - Value: `p=MIGfMA...` (copy from Resend dashboard)

2. **SPF MX Record**
   - Type: `MX`
   - Name: `send`
   - Value: `feedback-smtp.us-east-1.amazonses.com`
   - Priority: `10`

3. **SPF TXT Record**
   - Type: `TXT`
   - Name: `send`
   - Value: `v=spf1 include:amazonses.com ~all`

4. **DMARC (Recommended)**
   - Type: `TXT`
   - Name: `_dmarc`
   - Value: `v=DMARC1; p=none;`

---

### **Step 2: Wait for DNS Propagation**

- **Typical:** 5-30 minutes
- **Maximum:** Up to 48 hours (rare)
- **Check:** https://dnschecker.org/

---

### **Step 3: Verify in Resend Dashboard**

1. Go to https://resend.com/domains
2. Click on `landwise.com`
3. Look for green checkmarks ✓ next to each record
4. Once all verified, the domain status will show "Verified"

---

### **Step 4: Enable Custom Domain**

Once Resend shows "✓ Verified", run this command:

```bash
./enable-custom-domain.sh
```

**Or manually:**

1. Edit `.env.local`:
   ```bash
   # Change this:
   RESEND_FROM_EMAIL=onboarding@resend.dev
   
   # To this:
   RESEND_FROM_EMAIL=hello@landwise.com
   ```

2. Restart server:
   ```bash
   pkill -f "next dev"
   npm run dev
   ```

---

### **Step 5: Test Complete System**

1. **Submit test form** at http://localhost:3000
2. **Check terminal logs** for:
   ```
   ✅ Notification email sent: { data: { id: '...' }, error: null }
   ✅ Auto-reply sent: { data: { id: '...' }, error: null }
   ```
3. **Check email inboxes:**
   - ✅ `shaun@siamoon.com` - Lead notification
   - ✅ Customer email - Auto-reply

---

## 🚀 After Successful Testing

**You're ready to deploy to production!**

1. **Commit changes:**
   ```bash
   git add .
   git commit -m "Complete backend system with email notifications"
   git push
   ```

2. **Deploy to Vercel:**
   - Add environment variables in Vercel dashboard
   - Deploy
   - Test on production URL

3. **Go live!** 🎉

---

## 📁 Files Created

- ✅ `DNS_VERIFICATION_CHECKLIST.md` - Detailed DNS setup guide
- ✅ `enable-custom-domain.sh` - Automated setup script
- ✅ `DNS_SETUP_SUMMARY.md` - This file
- ✅ `/app/api/submit-inquiry/route.ts` - Email API with auto-replies ready
- ✅ `.env.local` - Environment configuration

---

## 🔍 Quick Verification Commands

```bash
# Check if DNS records are live
dig TXT resend._domainkey.landwise.com
dig MX send.landwise.com
dig TXT send.landwise.com

# Check Resend status
# Go to: https://resend.com/domains

# Test after verification
npm run dev
# Then submit form at http://localhost:3000
```

---

## ⚡ Quick Reference

**Current (Before Verification):**
- FROM: `onboarding@resend.dev`
- Notifications: ✅ Working
- Auto-replies: ❌ Disabled

**After Verification:**
- FROM: `hello@landwise.com`
- Notifications: ✅ Working
- Auto-replies: ✅ Working

---

## 📞 Need Help?

**Resend Support:** support@resend.com  
**DNS Issues:** Check with your domain registrar  
**Documentation:** 
- Resend: https://resend.com/docs
- LandWise Backend: See `BACKEND_SETUP_GUIDE.md`

---

**Last Updated:** February 8, 2026  
**Next Action:** Add DNS records to your domain registrar ⏳
