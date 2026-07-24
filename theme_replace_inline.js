const fs = require('fs');
const path = './app/insights/[slug]/InsightsDetailClient.tsx';
let code = fs.readFileSync(path, 'utf8');
let lines = code.split('\n');

let coverImageIndex = lines.findIndex(l => l.includes('{/* ── COVER IMAGE HERO ── */}'));

for (let i = coverImageIndex; i < lines.length; i++) {
  // Inline styles
  lines[i] = lines[i].replace(/color: '#8FA3C4'/g, "color: '#475569'");
  lines[i] = lines[i].replace(/backgroundColor: 'rgba\(255, 255, 255, 0\.02\)'/g, "backgroundColor: '#F8FAFC'");
  lines[i] = lines[i].replace(/backgroundColor: 'rgba\(255, 255, 255, 0\.03\)'/g, "backgroundColor: '#F8FAFC'");
  lines[i] = lines[i].replace(/border: '1px solid rgba\(255, 255, 255, 0\.06\)'/g, "border: '1px solid #E2E8F0'");
  lines[i] = lines[i].replace(/color: '#FFFFFF'/g, "color: '#0F172A'");
  
  // Specific buttons like 'View Code on GitHub' that had dark bg
  lines[i] = lines[i].replace(/backgroundColor: '#0B1220'/g, "backgroundColor: '#F1F5F9'");
  lines[i] = lines[i].replace(/color: '#FFFFFF'/g, "color: '#0F172A'");
  lines[i] = lines[i].replace(/border: '1px solid rgba\(255, 255, 255, 0\.15\)'/g, "border: '1px solid #CBD5E1'");
  
  // Fix hover classes for buttons
  lines[i] = lines[i].replace(/hover:bg-\[\#1A2333\]/g, "hover:bg-[#E2E8F0]");
  lines[i] = lines[i].replace(/hover:bg-white\/\.06/g, "hover:bg-white");
  lines[i] = lines[i].replace(/hover:bg-white\/15/g, "hover:border-[#0066FF]");
  lines[i] = lines[i].replace(/hover:bg-white\/\[0\.06\]/g, "hover:bg-[#F1F5F9]");
  lines[i] = lines[i].replace(/hover:border-white\/15/g, "hover:border-[#0066FF]");
  lines[i] = lines[i].replace(/hover:bg-white\/10/g, "hover:bg-slate-200");
  
  // Form elements
  lines[i] = lines[i].replace(/bg-white\/5/g, "bg-white");
  lines[i] = lines[i].replace(/border-white\/15/g, "border-slate-300");
  lines[i] = lines[i].replace(/text-slate-900 placeholder:text-slate-500/g, "text-slate-900 placeholder:text-slate-400");
}

fs.writeFileSync(path, lines.join('\n'));
console.log('Update completed 2');
