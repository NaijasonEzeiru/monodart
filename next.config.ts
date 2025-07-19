import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "developers.monodat.com", pathname: "**" },
    ],
  },
};

export default nextConfig;
