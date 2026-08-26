import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import nodemailer from 'nodemailer';

async function testSendToFamilyZila() {
  const recipientName = 'dfdf';
  const recipientEmail = 'familyzila1213@gmail.com';
  const bootcampTitle = 'AI ACCELERATOR WORKSHOP SERIES';
  const checkInCode = 'BMZ-TEST-99';

  console.log('Generating PDF certificate...');
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  page.drawText('CERTIFICATE OF COMPLETION', { x: 200, y: 300, size: 24, font: fontBold, color: rgb(0, 0.4, 0.9) });
  const pdfBytes = await pdfDoc.save();

  const smtpUser = process.env.SMTP_USER || 'team@botmartz.com';
  const smtpPass = process.env.SMTP_PASS;

  console.log('SMTP_USER:', smtpUser, 'SMTP_HOST:', process.env.SMTP_HOST || 'smtp.hostinger.com');

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: { user: smtpUser, pass: smtpPass },
    family: 4,
    tls: { rejectUnauthorized: false }
  });

  try {
    console.log('Attempting to send email to:', recipientEmail);
    const info = await transporter.sendMail({
      from: `"Botmartz AI Solutions" <${smtpUser}>`,
      to: recipientEmail,
      subject: `Your Certificate of Participation: ${bootcampTitle}`,
      html: `<p>Hello ${recipientName}, here is your certificate!</p>`,
      attachments: [
        {
          filename: `${recipientName}_Certificate.pdf`,
          content: Buffer.from(pdfBytes),
          contentType: 'application/pdf',
        },
      ],
    });
    console.log('SUCCESS! Mail sent. Response:', info);
  } catch (err: any) {
    console.error('ERROR SENDING EMAIL:', err);
  }
}

testSendToFamilyZila().catch(console.error);
