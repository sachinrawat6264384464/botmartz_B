import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config({ path: ".env" });

async function testHostinger() {
  console.log("🚀 Testing Hostinger SMTP from .env configuration…\n");

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const adminEmail = process.env.ADMIN_EMAIL || 'soham@botmartz.com';

  console.log(`Host: ${host}`);
  console.log(`Port: ${port}`);
  console.log(`User: ${user}`);
  console.log(`Pass: ${pass ? '****' : 'undefined'}`);
  console.log(`Admin Recipient: ${adminEmail}\n`);

  if (!host || !user || !pass) {
    console.error("❌ Missing SMTP variables in .env!");
    process.exit(1);
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    await transporter.verify();
    console.log("✅ SMTP Verification Success! Connection is secure and authenticated.");

    const info = await transporter.sendMail({
      from: `"Botmartz SMTP Test" <${user}>`,
      to: adminEmail,
      subject: "🚀 Botmartz Hostinger SMTP Integration Test",
      text: `Hello! This is a test email validating your new Hostinger SMTP credentials in .env.\nSender: ${user}\nRecipient: ${adminEmail}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #00B8F0; margin-top: 0;">Hostinger SMTP Live!</h2>
          <p>This email confirms that the Hostinger SMTP settings are now correctly configured in your <b>.env</b> file.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">
            Sender: ${user}<br/>
            Recipient: ${adminEmail}
          </p>
        </div>
      `
    });

    console.log(`✅ Test Email Sent successfully! Message ID: ${info.messageId}`);
    process.exit(0);
  } catch (error: any) {
    console.error("❌ SMTP Send Test Failed:", error.message || error);
    process.exit(1);
  }
}

testHostinger().catch(console.error);
