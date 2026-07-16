import nodemailer from 'nodemailer';

async function testAllSMTPPermutations() {
  const credentials = [
    {
      user: "soham@botmartz.com",
      pass: "Mummy@271093"
    },
    {
      user: "info@botmartz.com",
      pass: "Mummy@180767"
    }
  ];

  const hosts = [
    "smtp.hostinger.com",
    "smtp.titan.email"
  ];

  console.log("🚀 Testing SMTP Hosts & Accounts Permutations…\n");

  for (const host of hosts) {
    for (const cred of credentials) {
      console.log(`📡 Trying Host: ${host} | Account: ${cred.user}…`);
      try {
        const transporter = nodemailer.createTransport({
          host,
          port: 465,
          secure: true,
          auth: {
            user: cred.user,
            pass: cred.pass,
          },
          // Shorten timeout to fail fast
          connectionTimeout: 5000,
          greetingTimeout: 5000,
        });

        // Verify connection configuration
        await transporter.verify();
        console.log(`✅ Success! Verified configuration on Host: ${host} | User: ${cred.user}`);

        // Try sending a test email
        const info = await transporter.sendMail({
          from: `"Botmartz SMTP Test" <${cred.user}>`,
          to: "soham@botmartz.com",
          subject: `✨ SMTP Working Test: ${cred.user} on ${host}`,
          text: `Success! SMTP mail sent from ${cred.user} using ${host}.`,
          html: `<p>Success! SMTP mail sent from <b>${cred.user}</b> using <b>${host}</b>.</p>`
        });

        console.log(`✅ Mail Sent successfully! Message ID: ${info.messageId}\n`);
        
        console.log("------------------------------------------------------------------");
        console.log(`🔥 USE THIS IN .env:`);
        console.log(`SMTP_HOST=${host}`);
        console.log(`SMTP_PORT=465`);
        console.log(`SMTP_USER=${cred.user}`);
        console.log(`SMTP_PASS=${cred.pass}`);
        console.log("------------------------------------------------------------------\n");
      } catch (error: any) {
        console.error(`❌ Failed: ${error.message || error}`);
        console.log();
      }
    }
  }
}

testAllSMTPPermutations().catch(console.error);
