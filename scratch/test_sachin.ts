import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import nodemailer from 'nodemailer';

async function testSendToSachin() {
  const recipientName = 'Sachin Rawat';
  const recipientEmail = 'sachinrawat6264384464@gmail.com';
  const bootcampTitle = 'AI Frontier 2026 — The Future of AI Engineering RESOURCES and certificate';
  const checkInCode = 'BMZ-TEST-SACHIN';

  console.log('Generating PDF certificate with background template...');
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);
  const { width, height } = page.getSize();

  const certPath = path.resolve(process.cwd(), 'public/certificate.png');
  if (fs.existsSync(certPath)) {
    const bgImage = await pdfDoc.embedPng(fs.readFileSync(certPath));
    page.drawImage(bgImage, { x: 0, y: 0, width, height });
  }

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawText('CERTIFICATE OF PARTICIPATION', { x: 250, y: 435, size: 24, font: fontBold, color: rgb(0.04, 0.15, 0.25) });
  page.drawText(recipientName, { x: 320, y: 342, size: 36, font: fontItalic, color: rgb(0, 0.4, 0.95) });
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

  console.log('Sending test email with Certificate PDF + AI Roadmap PDF to:', recipientEmail);
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

  console.log('TEST EMAIL DISPATCHED SUCCESSFULLY! Hostinger Response:', info);
}

testSendToSachin().catch(console.error);
