import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Google Sheets integration would go here
// For now, we'll log to console and can add Google Sheets API later

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      contact,
      landLocation,
      latitude,
      longitude,
      mapsLink,
      service,
      message,
      formType = 'General Inquiry'
    } = body;

    // Validate required fields
    if (!name || !contact) {
      return NextResponse.json(
        { error: 'Name and contact information are required' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // Build location string with Google Maps link if available
    const locationDisplay = mapsLink 
      ? `${landLocation || 'Location Selected'}\n📍 View on map: ${mapsLink}\n📌 Coordinates: ${latitude}, ${longitude}`
      : landLocation || 'Not provided';

    // Prepare email content
    const emailSubject = `New ${formType} – LandWise`;
    const emailBody = `
New inquiry received from LandWise website:

Form Type: ${formType}
Date: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })}

Name: ${name}
Contact: ${contact}
Service Requested: ${service || 'Not specified'}

Land Location:
${locationDisplay}

Message:
${message || 'No message provided'}

---
This inquiry was submitted via the LandWise website.
    `.trim();

    // Send email notification if Resend is configured
    if (resend && process.env.LANDWISE_EMAIL) {
      try {
        console.log('📧 Sending notification email to:', process.env.LANDWISE_EMAIL);
        const notificationResult = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'LandWise <onboarding@resend.dev>',
          to: process.env.LANDWISE_EMAIL,
          subject: emailSubject,
          text: emailBody,
        });
        console.log('✅ Notification email sent:', notificationResult);

        // Send auto-reply email to customer
        if (contact.includes('@')) {
          console.log('📧 Sending auto-reply to:', contact);
          const autoReplyResult = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'LandWise <hello@landwise.com>',
            to: contact,
            subject: "We've received your request – LandWise",
            text: `Hi ${name},

Thanks for contacting LandWise. We've received your request and will review your land details shortly.

We usually respond within 24 hours. If you need immediate assistance, feel free to reach out via WhatsApp.

Best regards,
LandWise Team
Land Intelligence Services
Ko Pha Ngan, Thailand`,
          });
          console.log('✅ Auto-reply sent:', autoReplyResult);
        }
      } catch (emailError) {
        console.error('❌ Email sending error:', emailError);
        // Continue even if email fails - we still want to log the inquiry
      }
    } else {
      console.warn('⚠️ Resend not configured. Missing:', {
        hasResend: !!resend,
        hasEmail: !!process.env.LANDWISE_EMAIL
      });
    }

    // Log the inquiry (in production, this would save to Google Sheets)
    console.log('New inquiry received:', {
      timestamp,
      name,
      contact,
      service,
      landLocation,
      latitude,
      longitude,
      mapsLink,
      formType
    });

    // TODO: Add Google Sheets integration here
    // const sheets = google.sheets({ version: 'v4', auth });
    // await sheets.spreadsheets.values.append({
    //   spreadsheetId: process.env.GOOGLE_SHEET_ID,
    //   range: 'Inquiries!A:I',
    //   valueInputOption: 'USER_ENTERED',
    //   requestBody: {
    //     values: [[timestamp, name, contact, service, landLocation, latitude, longitude, mapsLink, message, 'New']]
    //   }
    // });

    return NextResponse.json({
      success: true,
      message: 'Thank you. We\'ve received your request and will contact you shortly.'
    });

  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { 
        error: 'There was an error submitting your request. Please try again or contact us directly via WhatsApp.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
