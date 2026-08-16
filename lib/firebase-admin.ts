import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Singleton pattern — only initialize once per server lifecycle
let adminApp: App;

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // 1. Try local JSON first (bulletproof for both root and local development paths)
  try {
    const fs = require('fs');
    const path = require('path');
    const possiblePaths = [
      path.resolve(process.cwd(), 'botmartz-main-firebase-adminsdk-fbsvc-60e42d287e.json'),
      path.resolve(process.cwd(), 'botmartz-main-firebase-adminsdk-fbsvc-d220cfe485.json'),
      '/home/soham/Downloads/botmartz-main-firebase-adminsdk-fbsvc-d220cfe485.json',
    ];

    for (const jsonPath of possiblePaths) {
      if (fs.existsSync(jsonPath)) {
        const serviceAccount = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        adminApp = initializeApp({
          credential: cert(serviceAccount),
        });
        return adminApp;
      }
    }
  } catch (e) {
    console.warn('Local service account JSON check skipped or failed:', e);
  }

  // 2. Fallback to ENV variables with robust normalization
  let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  if (privateKey) {
    // Strip leading/trailing quotes (single, double, or backticks)
    privateKey = privateKey.replace(/^["'`]+|["'`]+$/g, '');
    // Normalize escaped newlines to literal newlines and strip carriage returns
    privateKey = privateKey.replace(/\\n/g, '\n').replace(/\r/g, '');
    // If all newlines got collapsed into spaces during copy-paste, restore header/footer breaks
    if (!privateKey.includes('\n') && privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
      privateKey = privateKey
        .replace('-----BEGIN PRIVATE KEY-----', '-----BEGIN PRIVATE KEY-----\n')
        .replace('-----END PRIVATE KEY-----', '\n-----END PRIVATE KEY-----')
        .replace(/\n\s+/g, '\n');
    }
  }

  try {
    if (!privateKey || !process.env.FIREBASE_ADMIN_CLIENT_EMAIL) {
      console.warn('FIREBASE_ADMIN_PRIVATE_KEY or FIREBASE_ADMIN_CLIENT_EMAIL is missing. Initializing Firebase Admin with project ID fallback.');
      adminApp = initializeApp({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'botmartz-main',
      });
    } else {
      adminApp = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'botmartz-main',
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: privateKey,
        }),
      });
    }
  } catch (err: any) {
    console.warn('Failed to initialize Firebase Admin app with cert:', err.message);
    if (getApps().length > 0) {
      return getApps()[0];
    }
    adminApp = initializeApp({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'botmartz-main',
    });
  }

  return adminApp;
}

export const adminDb = getFirestore(getAdminApp());
export const adminAuth = getAuth(getAdminApp());
