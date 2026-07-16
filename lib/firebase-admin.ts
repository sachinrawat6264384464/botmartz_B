import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Singleton pattern — only initialize once per server lifecycle
let adminApp: App;

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // 1. Try local JSON first (bulletproof)
  try {
    const fs = require('fs');
    const path = require('path');
    const jsonPath = path.resolve(process.cwd(), 'botmartz-main-firebase-adminsdk-fbsvc-d220cfe485.json');
    if (fs.existsSync(jsonPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      adminApp = initializeApp({
        credential: cert(serviceAccount),
      });
      return adminApp;
    }
  } catch (e) {
    // Ignore and fallback
  }

  // 2. Fallback to ENV variables
  let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  if (privateKey) {
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }
    privateKey = privateKey.replace(/\\n/g, '\n').replace(/\r/g, '');
  }

  adminApp = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
      privateKey: privateKey!,
    }),
  });

  return adminApp;
}

export const adminDb = getFirestore(getAdminApp());
export const adminAuth = getAuth(getAdminApp());
