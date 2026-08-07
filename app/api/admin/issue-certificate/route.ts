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

async function generatePdfCertificate(name: string, bootcampTitle: string, issueDate?: string, checkInCode?: string) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]); // A4 Landscape
  const { width, height } = page.getSize();

  // 1. Cream Ivory Canvas Background (#FAF8F5)
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.984, 0.976, 0.961),
  });

  // 2. Top-Left Dark Bronze Corner Triangle & Metallic Gold Accent Lines
  page.drawSvgPath('M 0 0 L 230 0 L 0 220 Z', { x: 0, y: 595, color: rgb(0.12, 0.10, 0.08) });
  page.drawLine({ start: { x: 0, y: 367 }, end: { x: 238, y: 595 }, color: rgb(0.77, 0.63, 0.35), thickness: 3 });
  page.drawLine({ start: { x: 0, y: 358 }, end: { x: 247, y: 595 }, color: rgb(0.83, 0.69, 0.22), thickness: 1.5 });

  // 3. Bottom-Right Dark Bronze Corner Triangle & Metallic Gold Accent Lines
  page.drawSvgPath('M 0 0 L -230 0 L 0 220 Z', { x: 842, y: 0, color: rgb(0.12, 0.10, 0.08) });
  page.drawLine({ start: { x: 604, y: 0 }, end: { x: 842, y: 228 }, color: rgb(0.77, 0.63, 0.35), thickness: 3 });
  page.drawLine({ start: { x: 595, y: 0 }, end: { x: 842, y: 237 }, color: rgb(0.83, 0.69, 0.22), thickness: 1.5 });

  // 4. Top-Right & Bottom-Left Nested L-Shaped Corner Lines
  const goldColor = rgb(0.77, 0.63, 0.35);
  page.drawLine({ start: { x: 806, y: 565 }, end: { x: 806, y: 520 }, color: goldColor, thickness: 1.2 });
  page.drawLine({ start: { x: 806, y: 565 }, end: { x: 761, y: 565 }, color: goldColor, thickness: 1.2 });
  page.drawLine({ start: { x: 812, y: 571 }, end: { x: 812, y: 514 }, color: goldColor, thickness: 1.2 });
  page.drawLine({ start: { x: 812, y: 571 }, end: { x: 755, y: 571 }, color: goldColor, thickness: 1.2 });

  page.drawLine({ start: { x: 36, y: 30 }, end: { x: 36, y: 75 }, color: goldColor, thickness: 1.2 });
  page.drawLine({ start: { x: 36, y: 30 }, end: { x: 81, y: 30 }, color: goldColor, thickness: 1.2 });
  page.drawLine({ start: { x: 30, y: 24 }, end: { x: 30, y: 81 }, color: goldColor, thickness: 1.2 });
  page.drawLine({ start: { x: 30, y: 24 }, end: { x: 87, y: 24 }, color: goldColor, thickness: 1.2 });

  // 5. Double Border Frames
  page.drawRectangle({ x: 20, y: 20, width: 802, height: 555, borderColor: rgb(0.20, 0.16, 0.12), borderWidth: 2 });
  page.drawRectangle({ x: 26, y: 26, width: 790, height: 543, borderColor: rgb(0.77, 0.63, 0.35), borderWidth: 1 });

  // Embed Fonts
  const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  // 6. Header Text
  const titleText = "CERTIFICATE";
  const titleWidth = fontBold.widthOfTextAtSize(titleText, 44);
  page.drawText(titleText, {
    x: width / 2 - titleWidth / 2,
    y: 490,
    size: 44,
    font: fontBold,
    color: rgb(0.12, 0.14, 0.16),
  });

  const subText = "OF COMPLETION";
  const subWidth = fontBold.widthOfTextAtSize(subText, 18);
  page.drawText(subText, {
    x: width / 2 - subWidth / 2,
    y: 456,
    size: 18,
    font: fontBold,
    color: rgb(0.77, 0.63, 0.35),
  });

  // 7. Divider Line with Center Diamond Ornament
  page.drawLine({ start: { x: 350, y: 438 }, end: { x: 410, y: 438 }, color: goldColor, thickness: 1 });
  page.drawSvgPath('M 0 -4 L 4 0 L 0 4 L -4 0 Z', { x: 421, y: 438, color: goldColor });
  page.drawLine({ start: { x: 432, y: 438 }, end: { x: 492, y: 438 }, color: goldColor, thickness: 1 });

  // 8. Award Subheader
  const awardText = "THIS CERTIFICATE IS PROUDLY PRESENTED TO";
  const awardWidth = fontRegular.widthOfTextAtSize(awardText, 11.5);
  page.drawText(awardText, {
    x: width / 2 - awardWidth / 2,
    y: 405,
    size: 11.5,
    font: fontRegular,
    color: rgb(0.25, 0.28, 0.32),
  });

  // 9. Recipient Name
  const formattedName = name;
  const nameWidth = fontItalic.widthOfTextAtSize(formattedName, 34);
  page.drawText(formattedName, {
    x: width / 2 - nameWidth / 2,
    y: 350,
    size: 34,
    font: fontItalic,
    color: rgb(0.10, 0.12, 0.15),
  });

  // Gold Underline beneath name
  page.drawLine({ start: { x: 220, y: 336 }, end: { x: 622, y: 336 }, color: goldColor, thickness: 1 });

  // 10. Citation / Description
  const line1 = `This certificate is awarded to ${formattedName}`;
  const line2 = `for successfully completing the ${bootcampTitle}`;
  const line3 = `conducted by Botmartz AI Solutions, demonstrating competence in modern AI Engineering.`;

  const l1Width = fontRegular.widthOfTextAtSize(line1, 11.5);
  const l2Width = fontRegular.widthOfTextAtSize(line2, 11.5);
  const l3Width = fontRegular.widthOfTextAtSize(line3, 11.5);

  page.drawText(line1, { x: width / 2 - l1Width / 2, y: 300, size: 11.5, font: fontRegular, color: rgb(0.22, 0.25, 0.28) });
  page.drawText(line2, { x: width / 2 - l2Width / 2, y: 283, size: 11.5, font: fontRegular, color: rgb(0.22, 0.25, 0.28) });
  page.drawText(line3, { x: width / 2 - l3Width / 2, y: 266, size: 11.5, font: fontRegular, color: rgb(0.22, 0.25, 0.28) });

  // 11. Center Golden Laurel Crest / Emblem
  page.drawSvgPath('M 0 0 C -12 8 -20 20 -16 32 C -12 40 -4 44 0 48 C -8 40 -8 24 0 0 Z', { x: 412, y: 190, color: goldColor });
  page.drawSvgPath('M 0 0 C 12 8 20 20 16 32 C 12 40 4 44 0 48 C 8 40 8 24 0 0 Z', { x: 430, y: 190, color: goldColor });

  // 12. Signatures at Bottom
  // Left Signature - Soham Sharma (Founder)
  page.drawLine({ start: { x: 140, y: 135 }, end: { x: 310, y: 135 }, color: goldColor, thickness: 1 });
  page.drawText("Soham Sharma", { x: 145, y: 118, size: 13, font: fontBold, color: rgb(0.12, 0.14, 0.16) });
  page.drawText("Founder & Principal AI Architect", { x: 145, y: 104, size: 9.5, font: fontRegular, color: rgb(0.38, 0.42, 0.48) });
  page.drawText("Botmartz AI Solutions", { x: 145, y: 90, size: 9, font: fontRegular, color: rgb(0.70, 0.55, 0.28) });

  // Right Signature - Harsh Sahu (Lead Mentor)
  page.drawLine({ start: { x: 532, y: 135 }, end: { x: 702, y: 135 }, color: goldColor, thickness: 1 });
  page.drawText("Harsh Sahu", { x: 537, y: 118, size: 13, font: fontBold, color: rgb(0.12, 0.14, 0.16) });
  page.drawText("Lead AI Mentor & Instructor", { x: 537, y: 104, size: 9.5, font: fontRegular, color: rgb(0.38, 0.42, 0.48) });
  page.drawText("GTWY AI & Botmartz", { x: 537, y: 90, size: 9, font: fontRegular, color: rgb(0.70, 0.55, 0.28) });

  // Bottom Center Date & Credential Verification
  const dateStr = `Issued: ${issueDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
  const dateWidth = fontRegular.widthOfTextAtSize(dateStr, 9);
  page.drawText(dateStr, { x: width / 2 - dateWidth / 2, y: 60, size: 9, font: fontRegular, color: rgb(0.45, 0.48, 0.52) });

  if (checkInCode) {
    const certIdStr = `Credential ID: BMZ-CERT-${checkInCode}`;
    const certIdWidth = fontRegular.widthOfTextAtSize(certIdStr, 9);
    page.drawText(certIdStr, { x: width / 2 - certIdWidth / 2, y: 46, size: 9, font: fontRegular, color: rgb(0.65, 0.52, 0.25) });
  }

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

          let title = bootcampName;
          if (!title) {
            title = reg.plan === 'bundle'
              ? 'AI Engineering Pass (Full 3-Bootcamp Series)'
              : 'AI Accelerator Workshop: Build Smarter AI Agents';
          }

          const pdfBytes = await generatePdfCertificate(regName, title, issueDate, reg.checkInCode);

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

    const title = bootcampName || 'AI Accelerator Workshop: Build Smarter AI Agents';
    const pdfBytes = await generatePdfCertificate(recipientName, title, issueDate, checkInCode);

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
