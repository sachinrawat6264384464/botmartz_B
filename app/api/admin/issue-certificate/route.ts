import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import nodemailer from "nodemailer";
import { adminDb } from "@/lib/firebase-admin";

function buildCertificateEmail(name: string, bootcampTitle: string, checkInCode?: string) {
  return `
    <div style="background-color: #050B14; padding: 40px 20px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF;">
      <div style="max-width: 600px; margin: 0 auto; background: #0E172A; border: 1px solid rgba(0, 184, 240, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 102, 255, 0.25);">
        
        <div style="background: linear-gradient(135deg, #0066FF 0%, #00B8F0 100%); padding: 32px 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #FFFFFF;">Official Certificate</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.95; color: #E0F2FE; font-weight: 500;">Botmartz AI Solutions • AI Accelerator Program</p>
        </div>
        
        <div style="padding: 36px 28px; text-align: center;">
          <div style="font-size: 44px; margin-bottom: 12px;">🎓</div>
          <h2 style="font-size: 24px; color: #00B8F0; margin: 0 0 12px 0; font-weight: 700;">Congratulations, ${name}!</h2>
          <p style="font-size: 15px; color: #94A3B8; line-height: 1.6; margin-bottom: 24px;">
            We are proud to award you this official Certificate of Completion for completing:
          </p>
          
          <div style="background: rgba(0, 102, 255, 0.12); border: 1px solid rgba(0, 184, 240, 0.4); padding: 18px 20px; border-radius: 12px; font-weight: 700; font-size: 17px; color: #FFFFFF; margin-bottom: 28px; line-height: 1.4;">
            ${bootcampTitle}
          </div>
          
          <p style="font-size: 14px; color: #CBD5E1; line-height: 1.6; margin-bottom: 28px;">
            Your dedication and active participation reflect great commitment to mastering modern AI technology. Your official PDF certificate is attached to this email.
          </p>
          
          ${checkInCode ? `
            <div style="display: inline-block; background: #050B14; border: 1px solid #1E293B; padding: 10px 20px; border-radius: 8px; font-family: monospace; font-size: 13px; color: #00B8F0; font-weight: 700;">
              Credential ID: ${checkInCode}
            </div>
          ` : ''}
        </div>
        
        <div style="border-top: 1px solid rgba(255,255,255,0.08); padding: 20px 28px; background: #050B14; text-align: center; font-size: 12px; color: #64748B;">
          © ${new Date().getFullYear()} Botmartz AI Solutions. All rights reserved.
        </div>

      </div>
    </div>
  `;
}

async function generatePdfCertificate(name: string, bootcampTitle: string, issueDate?: string) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]); // A4 Landscape
  const { width, height } = page.getSize();

  // Dark background for certificate border
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.97, 0.98, 0.99),
  });

  // Border frame
  page.drawRectangle({
    x: 20,
    y: 20,
    width: width - 40,
    height: height - 40,
    borderColor: rgb(0.0, 0.4, 1.0),
    borderWidth: 3,
  });

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Header
  page.drawText("CERTIFICATE OF COMPLETION", {
    x: width / 2 - 220,
    y: height - 110,
    size: 28,
    font: font,
    color: rgb(0.04, 0.11, 0.17),
  });

  // Subheader
  page.drawText("This is proudly presented to", {
    x: width / 2 - 95,
    y: height - 170,
    size: 16,
    font: regularFont,
    color: rgb(0.39, 0.45, 0.54),
  });

  // Name
  page.drawText(name.toUpperCase(), {
    x: Math.max(50, width / 2 - (name.length * 10)),
    y: height - 230,
    size: 38,
    font: font,
    color: rgb(0.0, 0.4, 1.0),
  });

  // Body
  page.drawText(`for successfully completing ${bootcampTitle}`, {
    x: Math.max(50, width / 2 - (bootcampTitle.length * 4.5)),
    y: height - 310,
    size: 16,
    font: regularFont,
    color: rgb(0.39, 0.45, 0.54),
  });

  // Date
  page.drawText(`Issued: ${issueDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`, {
    x: 80,
    y: 90,
    size: 13,
    font: regularFont,
    color: rgb(0.04, 0.11, 0.17),
  });

  // Signature
  page.drawText("Botmartz AI Team", {
    x: width - 230,
    y: 105,
    size: 16,
    font: font,
    color: rgb(0.04, 0.11, 0.17),
  });
  page.drawText("Authorized Signature", {
    x: width - 230,
    y: 88,
    size: 11,
    font: regularFont,
    color: rgb(0.39, 0.45, 0.54),
  });

  return await pdfDoc.save();
}

