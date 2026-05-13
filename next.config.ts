import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGitHubPages ? "/spssmauli" : undefined,
  assetPrefix: isGitHubPages ? "/spssmauli/" : undefined,
};

export default nextConfig;
