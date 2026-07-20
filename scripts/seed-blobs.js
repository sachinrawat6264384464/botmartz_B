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

// Category Mapping
const CATEGORY_MAP = {
  'ai engineering': 'AI Engineering',
  'enterprise rag': 'Enterprise RAG',
  'ai agents': 'AI Agents',
  'agents': 'AI Agents',
  'mlops': 'MLOps',
  'architecture': 'Architecture',
  'tutorials': 'Tutorials',
  'open source': 'Open Source',
  'case studies': 'Case Studies',
  'advanced-models': 'Advanced Models',
  'models': 'Models',
  'llms': 'LLMs',
  'optimization': 'Optimization',
  'pytorch': 'PyTorch',
  'research': 'Research',
  'research-explained': 'Research Explained',
  'spiking-neural-networks': 'Spiking Neural Networks',
  'tensorflow': 'TensorFlow',
  'langchain': 'LangChain',
  'notebooks': 'Notebooks',
  'blogs': 'AI Engineering'
};

// Markdown to HTML Parser
function mdToHtml(md) {
  let html = md;
  
  // Clean carriage returns
  html = html.replace(/\r\n/g, '\n');

  // Code blocks: ```python ... ```
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<pre><code class="language-${lang}">${escapedCode}</code></pre>`;
  });
  
  // Headings
  html = html.replace(/^## (.*?)$/gm, (_, title) => {
    const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    return `<h2 id="${id}">${title}</h2>`;
  });
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Inline code
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');
  
  // Split into block elements and wrap paragraphs and lists
  const lines = html.split('\n');
  let blocks = [];
  let currentBlockType = null; // 'p', 'ul', 'ol', 'pre'
  let currentBlockLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check pre-rendered HTML blocks from code block regex
    if (line.startsWith('<pre>') || line.startsWith('</pre>') || line.startsWith('<h2') || line.startsWith('<h3')) {
      // Flush previous block
      flushBlock(blocks, currentBlockType, currentBlockLines);
      currentBlockType = null;
      currentBlockLines = [];
      blocks.push(line);
      continue;
    }

    if (line === '') {
      flushBlock(blocks, currentBlockType, currentBlockLines);
      currentBlockType = null;
      currentBlockLines = [];
      continue;
    }

    // List items
    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (currentBlockType !== 'ul') {
        flushBlock(blocks, currentBlockType, currentBlockLines);
        currentBlockType = 'ul';
        currentBlockLines = [];
      }
      const itemText = line.substring(2).trim();
      currentBlockLines.push(`<li>${itemText}</li>`);
    } else if (line.match(/^\d+\.\s+/)) {
      if (currentBlockType !== 'ol') {
        flushBlock(blocks, currentBlockType, currentBlockLines);
        currentBlockType = 'ol';
        currentBlockLines = [];
      }
      const itemText = line.replace(/^\d+\.\s+/, '').trim();
      currentBlockLines.push(`<li>${itemText}</li>`);
    } else {
      // Regular paragraph line
      if (currentBlockType !== 'p') {
        flushBlock(blocks, currentBlockType, currentBlockLines);
        currentBlockType = 'p';
        currentBlockLines = [];
      }
      currentBlockLines.push(line);
    }
  }

  flushBlock(blocks, currentBlockType, currentBlockLines);

  return blocks.filter(Boolean).join('\n');
}

function flushBlock(blocks, type, lines) {
  if (lines.length === 0) return;
  if (type === 'p') {
    blocks.push(`<p>${lines.join(' ')}</p>`);
  } else if (type === 'ul') {
    blocks.push(`<ul>\n${lines.join('\n')}\n</ul>`);
  } else if (type === 'ol') {
    blocks.push(`<ol>\n${lines.join('\n')}\n</ol>`);
  }
}

// Simple YAML Frontmatter parser with multiline folded block scalar support
function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/^---([\s\S]*?)---([\s\S]*)$/);
  
  if (!match) {
    return {
      metadata: {
        title: path.basename(filePath, '.md').replace(/-|_/g, ' '),
        category: 'AI Engineering'
      },
      contentHtml: mdToHtml(content)
    };
  }

  const yamlBlock = match[1];
  const bodyMarkdown = match[2].trim();
  const metadata = {};
  
  const lines = yamlBlock.split('\n');
  let currentKey = null;
  let currentValue = '';
  let isMultiline = false;
  
  for (let line of lines) {
    // Check if it's an indented line (continuation of multiline)
    if (isMultiline && (line.startsWith(' ') || line.startsWith('\t'))) {
      currentValue += ' ' + line.trim(); // use space to join words
      continue;
    } else if (isMultiline) {
      // End of multiline
      metadata[currentKey] = currentValue.trim();
      isMultiline = false;
      currentKey = null;
      currentValue = '';
    }
    
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    
    if (val === '>-' || val === '>' || val === '|') {
      currentKey = key;
      currentValue = '';
      isMultiline = true;
    } else {
      // Single line value
      if (val.startsWith('[') && val.endsWith(']')) {
        try {
          val = JSON.parse(val.replace(/'/g, '"'));
        } catch (e) {}
      } else if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      } else if (val.startsWith("'") && val.endsWith("'")) {
        val = val.slice(1, -1);
      }
      metadata[key] = val;
    }
  }
  
  if (isMultiline && currentKey) {
    metadata[currentKey] = currentValue.trim();
  }

  return {
    metadata,
    contentHtml: mdToHtml(bodyMarkdown)
  };
}

// Recursive directory traversal
function getMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      // Skip the scripts folder inside blobs just in case
      if (file !== 'scripts') {
        getMarkdownFiles(filePath, fileList);
      }
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// Main seeder function
async function seedBlobs() {
  console.log("🚀 Starting to parse and seed markdown articles from /blobs...\n");
  
  let blobsDir = path.join(__dirname, '..', 'blobs');
  if (!fs.existsSync(blobsDir)) {
    blobsDir = path.join(__dirname, '..', 'blogs');
  }
  if (!fs.existsSync(blobsDir)) {
    console.error("❌ /blobs or /blogs directory not found at path:", blobsDir);
    process.exit(1);
  }

  const mdFiles = getMarkdownFiles(blobsDir);
  console.log(`Found ${mdFiles.length} markdown articles to seed.`);

  // Clean up any stale/broken "->" doc
  try {
    await db.collection("blog-posts").doc("->").delete();
    console.log("🧹 Cleaned up invalid stale document ID '->' from Firestore.");
  } catch (e) {}

  let successCount = 0;

  for (const filePath of mdFiles) {
    try {
      const { metadata, contentHtml } = parseMarkdownFile(filePath);
      const title = metadata.title;
      if (!title) {
        console.warn(`[Skip] Missing title in file: ${filePath}`);
        continue;
      }

      // Generate slug
      const slug = metadata.slug || title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

      // Normalize category mapping
      const rawCategory = metadata.category || '';
      const normalizedKey = rawCategory.toLowerCase().replace(/\s+/g, '-').trim();
      const mappedCategory = CATEGORY_MAP[normalizedKey] || 'AI Engineering';

      // Read time estimation (words / 200)
      const plainText = contentHtml.replace(/<[^>]*>/g, '');
      const wordCount = plainText.split(/\s+/).length;
      const readTime = Math.max(1, Math.round(wordCount / 200));

      const tags = Array.isArray(metadata.tags) ? metadata.tags : [];
      
      // Seed to Firestore collection "blog-posts"
      const docRef = db.collection("blog-posts").doc(slug);
      
      const payload = {
        title: title,
        slug: slug,
        excerpt: metadata.excerpt || `Deep dive into ${title} and its application in modern AI engineering.`,
        content: contentHtml,
        category: mappedCategory,
        author: metadata.author || metadata.authorName || 'Botmartz Engineering Team',
        readTime: readTime,
        status: metadata.status || 'published',
        featured: !!metadata.featured,
        tags: tags,
        featuredImage: metadata.featuredImage || 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      // Optional details
      if (metadata.colab_notebook) payload.colabLink = metadata.colab_notebook;
      if (metadata.githubLink) payload.githubLink = metadata.githubLink;
      
      // Parse list helpers for toc and closingPoints
      // We can generate table of contents from headers if missing
      const headers = [];
      const headerMatches = contentHtml.match(/<h2 id=".*?">(.*?)<\/h2>/g);
      if (headerMatches) {
        headerMatches.forEach(m => {
          const match = m.match(/<h2 id=".*?">(.*?)<\/h2>/);
          if (match) headers.push(match[1]);
        });
      }
      payload.toc = headers.length ? headers : ['Overview', 'Implementation', 'Conclusion'];

      await docRef.set(payload, { merge: true });
      console.log(`✅ Seeded: "${title}" -> Category: [${mappedCategory}]`);
      successCount++;
    } catch (err) {
      console.error(`❌ Failed to seed file: ${filePath}`, err);
    }
  }

  console.log(`\n🎉 Done! Seeded ${successCount}/${mdFiles.length} articles successfully!`);
  process.exit(0);
}

seedBlobs().catch(err => {
  console.error("❌ Script execution failed:", err);
  process.exit(1);
});
