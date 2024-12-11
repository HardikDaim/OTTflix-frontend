import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '1gb', // Setting the body size limit to 1GB
      
    },
  },
};

export default nextConfig;
