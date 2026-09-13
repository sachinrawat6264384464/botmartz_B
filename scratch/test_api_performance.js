const http = require('http');
const https = require('https');

async function measureApi(url, options = {}) {
  const startTime = Date.now();
  return new Promise((resolve) => {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const req = client.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        resolve({
          url,
          statusCode: res.statusCode,
          durationMs: duration,
          sizeBytes: data.length,
          body: data
        });
      });
    });

    req.on('error', (err) => {
      const endTime = Date.now();
      resolve({
        url,
        statusCode: 'ERROR',
        error: err.message,
        durationMs: endTime - startTime
      });
    });

    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function runBenchmark() {
  console.log("=== BOTMARTZ API & ROUTE PERFORMANCE BENCHMARK ===");
  console.log("Measuring exact execution time for endpoints...\n");

  const endpoints = [
    { 
      name: "GET /api/admin/applications", 
      url: "https://www.botmartz.com/api/admin/applications",
      options: { method: 'GET' }
    },
    { 
      name: "POST /api/newsletter/subscribe", 
      url: "https://www.botmartz.com/api/newsletter/subscribe",
      options: { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: `perf_test_${Date.now()}@example.com` })
      }
    },
    { 
      name: "POST /api/contact", 
      url: "https://www.botmartz.com/api/contact",
      options: { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: "Perf Test", email: "test@example.com", message: "Benchmark test message" })
      }
    },
    { 
      name: "POST /api/careers/apply", 
      url: "https://www.botmartz.com/api/careers/apply",
      options: { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          fullName: "Perf Test Candidate", 
          email: "candidate_test@example.com", 
          phone: "+91 9999999999", 
          roleTitle: "Graphic Designer", 
          portfolioUrl: "https://github.com",
          experienceLevel: "Students / Freshers",
          coverNote: "Benchmark application test"
        })
      }
    }
  ];

  for (const ep of endpoints) {
    const result = await measureApi(ep.url, ep.options);
    console.log(`[Status: ${result.statusCode}] Endpoint: ${ep.name}`);
    console.log(`     URL: ${result.url}`);
    console.log(`     Response Time: ${result.durationMs} ms (${(result.durationMs / 1000).toFixed(2)}s)`);
    console.log(`     Payload Size: ${result.sizeBytes} bytes\n`);
  }
}

runBenchmark();
