import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    /** Allow `next/image` for assets under `public/forum/` (post & course thumbnails). */
    localPatterns: [{ pathname: "/forum/**" }],
  },
};

export default nextConfig;
