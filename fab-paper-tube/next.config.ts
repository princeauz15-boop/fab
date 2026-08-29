import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.wordpress.com' },
      { protocol: 'https', hostname: '*.wp.com' },
      { protocol: 'http',  hostname: 'localhost' },
      { protocol: 'https', hostname: 'your-wordpress-site.com' },
      // Pantheon WordPress hosting
      { protocol: 'https', hostname: 'dev-fab-paper-tube.pantheonsite.io' },
      { protocol: 'https', hostname: '*.pantheonsite.io' },
      // Allow any HTTPS hostname for WordPress images
      { protocol: 'https', hostname: '**' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
};

export default nextConfig;
