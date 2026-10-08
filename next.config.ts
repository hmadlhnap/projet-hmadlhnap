import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    qualities: [60, 65, 70, 75, 80, 85, 90, 95, 100],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 64, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.marrakechpackage.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    staticGenerationMaxConcurrency: 3,
    staticGenerationMinPagesPerWorker: 100,
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.marrakechpackage.com",
          },
        ],
        destination: "https://marrakechpackage.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
