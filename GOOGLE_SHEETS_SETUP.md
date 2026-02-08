# LANDWISE – GOOGLE SHEETS LEAD TRACKER

## 📊 Quick Setup Template

### Sheet Name: `LandWise Leads`

---

## Column Headers (Row 1)

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| **Date** | **Name** | **Contact** | **Service** | **Location** | **Status** | **Form Type** | **Notes** |

---

## Data Validation Setup

### Column F (Status) - Dropdown List:
```
New
Contacted
Survey Scheduled
Completed
Closed
```

**How to set up:**
1. Select column F
2. Data → Data validation
3. Criteria: List from a range
4. Enter: `New, Contacted, Survey Scheduled, Completed, Closed`

---

## Conditional Formatting (Optional)

### Color-code by Status:

- **New** → Light Yellow (#FFF9C4)
- **Contacted** → Light Blue (#BBDEFB)
- **Survey Scheduled** → Light Orange (#FFE0B2)
- **Completed** → Light Green (#C8E6C9)
- **Closed** → Light Grey (#EEEEEE)

**How to set up:**
1. Select Status column
2. Format → Conditional formatting
3. Add rules for each status value

---

## Example Rows:

| Date | Name | Contact | Service | Location | Status | Form Type | Notes |
|------|------|---------|---------|----------|--------|-----------|-------|
| 2026-02-08 14:30 | John Smith | john@example.com | Land Snapshot | Thong Nai Pan | New | Quote Request | 2 rai plot |
| 2026-02-08 15:45 | Jane Doe | +66 81 234 5678 | Visibility Report | Haad Rin | Contacted | Contact Form | Called back, sending quote |
| 2026-02-07 10:20 | Mike Johnson | mike@email.com | Land Ready Package | Baan Tai | Survey Scheduled | Package Inquiry | Survey set for Feb 12 |

---

## Filter Views (Recommended)

### Create these saved filter views:

1. **Active Leads**
   - Status is NOT "Closed"
   - Sort by Date (newest first)

2. **Need Follow-up**
   - Status = "New" OR "Contacted"
   - Older than 2 days

3. **This Week**
   - Date within last 7 days
   - Status is NOT "Closed"

---

## Formulas (Optional Automation)

### Auto-count leads by status:

Create a summary tab with:

```
=COUNTIF(Leads!F:F, "New")
=COUNTIF(Leads!F:F, "Contacted")
=COUNTIF(Leads!F:F, "Survey Scheduled")
=COUNTIF(Leads!F:F, "Completed")
```

### Response time tracking:

Add column I: "Contacted Date"
Add column J: "Response Time (hours)"

Formula in J2:
```
=IF(I2="", "", (I2-A2)*24)
```

---

## Daily Workflow

### Morning Checklist:
1. Open "Need Follow-up" filter view
2. Review new leads from yesterday
3. Update Status for contacted leads
4. Add notes for each interaction

### End of Day:
1. Ensure all new leads have Status updated
2. Add notes for any scheduled surveys
3. Review "Active Leads" for tomorrow

---

## Mobile Access

**Recommended**: Google Sheets mobile app
- Install on phone
- Pin "LandWise Leads" sheet
- Enable offline access
- Quick status updates from field

---

## Backup Strategy

### Auto-backup setup:
1. File → Version history → See version history
2. Or use Google Drive sync to computer
3. Export weekly: File → Download → CSV

---

## Sharing & Permissions

### Recommended setup:
- **Owner**: Main operator
- **Editor**: Team members who handle inquiries
- **Viewer**: Stakeholders who track metrics

### How to share:
1. Click "Share" button
2. Add email addresses
3. Set permission level
4. Send invitations

---

## Integration with Forms (Phase 2)

When ready to auto-populate from website:

### Requirements:
- Google Cloud Project
- Sheets API enabled
- Service account credentials
- Update code in `/app/api/submit-inquiry/route.ts`

### Add to environment:
```
GOOGLE_SHEETS_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=service@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...
```

---

## Advanced Features (Optional)

### 1. Email Notifications:
Use Google Apps Script to send email when new row added

### 2. Slack Integration:
Post to Slack channel when Status changes to "Survey Scheduled"

### 3. Chart Dashboard:
Create charts tab showing:
- Leads per week
- Conversion rates
- Popular services
- Response time trends

---

## Troubleshooting

### Sheet is slow?
- Archive old "Closed" leads to separate tab
- Keep main sheet under 1000 rows
- Remove complex formulas

### Can't see changes?
- Refresh browser
- Check if someone else is editing
- Look at version history

---

## Monthly Maintenance

### Tasks:
1. Archive completed/closed leads older than 90 days
2. Review response time metrics
3. Update any formula errors
4. Export backup copy
5. Clean up notes column

---

## Quick Reference Card (Print & Post)

```
STATUS FLOW:
New → Contacted → Survey Scheduled → Completed → Closed

DAILY ROUTINE:
☐ Check "New" leads
☐ Update Status after contact
☐ Add notes
☐ Schedule surveys
☐ Follow up on "Contacted"

RESPONSE TARGET:
< 24 hours for all New leads
```

---

**Created**: February 8, 2026  
**For**: LandWise Operations  
**Sheet URL**: [Add your sheet link here]
