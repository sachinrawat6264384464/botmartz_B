// @ts-ignore
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { adminDb } from "../lib/firebase-admin";

async function updateGlobalSMTP() {
  console.log("Updating Firestore settings/global with new team@botmartz.com SMTP credentials…");
  
  await adminDb.collection("settings").doc("global").set({
    email: {
      smtpHost: "smtp.hostinger.com",
      smtpPort: 465,
      smtpUser: "team@botmartz.com",
      smtpPass: "yr6c-maob-rq6u-crkj",
      supportEmail: "team@botmartz.com",
      fromName: "Botmartz AI Solutions"
    }
  }, { merge: true });

  console.log("✅ Firestore settings/global updated successfully!");
  process.exit(0);
}

updateGlobalSMTP().catch(err => {
  console.error("❌ Failed to update Firestore:", err);
  process.exit(1);
});
