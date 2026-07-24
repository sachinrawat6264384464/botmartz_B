/**
 * lib/mail-templates.ts
 * Nodemailer templates for registration received, payment success, and digital ticket check-in passes.
 */

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

export function buildEventTicketEmail(name: string, eventTitle: string, date: string, location: string, checkInCodes: string[]): string {
  
  const ticketBlocks = checkInCodes.map((code, idx) => {
    const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${code}`;
    const guestLabel = checkInCodes.length > 1 ? (idx === 0 ? '' : ` (GUEST ${idx})`) : '';
    
    return `
              <!-- DIGITAL PASS CARD -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#0E172A;border:2px dashed #00B8F0;border-radius:16px;overflow:hidden;max-width:440px;box-shadow:0 10px 30px rgba(0,0,0,0.5);margin:0 auto 24px auto;">
                <tr>
                  <td style="padding:28px 24px;background:#060D1A;" align="center">
                    <span style="font-size:10px;font-weight:bold;color:#00B8F0;letter-spacing:0.2em;text-transform:uppercase;font-family:monospace;display:block;margin-bottom:8px;">ENTRY PASS</span>
                    <h3 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;margin-bottom:4px;">${eventTitle}</h3>
                    <p style="margin:0;font-size:12px;color:#64748B;font-family:monospace;letter-spacing:0.05em;">HOLDER: ${name.toUpperCase()}${guestLabel}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 24px 8px 24px;" align="center">
                    <!-- QR Code wrapper -->
                    <div style="background:#ffffff;padding:12px;border-radius:12px;display:inline-block;">
                      <img src="${qrImageSrc}" alt="Scan check-in" width="130" height="130" style="display:block;" />
                    </div>
                    <p style="margin-top:12px;margin-bottom:0;font-size:11px;color:#64748B;font-family:monospace;letter-spacing:0.1em;">CHECK-IN CODE: ${code}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px 28px 24px;" align="center">
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:12px;color:#8A9EB0;border-top:1px solid #1E293B;padding-top:16px;">
                      <tr>
                        <td align="left" style="font-weight:bold;color:#ffffff;">DATE</td>
                        <td align="right" style="font-weight:bold;color:#ffffff;">LOCATION</td>
                      </tr>
                      <tr>
                        <td align="left" style="padding-top:4px;">${date}</td>
                        <td align="right" style="padding-top:4px;">${location}</td>
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
  <title>Your Entry Pass | Botmartz</title>
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
              <span style="font-size:11px;color:#00B8F0;font-weight:600;margin-left:8px;font-family:monospace;">/ TICKET</span>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding-top:32px;padding-bottom:24px;" align="center">
              <h2 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;margin-bottom:8px;text-align:center;">You are Registered!</h2>
              <p style="margin:0;font-size:15px;color:#8A9EB0;text-align:center;margin-bottom:32px;">
                Hi ${name}, here is your official digital entry pass for <strong>${eventTitle}</strong>.
              </p>
              
              ${ticketBlocks}
              
              <p style="margin:32px 0 0 0;font-size:13.5px;color:#8A9EB0;text-align:center;line-height:1.6;max-width:480px;">
                Please present this email at the registration desk upon your arrival. Our team will scan the QR code to verify your seat assignment. We look forward to building with you!
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #1E293B;padding-top:24px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#475569;letter-spacing:0.05em;text-transform:uppercase;">
                BOTMARTZ LABS & COMMUNITES
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
