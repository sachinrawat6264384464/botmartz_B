// Script to create a second admin user in Firebase Auth
// Run from Botmartz root directory:
//   node --env-file=.env create-admin.mjs

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// ── New Admin Credentials (change as needed) ─────────────────────────────────
const NEW_ADMIN_EMAIL    = "admin2@botmartz.com";
const NEW_ADMIN_PASSWORD = "Botmartz@Admin2";
const NEW_ADMIN_NAME     = "Admin Two";
// ─────────────────────────────────────────────────────────────────────────────

function initFirebaseAdmin() {
  if (getApps().length > 0) return getApps()[0];

  // Try local JSON service account first
  const jsonPath = resolve(process.cwd(), 'botmartz-main-firebase-adminsdk-fbsvc-d220cfe485.json');
  if (existsSync(jsonPath)) {
    const serviceAccount = JSON.parse(readFileSync(jsonPath, 'utf-8'));
    return initializeApp({ credential: cert(serviceAccount) });
  }

  // Fallback to ENV variables
  let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  if (!privateKey) throw new Error("FIREBASE_ADMIN_PRIVATE_KEY not found in environment");

  privateKey = privateKey
    .replace(/^["'`]+|["'`]+$/g, '')
    .replace(/\\n/g, '\n')
    .replace(/\r/g, '');

  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey,
    }),
  });
}

async function createAdmin() {
  try {
    initFirebaseAdmin();
    const auth = getAuth();

    // Check if user already exists
    try {
      const existing = await auth.getUserByEmail(NEW_ADMIN_EMAIL);
      if (existing) {
        console.log(`[!] User '${NEW_ADMIN_EMAIL}' already exists in Firebase.`);
        console.log(`    UID: ${existing.uid}`);
        process.exit(0);
      }
    } catch (e) {
      // User doesn't exist — good, create it
    }

    const user = await auth.createUser({
      email: NEW_ADMIN_EMAIL,
      password: NEW_ADMIN_PASSWORD,
      displayName: NEW_ADMIN_NAME,
      emailVerified: true,
      disabled: false,
    });

    console.log('');
    console.log('='.repeat(55));
    console.log('  [OK] Second Admin Created in Firebase!');
    console.log('='.repeat(55));
    console.log(`  Email    : ${NEW_ADMIN_EMAIL}`);
    console.log(`  Password : ${NEW_ADMIN_PASSWORD}`);
    console.log(`  Name     : ${NEW_ADMIN_NAME}`);
    console.log(`  UID      : ${user.uid}`);
    console.log('='.repeat(55));
    console.log('');
    console.log('  Login URL: http://localhost:3000/admin/login');
    console.log('');

  } catch (err) {
    console.error('[ERROR]', err.message);
    process.exit(1);
  }
}

createAdmin();
