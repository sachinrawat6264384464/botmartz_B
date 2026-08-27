import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import nodemailer from "nodemailer";
import { adminDb } from "@/lib/firebase-admin";
import fs from "fs";
import path from "path";

function getRoadmapPdfPath(): string | null {
  const publicPath = path.resolve(process.cwd(), 'public', 'AI-Engineering-Roadmap-2026-2027.pdf');
  if (fs.existsSync(publicPath)) return publicPath;
  const rootPath = path.resolve(process.cwd(), 'AI-Engineering-Roadmap-2026-2027.pdf');
  if (fs.existsSync(rootPath)) return rootPath;
  return null;
}

async function getSmtpCredentials() {
  let smtpHost = process.env.SMTP_HOST || "smtp.hostinger.com";
  let smtpPort = Number(process.env.SMTP_PORT) || 465;
  let smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || "team@botmartz.com";
  let smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASS || "yr6c-maob-rq6u-crkj";

  try {
    const docSnap = await adminDb.collection("settings").doc("global").get();
    if (docSnap.exists) {
      const data = docSnap.data();
      if (data?.email?.smtpUser && data?.email?.smtpPass) {
        smtpUser = data.email.smtpUser;
        smtpPass = data.email.smtpPass;
        if (data.email.smtpHost) smtpHost = data.email.smtpHost;
        if (data.email.smtpPort) smtpPort = Number(data.email.smtpPort);
      }
    }
  } catch (err) {
    console.warn("Could not load global settings for SMTP:", err);
  }

  return { smtpHost, smtpPort, smtpUser, smtpPass };
}

function buildCertificateEmail(name: string, bootcampTitle: string, checkInCode?: string, hasRagBook?: boolean) {
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
            ${hasRagBook ? '<br />3. 📖 <strong>The RAG Book (Exclusive Edition PDF)</strong>' : ''}
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

async function generatePdfCertificate(name: string, bootcampTitle: string, issueDate?: string, checkInCode?: string) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]); // A4 Landscape (842 x 595 pt)
  const { width, height } = page.getSize();

  // Embed the EXACT certificate background template image (public/certificate.png)
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

  const darkNavy = rgb(0.05, 0.15, 0.30);      // Crisp Dark Navy
  const electricBlue = rgb(0.00, 0.40, 0.90);  // Bright Royal Blue
  const bodyTextDark = rgb(0.10, 0.18, 0.30);  // Highly readable dark slate

  // 1. Award text above name
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
  const formattedName = (name || 'Participant').trim();
  const nameWidth = fontItalic.widthOfTextAtSize(formattedName, 38);
  page.drawText(formattedName, {
    x: width / 2 - nameWidth / 2,
    y: 332,
    size: 38,
    font: fontItalic,
    color: electricBlue,
  });

  // Accent Line under Name
  const lineHalf = Math.max(nameWidth / 2 + 30, 110);
  page.drawLine({
    start: { x: width / 2 - lineHalf, y: 320 },
    end: { x: width / 2 + lineHalf, y: 320 },
    color: electricBlue,
    thickness: 1.5,
  });

  // 3. Description Citation Paragraph
  const line1 = `for successfully participating in and completing`;
  const line2 = `"${bootcampTitle || 'AI Frontier 2026 — The Future of AI Engineering'}"`;
  const line3 = `conducted by Botmartz AI Solutions, demonstrating proficiency in AI Engineering & Agentic Workflows.`;

  const l1Width = fontRegular.widthOfTextAtSize(line1, 13.5);
  const l2Width = fontBold.widthOfTextAtSize(line2, 14.5);
  const l3Width = fontRegular.widthOfTextAtSize(line3, 12.5);

  page.drawText(line1, { x: width / 2 - l1Width / 2, y: 282, size: 13.5, font: fontRegular, color: bodyTextDark });
  page.drawText(line2, { x: width / 2 - l2Width / 2, y: 260, size: 14.5, font: fontBold, color: darkNavy });
  page.drawText(line3, { x: width / 2 - l3Width / 2, y: 240, size: 12.5, font: fontRegular, color: bodyTextDark });

  // 4. Issue Date & Credential Verification ID
  const dateFormatted = issueDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const dateStr = `Issued Date: ${dateFormatted}`;
  const dateWidth = fontRegular.widthOfTextAtSize(dateStr, 10.5);
  page.drawText(dateStr, { x: width / 2 - dateWidth / 2, y: 195, size: 10.5, font: fontRegular, color: bodyTextDark });

  if (checkInCode) {
    const certIdStr = `Credential Verification ID: BMZ-CERT-${checkInCode}`;
    const certIdWidth = fontBold.widthOfTextAtSize(certIdStr, 10.5);
    page.drawText(certIdStr, { x: width / 2 - certIdWidth / 2, y: 178, size: 10.5, font: fontBold, color: electricBlue });
  }

  return await pdfDoc.save();
}

