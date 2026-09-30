import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product photos are served from Unsplash's CDN (see src/data/catalog.ts).
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    qualities: [72, 75],
  },
  allowedDevOrigins: ['192.168.31.247'],
};

export default nextConfig;
