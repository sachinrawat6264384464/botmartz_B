const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.production.local') });

let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
console.log("Raw env key length:", privateKey ? privateKey.length : 0);

if (privateKey) {
  privateKey = privateKey.replace(/^["'`]+|["'`]+$/g, '');
  privateKey = privateKey.replace(/\\n/g, '\n').replace(/\r/g, '');
}

console.log("Formatted key preview:");
console.log(privateKey.substring(0, 100));

const admin = require('firebase-admin');
try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: privateKey
    })
  });
  console.log("SUCCESS: Firebase admin cert initialized!");
} catch (e) {
  console.error("ERROR initializing cert:", e.message);
}
