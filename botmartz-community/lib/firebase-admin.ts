import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let adminApp: App;

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // 1. Try local JSON
  try {
    const fs = require('fs');
    const path = require('path');
    const possiblePaths = [
      path.resolve(process.cwd(), '../botmartz-main-firebase-adminsdk-fbsvc-60e42d287e.json'),
      path.resolve(process.cwd(), '../botmartz-main-firebase-adminsdk-fbsvc-d220cfe485.json'),
      path.resolve(process.cwd(), 'botmartz-main-firebase-adminsdk-fbsvc-60e42d287e.json'),
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
  } catch (e) {}

  // 2. Fallback to ENV variables
  let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  if (privateKey) {
    privateKey = privateKey.replace(/^["'`]+|["'`]+$/g, '');
    privateKey = privateKey.replace(/\\n/g, '\n').replace(/\r/g, '');
    if (!privateKey.includes('\n') && privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
      privateKey = privateKey
        .replace('-----BEGIN PRIVATE KEY-----', '-----BEGIN PRIVATE KEY-----\n')
        .replace('-----END PRIVATE KEY-----', '\n-----END PRIVATE KEY-----')
        .replace(/\n\s+/g, '\n');
    }
  }

  if (!privateKey || !process.env.FIREBASE_ADMIN_CLIENT_EMAIL) {
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

  return adminApp;
}

const initializedAdmin = getAdminApp();
export const adminDb = getFirestore(initializedAdmin);
export const adminAuth = getAuth(initializedAdmin);
export default initializedAdmin;
