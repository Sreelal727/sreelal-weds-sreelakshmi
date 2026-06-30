import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Next doesn't pick up stray
  // lockfiles in the parent home directory.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
