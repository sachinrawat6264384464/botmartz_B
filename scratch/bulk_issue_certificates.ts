import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import nodemailer from 'nodemailer';

export interface Participant {
  name: string;
  email: string;
  phone?: string;
  isVip?: boolean; // Gets The_RAG_Book.pdf
}

export const PARTICIPANTS_LIST: Participant[] = [
  { name: 'Payal Vishwakarma', email: 'payal.dise@gmail.com', phone: '9993821395' },
  { name: 'Pradyumn Patidar', email: 'pradumn.patidar04@gmail.com', phone: '6267524423' },
  { name: 'Shikha Sharma', email: 'shikhasharma0250@gmail.com', phone: '9926745712' },
  { name: 'Suniti Rathi', email: 'sunitirathi11@gmail.com', phone: '9137504411' },
  { name: 'Rishabh Patel', email: 'rishabhptl2003@gmail.com', phone: '7000567431' },
  { name: 'Rishi Gupta', email: 'grishi634@gmail.com', phone: '8770856060' },
  { name: 'Anuj Singh', email: 'anujsingh7112007@gmail.com', phone: '8305354640' },
  { name: 'Mayur Gurjar', email: 'mayurgurjar817@gmail.com', phone: '9131439602' },
  { name: 'Palak Raghuwanshi', email: 'palakraghuwanshi652@gmail.com', phone: '9893989904', isVip: true }, // VIP
  { name: 'Priyal Jaiswal', email: 'jpriyal@gmail.com', phone: '9009008236', isVip: true }, // VIP
  { name: 'Priyanshi Khated', email: 'priyanshikhated007@gmail.com', phone: '9691043574' },
  { name: 'Sajal Lad', email: 'sajal.lad336@gmail.com', phone: '96910700720' },
  { name: 'Sarthak Jain', email: 'sarthakjain452@gmail.com', phone: '9302633804' },
  { name: 'Samendra Kashyap', email: 'samendrak918@gmail.com', phone: '7654668525' },
  { name: 'Mayank Kushwaha', email: 'mayankkushwah1212@gmail.com', phone: '9202249645' },
  { name: 'Utkarsh Singh', email: 'utkarshsingh8200@gmail.com', phone: '9589834493' },
  { name: 'Rohit Gupta', email: 'rohitgupta220706@gmail.com', phone: '9993153447' },
  { name: 'Sameer Jain', email: 'sameerjain9977@gmail.com' },
  { name: 'Bharat Maru', email: 'bharat.maru486@gmail.com', phone: '6264770486', isVip: true }, // VIP
  { name: 'Sandeep Solanki', email: 'sandeepsolankimca@gmail.com', phone: '9630585375' },
  { name: 'Gopal Verma', email: 'gopalverma.tech@gmail.com', phone: '6263740359' },
  { name: 'Neeraj Sahu', email: 'neerajsahu210132@acropolis.in', phone: '6268103398' },
  { name: 'Akshat Sarkar', email: 'akshatsarkar51@gmail.com', phone: '7724936570', isVip: true }, // VIP
  { name: 'Ashish', email: 'ashishmathesiya@gmail.com', phone: '9565113185' },
  { name: 'Rudraksh Kushwah', email: 'kushwahrudraksh3@gmail.com', phone: '9343713134' },
];

export async function generatePdfCertificate(name: string, checkInCode: string): Promise<Uint8Array> {
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

  const darkNavy = rgb(0.05, 0.15, 0.30);
  const electricBlue = rgb(0.00, 0.40, 0.90);
  const bodyTextDark = rgb(0.10, 0.18, 0.30);

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

  // 2. Student Name
  const formattedName = name.trim();
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

  // 3. Description Citation
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

  return await pdfDoc.save();
}

