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

  // 301-redirect any /?q= URLs to / — prevents ?q= parameterised URLs from
  // appearing as "Alternate page with proper canonical tag" in Google Search Console.
  async redirects() {
    return [
      {
        source:      '/',
        has:         [{ type: 'query', key: 'q' }],
        destination: '/',
        permanent:   true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Tell browsers and crawlers to always use HTTPS (2-year max-age).
          // Eliminates the "Page with redirect" GSC warning for http://myeasypdf.com/
          {
            key:   'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Prevent this site's pages from being framed elsewhere
          {
            key:   'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