export async function POST(req: Request) {
  try {
    const { registrationId, ids, name, email, bootcampName, issueDate } = await req.json();
    const { smtpHost, smtpPort, smtpUser, smtpPass } = await getSmtpCredentials();
    const roadmapPath = getRoadmapPdfPath();

    // 1. Bulk issuance mode
    if (ids && Array.isArray(ids) && ids.length > 0) {
      let successCount = 0;
      let lastErr = "";

      const transporter = (smtpUser && smtpPass) ? nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
        family: 4,
        tls: { rejectUnauthorized: false }
      } as any) : null;

      for (const regId of ids) {
        try {
          const docSnap = await adminDb.collection("bootcamp_registrations").doc(regId).get();
          if (!docSnap.exists) continue;
          const reg = docSnap.data()!;

          const regName = reg.name || name || "Attendee";
          const regEmail = reg.email || email;
          if (!regEmail) continue;

          let title = 'AI Frontier 2026 — The Future of AI Engineering';
          let title2 = 'AI Frontier 2026 — The Future of AI Engineering';

          const pdfBytes = await generatePdfCertificate(regName, title2, issueDate, reg.checkInCode);

          let mailAttachments: any[] = [
            {
              filename: `${regName.replace(/\s+/g, '_')}_Certificate.pdf`,
              content: Buffer.from(pdfBytes),
              contentType: 'application/pdf',
            },
          ];

          if (roadmapPath) {
            mailAttachments.push({
              filename: 'AI-Engineering-Roadmap-2026-2027.pdf',
              path: roadmapPath,
              contentType: 'application/pdf',
            });
          }

          if (transporter && smtpUser) {
            await transporter.sendMail({
              from: `"Botmartz AI Solutions" <${smtpUser}>`,
              to: regEmail,
              subject: `Your Certificate of Participation: ${title}`,
              html: buildCertificateEmail(regName, title, reg.checkInCode),
              attachments: mailAttachments,
            });
          }

          // Mark certificate as sent in Firestore
          await adminDb.collection("bootcamp_registrations").doc(regId).update({
            certificateSent: true,
            certificateSentAt: new Date().toISOString(),
          });

          successCount++;
        } catch (singleErr: any) {
          console.error(`Certificate send failed for ID ${regId}:`, singleErr);
          lastErr = singleErr.message || "Failed to send email";
        }
      }

      if (successCount === 0 && ids.length > 0) {
        return NextResponse.json({ success: false, error: `Failed to email certificates: ${lastErr}` }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: `Certificates and AI Roadmap PDF emailed to ${successCount} attendee(s).`,
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

    const title = 'AI Frontier 2026 — The Future of AI Engineering';
    const title2 = "AI Frontier 2026 — The Future of AI Engineering";

    const pdfBytes = await generatePdfCertificate(recipientName, title2, issueDate, checkInCode);

    let singleAttachments: any[] = [
      {
        filename: `${recipientName.replace(/\s+/g, '_')}_Certificate.pdf`,
        content: Buffer.from(pdfBytes),
        contentType: 'application/pdf',
      },
    ];

    if (roadmapPath) {
      singleAttachments.push({
        filename: 'AI-Engineering-Roadmap-2026-2027.pdf',
        path: roadmapPath,
        contentType: 'application/pdf',
      });
    }

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({ success: false, error: "SMTP Email credentials not configured on server." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
      family: 4,
      tls: { rejectUnauthorized: false }
    } as any);

    await transporter.sendMail({
      from: `"Botmartz AI Solutions" <${smtpUser}>`,
      to: recipientEmail,
      subject: `Your Certificate of Participation: ${title}`,
      html: buildCertificateEmail(recipientName, title, checkInCode),
      attachments: singleAttachments,
    });

    if (targetDocId) {
      await adminDb.collection("bootcamp_registrations").doc(targetDocId).update({
        certificateSent: true,
        certificateSentAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: `Certificate PDF & AI Roadmap PDF emailed to ${recipientEmail} successfully!`
    }, { status: 200 });

  } catch (error: any) {
    console.error("Certificate Issue Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to issue certificate" }, { status: 500 });
  }
}
