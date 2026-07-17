/**
 * seed-admin.js  — Plain JS version (no TypeScript needed)
 * Run: node seed-admin.js
 */

require('dotenv').config({ path: '.env' });

const admin = require('firebase-admin');

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey:  process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

const db   = admin.firestore();
const auth = admin.auth();

const ADMIN_EMAIL    = 'soham@botmartz.com';
const ADMIN_PASSWORD = 'admin@312';
const ADMIN_NAME     = 'Botmartz Admin';

async function seedAdmin() {
  console.log('🚀 Seeding super-admin account…\n');

  let uid;
  try {
    const existing = await auth.getUserByEmail(ADMIN_EMAIL);
    uid = existing.uid;
    console.log(`ℹ️  Auth user already exists → uid: ${uid}`);
    await auth.updateUser(uid, { password: ADMIN_PASSWORD, displayName: ADMIN_NAME });
    console.log('✅ Auth user updated (password + displayName)');
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      const newUser = await auth.createUser({
        email: ADMIN_EMAIL, password: ADMIN_PASSWORD, displayName: ADMIN_NAME,
      });
      uid = newUser.uid;
      console.log(`✅ Auth user created → uid: ${uid}`);
    } else {
      throw err;
    }
  }

  await db.collection('user_roles').doc(uid).set({
    email:        ADMIN_EMAIL.toLowerCase(),
    displayName:  ADMIN_NAME,
    isSuperAdmin: true,
    modules:      [],
    updatedAt:    admin.firestore.FieldValue.serverTimestamp(),
  }, { merge: true });

  console.log('✅ user_roles document upserted (isSuperAdmin: true)');
  console.log('\n🎉 Done! Login at /admin/login with:');
  console.log(`   Email    : ${ADMIN_EMAIL}`);
  console.log(`   Password : ${ADMIN_PASSWORD}`);
  process.exit(0);
}

seedAdmin().catch(e => {
  console.error('❌ Seed failed:', e.message);
  process.exit(1);
});
