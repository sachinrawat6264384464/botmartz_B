import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

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
  const formattedName = (name || 'Participant Name').trim();
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
  const line2 = `"${bootcampTitle || 'AI Engineering Workshop & Bootcamp'}"`;
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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name') || 'Student Name';
    const title = searchParams.get('title') || 'AI Frontier 2026: Build Smarter AI Agents';
    const date = searchParams.get('date') || 'August 23, 2026';
    const code = searchParams.get('code') || 'BMZ-2026-AIF';

    const pdfBytes = await generatePdfCertificate(name, title, date, code);
    const filename = `${name.replace(/\s+/g, '_')}_Certificate.pdf`;

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = body.name || 'Student Name';
    const title = body.title || 'AI Frontier 2026: Build Smarter AI Agents';
    const date = body.date || 'August 23, 2026';
    const code = body.code || 'BMZ-2026-AIF';

    const pdfBytes = await generatePdfCertificate(name, title, date, code);
    const filename = `${name.replace(/\s+/g, '_')}_Certificate.pdf`;

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
