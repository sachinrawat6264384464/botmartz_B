const fs = require('fs');
const path = './app/insights/[slug]/InsightsDetailClient.tsx';
let code = fs.readFileSync(path, 'utf8');
let lines = code.split('\n');

// Find the index of the cover image hero
let coverImageIndex = lines.findIndex(l => l.includes('{/* ── COVER IMAGE HERO ── */}'));

// 1. Replace main wrapper (before header banner)
for (let i = 0; i < coverImageIndex; i++) {
  if (lines[i].includes('<main className="bg-[#050B14] min-h-screen text-[#C7D6EE] font-sans pb-24 overflow-x-hidden">')) {
    lines[i] = lines[i].replace(
      'bg-[#050B14] min-h-screen text-[#C7D6EE]', 
      'bg-white min-h-screen text-slate-700'
    );
  }
  // Replace <style jsx global> properties inside <main>
  if (lines[i].includes('color: #A3B3CC;')) lines[i] = lines[i].replace('color: #A3B3CC;', 'color: #475569;');
  if (lines[i].includes('color: #FFFFFF;')) lines[i] = lines[i].replace('color: #FFFFFF;', 'color: #0F172A;');
  if (lines[i].includes('color: #00C6FF;')) lines[i] = lines[i].replace('color: #00C6FF;', 'color: #0066FF;');
  if (lines[i].includes('background-color: #060C1F;')) lines[i] = lines[i].replace('background-color: #060C1F;', 'background-color: #F8FAFC;');
  if (lines[i].includes('border: 1px solid rgba(255, 255, 255, 0.08);')) lines[i] = lines[i].replace('border: 1px solid rgba(255, 255, 255, 0.08);', 'border: 1px solid #E2E8F0;');
  if (lines[i].includes('color: #C7D6EE;')) lines[i] = lines[i].replace('color: #C7D6EE;', 'color: #334155;');
  if (lines[i].includes('background-color: rgba(0, 198, 255, 0.08);')) lines[i] = lines[i].replace('background-color: rgba(0, 198, 255, 0.08);', 'background-color: rgba(0, 102, 255, 0.08);');
}

// 2. Replacements AFTER cover image hero
// For Cover Image Hero itself, we can leave the dark fallback bg, but let's change text inside body.
for (let i = coverImageIndex; i < lines.length; i++) {
  // Common dark mode backgrounds
  lines[i] = lines[i].replace(/bg-\[\#0A1120\]/g, 'bg-white');
  lines[i] = lines[i].replace(/bg-\[\#121A2B\]/g, 'bg-slate-50');
  
  // Common borders
  lines[i] = lines[i].replace(/border-white\/10/g, 'border-slate-200');
  lines[i] = lines[i].replace(/border-\[\#1E293B\]\/50/g, 'border-slate-200');
  lines[i] = lines[i].replace(/border-\[\#1E293B\]/g, 'border-slate-200');
  
  // Common text colors
  lines[i] = lines[i].replace(/text-\[\#C7D6EE\]/g, 'text-slate-700');
  lines[i] = lines[i].replace(/text-\[\#8FA3C4\]/g, 'text-slate-600');
  lines[i] = lines[i].replace(/text-\[\#5B6B85\]/g, 'text-slate-500');
  lines[i] = lines[i].replace(/text-\[\#00C6FF\]/g, 'text-[#0066FF]');
  
  // Handle text-white
  // Do not replace if it's the author initials circle (e.g. from-[#007BFF])
  if (!lines[i].includes('from-[#007BFF]')) {
    lines[i] = lines[i].replace(/text-white/g, 'text-slate-900');
  }

  // Handle inputs/textarea dark backgrounds
  lines[i] = lines[i].replace(/bg-\[\#060C1F\]/g, 'bg-white');
  // Handle specific borders on inputs
  lines[i] = lines[i].replace(/border-white\/20/g, 'border-slate-300');
}

fs.writeFileSync(path, lines.join('\n'));
console.log('Update completed');
