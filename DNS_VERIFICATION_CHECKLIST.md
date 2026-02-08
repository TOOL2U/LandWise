# 🌐 LANDWISE DNS VERIFICATION CHECKLIST

## Current Status
- Domain: `landwise.com`
- Added to Resend: ✅
- DNS Records Added: ⏳ (Awaiting your action)
- Verified: ⏳ (Pending DNS propagation)

---

## 📋 Step 1: Add DNS Records

You need to add these records to your **domain registrar** (Cloudflare, Namecheap, GoDaddy, etc.):

### **Record 1: DKIM (Required for verification)**
```
Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC... (the long value from Resend)
TTL: Auto or 3600
```

### **Record 2: SPF - MX Record (Required for sending)**
```
Type: MX
Name: send
Value: feedback-smtp.us-east-1.amazonses.com (or the value shown in Resend)
Priority: 10
TTL: Auto or 3600
```

### **Record 3: SPF - TXT Record (Required for sending)**
```
Type: TXT
Name: send
Value: v=spf1 include:amazonses.com ~all (or the value shown in Resend)
TTL: Auto or 3600
```

### **Record 4: DMARC (Optional but recommended)**
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none;
TTL: Auto or 3600
```

---

## 🔍 Step 2: Verify DNS Records Are Added

After adding records, verify they're live using these commands:

```bash
# Check DKIM record
dig TXT resend._domainkey.landwise.com

# Check SPF MX record
dig MX send.landwise.com

# Check SPF TXT record
dig TXT send.landwise.com

# Check DMARC record
dig TXT _dmarc.landwise.com
```

**Or use online tools:**
- https://mxtoolbox.com/SuperTool.aspx
- https://dnschecker.org/

---

## ⏱️ Step 3: Wait for DNS Propagation

- **Typical time:** 5-30 minutes
- **Maximum time:** Up to 48 hours (rare)
- **Check status:** Resend dashboard will show "✓ Verified" when complete

---

## 🧪 Step 4: Test After Verification

Once Resend shows "✓ Verified":

### **A. Update Environment Variable**

Edit `.env.local`:
```bash
# Change this line:
RESEND_FROM_EMAIL=onboarding@resend.dev

# To this:
RESEND_FROM_EMAIL=hello@landwise.com
```

### **B. Update API Route**

The code is already prepared! Just update the FROM address once verified.

### **C. Restart Dev Server**
```bash
pkill -f "next dev"
npm run dev
```

### **D. Submit Test Form**
1. Go to http://localhost:3000
2. Fill out contact form with a real email (like shaunducker1@gmail.com)
3. Submit

### **E. Check Terminal Logs**

You should see:
```
📧 Sending notification email to: shaun@siamoon.com
✅ Notification email sent: { data: { id: '...' }, error: null }
📧 Sending auto-reply to: [customer email]
✅ Auto-reply sent: { data: { id: '...' }, error: null }
```

### **F. Check Both Inboxes**
- ✅ `shaun@siamoon.com` - Lead notification
- ✅ Customer email - Auto-reply confirmation

---

## ✅ Success Indicators

**DNS is verified when:**
1. Resend dashboard shows green checkmark ✓
2. No "domain not verified" errors in logs
3. Both notification AND auto-reply emails have `data: { id: '...' }` (not null)
4. Emails arrive in both inboxes

---

## ❌ Troubleshooting

### **Problem: DNS records not propagating**
**Solution:** 
- Double-check values match exactly (copy-paste from Resend)
- Remove any extra spaces
- Wait longer (can take up to 48 hours in rare cases)

### **Problem: "Domain not verified" error persists**
**Solution:**
- Click "Verify" button in Resend dashboard manually
- Check DNS records using `dig` commands above
- Ensure records were added to the ROOT domain (landwise.com), not a subdomain

### **Problem: Emails send but don't arrive**
**Solution:**
- Check spam/junk folders
- Verify DMARC record is added
- Test with different email providers (Gmail, Outlook, etc.)

---

## 📊 Current Configuration

**Working (Before Verification):**
```
FROM: LandWise <onboarding@resend.dev>
TO: shaun@siamoon.com ✅
TO: Customer emails ❌ (blocked)
```

**After Verification:**
```
FROM: LandWise <hello@landwise.com>
TO: shaun@siamoon.com ✅
TO: Customer emails ✅
```

---

## 🚀 Quick Reference Commands

```bash
# Check DNS records
dig TXT resend._domainkey.landwise.com
dig MX send.landwise.com

# Restart dev server
pkill -f "next dev" && npm run dev

# Test form submission
# Just use the website at http://localhost:3000

# View logs
# Watch terminal output after form submission
```

---

## 📧 Contact for Support

**Resend Support:** support@resend.com  
**Documentation:** https://resend.com/docs/dashboard/domains/introduction

---

**Last Updated:** February 8, 2026  
**Status:** Awaiting DNS verification ⏳
