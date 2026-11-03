// Usage: node scratch/review/publish_articles.js [--with-images]
// Publishes the reviewed article bodies to Firestore. Run with --with-images only after
// public/images/insights/*.svg is deployed, otherwise the image embeds 404 on production.
const admin = require('firebase-admin');
const fs = require('fs');
admin.initializeApp({ credential: admin.credential.cert(require('../../botmartz-main-firebase-adminsdk-fbsvc-d220cfe485.json')) });
const db = admin.firestore();
const withImages = process.argv.includes('--with-images');
const map = {
  'microservices-vs-monolith-for-ai-systems-what-we-learned': 'new_microservices.md',
  'why-vector-similarity-is-not-semantic-search': 'new_vector.md',
  'pytorch-primitives-vs-framework-abstractions': 'new_pytorch.md',
  'prototype-vs-production-ai-client-perspective': 'new_prototype.md',
  'how-to-build-multi-million-dollar-ai-agents-with-antigravity-and-mcp': 'new_multimillion.md',
};
(async () => {
  for (const [slug, file] of Object.entries(map)) {
    let content = fs.readFileSync(__dirname + '/' + file, 'utf8');
    if (!withImages) content = content.split('\n').filter(l => !/^!\[.*\]\(\/images\/insights\/.*\.svg\)\s*$/.test(l)).join('\n');
    const s = await db.collection('blog-posts').where('slug', '==', slug).limit(1).get();
    await s.docs[0].ref.update({ content, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
    console.log(slug, withImages ? 'with images' : 'without images');
  }
  process.exit(0);
})();
