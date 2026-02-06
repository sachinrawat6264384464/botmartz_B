/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React compiler (faster renders)
  reactCompiler: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // --- FIX: Allow external images from Unsplash ---
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  // Enable compression
  compress: true,
  
  // Optimize production build
  productionBrowserSourceMaps: false,
};

export default nextConfig;