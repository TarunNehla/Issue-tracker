
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // Skips type checking during the build
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
};
