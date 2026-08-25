import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import nodemailer from "nodemailer";
import { adminDb } from "@/lib/firebase-admin";
import fs from "fs";
import path from "path";

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
  const page = pdfDoc.addPage([842, 595]); // A4 Landscape (842 x 595 pt)
  const { width, height } = page.getSize();

  // 1. Embed the EXACT certificate background template image (public/certificate.png)
  try {
    const certPath = path.resolve(process.cwd(), 'public/certificate.png');
    if (fs.existsSync(certPath)) {
      const imageBytes = fs.readFileSync(certPath);
      const bgImage = await pdfDoc.embedPng(imageBytes);
      page.drawImage(bgImage, {
        x: 0,
        y: 0,
        width: width,
        height: height,
      });
    }
  } catch (err) {
    console.warn("Could not load public/certificate.png image:", err);
  }

  // Embed Standard Fonts
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);

  const darkNavy = rgb(0.04, 0.15, 0.25);    // #0A2540
  const electricBlue = rgb(0.00, 0.40, 0.95); // #0066F2
  const mutedText = rgb(0.35, 0.42, 0.50);    // #596B80

  // 2. Header Text: CERTIFICATE OF COMPLETION
  const titleText = "CERTIFICATE OF COMPLETION";
  const titleWidth = fontBold.widthOfTextAtSize(titleText, 26);
  page.drawText(titleText, {
    x: width / 2 - titleWidth / 2,
    y: 435,
    size: 26,
    font: fontBold,
    color: darkNavy,
  });

  // 3. Award Subheader
  const awardText = "THIS CERTIFICATE IS PROUDLY PRESENTED TO";
  const awardWidth = fontRegular.widthOfTextAtSize(awardText, 11);
  page.drawText(awardText, {
    x: width / 2 - awardWidth / 2,
    y: 395,
    size: 11,
    font: fontRegular,
    color: mutedText,
  });

  // 4. Recipient Student Name
  const formattedName = (name || 'Participant').trim();
  const nameWidth = fontItalic.widthOfTextAtSize(formattedName, 36);
  page.drawText(formattedName, {
    x: width / 2 - nameWidth / 2,
    y: 342,
    size: 36,
    font: fontItalic,
    color: electricBlue,
  });

  // Elegant Accent Line under Name
  const lineHalf = Math.max(nameWidth / 2 + 20, 90);
  page.drawLine({
    start: { x: width / 2 - lineHalf, y: 332 },
    end: { x: width / 2 + lineHalf, y: 332 },
    color: electricBlue,
    thickness: 1.5,
  });

  // 5. Citation / Description Paragraph
  const line1 = `for successfully participating in and completing the intensive hands-on workshop`;
  const line2 = `"${bootcampTitle || 'AI Engineering Workshop'}"`;
  const line3 = `conducted by Botmartz AI Solutions, demonstrating proficiency in AI Engineering & Agentic Workflows.`;

  const l1Width = fontRegular.widthOfTextAtSize(line1, 10.5);
  const l2Width = fontBold.widthOfTextAtSize(line2, 11.5);
  const l3Width = fontRegular.widthOfTextAtSize(line3, 10);

  page.drawText(line1, { x: width / 2 - l1Width / 2, y: 288, size: 10.5, font: fontRegular, color: rgb(0.20, 0.25, 0.32) });
  page.drawText(line2, { x: width / 2 - l2Width / 2, y: 270, size: 11.5, font: fontBold, color: darkNavy });
  page.drawText(line3, { x: width / 2 - l3Width / 2, y: 254, size: 10, font: fontRegular, color: rgb(0.20, 0.25, 0.32) });

  // 6. Issue Date & Credential Verification ID (Center Bottom)
  const dateFormatted = issueDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const dateStr = `Issued: ${dateFormatted}`;
  const dateWidth = fontRegular.widthOfTextAtSize(dateStr, 8.5);
  page.drawText(dateStr, { x: width / 2 - dateWidth / 2, y: 200, size: 8.5, font: fontRegular, color: mutedText });

  if (checkInCode) {
    const certIdStr = `Credential Verification ID: BMZ-CERT-${checkInCode}`;
    const certIdWidth = fontRegular.widthOfTextAtSize(certIdStr, 8.5);
    page.drawText(certIdStr, { x: width / 2 - certIdWidth / 2, y: 186, size: 8.5, font: fontRegular, color: electricBlue });
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
