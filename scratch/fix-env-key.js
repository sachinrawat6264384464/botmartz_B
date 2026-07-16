const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env');
let content = fs.readFileSync(envPath, 'utf8');

// Replace Uwry with Uwrl
if (content.includes('Uwry')) {
  content = content.replace('Uwry', 'Uwrl');
  fs.writeFileSync(envPath, content, 'utf8');
  console.log("✅ Successfully replaced 'Uwry' with 'Uwrl' in .env!");
} else {
  console.log("❌ Could not find 'Uwry' in .env. Is it already fixed?");
}
