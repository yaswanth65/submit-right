import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/client/documents/:documentId",
        destination: "/api/client/documents?documentId=:documentId"
      }
    ];
  }
};

export default nextConfig;
