// Script to grant super admin access to admin2@botmartz.com in Firestore
// Run from Botmartz root directory:
//   node --env-file=.env grant-superadmin.mjs

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// ── Target user to make super admin ──────────────────────────────────────────
const TARGET_EMAIL = "admin2@botmartz.com";
// ─────────────────────────────────────────────────────────────────────────────

// All available modules in the system
const ALL_MODULES = [
  'dashboard', 'crm', 'projects', 'contacts', 'blogs', 'comments',
  'newsletter', 'case-studies', 'labs', 'events', 'feedback', 'jobs',
  'partnerships', 'ai-agents', 'pages', 'settings', 'super-admin',
  'coupons', 'payments'
];

function initFirebaseAdmin() {
  if (getApps().length > 0) return getApps()[0];

  const jsonPath = resolve(process.cwd(), 'botmartz-main-firebase-adminsdk-fbsvc-d220cfe485.json');
  if (existsSync(jsonPath)) {
    const serviceAccount = JSON.parse(readFileSync(jsonPath, 'utf-8'));
    return initializeApp({ credential: cert(serviceAccount) });
  }

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

async function grantSuperAdmin() {
  try {
    initFirebaseAdmin();
    const auth = getAuth();
    const db = getFirestore();

    // Get user UID from email
    const userRecord = await auth.getUserByEmail(TARGET_EMAIL);
    const uid = userRecord.uid;
    console.log(`Found user: ${TARGET_EMAIL} -> UID: ${uid}`);

    // Update/create user_roles document with full super admin access
    const roleRef = db.collection('user_roles').doc(uid);
    await roleRef.set({
      email: TARGET_EMAIL,
      displayName: userRecord.displayName || 'Admin Two',
      isSuperAdmin: true,
      modules: ALL_MODULES,
      updatedAt: new Date().toISOString(),
    }, { merge: true });

    console.log('');
    console.log('='.repeat(55));
    console.log('  [OK] Super Admin Access Granted!');
    console.log('='.repeat(55));
    console.log(`  Email      : ${TARGET_EMAIL}`);
    console.log(`  UID        : ${uid}`);
    console.log(`  SuperAdmin : true`);
    console.log(`  Modules    : ALL (${ALL_MODULES.length} modules)`);
    console.log('='.repeat(55));
    console.log('');
    console.log('  Login URL: https://botmartz.com/admin/login');
    console.log('  OR locally: http://localhost:3000/admin/login');
    console.log('');

  } catch (err) {
    console.error('[ERROR]', err.message);
    process.exit(1);
  }
}

grantSuperAdmin();
