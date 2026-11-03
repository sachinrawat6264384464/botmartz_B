/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React compiler (faster renders)
  reactCompiler: true,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for images

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },

  // Optimize package imports for minimal JS bundle size
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'firebase', 'react-icons', 'recharts', '@tiptap/react', 'tailwind-merge'],
  },

  // Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  // Enable compression
  compress: true,

  // Don't expose server info
  poweredByHeader: false,

  // Optimize production build
  productionBrowserSourceMaps: false,

  // Cache static assets and set security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // Strictly protect admin and api routes from all search engines and AI web scrapers
        source: '/(admin|api)/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, nosnippet, noimageindex' },
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
        ],
      },
      {
        // Long-term cache for static assets
        source: '/(_next/static|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.webp|.*\\.avif)(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/community/ai-frontier',
        destination: '/ai-frontier',
        permanent: true,
      },
      {
        source: '/solutions',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/labs',
        destination: '/work/labs',
        permanent: true,
      },
      {
        source: '/labs/insurance-intelligence',
        destination: '/work/labs/insurance-intelligence',
        permanent: true,
      },
      {
        source: '/partners',
        destination: '/partnerships',
        permanent: true,
      },
      {
        source: '/services/enterprise%20rag',
        destination: '/services/enterprise-rag',
        permanent: true,
      },
      {
        source: '/services/enterprise rag',
        destination: '/services/enterprise-rag',
        permanent: true,
      },
      {
        source: '/community',
        destination: 'http://localhost:3001/community',
        permanent: false,
      },
      {
        source: '/community/:path*',
        destination: 'http://localhost:3001/community/:path*',
        permanent: false,
      },
      {
        source: '/services/ai%20agents',
        destination: '/services/ai-agents',
        permanent: true,
      },
      {
        source: '/services/ai agents',
        destination: '/services/ai-agents',
        permanent: true,
      },
      {
        source: '/insights/how-we-built-a-legal-document-intelligence-system-for-100k-docs',
        destination: '/insights/prototype-vs-production-ai-client-perspective',
        permanent: true,
      },
      {
        source: '/insights/building-a-scalable-enterprise-rag-system-architecture-components-best-practices',
        destination: '/insights/why-vector-similarity-is-not-semantic-search',
        permanent: true,
      },
      {
        source: '/insights/inside-ai-agents-from-reasoning-to-real-world-action',
        destination: '/insights/how-to-build-multi-million-dollar-ai-agents-with-antigravity-and-mcp',
        permanent: true,
      },
      {
        source: '/insights/observability-for-llm-applications-metrics-that-matter',
        destination: '/insights/microservices-vs-monolith-for-ai-systems-what-we-learned',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