export async function POST(req: Request) {
  try {
    const { registrationId, ids, name, email, bootcampName, issueDate } = await req.json();

    // 1. Bulk issuance mode
    if (ids && Array.isArray(ids) && ids.length > 0) {
      let successCount = 0;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      const transporter = (smtpUser && smtpPass) ? nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: smtpUser, pass: smtpPass },
      }) : null;

      for (const regId of ids) {
        try {
          const docSnap = await adminDb.collection("bootcamp_registrations").doc(regId).get();
          if (!docSnap.exists) continue;
          const reg = docSnap.data()!;

          const regName = reg.name || name || "Attendee";
          const regEmail = reg.email || email;
          if (!regEmail) continue;

          const title = reg.plan === 'bundle' 
            ? 'AI Engineering Pass (Full Bundle)' 
            : 'AI Accelerator Workshop: Build Full-Stack AI Apps';

          const pdfBytes = await generatePdfCertificate(regName, title, issueDate);

          if (transporter && smtpUser) {
            await transporter.sendMail({
              from: `"Botmartz AI Solutions" <${smtpUser}>`,
              to: regEmail,
              subject: `Your Certificate of Completion: ${title}`,
              html: buildCertificateEmail(regName, title, reg.checkInCode),
              attachments: [
                {
                  filename: `${regName.replace(/\s+/g, '_')}_Certificate.pdf`,
                  content: Buffer.from(pdfBytes),
                  contentType: 'application/pdf',
                },
              ],
            });
          }

          // Mark certificate as sent in Firestore
          await adminDb.collection("bootcamp_registrations").doc(regId).update({
            certificateSent: true,
            certificateSentAt: new Date().toISOString(),
          });

          successCount++;
        } catch (singleErr) {
          console.error(`Certificate send failed for ID ${regId}:`, singleErr);
        }
      }

      return NextResponse.json({
        success: true,
        message: `Certificates issued and emailed to ${successCount} attendee(s).`,
        count: successCount
      }, { status: 200 });
    }

    // 2. Single registration issuance mode
    if (!name && !registrationId) {
      return NextResponse.json({ error: "Missing required registration information" }, { status: 400 });
    }

    let recipientName = name;
    let recipientEmail = email;
    let checkInCode = "";
    let targetDocId = registrationId;

    if (registrationId) {
      const docSnap = await adminDb.collection("bootcamp_registrations").doc(registrationId).get();
      if (docSnap.exists) {
        const rData = docSnap.data()!;
        if (!recipientName) recipientName = rData.name;
        if (!recipientEmail) recipientEmail = rData.email;
        checkInCode = rData.checkInCode || "";
      }
    }

    if (!recipientName || !recipientEmail) {
      return NextResponse.json({ error: "Missing recipient name or email" }, { status: 400 });
    }

    const title = bootcampName || 'AI Accelerator Workshop';
    const pdfBytes = await generatePdfCertificate(recipientName, title, issueDate);

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `"Botmartz AI Solutions" <${smtpUser}>`,
        to: recipientEmail,
        subject: `Your Certificate of Completion: ${title}`,
        html: buildCertificateEmail(recipientName, title, checkInCode),
        attachments: [
          {
            filename: `${recipientName.replace(/\s+/g, '_')}_Certificate.pdf`,
            content: Buffer.from(pdfBytes),
            contentType: 'application/pdf',
          },
        ],
      });
    }

    if (targetDocId) {
      await adminDb.collection("bootcamp_registrations").doc(targetDocId).update({
        certificateSent: true,
        certificateSentAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: `Certificate issued and sent to ${recipientEmail} successfully.`
    }, { status: 200 });

  } catch (error: any) {
    console.error("Certificate Issue Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to issue certificate" }, { status: 500 });
  }
}
