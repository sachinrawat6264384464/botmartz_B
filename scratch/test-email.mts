import nodemailer from 'nodemailer';

async function testTeamBotmartz() {
  const passes = [
    "yr6c-maob-rq6u-crkj",
    "yr6cmaobrq6ucrkj"
  ];

  const configs = [
    { host: "smtp.gmail.com", port: 465 },
    { host: "smtp.gmail.com", port: 587 },
    { host: "smtp.hostinger.com", port: 465 },
    { host: "smtp.titan.email", port: 465 }
  ];

  const user = "team@botmartz.com";
  console.log(`🚀 Testing permutations for ${user}…\n`);

  for (const cfg of configs) {
    for (const pass of passes) {
      console.log(`📡 Host: ${cfg.host}:${cfg.port} | Pass: ${pass}`);
      try {
        const transporter = nodemailer.createTransport({
          host: cfg.host,
          port: cfg.port,
          secure: cfg.port === 465,
          auth: { user, pass },
          connectionTimeout: 5000,
          greetingTimeout: 5000,
        });

        await transporter.verify();
        console.log(`\n🎉 SUCCESS! Verified on ${cfg.host}:${cfg.port} with pass "${pass}"!`);

        const info = await transporter.sendMail({
          from: `"Botmartz Test" <${user}>`,
          to: user,
          subject: "✨ SMTP Test Success",
          text: "Test email working successfully!"
        });
        console.log(`✅ Mail Sent! Message ID: ${info.messageId}\n`);
        return;
      } catch (err: any) {
        console.error(`❌ Failed on ${cfg.host}:${cfg.port} (${pass}):`, err.message || err);
      }
    }
  }
}

testTeamBotmartz().catch(console.error);
