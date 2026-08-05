const nodemailer = require('nodemailer');
require('dotenv').config();

async function main() {
  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER || 'soham@botmartz.com';
  const pass = process.env.SMTP_PASS || 'Soham@271093';

  console.log(`Testing SMTP Hostinger connection to ${host}:${port} as ${user}...`);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    await transporter.verify();
    console.log("✅ Hostinger SMTP Connection Verified Successfully!");

    const info = await transporter.sendMail({
      from: `"Botmartz Test" <${user}>`,
      to: 'royalrawat9301162081@gmail.com',
      subject: 'Test Email from Botmartz Hostinger SMTP',
      text: 'If you receive this, Hostinger SMTP is working 100% properly!'
    });

    console.log("✅ Test Email Sent Successfully! Message ID:", info.messageId);
  } catch (err) {
    console.error("❌ Hostinger SMTP Error:", err);
  }
}

main();
