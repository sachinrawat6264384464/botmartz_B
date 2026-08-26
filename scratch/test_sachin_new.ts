import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import nodemailer from 'nodemailer';

async function testSendToSachinNew() {
  const recipientName = 'Sachin Rawat';
  const recipientEmail = 'sachinrawat6264384464@gmail.com';
  const bootcampTitle = 'AI Frontier 2026 — The Future of AI Engineering RESOURCES and certificate';
  const checkInCode = 'BMZ-CERT-SACHIN99';

  console.log('Generating updated PDF certificate...');
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);
  const { width, height } = page.getSize();

  const certPath = path.resolve(process.cwd(), 'public/certificate.png');
  if (fs.existsSync(certPath)) {
    const bgImage = await pdfDoc.embedPng(fs.readFileSync(certPath));
    page.drawImage(bgImage, { x: 0, y: 0, width, height });
  }

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);

  const darkNavy = rgb(0.05, 0.15, 0.30);      // Crisp Dark Navy
  const electricBlue = rgb(0.00, 0.40, 0.90);  // Bright Royal Blue
  const bodyTextDark = rgb(0.10, 0.18, 0.30);  // Dark slate

  // 1. Award text
  const awardText = "THIS CERTIFICATE IS PROUDLY PRESENTED TO";
  const awardWidth = fontBold.widthOfTextAtSize(awardText, 12);
  page.drawText(awardText, {
    x: width / 2 - awardWidth / 2,
    y: 382,
    size: 12,
    font: fontBold,
    color: darkNavy,
  });

  // 2. Name
  const formattedName = recipientName.trim();
  const nameWidth = fontItalic.widthOfTextAtSize(formattedName, 38);
  page.drawText(formattedName, {
    x: width / 2 - nameWidth / 2,
    y: 332,
    size: 38,
    font: fontItalic,
    color: electricBlue,
  });

  const lineHalf = Math.max(nameWidth / 2 + 30, 110);
  page.drawLine({
    start: { x: width / 2 - lineHalf, y: 320 },
    end: { x: width / 2 + lineHalf, y: 320 },
    color: electricBlue,
    thickness: 1.5,
  });

  // 3. Description
  const line1 = `for successfully participating in and completing`;
  const line2 = `"AI Frontier 2026 — The Future of AI Engineering"`;
  const line3 = `conducted by Botmartz AI Solutions, demonstrating proficiency in AI Engineering & Agentic Workflows.`;

  const l1Width = fontRegular.widthOfTextAtSize(line1, 13.5);
  const l2Width = fontBold.widthOfTextAtSize(line2, 14.5);
  const l3Width = fontRegular.widthOfTextAtSize(line3, 12.5);

  page.drawText(line1, { x: width / 2 - l1Width / 2, y: 282, size: 13.5, font: fontRegular, color: bodyTextDark });
  page.drawText(line2, { x: width / 2 - l2Width / 2, y: 260, size: 14.5, font: fontBold, color: darkNavy });
  page.drawText(line3, { x: width / 2 - l3Width / 2, y: 240, size: 12.5, font: fontRegular, color: bodyTextDark });

  // 4. Issue Date & Credential Verification ID
  const dateStr = `Issued Date: August 23, 2026`;
  const dateWidth = fontRegular.widthOfTextAtSize(dateStr, 10.5);
  page.drawText(dateStr, { x: width / 2 - dateWidth / 2, y: 195, size: 10.5, font: fontRegular, color: bodyTextDark });

  const certIdStr = `Credential Verification ID: ${checkInCode}`;
  const certIdWidth = fontBold.widthOfTextAtSize(certIdStr, 10.5);
  page.drawText(certIdStr, { x: width / 2 - certIdWidth / 2, y: 178, size: 10.5, font: fontBold, color: electricBlue });

  const pdfBytes = await pdfDoc.save();

  const smtpUser = process.env.SMTP_USER || 'team@botmartz.com';
  const smtpPass = process.env.SMTP_PASS || 'yr6c-maob-rq6u-crkj';

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: { user: smtpUser, pass: smtpPass },
    family: 4,
    tls: { rejectUnauthorized: false }
  });

  const roadmapPath = path.resolve(process.cwd(), 'public', 'AI-Engineering-Roadmap-2026-2027.pdf');

  console.log('Sending test email to:', recipientEmail);
  const info = await transporter.sendMail({
    from: `"Botmartz AI Solutions" <${smtpUser}>`,
    to: recipientEmail,
    subject: `Your Certificate of Participation: ${bootcampTitle}`,
    html: `
      <div style="background-color: #050B14; padding: 40px 20px; font-family: sans-serif; color: #FFFFFF;">
        <div style="max-width: 640px; margin: 0 auto; background: #0E172A; border: 1px solid rgba(0, 184, 240, 0.3); border-radius: 16px; padding: 36px 28px; text-align: center;">
          <div style="font-size: 44px; margin-bottom: 12px;">🎓</div>
          <h2 style="font-size: 24px; color: #00B8F0; margin: 0 0 12px 0;">Congratulations, ${recipientName}!</h2>
          <p style="font-size: 15px; color: #94A3B8; margin-bottom: 20px;">
            We are proud to award you this official Certificate of Participation for participating in:
          </p>
          <div style="background: rgba(0, 102, 255, 0.12); border: 1px solid rgba(0, 184, 240, 0.4); padding: 16px 20px; border-radius: 12px; font-weight: 700; font-size: 16px; color: #FFFFFF; margin-bottom: 24px;">
            ${bootcampTitle}
          </div>
          <div style="background: rgba(0, 184, 240, 0.08); border: 1px dashed rgba(0, 184, 240, 0.4); border-radius: 12px; padding: 20px; text-align: center; color: #E0F2FE; font-size: 14px; margin-bottom: 24px;">
            📌 <strong>Attached Files in this Email:</strong><br />
            1. 📜 <strong>Your Official PDF Certificate of Participation</strong><br />
            2. 📘 <strong>AI Engineering Roadmap 2026-2027 PDF Handbook</strong>
          </div>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: `${recipientName.replace(/\s+/g, '_')}_Certificate.pdf`,
        content: Buffer.from(pdfBytes),
        contentType: 'application/pdf',
      },
      ...(fs.existsSync(roadmapPath) ? [{
        filename: 'AI-Engineering-Roadmap-2026-2027.pdf',
        path: roadmapPath,
        contentType: 'application/pdf',
      }] : []),
    ],
  });

  console.log('SUCCESSFULLY DISPATCHED UPDATED CERTIFICATE TO:', recipientEmail, info.response);
}

testSendToSachinNew().catch(console.error);
