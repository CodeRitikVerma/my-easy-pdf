const BASE = 'https://myeasypdf.com';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/404', '/500'],
      },
      // Be explicit for major crawlers — some interpret `*` less generously
      { userAgent: 'Googlebot',      allow: '/' },
      { userAgent: 'Bingbot',        allow: '/' },
      { userAgent: 'DuckDuckBot',    allow: '/' },
      { userAgent: 'Slurp',          allow: '/' }, // Yahoo
      { userAgent: 'YandexBot',      allow: '/' },
      // AI-training crawlers we explicitly permit (helps visibility in AI answers)
      { userAgent: 'GPTBot',         allow: '/' },
      { userAgent: 'PerplexityBot',  allow: '/' },
      { userAgent: 'ClaudeBot',      allow: '/' },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
