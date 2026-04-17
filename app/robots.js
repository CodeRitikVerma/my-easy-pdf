export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://myeasypdf.com/sitemap.xml',
    host: 'https://myeasypdf.com',
  };
}
