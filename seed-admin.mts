/**
 * seed-admin.mts
 * ─────────────────────────────────────────────────────────────────
 * Creates the super-admin Firebase Auth account and seeds the
 * corresponding user_roles document in Firestore.
 *
 * Usage:
 *   npx tsx seed-admin.mts
 *
 * Requirements:
 *   - FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL,
 *     FIREBASE_ADMIN_PRIVATE_KEY must be set in .env.local
 *     (download a service account key from Firebase Console →
 *      Project Settings → Service Accounts → Generate new private key)
 * ─────────────────────────────────────────────────────────────────
 */

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// ── Config ────────────────────────────────────────────────────────
const ADMIN_EMAIL    = "Botmartzadmin@gmail.com";
const ADMIN_PASSWORD = "admin@312";
const ADMIN_NAME     = "Botmartz Admin";
// ─────────────────────────────────────────────────────────────────

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey:  process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      });

const db   = getFirestore(app);
const auth = getAuth(app);

async function seedAdmin() {
  console.log("🚀 Seeding super-admin account…\n");

  // 1. Create or fetch the Auth user
  let uid: string;
  try {
    const existing = await auth.getUserByEmail(ADMIN_EMAIL);
    uid = existing.uid;
    console.log(`ℹ️  Auth user already exists → uid: ${uid}`);

    // Ensure the password & display name are up-to-date
    await auth.updateUser(uid, {
      password:    ADMIN_PASSWORD,
      displayName: ADMIN_NAME,
    });
    console.log("✅ Auth user updated (password + displayName)");
  } catch (err: any) {
    if (err?.errorInfo?.code === "auth/user-not-found") {
      const newUser = await auth.createUser({
        email:       ADMIN_EMAIL,
        password:    ADMIN_PASSWORD,
        displayName: ADMIN_NAME,
      });
      uid = newUser.uid;
      console.log(`✅ Auth user created → uid: ${uid}`);
    } else {
      throw err;
    }
  }

  // 2. Upsert the user_roles Firestore document
  const roleRef = db.collection("user_roles").doc(uid);
  await roleRef.set(
    {
      email:       ADMIN_EMAIL.toLowerCase(),
      displayName: ADMIN_NAME,
      isSuperAdmin: true,
      modules:     [],               // super admins bypass module checks
      updatedAt:   FieldValue.serverTimestamp(),
    },
    { merge: true }                  // merge so we don't wipe extra fields
  );
  console.log("✅ user_roles document upserted (isSuperAdmin: true)");

  console.log("\n🎉 Done! You can now log in at /admin/login with:");
  console.log(`   Email    : ${ADMIN_EMAIL}`);
  console.log(`   Password : ${ADMIN_PASSWORD}`);
  process.exit(0);
}

seedAdmin().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
