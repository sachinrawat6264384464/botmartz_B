import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

async function generateTestCert() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);
  const { width, height } = page.getSize();

  // Load background image
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
  const bodyTextDark = rgb(0.10, 0.18, 0.30);  // Highly readable dark slate

  const name = "Sachin Rawat";
  const bootcampTitle = "AI Frontier 2026 — The Future of AI Engineering";
  const issueDate = "August 23, 2026";
  const checkInCode = "BMZ-CERT-SACHIN99";

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
  const formattedName = name.trim();
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

  // 3. Description Citation Paragraph (Prominent 13pt-15pt text)
  const line1 = `for successfully participating in and completing`;
  const line2 = `"${bootcampTitle}"`;
  const line3 = `conducted by Botmartz AI Solutions, demonstrating proficiency in AI Engineering & Agentic Workflows.`;

  const l1Width = fontRegular.widthOfTextAtSize(line1, 13.5);
  const l2Width = fontBold.widthOfTextAtSize(line2, 14.5);
  const l3Width = fontRegular.widthOfTextAtSize(line3, 12.5);

  page.drawText(line1, { x: width / 2 - l1Width / 2, y: 282, size: 13.5, font: fontRegular, color: bodyTextDark });
  page.drawText(line2, { x: width / 2 - l2Width / 2, y: 260, size: 14.5, font: fontBold, color: darkNavy });
  page.drawText(line3, { x: width / 2 - l3Width / 2, y: 240, size: 12.5, font: fontRegular, color: bodyTextDark });

  // 4. Issue Date & Credential Verification ID
  const dateStr = `Issued Date: ${issueDate}`;
  const dateWidth = fontRegular.widthOfTextAtSize(dateStr, 10.5);
  page.drawText(dateStr, { x: width / 2 - dateWidth / 2, y: 195, size: 10.5, font: fontRegular, color: bodyTextDark });

  const certIdStr = `Credential Verification ID: ${checkInCode}`;
  const certIdWidth = fontBold.widthOfTextAtSize(certIdStr, 10.5);
  page.drawText(certIdStr, { x: width / 2 - certIdWidth / 2, y: 178, size: 10.5, font: fontBold, color: electricBlue });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(path.resolve(process.cwd(), 'scratch/test_cert_output.pdf'), pdfBytes);
  console.log('Test certificate PDF generated successfully at scratch/test_cert_output.pdf');
}

generateTestCert().catch(console.error);
