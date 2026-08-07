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

  const blueColor = rgb(0.07, 0.38, 0.55); // #12618C / Steel Ocean Blue
  const darkNavy = rgb(0.05, 0.15, 0.24);  // #0D263D / Deep Navy
  const mutedText = rgb(0.35, 0.40, 0.45);

  // 1. Light Ice Blue Tint Background (#F4F8FA)
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.965, 0.980, 0.990),
  });

  // 2. Double Outer & Inner Border Frames
  page.drawRectangle({ x: 20, y: 20, width: 802, height: 555, borderColor: blueColor, borderWidth: 2 });
  page.drawRectangle({ x: 28, y: 28, width: 786, height: 539, borderColor: blueColor, borderWidth: 1 });

  // 3. Art-Deco Geometric Interlocking Corner Boxes
  const drawArtDecoCorner = (cx: number, cy: number) => {
    page.drawRectangle({ x: cx, y: cy, width: 30, height: 30, borderColor: blueColor, borderWidth: 1.8 });
    page.drawRectangle({ x: cx + 6, y: cy + 6, width: 18, height: 18, borderColor: blueColor, borderWidth: 1 });
  };

  drawArtDecoCorner(20, 545);  // Top-Left
  drawArtDecoCorner(792, 545); // Top-Right
  drawArtDecoCorner(20, 20);    // Bottom-Left
  drawArtDecoCorner(792, 20);   // Bottom-Right

  // Interlocking corner accent lines
  page.drawLine({ start: { x: 50, y: 560 }, end: { x: 50, y: 545 }, color: blueColor, thickness: 1 });
  page.drawLine({ start: { x: 20, y: 530 }, end: { x: 35, y: 530 }, color: blueColor, thickness: 1 });

  page.drawLine({ start: { x: 792, y: 560 }, end: { x: 792, y: 545 }, color: blueColor, thickness: 1 });
  page.drawLine({ start: { x: 807, y: 530 }, end: { x: 822, y: 530 }, color: blueColor, thickness: 1 });

  page.drawLine({ start: { x: 50, y: 35 }, end: { x: 50, y: 50 }, color: blueColor, thickness: 1 });
  page.drawLine({ start: { x: 20, y: 65 }, end: { x: 35, y: 65 }, color: blueColor, thickness: 1 });

  page.drawLine({ start: { x: 792, y: 35 }, end: { x: 792, y: 50 }, color: blueColor, thickness: 1 });
  page.drawLine({ start: { x: 807, y: 65 }, end: { x: 822, y: 65 }, color: blueColor, thickness: 1 });

  // Embed Fonts
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);

  // 4. Header Text: CERTIFICATE
  const titleText = "CERTIFICATE";
  const titleWidth = fontBold.widthOfTextAtSize(titleText, 42);
  page.drawText(titleText, {
    x: width / 2 - titleWidth / 2,
    y: 476,
    size: 42,
    font: fontBold,
    color: blueColor,
  });

  // Subheader: OF COMPLETION
  const subText = "OF COMPLETION";
  const subWidth = fontBold.widthOfTextAtSize(subText, 14);
  page.drawText(subText, {
    x: width / 2 - subWidth / 2,
    y: 446,
    size: 14,
    font: fontBold,
    color: darkNavy,
  });

  // 5. Award Subheader
  const awardText = "THIS CERTIFICATE IS PROUDLY PRESENTED TO";
  const awardWidth = fontRegular.widthOfTextAtSize(awardText, 10.5);
  page.drawText(awardText, {
    x: width / 2 - awardWidth / 2,
    y: 402,
    size: 10.5,
    font: fontRegular,
    color: mutedText,
  });

  // 6. Recipient Name
  const formattedName = name;
  const nameWidth = fontItalic.widthOfTextAtSize(formattedName, 36);
  page.drawText(formattedName, {
    x: width / 2 - nameWidth / 2,
    y: 348,
    size: 36,
    font: fontItalic,
    color: darkNavy,
  });

  // 7. Citation / Description
  const line1 = `This certificate is awarded to ${formattedName} for outstanding achievement and`;
  const line2 = `successful completion of the ${bootcampTitle} conducted by`;
  const line3 = `Botmartz AI Solutions, demonstrating competence in modern AI Engineering & Agentic Workflows.`;

  const l1Width = fontRegular.widthOfTextAtSize(line1, 10.5);
  const l2Width = fontRegular.widthOfTextAtSize(line2, 10.5);
  const l3Width = fontRegular.widthOfTextAtSize(line3, 10.5);

  page.drawText(line1, { x: width / 2 - l1Width / 2, y: 296, size: 10.5, font: fontRegular, color: rgb(0.20, 0.25, 0.30) });
  page.drawText(line2, { x: width / 2 - l2Width / 2, y: 280, size: 10.5, font: fontRegular, color: rgb(0.20, 0.25, 0.30) });
  page.drawText(line3, { x: width / 2 - l3Width / 2, y: 264, size: 10.5, font: fontRegular, color: rgb(0.20, 0.25, 0.30) });

  // 8. Center Ocean Blue Guilloche Rosette Seal
  page.drawSvgPath('M 0 0 C -12 8 -20 20 -16 32 C -12 40 -4 44 0 48 C -8 40 -8 24 0 0 Z', { x: 412, y: 185, color: blueColor });
  page.drawSvgPath('M 0 0 C 12 8 20 20 16 32 C 12 40 4 44 0 48 C 8 40 8 24 0 0 Z', { x: 430, y: 185, color: blueColor });

  // 9. Signatures at Bottom
  // Left Signature - Soham Sharma (Founder)
  page.drawLine({ start: { x: 140, y: 130 }, end: { x: 310, y: 130 }, color: blueColor, thickness: 1 });
  page.drawText("Soham Sharma", { x: 145, y: 112, size: 12.5, font: fontBold, color: darkNavy });
  page.drawText("Founder & Principal AI Architect", { x: 145, y: 98, size: 9, font: fontRegular, color: mutedText });
  page.drawText("Botmartz AI Solutions", { x: 145, y: 84, size: 8.5, font: fontRegular, color: blueColor });

  // Right Signature - Harsh Sahu (Lead Mentor)
  page.drawLine({ start: { x: 532, y: 130 }, end: { x: 702, y: 130 }, color: blueColor, thickness: 1 });
  page.drawText("Harsh Sahu", { x: 537, y: 112, size: 12.5, font: fontBold, color: darkNavy });
  page.drawText("Lead AI Mentor & Instructor", { x: 537, y: 98, size: 9, font: fontRegular, color: mutedText });
  page.drawText("GTWY AI & Botmartz", { x: 537, y: 84, size: 8.5, font: fontRegular, color: blueColor });

  // 10. Bottom Date & Credential Verification
  const dateStr = `Issued: ${issueDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
  const dateWidth = fontRegular.widthOfTextAtSize(dateStr, 8.5);
  page.drawText(dateStr, { x: width / 2 - dateWidth / 2, y: 54, size: 8.5, font: fontRegular, color: mutedText });

  if (checkInCode) {
    const certIdStr = `Credential Verification ID: BMZ-CERT-${checkInCode}`;
    const certIdWidth = fontRegular.widthOfTextAtSize(certIdStr, 8.5);
    page.drawText(certIdStr, { x: width / 2 - certIdWidth / 2, y: 40, size: 8.5, font: fontRegular, color: blueColor });
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
