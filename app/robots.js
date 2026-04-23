const BASE = 'https://myeasypdf.com';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/404', '/500']
      },

      // Major search engine bots
      {
        userAgent: 'Googlebot',
        allow: '/'
      },
      {
        userAgent: 'Bingbot',
        allow: '/'
      },

      // Secondary crawlers (optional but safe)
      {
        userAgent: 'DuckDuckBot',
        allow: '/'
      },
      {
        userAgent: 'Slurp', // Yahoo
        allow: '/'
      },
      {
        userAgent: 'YandexBot',
        allow: '/'
      },

      // AI crawlers (optional — no impact on SEO ranking)
      {
        userAgent: 'GPTBot',
        allow: '/'
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/'
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/'
      }
    ],

    sitemap: `${BASE}/sitemap.xml`
  };
}
