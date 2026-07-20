const path = require('path');
require('dotenv').config({ path: '.env' });
const admin = require('firebase-admin');

const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY
  ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

if (!privateKey) {
  console.error("❌ FIREBASE_ADMIN_PRIVATE_KEY is missing in your .env file!");
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

async function makeSuperAdmin() {
  const emailArg = process.argv[2];

  if (!emailArg) {
    console.log("🔍 Fetching all users from Firebase Auth...\n");
    try {
      const listUsersResult = await admin.auth().listUsers(100);
      console.log("Current Users in Firebase Auth:");
      listUsersResult.users.forEach((userRecord) => {
        console.log(`- UID: ${userRecord.uid} | Email: ${userRecord.email} | Name: ${userRecord.displayName || 'N/A'}`);
      });
      console.log("\n👉 Usage: node scripts/make-superadmin.js <email-or-uid>");
      process.exit(0);
    } catch (error) {
      console.error("Error listing users:", error);
      process.exit(1);
    }
  }

  try {
    let targetUid = emailArg;
    let targetEmail = emailArg;

    if (emailArg.includes('@')) {
      const userRecord = await admin.auth().getUserByEmail(emailArg);
      targetUid = userRecord.uid;
      targetEmail = userRecord.email;
    }

    console.log(`🚀 Setting Super Admin permissions for UID: ${targetUid} (${targetEmail})...`);

    const roleRef = db.collection('user_roles').doc(targetUid);
    await roleRef.set({
      email: targetEmail,
      displayName: targetEmail.split('@')[0],
      isSuperAdmin: true,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    console.log(`✅ Successfully granted Super Admin rights to: ${targetEmail}`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to grant Super Admin:", err);
    process.exit(1);
  }
}

makeSuperAdmin();
