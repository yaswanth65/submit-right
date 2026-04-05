import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
