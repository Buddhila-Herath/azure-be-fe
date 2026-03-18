import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // Required for Static Web Apps
  distDir: 'build',  // Lab expects 'build' directory
  images: {
    unoptimized: true, // Static export doesn't support image optimization
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  },
};

export default nextConfig;
