import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

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
    const { subject, previewText, html, campaignId, blogTemplate } = await req.json();

    if (!subject || !html) {
      return NextResponse.json({ error: 'Subject and content are required.' }, { status: 400 });
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      return NextResponse.json(
        { error: 'SMTP_USER or SMTP_PASS env vars are not set.' },
        { status: 500 }
      );
    }

    // Fetch all active subscribers
    const q = query(
      collection(db, 'newsletter'),
      where('status', '==', 'active')
    );
    const snapshot = await getDocs(q);
    const subscribers = snapshot.docs.map((d) => ({
      id: d.id,
      email: d.data().email as string,
      name: d.data().name as string | undefined,
    }));

    if (subscribers.length === 0) {
      return NextResponse.json({ error: 'No active subscribers to send to.' }, { status: 400 });
    }

    // Build full HTML with unsubscribe link injected
    const buildHtml = (email: string, name?: string) => {
      const unsubToken = Buffer.from(email).toString('base64');
      const unsubLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/newsletter/unsubscribe?token=${unsubToken}`;
      const greeting = name ? `Hi ${name},` : 'Hi there,';

      if (blogTemplate) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<span style="display:none;max-height:0;overflow:hidden;font-size:0;line-height:0;color:transparent;">${previewText || subject}</span>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr><td style="padding-bottom:24px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <span style="font-size:18px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;text-transform:uppercase;">BOTMARTZ</span>
              <span style="font-size:13px;color:#f97316;font-weight:600;margin-left:8px;">/ Blog</span>
            </td>
            <td align="right">
              <span style="font-size:11px;color:#52525b;letter-spacing:0.05em;text-transform:uppercase;">Intelligence Amplified</span>
            </td>
          </tr>
        </table>
      </td></tr>

      <!-- Divider -->
      <tr><td style="border-top:1px solid #1f1f1f;padding-bottom:32px;"></td></tr>

      <!-- NEW POST Badge -->
      <tr><td style="padding-bottom:16px;">
        <span style="display:inline-block;background:#f97316;color:#fff;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:4px 10px;border-radius:4px;">New Post</span>
      </td></tr>

      <!-- Content -->
      ${html}

      <!-- Divider -->
      <tr><td style="border-top:1px solid #1f1f1f;padding-top:24px;padding-bottom:16px;">
        <p style="margin:0;font-size:12px;color:#3f3f46;text-align:center;">
          You received this because you subscribed to Botmartz updates.<br/>
          <a href="${unsubLink}" style="color:#52525b;text-decoration:underline;">Unsubscribe</a>
        </p>
      </td></tr>

      <!-- Footer brand -->
      <tr><td style="padding-bottom:8px;text-align:center;">
        <span style="font-size:11px;font-weight:700;color:#27272a;letter-spacing:0.1em;text-transform:uppercase;">BOTMARTZ</span>
        <span style="font-size:11px;color:#3f3f46;"> · Intelligence Amplified</span>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
      }

      return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${subject}</title>
<style>
  body { margin: 0; padding: 0; background: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  .wrapper { max-width: 640px; margin: 32px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
  .header { background: #09090b; padding: 28px 40px; }
  .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: -0.3px; }
  .preview { display: none; max-height: 0; overflow: hidden; font-size: 0; line-height: 0; color: transparent; }
  .body { padding: 36px 40px; color: #18181b; line-height: 1.7; font-size: 15px; }
  .footer { padding: 24px 40px; background: #fafafa; border-top: 1px solid #e4e4e7; text-align: center; }
  .footer p { margin: 0; font-size: 12px; color: #a1a1aa; }
  .footer a { color: #71717a; text-decoration: underline; }
</style>
</head>
<body>
<span class="preview">${previewText || subject}</span>
<div class="wrapper">
  <div class="header"><h1>Botmartz</h1></div>
  <div class="body">
    <p>${greeting}</p>
    ${html}
  </div>
  <div class="footer">
    <p>You received this because you subscribed to Botmartz updates.</p>
    <p style="margin-top:8px"><a href="${unsubLink}">Unsubscribe</a></p>
  </div>
</div>
</body>
</html>`;
    };

    // Send to each subscriber individually (for personalised unsubscribe links)
    const results = await Promise.allSettled(
      subscribers.map((sub) =>
        transporter.sendMail({
          from: `"Botmartz" <${smtpUser}>`,
          to: sub.email,
          subject,
          html: buildHtml(sub.email, sub.name),
        })
      )
    );

    const sent = results.filter((r) => r.status === 'fulfilled').length;
    const failed = results.filter((r) => r.status === 'rejected').length;

    // Save campaign record to Firestore
    await addDoc(collection(db, 'newsletter_campaigns'), {
      subject,
      previewText: previewText || '',
      html,
      status: 'sent',
      sentAt: serverTimestamp(),
      recipientCount: sent,
      failedCount: failed,
    });

    return NextResponse.json({ success: true, sent, failed });
  } catch (err: any) {
    console.error('[newsletter/send]', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
