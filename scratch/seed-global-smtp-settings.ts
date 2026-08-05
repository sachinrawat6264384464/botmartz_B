import "dotenv/config";
import { adminDb } from "../lib/firebase-admin";

async function seedGlobalSMTP() {
  console.log("Seeding Hostinger SMTP settings into Firestore settings/global...");

  const smtpData = {
    email: {
      smtpHost: "smtp.hostinger.com",
      smtpPort: 465,
      smtpUser: "soham@botmartz.com",
      smtpPass: "Soham@271093",
      supportEmail: "soham@botmartz.com",
      fromName: "Botmartz Events"
    },
    general: {
      companyName: "Botmartz AI Solution Pvt Ltd"
    },
    updatedAt: new Date()
  };

  try {
    await adminDb.collection("settings").doc("global").set(smtpData, { merge: true });
    console.log("✅ Successfully stored Hostinger SMTP settings into Firestore!");
  } catch (err) {
    console.error("❌ Failed to seed settings/global:", err);
  }
}

seedGlobalSMTP();
