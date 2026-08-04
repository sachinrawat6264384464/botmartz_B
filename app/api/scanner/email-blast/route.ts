import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { email, password, subject, htmlBody, targetAudience } = await req.json();

    // Verify admin credentials
    if (email !== 'botmartz@gmail.com' || password !== 'Admin@2026##') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!subject || !htmlBody) {
      return NextResponse.json({ error: 'Subject and HTML Body are required' }, { status: 400 });
    }

    const collectionName = targetAudience === 'bootcamps' ? 'bootcamp_registrations' : 'event-registrations';

    // Fetch all paid registrations
    let snapshot;
    if (collectionName === 'bootcamp_registrations') {
      snapshot = await adminDb.collection(collectionName)
        .where('status', '==', 'paid')
        .get();
    } else {
      snapshot = await adminDb.collection(collectionName)
        .where('paymentStatus', '==', 'paid')
        .get();
    }

    // Extract unique emails
    const uniqueEmails = new Set<string>();
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.email) {
        uniqueEmails.add(data.email);
      }
    });

    const emailList = Array.from(uniqueEmails);
    if (emailList.length === 0) {
      return NextResponse.json({ error: 'No paid attendees found to send emails to.' }, { status: 404 });
    }

    const smtpUser = process.env.SMTP_USER;
    if (!smtpUser) {
      return NextResponse.json({ error: 'SMTP user is not configured.' }, { status: 500 });
    }

    // Wrap the user's HTML in a basic template for consistency
    const wrappedHtmlBody = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#050B14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050B14;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0A111F;border:1px solid #1E293B;border-radius:16px;overflow:hidden;padding:32px;">
          <tr>
            <td style="padding-bottom:24px;border-bottom:1px solid #1E293B;">
              <span style="font-size:16px;font-weight:800;letter-spacing:-0.3px;color:#ffffff;text-transform:uppercase;">BOTMARTZ AI SOLUTION PVT LTD</span>
              <span style="font-size:11px;color:#00B8F0;font-weight:600;margin-left:8px;font-family:monospace;">/ EVENTS</span>
            </td>
          </tr>
          <tr>
            <td style="padding-top:32px;padding-bottom:24px;color:#8A9EB0;font-size:15px;line-height:1.6;">
              ${htmlBody}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // Send emails in batches of 10 to avoid overwhelming SMTP server
    const batchSize = 10;
    let sentCount = 0;

    for (let i = 0; i < emailList.length; i += batchSize) {
      const batch = emailList.slice(i, i + batchSize);
      
      const promises = batch.map(attendeeEmail => {
        return transporter.sendMail({
          from: `"Botmartz Events" <${smtpUser}>`,
          to: attendeeEmail,
          subject: subject,
          html: wrappedHtmlBody,
        }).catch(err => console.error(`Failed to send blast to ${attendeeEmail}:`, err));
      });

      await Promise.all(promises);
      sentCount += batch.length;
      
      // small delay between batches
      if (i + batchSize < emailList.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return NextResponse.json({ success: true, sentCount });

  } catch (err: any) {
    console.error('[email-blast error]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
