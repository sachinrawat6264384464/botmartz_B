const path = require('path');
require('dotenv').config({ path: '.env' });
const admin = require('firebase-admin');

const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY
  ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

if (!privateKey) {
  console.error("❌ FIREBASE_ADMIN_PRIVATE_KEY is missing!");
  process.exit(1);
}

const app = admin.apps.length > 0
  ? admin.apps[0]
  : admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });

const db = admin.firestore();

async function setAdminPassword() {
  const email = "sachinrawat6264384464@gmail.com";
  const newPassword = "Admin@123456";

  try {
    let userRecord = await admin.auth().getUserByEmail(email);
    console.log(`Updating password for ${email} (UID: ${userRecord.uid})...`);
    
    await admin.auth().updateUser(userRecord.uid, {
      password: newPassword,
    });

    console.log(`Setting Super Admin role in Firestore user_roles for ${email}...`);
    await db.collection('user_roles').doc(userRecord.uid).set({
      email: email,
      displayName: "Sachin Rawat (Super Admin)",
      isSuperAdmin: true,
      role: "super_admin",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    console.log(`SUCCESS! Credentials set for ${email} | Password: ${newPassword}`);
    process.exit(0);
  } catch (err) {
    console.error("Error setting admin password:", err);
    process.exit(1);
  }
}

setAdminPassword();
