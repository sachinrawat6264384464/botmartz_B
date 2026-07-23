const fs = require('fs');
const path = require('path');

function fixFile(filePath, splitKeyword) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes(splitKeyword)) {
    console.log(`Keyword not found in ${filePath}`);
    return;
  }
  
  const [heroPart, restPart] = content.split(splitKeyword);
  
  // Replace dark theme with light theme in restPart
  let modifiedRest = restPart
    .replace(/bg-\[#0A111F\]/g, 'bg-slate-50')
    .replace(/bg-\[#050B14\]/g, 'bg-white')
    .replace(/border-\[#1E293B\]/g, 'border-slate-200')
    .replace(/text-white/g, 'text-slate-900')
    .replace(/text-\[#8A9EB0\]/g, 'text-slate-600')
    .replace(/text-white\/\.?\[?[0-9.]+\]?/g, 'text-slate-900/5') // fallback for text-white/[0.02]
    .replace(/bg-gradient-to-br from-\[#0A111F\] to-\[#050B14\]/g, 'bg-white')
    .replace(/bg-gradient-to-b from-\[#1E293B\] to-\[#00B8F0\]/g, 'bg-gradient-to-b from-slate-200 to-[#00B8F0]')
    .replace(/bg-gradient-to-b from-\[#00B8F0\] to-\[#1E293B\]/g, 'bg-gradient-to-b from-[#00B8F0] to-slate-200');
    
  // Some fixups for the background of main in AIAgentsClient/EnterpriseRAGClient
  const modifiedHero = heroPart.replace(/<div className="bg-\[#050B14\] min-h-screen text-white/g, '<div className="bg-white min-h-screen text-slate-900');
  
  fs.writeFileSync(filePath, modifiedHero + splitKeyword + modifiedRest);
  console.log(`Updated ${filePath}`);
}

fixFile('app/services/ai-agents/AIAgentsClient.tsx', '{/* HOW IT WORKS / ARCHITECTURE */}');
fixFile('app/services/enterprise-rag/EnterpriseRAGClient.tsx', '{/* HOW IT WORKS / ARCHITECTURE */}');

