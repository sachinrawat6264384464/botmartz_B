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
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Registration Received | Botmartz</title>
</head>
<body style="margin:0;padding:0;background:#050B14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050B14;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0A111F;border:1px solid #1E293B;border-radius:16px;overflow:hidden;padding:32px;">
          <!-- Header -->
          <tr>
            <td style="padding-bottom:24px;border-bottom:1px solid #1E293B;">
              <span style="font-size:16px;font-weight:800;letter-spacing:-0.3px;color:#ffffff;text-transform:uppercase;">BOTMARTZ AI SOLUTION PVT LTD</span>
              <span style="font-size:11px;color:#00B8F0;font-weight:600;margin-left:8px;font-family:monospace;">/ EVENTS</span>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding-top:32px;padding-bottom:24px;">
              <p style="margin:0;font-size:14px;color:#00B8F0;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;font-family:monospace;margin-bottom:12px;">STEP 1 COMPLETED</p>
              <h2 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;margin-bottom:16px;line-height:1.2;">Registration Details Received</h2>
              <p style="margin:0;font-size:15px;color:#8A9EB0;line-height:1.6;margin-bottom:20px;">
                Hi ${name},<br/><br/>
                We have successfully received your registration details for <strong>${eventTitle}</strong>. 
                Your seat allocation is currently in queue pending payment confirmation.
              </p>
              <p style="margin:0;font-size:14px;color:#64748B;line-height:1.6;">
                If you have already submitted your payment and UTR details, your verification is being processed automatically. You will receive your digital check-in pass shortly once our ledger matches the bank records.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #1E293B;padding-top:24px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#475569;letter-spacing:0.05em;text-transform:uppercase;">
                BOTMARTZ AI ENGINEERING · INDORE, INDIA
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

