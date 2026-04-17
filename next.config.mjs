/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack config (Next.js 16 default bundler)
  turbopack: {
    resolveAlias: {
      // pdfjs-dist: disable canvas & encoding — not available in browser bundles
      canvas: { browser: './empty-module.js' },
      encoding: { browser: './empty-module.js' },
    },
  },
  // Keep webpack config as fallback for `next build --webpack`
  webpack: (config) => {
    config.resolve.alias.canvas   = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

export default nextConfig;
