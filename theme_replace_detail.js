const fs = require('fs');
const path = './app/insights/[slug]/InsightsDetailClient.tsx';
let code = fs.readFileSync(path, 'utf8');

// 1. Change the main wrapper to bg-white
code = code.replace(/<main className="bg-\[\#050B14\] min-h-screen text-\[\#C7D6EE\] font-sans pb-24 overflow-x-hidden">/, '<main className="bg-white min-h-screen text-slate-700 font-sans pb-24 overflow-x-hidden">');

// 2. The Hero Header Banner should stay dark. It's currently:
// <div className="bg-[#060C1F] relative overflow-hidden pt-32 pb-16 px-6 sm:px-10">
// We leave it as is, or maybe explicitly make sure it stays dark.

// 3. Blog Content prose styles in <style jsx global>
code = code.replace(/color: #A3B3CC;/g, 'color: #475569;'); // text-slate-600
code = code.replace(/color: #FFFFFF;/g, 'color: #0F172A;'); // text-slate-900
code = code.replace(/color: #00C6FF;/g, 'color: #0066FF;');
code = code.replace(/background-color: #060C1F;/g, 'background-color: #F8FAFC;'); // pre block
code = code.replace(/border: 1px solid rgba\(255, 255, 255, 0\.08\);/g, 'border: 1px solid #E2E8F0;'); // border
code = code.replace(/color: #C7D6EE;/g, 'color: #334155;'); // code block text
code = code.replace(/background-color: rgba\(0, 198, 255, 0\.08\);/g, 'background-color: rgba(0, 102, 255, 0.08);');

// 4. Content Area wrappers (after the hero section)
code = code.replace(/bg-\[\#0A1120\]/g, 'bg-white'); // Post content wrapper
code = code.replace(/bg-\[\#121A2B\]/g, 'bg-slate-50'); // Sidebar blocks
code = code.replace(/border-white\/10/g, 'border-slate-200');
code = code.replace(/border-\[\#1E293B\]/g, 'border-slate-200');
code = code.replace(/border-\[\#1E293B\]\/50/g, 'border-slate-200');

// 5. Text colors in the content area
code = code.replace(/text-white/g, 'text-slate-900'); // Note: this might change the hero section text too! Let's be careful.
// Let's NOT blanket replace text-white. We'll target specific classes if needed.

fs.writeFileSync(path, code);
console.log('Update completed');
