import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images served from the Sanity CDN (the CMS).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
