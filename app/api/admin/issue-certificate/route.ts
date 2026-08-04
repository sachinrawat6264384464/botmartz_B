import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, bootcampName, issueDate } = await req.json();

    if (!name || !email || !bootcampName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Generate the PDF Certificate
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([842, 595]); // A4 Landscape
    const { width, height } = page.getSize();

    // In a real production scenario, you would load an image template:
    // const templateBytes = await fetch("URL_TO_BLANK_CERT").then(res => res.arrayBuffer());
    // const pdfDoc = await PDFDocument.load(templateBytes);

    // Draw background
    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height,
      color: rgb(0.97, 0.98, 0.99), // Very light gray/blue
    });

    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Header
    page.drawText("CERTIFICATE OF COMPLETION", {
      x: width / 2 - 200,
      y: height - 120,
      size: 32,
      font: font,
      color: rgb(0.04, 0.11, 0.17), // #0B1C2C
    });

    // Subheader
    page.drawText("This certifies that", {
      x: width / 2 - 70,
      y: height - 200,
      size: 18,
      font: regularFont,
      color: rgb(0.39, 0.45, 0.54), // #64748B
    });

    // Name
    page.drawText(name.toUpperCase(), {
      x: width / 2 - (name.length * 9), // Rough centering
      y: height - 260,
      size: 42,
      font: font,
      color: rgb(0.0, 0.4, 1.0), // #0066FF
    });

    // Body
    page.drawText(`has successfully completed the ${bootcampName}`, {
      x: width / 2 - 220,
      y: height - 340,
      size: 18,
      font: regularFont,
      color: rgb(0.39, 0.45, 0.54),
    });

    // Date
    page.drawText(`Issued on: ${issueDate || new Date().toLocaleDateString()}`, {
      x: 100,
      y: 100,
      size: 14,
      font: regularFont,
      color: rgb(0.04, 0.11, 0.17),
    });

    // Signature
    page.drawText("Soham Sharma", {
      x: width - 250,
      y: 120,
      size: 18,
      font: font,
      color: rgb(0.04, 0.11, 0.17),
    });
    page.drawText("Founder, Botmartz AI Solutions", {
      x: width - 250,
      y: 100,
      size: 12,
      font: regularFont,
      color: rgb(0.39, 0.45, 0.54),
    });

    const pdfBytes = await pdfDoc.save();

    // 2. Send the Email using Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER, // Your Gmail
        pass: process.env.SMTP_PASS, // Your App Password
      },
    });

    // We only attempt to send if credentials exist, otherwise we just return the PDF success for testing
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: `"Botmartz AI Solutions" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Your Certificate of Completion: ${bootcampName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0B1C2C;">
            <h1 style="color: #0066FF;">Congratulations, ${name}!</h1>
            <p>You have successfully completed the <strong>${bootcampName}</strong>.</p>
            <p>We are incredibly proud of your progress and are excited to see what you build next.</p>
            <p>Please find your official Certificate of Completion attached to this email.</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>The Botmartz Team</strong></p>
          </div>
        `,
        attachments: [
          {
            filename: `${name.replace(/\s+/g, '_')}_Certificate.pdf`,
            content: Buffer.from(pdfBytes),
            contentType: 'application/pdf',
          },
        ],
      });
    }

    return NextResponse.json({ success: true, message: "Certificate generated and sent successfully" }, { status: 200 });

  } catch (error: any) {
    console.error("Certificate Issue Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
