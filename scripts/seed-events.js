const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env' });
const admin = require('firebase-admin');

// Parse private key formatting
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY
  ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

if (!privateKey) {
  console.error("❌ FIREBASE_ADMIN_PRIVATE_KEY is missing in your .env file!");
  process.exit(1);
}

// Initialize Firebase Admin
const app = admin.apps.length > 0
  ? admin.apps[0]
  : admin.initializeApp({
      credential: admin.credential.cert({
        projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey:  privateKey,
      }),
    });

const db = admin.firestore();

// Markdown to HTML Parser (simple converter)
function mdToHtml(md) {
  let html = md;
  html = html.replace(/\r\n/g, '\n');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');
  return html.split('\n').map(line => {
    if (line.trim() === '') return '';
    if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`;
    if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`;
    return `<p>${line}</p>`;
  }).filter(Boolean).join('\n');
}

async function seed() {
  console.log("🚀 Seeding events collection with correct Indore details...");
  
  const contentPath = path.resolve(process.cwd(), 'reference_docs/02-ai-frontier-event.md');
  if (!fs.existsSync(contentPath)) {
    console.error("❌ Content file not found at path:", contentPath);
    process.exit(1);
  }
  const content = fs.readFileSync(contentPath, 'utf-8');

  const eventPayload = {
    title: 'AI Frontier 2026',
    slug: 'ai-frontier-2026',
    shortDescription: 'Agents · Enterprise AI · AI-Assisted Development · Responsible AI. A full day of sessions, a fireside Q&A and a closing panel on building an AI engineering career — plus the launch of the Botmartz AI Engineering Community.',
    badge: 'Flagship Event',
    status: 'upcoming',
    date: 'Aug 22, 2026',
    location: 'Walkover Co-working, Indore, India',
    coverImage: '/eng-i-removebg-preview.png',
    content: mdToHtml(content),
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await db.collection('events').doc('ai-frontier-2026').set(eventPayload, { merge: true });

  console.log('✅ Successfully seeded AI Frontier 2026 event using Admin SDK!');
  process.exit(0);
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
