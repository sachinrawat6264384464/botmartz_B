import { performance } from 'perf_hooks';

const BASE_URL = 'http://localhost:3000';

const routes = [
  '/',
  '/about',
  '/services',
  '/services/enterprise-rag',
  '/services/ai-agents',
  '/work',
  '/insights',
  '/community',
  '/contact',
  '/llms.txt'
];

const images = [
  '/robot2.png',
  '/case_studies3.png',
  '/WHITELOGO.png',
  '/promit.png',
  '/AI_frontier_2026.png',
  '/case-studies2.png',
  '/robot.png',
  '/botmartz_favicon.png',
  '/favicon.ico'
];

async function measureRequest(url) {
  const start = performance.now();
  try {
    const res = await fetch(url, { headers: { 'Accept-Encoding': 'gzip, deflate, br' } });
    const blob = await res.arrayBuffer();
    const duration = performance.now() - start;
    return {
      status: res.status,
      durationMs: duration,
      sizeKB: blob.byteLength / 1024,
      ok: res.ok
    };
  } catch (err) {
    const duration = performance.now() - start;
    return {
      status: 0,
      durationMs: duration,
      sizeKB: 0,
      ok: false,
      error: err.message
    };
  }
}

async function runLoadTestForRoute(path, concurrency = 10) {
  const url = `${BASE_URL}${path}`;
  const promises = [];
  for (let i = 0; i < concurrency; i++) {
    promises.push(measureRequest(url));
  }
  const results = await Promise.all(promises);
  
  const durations = results.map(r => r.durationMs);
  const sizes = results.map(r => r.sizeKB);
  const successCount = results.filter(r => r.ok).length;
  
  const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
  const minDuration = Math.min(...durations);
  const maxDuration = Math.max(...durations);
  const avgSize = sizes.reduce((a, b) => a + b, 0) / sizes.length;

  return {
    path,
    concurrency,
    successRate: `${(successCount / concurrency) * 100}%`,
    avgMs: Math.round(avgDuration),
    minMs: Math.round(minDuration),
    maxMs: Math.round(maxDuration),
    avgSizeKB: Math.round(avgSize * 10) / 10
  };
}

async function runAudit() {
  console.log('====================================================');
  console.log('🚀 BOTMARTZ LOAD & PERFORMANCE AUDIT IN PROGRESS...');
  console.log('====================================================\n');

  console.log('📍 1. TESTING GET API ROUTES & PAGES (10 Concurrent Requests Each)...');
  console.log('-------------------------------------------------------------------');
  
  const routeResults = [];
  for (const path of routes) {
    const res = await runLoadTestForRoute(path, 10);
    routeResults.push(res);
    console.log(`[${res.successRate}] ${res.path.padEnd(30)} -> Avg: ${res.avgMs}ms | Min: ${res.minMs}ms | Max: ${res.maxMs}ms | Size: ${res.avgSizeKB}KB`);
  }

  console.log('\n🖼️ 2. TESTING IMAGE & ASSET LOAD TIMINGS (Single Load Test)...');
  console.log('-------------------------------------------------------------------');
  
  const imageResults = [];
  for (const imgPath of images) {
    const res = await measureRequest(`${BASE_URL}${imgPath}`);
    imageResults.push({ path: imgPath, ...res });
    const speedMbps = res.sizeKB / 1024 / (res.durationMs / 1000);
    console.log(`[${res.status}] ${imgPath.padEnd(30)} -> Load Time: ${Math.round(res.durationMs)}ms | Size: ${Math.round(res.sizeKB * 10) / 10}KB`);
  }

  console.log('\n====================================================');
  console.log('🔍 BOTTLENECK ANALYSIS SUMMARY:');
  console.log('====================================================');
  
  const slowRoutes = routeResults.filter(r => r.avgMs > 300);
  if (slowRoutes.length > 0) {
    console.log('⚠️ Slow Routes Detected (>300ms avg load):');
    slowRoutes.forEach(r => console.log(`   - ${r.path}: ${r.avgMs}ms average latency`));
  } else {
    console.log('✅ All API routes and pages respond in under 300ms!');
  }

  const heavyImages = imageResults.filter(i => i.sizeKB > 500);
  if (heavyImages.length > 0) {
    console.log('⚠️ Large Images Detected (>500KB):');
    heavyImages.forEach(i => console.log(`   - ${i.path}: ${Math.round(i.sizeKB)}KB`));
  } else {
    console.log('✅ All static images are optimized (<500KB)!');
  }
}

runAudit();