export function buildEmailHtml(name: string, checkInCode: string, isVip: boolean): string {
  return `
    <div style="background-color: #050B14; padding: 40px 20px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF;">
      <div style="max-width: 640px; margin: 0 auto; background: #0E172A; border: 1px solid rgba(0, 184, 240, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 102, 255, 0.25);">
        
        <div style="background: linear-gradient(135deg, #0066FF 0%, #00B8F0 100%); padding: 32px 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #FFFFFF;">
            Official Certificate &amp; Resources
          </h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.95; color: #E0F2FE; font-weight: 500;">Botmartz AI Solutions • AI Accelerator Program</p>
        </div>
        
        <div style="padding: 36px 28px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="font-size: 44px; margin-bottom: 12px;">🎓</div>
            <h2 style="font-size: 24px; color: #00B8F0; margin: 0 0 12px 0; font-weight: 700;">Congratulations, ${name}!</h2>
            <p style="font-size: 15px; color: #94A3B8; line-height: 1.6; margin-bottom: 20px;">
              We are proud to award you this official Certificate of Participation for participating in:
            </p>
            
            <div style="background: rgba(0, 102, 255, 0.12); border: 1px solid rgba(0, 184, 240, 0.4); padding: 16px 20px; border-radius: 12px; font-weight: 700; font-size: 16px; color: #FFFFFF; margin-bottom: 24px; line-height: 1.4;">
              AI Frontier 2026 — The Future of AI Engineering
            </div>
          </div>
          
          <!-- WHATSAPP COMMUNITY SECTION -->
          <div style="background: rgba(37, 211, 102, 0.08); border: 1px solid rgba(37, 211, 102, 0.4); border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
            <div style="font-size: 16px; font-weight: 700; color: #25D366; margin-bottom: 8px;">
              💬 Join Official Botmartz AI Community
            </div>
            <p style="font-size: 13.5px; color: #94A3B8; margin-bottom: 14px; line-height: 1.5;">
              Connect with fellow AI engineers, get exclusive workshop updates, and access ongoing technical discussions:
            </p>
            <a href="https://chat.whatsapp.com/DkzKwpjuktaCYAof0tMIAQ" target="_blank" style="display: inline-block; background: #25D366; color: #000000; font-weight: 800; font-size: 14px; padding: 12px 24px; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);">
              Join WhatsApp Community Group →
            </a>
          </div>

          <!-- ATTACHMENTS NOTICE -->
          <div style="background: rgba(0, 184, 240, 0.08); border: 1px dashed rgba(0, 184, 240, 0.4); border-radius: 12px; padding: 20px; text-align: center; color: #E0F2FE; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
            📌 <strong>Attached Files in this Email:</strong><br />
            1. 📜 <strong>Your Official PDF Certificate of Participation</strong><br />
            2. 📘 <strong>AI Engineering Roadmap 2026-2027 PDF Handbook</strong>
            ${isVip ? '<br />3. 📖 <strong>The RAG Book (Exclusive Edition PDF)</strong>' : ''}
          </div>
          
          ${checkInCode ? `
            <div style="text-align: center; margin-top: 16px;">
              <div style="display: inline-block; background: #050B14; border: 1px solid #1E293B; padding: 10px 20px; border-radius: 8px; font-family: monospace; font-size: 13px; color: #00B8F0; font-weight: 700;">
                Credential ID: ${checkInCode}
              </div>
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

export async function executeBulkIssuance() {
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
  const ragBookPath = path.resolve(process.cwd(), 'public', 'The_RAG_Book.pdf');

  console.log(`Starting bulk certificate email dispatch for ${PARTICIPANTS_LIST.length} participants...`);

  let sentCount = 0;
  let failCount = 0;

  for (let i = 0; i < PARTICIPANTS_LIST.length; i++) {
    const p = PARTICIPANTS_LIST[i];
    const checkInCode = `BMZ-CERT-${String(i + 101).padStart(4, '0')}`;
    console.log(`[${i + 1}/${PARTICIPANTS_LIST.length}] Sending to ${p.name} <${p.email}> ${p.isVip ? '(VIP - WITH RAG BOOK)' : '(Standard)'}...`);

    try {
      const certBytes = await generatePdfCertificate(p.name, checkInCode);

      const attachments: any[] = [
        {
          filename: `${p.name.replace(/\s+/g, '_')}_Certificate.pdf`,
          content: Buffer.from(certBytes),
          contentType: 'application/pdf',
        },
      ];

      if (fs.existsSync(roadmapPath)) {
        attachments.push({
          filename: 'AI-Engineering-Roadmap-2026-2027.pdf',
          path: roadmapPath,
          contentType: 'application/pdf',
        });
      }

      if (p.isVip && fs.existsSync(ragBookPath)) {
        attachments.push({
          filename: 'The_RAG_Book.pdf',
          path: ragBookPath,
          contentType: 'application/pdf',
        });
      }

      const info = await transporter.sendMail({
        from: `"Botmartz AI Solutions" <${smtpUser}>`,
        to: p.email,
        subject: 'Your Certificate of Participation: AI Frontier 2026 — The Future of AI Engineering',
        html: buildEmailHtml(p.name, checkInCode, Boolean(p.isVip)),
        attachments: attachments,
      });

      console.log(`✅ [SUCCESS] Sent to ${p.name} <${p.email}>: ${info.response}`);
      sentCount++;
    } catch (err: any) {
      console.error(`❌ [FAILED] Send to ${p.name} <${p.email}>:`, err.message || err);
      failCount++;
    }

    // Small 500ms delay between emails to respect SMTP rate limits
    await new Promise((res) => setTimeout(res, 500));
  }

  console.log(`\n==================================================`);
  console.log(`BULK EMAIL DISPATCH COMPLETED!`);
  console.log(`Successfully Sent: ${sentCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`Total Processed: ${PARTICIPANTS_LIST.length}`);
  console.log(`==================================================\n`);
}

// Only execute when run directly via command line
if (require.main === module) {
  executeBulkIssuance().catch(console.error);
}
