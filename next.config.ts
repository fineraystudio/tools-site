import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Project page lives at https://faridrameli.github.io/tools-site/
  basePath: "/tools-site",
  assetPrefix: "/tools-site",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
