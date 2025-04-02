import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**.png',
        search: '',
      },
      {
        protocol: 'http',
        hostname: 'github.com',
        port: '',
        pathname: '/**.png',
        search: '',
      }
    ],
  },
};

export default nextConfig;
