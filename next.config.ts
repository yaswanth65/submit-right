import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  async rewrites() {
    return [
      {
        source: "/Vector2.svg",
        destination: "/vector2.svg"
      },
      {
        source: "/services1/image.png",
        destination: "/services1/hero.png"
      },
      {
        source: "/api/client/documents/:documentId",
        destination: "/api/client/documents?documentId=:documentId"
      }
    ];
  }
};

export default nextConfig;