export function buildPaymentSuccessEmail(name: string, eventTitle: string, amount: number, utr: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Payment Confirmed | Botmartz</title>
</head>
<body style="margin:0;padding:0;background:#050B14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050B14;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0A111F;border:1px solid #1E293B;border-radius:16px;overflow:hidden;padding:32px;">
          <!-- Header -->
          <tr>
            <td style="padding-bottom:24px;border-bottom:1px solid #1E293B;">
              <span style="font-size:16px;font-weight:800;letter-spacing:-0.3px;color:#ffffff;text-transform:uppercase;">BOTMARTZ AI SOLUTION PVT LTD</span>
              <span style="font-size:11px;color:#0066FF;font-weight:600;margin-left:8px;font-family:monospace;">/ INVOICE</span>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding-top:32px;padding-bottom:24px;">
              <div style="display:inline-block;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);color:#10B981;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 10px;border-radius:6px;font-family:monospace;margin-bottom:16px;">
                PAYMENT SUCCESSFUL
              </div>
              <h2 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;margin-bottom:16px;line-height:1.2;">Transaction Receipt</h2>
              <p style="margin:0;font-size:15px;color:#8A9EB0;line-height:1.6;margin-bottom:24px;">
                Hi ${name},<br/><br/>
                Your payment for <strong>${eventTitle}</strong> has been successfully received and matched against our bank ledger records.
              </p>
              
              <!-- Invoice Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#060D1A;border:1px solid #1E293B;border-radius:12px;padding:20px;margin-bottom:24px;font-family:monospace;font-size:13px;color:#8A9EB0;">
                <tr>
                  <td style="padding-bottom:10px;color:#64748B;">UTR / Bank Ref No:</td>
                  <td align="right" style="padding-bottom:10px;color:#ffffff;font-weight:bold;">${utr}</td>
                </tr>
                <tr>
                  <td style="padding-bottom:10px;color:#64748B;">Amount Paid:</td>
                  <td align="right" style="padding-bottom:10px;color:#00B8F0;font-weight:bold;">₹${amount}.00 INR</td>
                </tr>
                <tr>
                  <td style="padding-bottom:10px;color:#64748B;">Payment Method:</td>
                  <td align="right" style="padding-bottom:10px;color:#ffffff;">UPI (Unified Payments Interface)</td>
                </tr>
                <tr>
                  <td style="color:#64748B;">Status:</td>
                  <td align="right" style="color:#10B981;font-weight:bold;">PAID / CAPTURED</td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #1E293B;padding-top:24px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#475569;letter-spacing:0.05em;text-transform:uppercase;">
                Thank you for choosing Botmartz.
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

export function buildEventTicketEmail(
  name: string, 
  eventTitle: string, 
  date?: string, 
  location?: string, 
  checkInCodes?: string | string[]
): string {
  const rawCodes = checkInCodes || "REG-CONFIRMED";
  const codes = Array.isArray(rawCodes) ? rawCodes : [rawCodes];
  const displayTitle = eventTitle || "AI Accelerator Workshop Series — Bootcamp 01";
  const displayDate = (date && date !== "TBA") ? date : "9 August 2026 | Sunday";
  
  const ticketBlocks = codes.map((code, idx) => {
    const qrDataUrl = `https://botmartz.com/admin/scanner?code=${code}`;
    const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&margin=2&ecc=M&data=${encodeURIComponent(qrDataUrl)}`;
    const guestLabel = codes.length > 1 ? (idx === 0 ? '' : ` (GUEST ${idx})`) : '';
    
    return `
              <!-- DIGITAL PASS CARD -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#0E172A;border:2px dashed #00B8F0;border-radius:16px;overflow:hidden;max-width:480px;box-shadow:0 10px 30px rgba(0,0,0,0.5);margin:0 auto 24px auto;">
                <tr>
                  <td style="padding:20px 24px;background:#060D1A;" align="center">
                    <span style="font-size:10px;font-weight:bold;color:#00B8F0;letter-spacing:0.2em;text-transform:uppercase;font-family:monospace;display:block;margin-bottom:6px;">OFFICIAL ENTRY PASS</span>
                    <h3 style="margin:0;font-size:17px;font-weight:700;color:#ffffff;margin-bottom:4px;">${displayTitle}</h3>
                    <p style="margin:0;font-size:12px;color:#8A9EB0;font-family:monospace;letter-spacing:0.05em;">PARTICIPANT: ${name.toUpperCase()}${guestLabel}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px 8px 24px;" align="center">
                    <div style="background:#ffffff;padding:16px;display:inline-block;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.3);">
                      <img src="${qrImageSrc}" alt="Scan check-in" width="160" height="160" style="display:block;border:0;outline:none;" />
                    </div>
                    <p style="margin-top:12px;margin-bottom:0;font-size:12px;color:#00B8F0;font-family:monospace;font-weight:bold;letter-spacing:0.1em;">CHECK-IN CODE: ${code}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px 20px 24px;" align="center">
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:12px;color:#8A9EB0;border-top:1px solid #1E293B;padding-top:12px;">
                      <tr>
                        <td align="left" style="font-weight:bold;color:#ffffff;">DATE & TIME</td>
                        <td align="right" style="font-weight:bold;color:#ffffff;">FORMAT</td>
                      </tr>
                      <tr>
                        <td align="left" style="padding-top:4px;color:#CBD5E1;">${displayDate}</td>
                        <td align="right" style="padding-top:4px;color:#CBD5E1;">${location || 'Live Online'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're In! | AI Accelerator Workshop — Bootcamp 01</title>
</head>
<body style="margin:0;padding:0;background:#050B14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050B14;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0A111F;border:1px solid #1E293B;border-radius:16px;overflow:hidden;padding:32px;">
          
          <!-- Header -->
          <tr>
            <td style="padding-bottom:24px;border-bottom:1px solid #1E293B;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left">
                    <span style="font-size:16px;font-weight:800;letter-spacing:-0.3px;color:#ffffff;text-transform:uppercase;">BOTMARTZ AI SOLUTIONS</span>
                    <span style="font-size:11px;color:#00B8F0;font-weight:600;margin-left:8px;font-family:monospace;">/ WORKSHOP</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Main Body -->
          <tr>
            <td style="padding-top:32px;padding-bottom:24px;">
              
              <!-- Confirmation Badge -->
              <div style="display:inline-block;background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.3);color:#10B981;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:6px 14px;border-radius:8px;font-family:monospace;margin-bottom:20px;">
                ✓ REGISTRATION & PAYMENT CONFIRMED
              </div>
              
              <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;margin-bottom:16px;line-height:1.3;">
                You're In! | AI Accelerator Workshop — Bootcamp 01
              </h1>

              <p style="margin:0;font-size:16px;color:#F1F5F9;line-height:1.6;margin-bottom:16px;">
                Hi <strong>${name}</strong>,
              </p>

              <p style="margin:0;font-size:15px;color:#CBD5E1;line-height:1.6;margin-bottom:24px;">
                Your registration and payment have been successfully confirmed!
              </p>

              <!-- Registration Box -->
              <div style="background:#0F172A;border:1px solid #1E293B;border-left:4px solid #00B8F0;border-radius:10px;padding:20px;margin-bottom:24px;">
                <p style="margin:0;font-size:13px;color:#8A9EB0;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;font-family:monospace;margin-bottom:6px;">You're officially registered for:</p>
                <h2 style="margin:0;font-size:18px;font-weight:700;color:#ffffff;margin-bottom:4px;">${displayTitle}</h2>
                <p style="margin:0;font-size:14px;color:#00B8F0;font-weight:600;">Build Your First AI Full-Stack Application</p>
              </div>

              <!-- Session Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#060D1A;border:1px solid #1E293B;border-radius:12px;padding:20px;margin-bottom:24px;">
                <tr>
                  <td style="padding-bottom:12px;font-size:14px;color:#E2E8F0;">
                    📅 <strong>9 August 2026 | Sunday</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:12px;font-size:14px;color:#E2E8F0;">
                    ⏰ <strong>10:00 AM – 1:00 PM IST</strong>
                  </td>
                </tr>
                <tr>
                  <td style="font-size:14px;color:#E2E8F0;">
                    💻 <strong>Live Online</strong> | Interactive • Hands-on • Live Coding
                  </td>
                </tr>
              </table>

              <!-- Session Link Note -->
              <div style="background:rgba(0,184,240,0.08);border:1px dashed rgba(0,184,240,0.3);border-radius:10px;padding:16px;margin-bottom:28px;text-align:center;">
                <p style="margin:0;font-size:13.5px;color:#38BDF8;line-height:1.5;font-weight:500;">
                  <em>Link for the session will be shared via E-mail, as well as the community channels before the 2 hours of session.</em>
                </p>
              </div>

              <!-- Ticket Pass Block -->
              ${ticketBlocks}

              <!-- Community Links -->
              <div style="background:#060D1A;border:1px solid #1E293B;border-radius:12px;padding:20px;margin-bottom:24px;">
                <h3 style="margin:0;font-size:16px;font-weight:700;color:#ffffff;margin-bottom:14px;">
                  🔗 Join Our Communities
                </h3>

                <div style="margin-bottom:16px;">
                  <p style="margin:0 0 6px 0;font-size:14px;font-weight:700;color:#ffffff;">Discord:</p>
                  <a href="https://discord.gg/k75ZpEnzp" target="_blank" style="display:inline-block;background:#5865F2;color:#ffffff;text-decoration:none;font-weight:600;font-size:13px;padding:10px 18px;border-radius:8px;">
                    👉 https://discord.gg/k75ZpEnzp
                  </a>
                </div>

                <div style="margin-bottom:16px;">
                  <p style="margin:0 0 6px 0;font-size:14px;font-weight:700;color:#ffffff;">WhatsApp:</p>
                  <a href="https://chat.whatsapp.com/DkzKwpjuktaCYAofOtMlAQ?s=cl&p=a&ilr=1" target="_blank" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;font-weight:600;font-size:13px;padding:10px 18px;border-radius:8px;">
                    👉 https://chat.whatsapp.com/DkzKwpjuktaCYAofOtMlAQ?s=cl&p=a&ilr=1
                  </a>
                </div>

                <p style="margin:12px 0 0 0;font-size:13px;color:#94A3B8;line-height:1.5;">
                  Please join both communities to receive important announcements, workshop links, resources, reminders, and updates.
                </p>
              </div>

              <!-- Before You Join -->
              <div style="background:#060D1A;border:1px solid #1E293B;border-radius:12px;padding:20px;margin-bottom:28px;">
                <h3 style="margin:0;font-size:16px;font-weight:700;color:#F59E0B;margin-bottom:10px;">
                  ⚡ Before You Join
                </h3>
                <p style="margin:0;font-size:14px;color:#CBD5E1;line-height:1.6;">
                  Have your laptop/PC, stable internet, and development environment ready. We recommend joining a few minutes before the session begins.
                </p>
              </div>

              <!-- Sign-off -->
              <p style="margin:0 0 12px 0;font-size:15px;color:#CBD5E1;line-height:1.6;">
                We're excited to have you at Botmartz AI Solutions' AI Accelerator Workshop!
              </p>
              
              <p style="margin:0 0 20px 0;font-size:16px;font-weight:800;color:#00B8F0;letter-spacing:0.02em;">
                Let's Build. Learn. Deploy.
              </p>

              <p style="margin:0;font-size:14px;color:#94A3B8;line-height:1.6;">
                Regards,<br/>
                <strong style="color:#ffffff;">Team Botmartz AI Solutions</strong>
              </p>

            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #1E293B;padding-top:24px;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:11px;color:#64748B;letter-spacing:0.05em;text-transform:uppercase;">
                BOTMARTZ AI SOLUTIONS PVT LTD · INDIA
              </p>
              <p style="margin:0;font-size:11px;color:#475569;">
                Need help? Reply directly to this email or contact support@botmartz.com
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

