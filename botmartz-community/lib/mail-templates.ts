import nodemailer from "nodemailer";
import { adminDb } from "@/lib/firebase-admin";

export async function getSmtpTransporter() {
  let settings: any = {};
  try {
    const settingsSnap = await adminDb.collection("settings").doc("global").get();
    if (settingsSnap.exists) {
      settings = settingsSnap.data();
    }
  } catch (e) {
    console.warn("Could not fetch global settings for SMTP:", e);
  }

  const smtpHost = settings?.email?.smtpHost || process.env.SMTP_HOST || process.env.GMAIL_HOST || 'smtp.hostinger.com';
  const smtpPort = Number(settings?.email?.smtpPort || process.env.SMTP_PORT || '465');
  const smtpUser = settings?.email?.smtpUser || process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = settings?.email?.smtpPass || process.env.SMTP_PASS || process.env.GMAIL_APP_PASS;

  if (!smtpUser || !smtpPass) {
    console.warn("⚠️ [SMTP Helper] Credentials not configured in settings/global or env variables!");
    return null;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: { rejectUnauthorized: false }
  });

  return { transporter, smtpUser };
}

export function buildRegistrationEmail(name: string, eventTitle: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Registration Received | Botmartz Community</title>
</head>
<body style="margin:0;padding:0;background:#050B14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050B14;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0A111F;border:1px solid #1E293B;border-radius:16px;overflow:hidden;padding:32px;">
          <tr>
            <td style="padding-bottom:24px;border-bottom:1px solid #1E293B;">
              <span style="font-size:16px;font-weight:800;color:#ffffff;text-transform:uppercase;">BOTMARTZ COMMUNITY</span>
              <span style="font-size:11px;color:#00B8F0;font-weight:600;margin-left:8px;font-family:monospace;">/ EVENTS</span>
            </td>
          </tr>
          <tr>
            <td style="padding-top:32px;padding-bottom:24px;">
              <p style="margin:0;font-size:14px;color:#00B8F0;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;font-family:monospace;margin-bottom:12px;">REGISTRATION RECEIVED</p>
              <h2 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;margin-bottom:16px;line-height:1.2;">Your Spot Request for ${eventTitle}</h2>
              <p style="margin:0;font-size:15px;color:#8A9EB0;line-height:1.6;margin-bottom:20px;">
                Hi ${name},<br/><br/>
                We have received your registration details for <strong>${eventTitle}</strong>. 
                Your digital ticket pass with unique QR verification will be issued upon payment / UTR approval.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildTicketPassEmail(data: {
  name: string;
  email: string;
  ticketId: string;
  eventTitle: string;
  tier: string;
  amountPaid: string;
  venue: string;
  date: string;
  qrDataUrl: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Your Verified Ticket Pass | Botmartz Community</title>
</head>
<body style="margin:0;padding:0;background:#050B14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050B14;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0A111F;border:1px solid #1E293B;border-radius:16px;overflow:hidden;padding:32px;">
          <tr>
            <td style="padding-bottom:24px;border-bottom:1px solid #1E293B;">
              <span style="font-size:16px;font-weight:800;color:#ffffff;text-transform:uppercase;">BOTMARTZ COMMUNITY</span>
              <span style="font-size:11px;color:#00B8F0;font-weight:600;margin-left:8px;font-family:monospace;">/ VERIFIED PASS</span>
            </td>
          </tr>
          <tr>
            <td style="padding-top:32px;padding-bottom:24px;">
              <p style="margin:0;font-size:14px;color:#00B8F0;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;font-family:monospace;margin-bottom:12px;">ADMISSION CONFIRMED</p>
              <h2 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;margin-bottom:16px;line-height:1.2;">Your Pass for ${data.eventTitle}</h2>
              <p style="margin:0;font-size:15px;color:#8A9EB0;line-height:1.6;margin-bottom:24px;">
                Hi ${data.name}, your registration has been verified. Present this pass or QR code at the check-in desk on arrival.
              </p>
              
              <div style="background:#050B14;border:1px solid #00B8F0;border-radius:12px;padding:24px;text-align:center;margin-bottom:24px;">
                <img src="${data.qrDataUrl}" alt="Check-in QR Code" width="180" height="180" style="display:block;margin:0 auto 16px auto;background:#ffffff;padding:8px;border-radius:8px;" />
                <p style="margin:0;font-family:monospace;font-size:16px;color:#00B8F0;font-weight:700;">TICKET ID: ${data.ticketId}</p>
                <p style="margin:4px 0 0 0;font-size:13px;color:#94A3B8;">Tier: ${data.tier} | Paid: ${data.amountPaid}</p>
                <p style="margin:4px 0 0 0;font-size:13px;color:#94A3B8;">Date: ${data.date} | Venue: ${data.venue}</p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
